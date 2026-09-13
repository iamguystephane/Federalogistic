import type { TrackingResult } from "../data/trackingResult"
import { emptyForm, CURRENCIES } from "./constants"
import type { ShipmentForm } from "./types"

function currencyOption(code?: string): string {
  if (!code) return "USD - US Dollar"
  const match = CURRENCIES.find((c) => c.code === code)
  return match ? `${match.code} - ${match.name}` : `${code} - ${code}`
}

export function buildFormData(form: ShipmentForm, image?: File | null) {
  const data = new FormData()
  Object.entries(form).forEach(([k, v]) => data.append(k, v))
  if (image) data.append("itemImage", image)
  return data
}

export function shipmentToForm(data: TrackingResult): ShipmentForm {
  const raw = data.raw as Partial<Record<string, string | number | null>> | undefined
  const cleanDate = (v?: string) => (v ? v.slice(0, 16) : "")
  return {
    ...emptyForm,
    senderName: data.sender.name,
    senderEmail: data.sender.email || "",
    senderPhone: data.sender.phone,
    senderAddress: data.sender.address,
    receiverName: data.receiver.name,
    receiverEmail: data.receiver.email,
    receiverPhone: data.receiver.phone,
    receiverAddress: data.receiver.address,
    originLocation: data.mapRoute.origin.label,
    originLat: String(data.mapRoute.origin.lat),
    originLng: String(data.mapRoute.origin.lng),
    currentLocation: data.mapRoute.waypoint?.label || data.statusInfo.location || "",
    currentLat: data.mapRoute.waypoint ? String(data.mapRoute.waypoint.lat) : "",
    currentLng: data.mapRoute.waypoint ? String(data.mapRoute.waypoint.lng) : "",
    destinationLocation: data.mapRoute.destination.label,
    destinationLat: String(data.mapRoute.destination.lat),
    destinationLng: String(data.mapRoute.destination.lng),
    currentStatus: data.currentStatus,
    packageType: data.shipment.packageType || data.parcel.packageType || "",
    shipmentType: data.shipment.type,
    weight: data.shipment.weight,
    itemDescription: data.shipment.itemDescription || "",
    dateShipped: cleanDate((raw?.dateShipped as string) || data.parcel.dateShipped),
    pickupDate: cleanDate((raw?.pickupDate as string) || data.parcel.pickupDate),
    expectedDeliveryDate: cleanDate((raw?.expectedDeliveryDate as string) || data.parcel.expectedDelivery),
    shippingCost: String(data.parcel.shippingCost || data.shipment.shippingCost || ""),
    clearanceCost: String(data.parcel.clearanceFee || ""),
    totalCost: String(data.parcel.totalCost || data.shipment.totalCost || ""),
    paymentStatus: (data.parcel.paymentStatus || "unpaid").toLowerCase(),
    currency: currencyOption(data.parcel.currency),
    deliveryMode: data.parcel.deliveryMode || data.shipment.type,
    comment: "",
    isOnHold: data.isOnHold ? "true" : "false",
    addTransitMilestone: "false",
    addOnTheWayMilestone: "false",
    milestoneDate: "",
  }
}
