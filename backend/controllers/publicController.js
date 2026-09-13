const prisma = require("../prisma")
const { sendMail, emailHtml } = require("../config/mail")

async function getPublicSettings(req, res, next) {
  try {
    let settings = await prisma.siteSettings.findUnique({ where: { id: "singleton" } })
    if (!settings) settings = { contactPhone: "", contactEmail: "", contactAddress: "", formDestinationEmail: "" }
    res.json({ contactPhone: settings.contactPhone, contactEmail: settings.contactEmail, contactAddress: settings.contactAddress })
  } catch (err) {
    next(err)
  }
}

async function getPublicPaymentMethods(req, res, next) {
  try {
    const methods = await prisma.paymentMethod.findMany({
      where: { isVisible: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    })
    res.json(methods)
  } catch (err) {
    next(err)
  }
}

async function getPublicPaymentMethod(req, res, next) {
  try {
    const method = await prisma.paymentMethod.findFirst({ where: { id: req.params.id, isVisible: true } })
    if (!method) return res.status(404).json({ message: "Payment method not found" })
    res.json(method)
  } catch (err) {
    next(err)
  }
}

async function contact(req, res, next) {
  try {
    const { name, email, phone, subject, message } = req.body
    if (!name || !email || !message) return res.status(400).json({ message: "name, email, and message are required" })
    const settings = await prisma.siteSettings.findUnique({ where: { id: "singleton" } })
    const to = settings?.formDestinationEmail || process.env.ADMIN_EMAIL
    if (!to) {
      return res.status(503).json({ message: "The contact form is not configured yet. Please reach out to us directly." })
    }
    if (to) {
      const html = emailHtml({
        title: "New Contact Form Submission",
        preheader: `From ${name}`,
        body: `
          <table width="100%" cellpadding="0" cellspacing="0">
            ${[["Name", name], ["Email", email], ["Phone", phone || "—"], ["Subject", subject || "—"]]
              .map(
                ([label, value]) => `
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;width:120px;">
                  <span style="color:#64748b;font-size:13px;font-weight:600;">${label}</span>
                </td>
                <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;">
                  <span style="color:#1e293b;font-size:13px;font-weight:700;">${value}</span>
                </td>
              </tr>`,
              )
              .join("")}
          </table>
          <div style="margin-top:24px;background:#f8fafc;border-radius:10px;padding:20px;">
            <p style="margin:0 0 8px;color:#64748b;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;">Message</p>
            <p style="margin:0;color:#1e293b;font-size:14px;line-height:1.7;">${message.replace(/\n/g, "<br/>")}</p>
          </div>
        `,
      })
      await sendMail({ to, subject: `Contact: ${subject || "New message"} — ${name}`, html })
    }
    res.json({ message: "Message sent successfully." })
  } catch (err) {
    next(err)
  }
}

module.exports = { getPublicSettings, getPublicPaymentMethods, getPublicPaymentMethod, contact }
