const prisma = require("../prisma")

function makeTrackingNumber() {
  const number = Math.floor(1000 + Math.random() * 9000)
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  let suffix = ""
  for (let i = 0; i < 8; i += 1) suffix += chars[Math.floor(Math.random() * chars.length)]
  return `PL-${number}-${suffix}`
}

async function uniqueTrackingNumber() {
  for (let i = 0; i < 8; i += 1) {
    const trackingNumber = makeTrackingNumber()
    const existing = await prisma.shipment.findUnique({ where: { trackingNumber } })
    if (!existing) return trackingNumber
  }
  return makeTrackingNumber()
}

module.exports = { makeTrackingNumber, uniqueTrackingNumber }
