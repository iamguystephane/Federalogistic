const prisma = require("../prisma")
const { uploadToCloudinary } = require("../config/cloudinary")
const { sendMail, emailHtml } = require("../config/mail")
const { assertRequired } = require("../utils/helpers")
const { serializeDeposit } = require("../utils/serializers")

async function listPayments(req, res, next) {
  try {
    const deposits = await prisma.paymentDeposit.findMany({
      include: { shipment: true },
      orderBy: { createdAt: "desc" },
    })
    res.json(deposits.map(serializeDeposit))
  } catch (err) {
    next(err)
  }
}

async function updatePayment(req, res, next) {
  try {
    const normalized = String(req.body.status || "").toUpperCase()
    if (!["PENDING", "APPROVED", "DECLINED"].includes(normalized)) {
      return res.status(400).json({ message: "Status must be pending, approved, or declined" })
    }

    const deposit = await prisma.paymentDeposit.update({
      where: { id: req.params.id },
      data: { status: normalized, note: req.body.note || null },
      include: { shipment: true },
    })

    const shipmentUpdate = {
      paymentStatus: normalized === "APPROVED" ? "PAID" : normalized === "DECLINED" ? "UNPAID" : "PENDING",
    }

    // On approval, append an entry to the shipment's payment history
    if (normalized === "APPROVED") {
      const existing = Array.isArray(deposit.shipment.paymentHistory) ? deposit.shipment.paymentHistory : []
      shipmentUpdate.paymentHistory = [
        ...existing,
        {
          amount: Number(deposit.amount),
          method: deposit.method,
          transactionId: deposit.transactionId,
          date: deposit.createdAt.toISOString(),
          approvedAt: new Date().toISOString(),
        },
      ]
    }

    await prisma.shipment.update({ where: { id: deposit.shipmentId }, data: shipmentUpdate })

    if (normalized === "APPROVED" || normalized === "DECLINED") {
      const dep = await prisma.paymentDeposit.findUnique({
        where: { id: req.params.id },
        include: { shipment: true },
      })
      if (dep && dep.recipientEmail) {
        const approved = normalized === "APPROVED"
        const html = emailHtml({
          title: approved ? "Payment Approved" : "Payment Declined",
          preheader: `Regarding tracking #${dep.trackingNumber}`,
          body: `
            <p style="margin:0 0 16px;color:#475569;font-size:15px;line-height:1.7;">Dear <strong style="color:#1e293b;">${dep.recipientName}</strong>,</p>
            ${
              approved
                ? `<p style="margin:0 0 20px;color:#475569;font-size:15px;line-height:1.7;">Great news! Your payment for shipment <strong>${dep.trackingNumber}</strong> has been <span style="color:#16a34a;font-weight:700;">approved</span>. Your shipment has been released and is now proceeding to delivery.</p>`
                : `<p style="margin:0 0 20px;color:#475569;font-size:15px;line-height:1.7;">We were unable to verify your payment for shipment <strong>${dep.trackingNumber}</strong>. Your payment has been <span style="color:#dc2626;font-weight:700;">declined</span>. Please retry with the correct payment details.</p>`
            }
            <div style="background:${approved ? "#f0fdf4" : "#fef2f2"};border-radius:10px;padding:20px;margin:20px 0;">
              <p style="margin:0 0 4px;color:${approved ? "#16a34a" : "#dc2626"};font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;">Payment Status</p>
              <p style="margin:0;color:#1e293b;font-size:18px;font-weight:800;">${approved ? "✓ Approved" : "✗ Declined"}</p>
            </div>
            <div style="text-align:center;margin:28px 0 0;">
              <a href="${process.env.CLIENT_URL || "http://localhost:3000"}/trackingresult?tracking=${encodeURIComponent(dep.trackingNumber)}" style="display:inline-block;background:linear-gradient(135deg,#2459d8,#1a3faf);color:#ffffff;font-size:15px;font-weight:700;padding:14px 36px;border-radius:10px;text-decoration:none;">View Shipment Status</a>
            </div>
          `,
        })
        sendMail({
          to: dep.recipientEmail,
          subject: `Payment ${approved ? "Approved" : "Declined"} — Tracking #${dep.trackingNumber}`,
          html,
        }).catch(console.error)
      }
    }

    res.json(serializeDeposit(deposit))
  } catch (err) {
    next(err)
  }
}

async function submitPayment(req, res, next) {
  try {
    assertRequired(req.body, ["trackingNumber", "recipientName", "recipientEmail", "method", "transactionId", "amount"])
    if (!req.file) return res.status(400).json({ message: "Payment proof image is required" })

    const shipment = await prisma.shipment.findUnique({ where: { trackingNumber: req.body.trackingNumber } })
    if (!shipment) return res.status(404).json({ message: "Shipment not found" })
    if (shipment.paymentStatus === "PAID") {
      return res.status(400).json({ message: "Your current clearance payment has already been approved. No further payment is required at this time." })
    }
    if (shipment.paymentStatus === "PENDING") {
      return res.status(400).json({ message: "Your payment proof is already submitted and is under review. Please wait for admin confirmation." })
    }

    const uploaded = await uploadToCloudinary(req.file, "federalogistic/payment-proofs")
    const deposit = await prisma.paymentDeposit.create({
      data: {
        shipmentId: shipment.id,
        trackingNumber: shipment.trackingNumber,
        recipientName: req.body.recipientName,
        recipientEmail: req.body.recipientEmail,
        method: req.body.method,
        transactionId: req.body.transactionId,
        amount: Number(req.body.amount),
        proofUrl: uploaded.secure_url,
        proofPublicId: uploaded.public_id,
      },
      include: { shipment: true },
    })

    await prisma.shipment.update({ where: { id: shipment.id }, data: { paymentStatus: "PENDING" } })

    await sendMail({
      to: process.env.ADMIN_EMAIL,
      subject: `New payment proof: ${shipment.trackingNumber}`,
      html: `
        <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;color:#0f172a">
          <h2>New payment proof submitted</h2>
          <p><strong>Tracking:</strong> ${shipment.trackingNumber}</p>
          <p><strong>Recipient:</strong> ${req.body.recipientName} (${req.body.recipientEmail})</p>
          <p><strong>Amount:</strong> ${req.body.amount}</p>
          <p><strong>Transaction:</strong> ${req.body.transactionId}</p>
          <p><a href="${uploaded.secure_url}">View payment proof</a></p>
        </div>
      `,
    }).catch((err) => console.error("Payment proof email error:", err))

    res.status(201).json(serializeDeposit(deposit))
  } catch (err) {
    next(err)
  }
}

module.exports = { listPayments, updatePayment, submitPayment }
