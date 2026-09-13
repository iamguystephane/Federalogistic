export type ShipmentStatus =
  | "Order Confirmed"
  | "Package received by Federalogistic"
  | "Out for Delivery"
  | "Custom Hold"
  | "Delivered"

export type ProgressStageType = "standard" | "stop" | "stop_released" | "transit"

export type ProgressStage = {
  step: string
  date?: string
  type?: ProgressStageType
  released?: boolean
}

export type TrackingResult = {
  id?: string
  trackingNumber: string
  currentStatus: ShipmentStatus
  isOnHold?: boolean
  holdReleased?: boolean
  lastUpdated: string
  verified: boolean
  deliveryProgress?: number
  sender: { name: string; address: string; phone: string; email?: string }
  receiver: { name: string; address: string; phone: string; email: string }
  shipment: {
    weight: string
    type: string
    shippedDate: string
    packageType?: string
    itemDescription?: string
    shippingCost?: string
    totalCost?: string
  }
  statusInfo: { status: ShipmentStatus; location: string }
  progress: ProgressStage[]
  history: Array<{ date: string; status: string; location?: string; description: string }>
  parcel: {
    dutyFees: "Paid" | "Unpaid"
    weight: string
    pickupDate: string
    expectedDelivery: string
    deliveryMode: string
    currency?: string
    clearanceFee?: number
    shippingCost?: number
    totalCost?: number
    paymentStatus?: string
    itemImageUrl?: string
    packageType?: string
    dateShipped?: string
    paymentHistory?: Array<{ amount: number; method: string; transactionId: string; date: string; approvedAt: string }>
  }
  mapRoute: {
    origin: { lat: number; lng: number; label: string }
    waypoint?: { lat: number; lng: number; label: string }
    destination: { lat: number; lng: number; label: string }
  }
  raw?: unknown
}

export function getStatusBadgeClass(status: ShipmentStatus): string {
  switch (status) {
    case "Custom Hold":
      return "bg-orange-100 text-orange-700"
    case "Out for Delivery":
      return "bg-blue-100 text-blue-700"
    case "Order Confirmed":
      return "bg-blue-100 text-blue-700"
    case "Package received by Federalogistic":
      return "bg-slate-100 text-slate-600"
    case "Delivered":
      return "bg-green-100 text-green-700"
  }
}

// Returns the most recently reached stage, including custom ones (On Hold, In Transit, On the Way)
export function getActiveStatus(data: TrackingResult): string {
  const progress = data.progress
  if (!Array.isArray(progress) || progress.length === 0) return data.currentStatus

  // An unreleased hold takes highest priority
  const activeStop = progress.find((s) => s.type === "stop" && !s.released)
  if (activeStop) return activeStop.step

  // Walk forward and track the last stage that has a date
  let lastActive: string | null = null
  for (const stage of progress) {
    if (stage.date) lastActive = stage.step
  }
  return lastActive || data.currentStatus
}

// Badge class for any active status, including custom stages
export function getActiveBadgeClass(activeStatus: string): string {
  if (activeStatus === "On Hold") return "bg-red-100 text-red-700"
  if (activeStatus === "In Transit Update" || activeStatus === "On the Way")
    return "bg-blue-100 text-blue-700"
  return getStatusBadgeClass(activeStatus as ShipmentStatus) ?? "bg-slate-100 text-slate-600"
}

// Short label for space-constrained displays
export function getShortStatus(status: string): string {
  if (status === "Package received by Federalogistic") return "Package Received"
  return status
}

export const mockTrackingResult: TrackingResult = {
  trackingNumber: "PL-2731-PZ7K4VHR",
  currentStatus: "Custom Hold",
  lastUpdated: "Jan 28, 2026 - 11:07 PM",
  verified: true,
  deliveryProgress: 0,
  sender: {
    name: "Toshiharu kishi",
    address: "Tokyo, Higashihiroshima-shi, Hiroshima, Japan",
    phone: "819084285410",
  },
  receiver: {
    name: "Jacob Dahdah",
    address: "19 lady Nelson way keilor downs Vic 3038",
    phone: "0424616564",
    email: "jdahdah11@gmail.com",
  },
  shipment: {
    weight: "25 kg",
    type: "Air Freight",
    shippedDate: "Jan 26, 2026",
  },
  statusInfo: {
    status: "Custom Hold",
    location: "Australia",
  },
  progress: [
    { step: "Order Confirmed", date: "Jan 26, 2026" },
    { step: "Package received by Federalogistic" },
    { step: "Out for Delivery", date: "Jan 28, 2026" },
    { step: "Custom Hold", date: "Jan 28, 2026" },
    { step: "Delivered" },
  ],
  history: [
    {
      date: "Jan 28, 2026 - 11:07 PM",
      status: "Custom Hold",
      description:
        "PACKAGE HAS ARRIVED AUSTRALIA AND IT IS ON HOLD AT THE AUSTRALIAN CUSTOMS AUTHORITIES",
    },
    {
      date: "Jan 28, 2026 - 05:05 AM",
      status: "Out for Delivery",
      location: "Japan international airport",
      description: "PACKAGE IS IN GOOD CONDITION AND OUT FOR DELIVERY IN AUSTRALIA",
    },
    {
      date: "Jan 25, 2026 - 11:45 PM",
      status: "Order Confirmed",
      description: "Your shipment has been confirmed and is being processed.",
    },
  ],
  parcel: {
    dutyFees: "Paid",
    weight: "25 kg",
    pickupDate: "Jan 26, 2026 - 05:25 AM",
    expectedDelivery: "Jan 29, 2026 - 05:26 AM",
    deliveryMode: "Air Freight",
    clearanceFee: 1800,
  },
  mapRoute: {
    origin: { lat: 34.6937, lng: 135.5023, label: "Osaka, Japan" },
    waypoint: { lat: -25.2744, lng: 133.7751, label: "Australia Customs" },
    destination: { lat: -37.8136, lng: 144.9631, label: "Melbourne, Australia" },
  },
}
