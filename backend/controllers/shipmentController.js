const prisma = require("../prisma")
const { uploadToCloudinary } = require("../config/cloudinary")
const { sendMail, emailHtml } = require("../config/mail")
const { assertRequired, requiredShipmentFields, shipmentPayload, statusLabels, enumStatus } = require("../utils/helpers")
const { serializeShipment, normalizeLabel } = require("../utils/serializers")
const { uniqueTrackingNumber } = require("../utils/tracking")

async function listShipments(req, res, next) {
  try {
    const q = String(req.query.q || "")
    const shipments = await prisma.shipment.findMany({
      where: q ? { trackingNumber: { contains: q, mode: "insensitive" } } : undefined,
      orderBy: { createdAt: "desc" },
    })
    res.json(shipments.map(serializeShipment))
  } catch (err) {
    next(err)
  }
}

async function createShipment(req, res, next) {
  try {
    assertRequired(req.body, requiredShipmentFields)
    const trackingNumber = await uniqueTrackingNumber()
    const uploaded = req.file ? await uploadToCloudinary(req.file, "federalogistic/shipments") : null
    const shipment = await prisma.shipment.create({
      data: shipmentPayload(req.body, uploaded?.secure_url || null, trackingNumber),
    })
    const serialized = serializeShipment(shipment)

    const html = emailHtml({
      title: "Your Shipment is Confirmed",
      preheader: `Tracking number: ${trackingNumber}`,
      body: `
        <p style="margin:0 0 16px;color:#475569;font-size:15px;line-height:1.7;">Dear <strong style="color:#1e293b;">${req.body.receiverName}</strong>,</p>
        <p style="margin:0 0 24px;color:#475569;font-size:15px;line-height:1.7;">Your shipment has been registered. Use the tracking number below to monitor your package status.</p>
        <div style="background:#f0f6ff;border:2px dashed #2459d8;border-radius:12px;padding:24px;text-align:center;margin:24px 0;">
          <p style="margin:0 0 6px;color:#2459d8;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;">Tracking Number</p>
          <p style="margin:0;color:#1e293b;font-size:28px;font-weight:800;letter-spacing:0.04em;">${trackingNumber}</p>
        </div>
        <table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;">
          ${[
            ["From", req.body.originLocation],
            ["To", req.body.destinationLocation],
            [
              "Expected Delivery",
              req.body.expectedDeliveryDate
                ? new Date(req.body.expectedDeliveryDate).toLocaleDateString("en-US", {
                    weekday: "long", year: "numeric", month: "long", day: "numeric",
                  })
                : "TBD",
            ],
            ["Status", req.body.currentStatus || "Order Confirmed"],
          ]
            .map(
              ([label, value]) => `
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;width:140px;">
                <span style="color:#64748b;font-size:13px;font-weight:600;">${label}</span>
              </td>
              <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;">
                <span style="color:#1e293b;font-size:13px;font-weight:700;">${value || "—"}</span>
              </td>
            </tr>`,
            )
            .join("")}
        </table>
        <div style="text-align:center;margin:28px 0 0;">
          <a href="${process.env.CLIENT_URL || "http://localhost:3000"}/trackingresult?tracking=${encodeURIComponent(trackingNumber)}" style="display:inline-block;background:linear-gradient(135deg,#2459d8,#1a3faf);color:#ffffff;font-size:15px;font-weight:700;padding:14px 36px;border-radius:10px;text-decoration:none;">Track My Shipment</a>
        </div>
      `,
    })

    sendMail({ to: req.body.receiverEmail, subject: `Shipment Confirmed — Tracking #${trackingNumber}`, html }).catch(console.error)
    res.status(201).json(serialized)
  } catch (err) {
    next(err)
  }
}

