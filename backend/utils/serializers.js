const { makeProgress, makeHistory, statusLabels } = require("./helpers")

// Rename old stored labels to new ones without a DB migration
const labelAliases = {
  "Picked by Courier":               "Package received by Federalogistic",
  "Package received by Priorityups": "Package received by Federalogistic",
  "Package received by PriorityUPS": "Package received by Federalogistic",
  "On The Way":                      "Out for Delivery",
}

function normalizeLabel(label) {
  return labelAliases[label] || label
}

function serializeShipment(shipment) {
  const labelStatus = statusLabels[shipment.currentStatus]
  const paymentLabel = shipment.paymentStatus.charAt(0) + shipment.paymentStatus.slice(1).toLowerCase()
  const imageUrl = shipment.itemImageUrl || undefined
  const progress = (Array.isArray(shipment.progress)
    ? shipment.progress
    : makeProgress(shipment.currentStatus, shipment.dateShipped?.toISOString())
  ).map((stage) => ({ ...stage, step: normalizeLabel(stage.step) }))
  const history = (Array.isArray(shipment.history)
    ? shipment.history
    : makeHistory(shipment, shipment.currentStatus)
  ).map((entry) => ({ ...entry, status: normalizeLabel(entry.status) }))

  return {
    id: shipment.id,
    trackingNumber: shipment.trackingNumber,
    currentStatus: labelStatus,
    isOnHold: shipment.isOnHold || false,
    holdReleased: shipment.holdReleased || false,
    deliveryProgress: shipment.deliveryProgress ?? 0,
    lastUpdated: shipment.updatedAt.toISOString(),
    verified: true,
    sender: {
      name: shipment.senderName,
      address: shipment.senderAddress,
      phone: shipment.senderPhone || "",
      email: shipment.senderEmail || "",
    },
    receiver: {
      name: shipment.receiverName,
      address: shipment.receiverAddress,
      phone: shipment.receiverPhone || "",
      email: shipment.receiverEmail,
    },
    shipment: {
      weight: shipment.weight || "",
      type: shipment.shipmentType || shipment.deliveryMode || "",
      shippedDate: shipment.dateShipped?.toISOString() || "",
      packageType: shipment.packageType || "",
      itemDescription: shipment.itemDescription || "",
      shippingCost: shipment.shippingCost?.toString() || "",
      totalCost: shipment.totalCost?.toString() || "",
    },
    statusInfo: { status: labelStatus, location: shipment.currentLocation || shipment.originLocation },
    progress,
    history,
    parcel: {
      dutyFees: paymentLabel === "Paid" ? "Paid" : "Unpaid",
      paymentStatus: paymentLabel,
      weight: shipment.weight || "",
      pickupDate: shipment.pickupDate?.toISOString() || "",
      expectedDelivery: shipment.expectedDeliveryDate?.toISOString() || "",
      deliveryMode: shipment.deliveryMode || shipment.shipmentType || "",
      // Only expose pending clearance fee — hide once paid
      currency: shipment.currency || "USD",
      clearanceFee:
        shipment.paymentStatus !== "PAID" && Number(shipment.clearanceCost) > 0
          ? Number(shipment.clearanceCost)
          : undefined,
      shippingCost: shipment.shippingCost ? Number(shipment.shippingCost) : undefined,
      totalCost: shipment.totalCost ? Number(shipment.totalCost) : undefined,
      itemImageUrl: imageUrl,
      packageType: shipment.packageType || "",
      dateShipped: shipment.dateShipped?.toISOString() || "",
      paymentHistory: Array.isArray(shipment.paymentHistory) ? shipment.paymentHistory : [],
    },
    mapRoute: {
      origin: { lat: shipment.originLat, lng: shipment.originLng, label: shipment.originLocation },
      waypoint:
        shipment.currentLat && shipment.currentLng
          ? { lat: shipment.currentLat, lng: shipment.currentLng, label: shipment.currentLocation || "Current Location" }
          : undefined,
      destination: { lat: shipment.destinationLat, lng: shipment.destinationLng, label: shipment.destinationLocation },
    },
    raw: shipment,
  }
}

function serializeDeposit(deposit) {
  return {
    id: deposit.id,
    trackingNumber: deposit.trackingNumber,
    recipientName: deposit.recipientName,
    recipientEmail: deposit.recipientEmail,
    method: deposit.method,
    transactionId: deposit.transactionId,
    amount: Number(deposit.amount),
    proofUrl: deposit.proofUrl,
    status: deposit.status,
    note: deposit.note || "",
    createdAt: deposit.createdAt.toISOString(),
    updatedAt: deposit.updatedAt.toISOString(),
    shipment: deposit.shipment ? serializeShipment(deposit.shipment) : undefined,
  }
}

module.exports = { serializeShipment, serializeDeposit, normalizeLabel }
