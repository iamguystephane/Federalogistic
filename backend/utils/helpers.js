const { PaymentStatus } = require("@prisma/client")

const statusMap = {
  "Order Confirmed": "ORDER_CONFIRMED",
  "Package received by Federalogistic": "PICKED_BY_COURIER",
  "Out for Delivery": "ON_THE_WAY",
  "Custom Hold": "CUSTOM_HOLD",
  Delivered: "DELIVERED",
}

const statusLabels = {
  ORDER_CONFIRMED: "Order Confirmed",
  PICKED_BY_COURIER: "Package received by Federalogistic",
  ON_THE_WAY: "Out for Delivery",
  CUSTOM_HOLD: "Custom Hold",
  DELIVERED: "Delivered",
}

function toDate(value) {
  return value ? new Date(value) : null
}

function toDecimal(value) {
  if (value === undefined || value === null || value === "") return null
  return Number(value)
}

function assertRequired(body, fields) {
  const missing = fields.filter(
    (field) => body[field] === undefined || body[field] === null || String(body[field]).trim() === "",
  )
  if (missing.length) {
    const readable = missing.map((field) => field.replace(/([A-Z])/g, " $1").toLowerCase()).join(", ")
    const error = new Error(`Please fill every field. Missing: ${readable}`)
    error.status = 400
    throw error
  }
}

function enumStatus(value) {
  return statusMap[value] || value || "ORDER_CONFIRMED"
}

function enumPayment(value) {
  const normalized = String(value || "UNPAID").toUpperCase()
  return PaymentStatus[normalized] ? normalized : "UNPAID"
}

function makeProgress(currentStatus, dateShipped) {
  const order = ["ORDER_CONFIRMED", "PICKED_BY_COURIER", "ON_THE_WAY", "CUSTOM_HOLD", "DELIVERED"]
  const currentIndex = order.indexOf(currentStatus)
  return order.map((status, index) => ({
    step: statusLabels[status],
    date: index <= currentIndex ? dateShipped || new Date().toISOString() : undefined,
  }))
}

function makeHistory(body, currentStatus) {
  return [
    {
      date: new Date().toISOString(),
      status: statusLabels[currentStatus],
      location: body.currentLocation || body.originLocation,
      description: body.comment || `Shipment status updated to ${statusLabels[currentStatus]}.`,
    },
  ]
}

const requiredShipmentFields = [
  "senderName", "senderEmail", "senderPhone", "senderAddress",
  "receiverName", "receiverEmail", "receiverPhone", "receiverAddress",
  "originLocation", "originLat", "originLng",
  "destinationLocation", "destinationLat", "destinationLng",
  "currentStatus", "packageType", "shipmentType", "weight", "itemDescription",
  "dateShipped", "pickupDate", "expectedDeliveryDate",
  "shippingCost", "clearanceCost", "totalCost",
  "paymentStatus", "deliveryMode", "comment",
]

function shipmentPayload(body, imageUrl, trackingNumber, historyOverride = null, progressOverride = null) {
  const currentStatus = enumStatus(body.currentStatus)
  const dateShipped = toDate(body.dateShipped)
  const milestoneDate = body.milestoneDate ? new Date(body.milestoneDate).toISOString() : null
  const progress = progressOverride ?? makeProgress(currentStatus, milestoneDate || dateShipped?.toISOString())
  const history = historyOverride ?? makeHistory(body, currentStatus)

  return {
    ...(trackingNumber ? { trackingNumber } : {}),
    senderName: body.senderName,
    senderEmail: body.senderEmail || null,
    senderPhone: body.senderPhone || null,
    senderAddress: body.senderAddress,
    receiverName: body.receiverName,
    receiverEmail: body.receiverEmail,
    receiverPhone: body.receiverPhone || null,
    receiverAddress: body.receiverAddress,
    originLocation: body.originLocation,
    originLat: Number(body.originLat || 0),
    originLng: Number(body.originLng || 0),
    currentLocation: body.currentLocation || null,
    currentLat: body.currentLat ? Number(body.currentLat) : null,
    currentLng: body.currentLng ? Number(body.currentLng) : null,
    destinationLocation: body.destinationLocation,
    destinationLat: Number(body.destinationLat || 0),
    destinationLng: Number(body.destinationLng || 0),
    currentStatus,
    packageType: body.packageType || null,
    shipmentType: body.shipmentType || null,
    weight: body.weight || null,
    itemDescription: body.itemDescription || null,
    itemImageUrl: imageUrl || body.itemImageUrl || null,
    dateShipped,
    pickupDate: toDate(body.pickupDate),
    expectedDeliveryDate: toDate(body.expectedDeliveryDate),
    shippingCost: toDecimal(body.shippingCost),
    clearanceCost: toDecimal(body.clearanceCost),
    totalCost: toDecimal(body.totalCost),
    paymentStatus: enumPayment(body.paymentStatus),
    deliveryMode: body.deliveryMode || body.shipmentType || null,
    comment: body.comment || null,
    currency: (body.currency || "USD").split(" - ")[0].trim() || "USD",
    isOnHold: body.isOnHold === "true" || body.isOnHold === true,
    holdReleased: body.holdReleased === "true" || body.holdReleased === true,
    deliveryProgress: body.deliveryProgress !== undefined ? parseInt(body.deliveryProgress) || 0 : undefined,
    progress,
    history,
  }
}

module.exports = {
  statusMap,
  statusLabels,
  toDate,
  toDecimal,
  assertRequired,
  enumStatus,
  enumPayment,
  makeProgress,
  makeHistory,
  requiredShipmentFields,
  shipmentPayload,
}