async function updateShipment(req, res, next) {
  try {
    assertRequired(req.body, requiredShipmentFields)
    const existing = await prisma.shipment.findUnique({ where: { id: req.params.id } })
    if (!existing) return res.status(404).json({ message: "Shipment not found" })

    const currentStatus = enumStatus(req.body.currentStatus)
    const isOnHold = req.body.isOnHold === "true" || req.body.isOnHold === true

    // Auto-reset paymentStatus to UNPAID when admin sets a new clearanceCost after a previous payment was approved
    const existingClearance = existing.clearanceCost ? Number(existing.clearanceCost) : 0
    const newClearance = req.body.clearanceCost ? Number(req.body.clearanceCost) : 0
    if (newClearance > 0 && newClearance !== existingClearance && existing.paymentStatus === "PAID") {
      req.body.paymentStatus = "unpaid"
    }
    const wasOnHold = existing.isOnHold || false

    const existingHistory = Array.isArray(existing.history) ? existing.history : []
    const entryDate = req.body.milestoneDate
      ? new Date(req.body.milestoneDate).toISOString()
      : new Date().toISOString()
    const entryLocation = req.body.currentLocation || req.body.originLocation
    const addTransitMilestone = req.body.addTransitMilestone === "true" || req.body.addTransitMilestone === true
    const addOnTheWayMilestone = req.body.addOnTheWayMilestone === "true" || req.body.addOnTheWayMilestone === true
    const extraNote = req.body.comment || ""

    // Collect history entries for this save (each action gets its own entry)
    const newEntries = []
    if (wasOnHold !== isOnHold) {
      newEntries.push({
        date: entryDate,
        status: isOnHold ? "On Hold" : "Hold Released",
        location: entryLocation,
        description: isOnHold
          ? `Package placed on hold.${extraNote ? " " + extraNote : ""}`
          : `Hold released.${extraNote ? " " + extraNote : ""}`,
      })
    }
    if (addTransitMilestone) {
      newEntries.push({
        date: entryDate,
        status: "In Transit",
        location: entryLocation,
        description: `In transit update.${extraNote ? " " + extraNote : ""}`,
      })
    }
    if (addOnTheWayMilestone) {
      newEntries.push({
        date: entryDate,
        status: "On the Way",
        location: entryLocation,
        description: `Package is on the way.${extraNote ? " " + extraNote : ""}`,
      })
    }
    if (newEntries.length === 0) {
      newEntries.push({
        date: entryDate,
        status: statusLabels[currentStatus],
        location: entryLocation,
        description: extraNote || `Shipment status updated to ${statusLabels[currentStatus]}.`,
      })
    }
    const newHistory = [...existingHistory, ...newEntries]

    // holdReleased becomes true once a hold has been released
    const holdReleased = !isOnHold && (wasOnHold || existing.holdReleased)
    req.body.holdReleased = holdReleased ? "true" : "false"

    const standardLabels = ["Order Confirmed", "Package received by Federalogistic", "Out for Delivery", "Custom Hold", "Delivered"]
    const standardOrder = ["ORDER_CONFIRMED", "PICKED_BY_COURIER", "ON_THE_WAY", "CUSTOM_HOLD", "DELIVERED"]
    const currentStatusIdx = standardOrder.indexOf(currentStatus)

    const existingProgressArr = Array.isArray(existing.progress) ? existing.progress : []
    let baseProgress =
      existingProgressArr.length > 0
        ? existingProgressArr.map((s) => ({ ...s, step: normalizeLabel(s.step) }))
        : standardLabels.map((step) => ({ step }))

    // Advance dates on standard steps that are now reached
    baseProgress = baseProgress.map((step) => {
      if (step.type && step.type !== "standard") return step
      const idx = standardLabels.indexOf(step.step)
      if (idx !== -1 && idx <= currentStatusIdx && !step.date) {
        return { ...step, date: entryDate }
      }
      return step
    })

    const currentStatusLabel = statusLabels[currentStatus]

    // Insert a new stage immediately after the current standard status step,
    // but also after any custom stages already sitting between it and the next standard step.
    function insertAfterCurrentStatus(progress, newStage) {
      let targetIdx = -1
      for (let i = 0; i < progress.length; i++) {
        if (progress[i].step === currentStatusLabel) { targetIdx = i; break }
      }
      if (targetIdx === -1) {
        for (let i = 0; i < progress.length; i++) {
          if (!progress[i].type && progress[i].date) targetIdx = i
        }
      }
      while (
        targetIdx + 1 < progress.length &&
        progress[targetIdx + 1].type &&
        progress[targetIdx + 1].type !== "standard"
      ) {
        targetIdx++
      }
      const pos = Math.max(0, targetIdx + 1)
      return [...progress.slice(0, pos), newStage, ...progress.slice(pos)]
    }

    if (wasOnHold !== isOnHold) {
      if (isOnHold) {
        baseProgress = insertAfterCurrentStatus(baseProgress, { step: "On Hold", type: "stop", date: entryDate })
      } else {
        baseProgress = baseProgress.map((s) =>
          s.type === "stop" && !s.released
            ? { ...s, step: "Completed", type: "stop_released", released: true }
            : s,
        )
      }
    }

    if (addTransitMilestone) {
      baseProgress = insertAfterCurrentStatus(baseProgress, { step: "In Transit Update", type: "transit", date: entryDate })
    }
    if (addOnTheWayMilestone) {
      baseProgress = insertAfterCurrentStatus(baseProgress, { step: "On the Way", type: "transit", date: entryDate })
    }

    const uploaded = req.file ? await uploadToCloudinary(req.file, "federalogistic/shipments") : null
    const shipment = await prisma.shipment.update({
      where: { id: req.params.id },
      data: shipmentPayload(req.body, uploaded?.secure_url || existing.itemImageUrl, null, newHistory, baseProgress),
    })
    res.json(serializeShipment(shipment))
  } catch (err) {
    next(err)
  }
}

async function patchProgress(req, res, next) {
  try {
    const value = parseInt(req.body.deliveryProgress)
    if (isNaN(value) || value < 0 || value > 100) {
      return res.status(400).json({ message: "deliveryProgress must be an integer between 0 and 100" })
    }
    const shipment = await prisma.shipment.update({
      where: { id: req.params.id },
      data: { deliveryProgress: value },
    })
    res.json(serializeShipment(shipment))
  } catch (err) {
    next(err)
  }
}

async function trackShipment(req, res, next) {
  try {
    const shipment = await prisma.shipment.findUnique({ where: { trackingNumber: req.params.trackingNumber } })
    if (!shipment) return res.status(404).json({ message: "Shipment not found" })
    res.json(serializeShipment(shipment))
  } catch (err) {
    next(err)
  }
}

module.exports = { listShipments, createShipment, updateShipment, patchProgress, trackShipment }
