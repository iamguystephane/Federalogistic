import type { TrackingResult } from "../data/trackingResult"

export type AdminView = "dashboard" | "create" | "manage" | "deposits" | "settings"

export type PaymentDeposit = {
  id: string
  trackingNumber: string
  recipientName: string
  recipientEmail: string
  method: string
  transactionId: string
  amount: number
  proofUrl: string
  status: "PENDING" | "APPROVED" | "DECLINED"
  note: string
  createdAt: string
  shipment?: TrackingResult
}

export type PaymentMethod = {
  id: string
  name: string
  type: string
  details: Record<string, string>
  isVisible: boolean
  sortOrder: number
}

export type AdminProfile = { email: string }

export type SiteSettings = {
  contactPhone: string
  contactEmail: string
  contactAddress: string
  formDestinationEmail: string
  socialFacebook: string
  socialX: string
  socialInstagram: string
  socialTiktok: string
}

export type ShipmentForm = {
  senderName: string
  senderEmail: string
  senderPhone: string
  senderAddress: string
  receiverName: string
  receiverEmail: string
  receiverPhone: string
  receiverAddress: string
  originLocation: string
  originLat: string
  originLng: string
  currentLocation: string
  currentLat: string
  currentLng: string
  destinationLocation: string
  destinationLat: string
  destinationLng: string
  currentStatus: string
  packageType: string
  shipmentType: string
  weight: string
  itemDescription: string
  dateShipped: string
  pickupDate: string
  expectedDeliveryDate: string
  shippingCost: string
  clearanceCost: string
  totalCost: string
  paymentStatus: string
  deliveryMode: string
  comment: string
  currency: string
  isOnHold: string
  addTransitMilestone: string
  addOnTheWayMilestone: string
  milestoneDate: string
}
