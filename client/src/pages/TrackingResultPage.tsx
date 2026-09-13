import { useEffect, useState } from "react"
import { AlertTriangle, CheckCircle2, Clock } from "lucide-react"
import type { TrackingResult } from "../data/trackingResult"
import { getPaymentStatus } from "../lib/paymentStorage"
import { apiJson } from "../lib/api"
import { rememberTrackingNumber, trackingFromUrl } from "../lib/tracking"
import { TrackingPageHeader } from "../components/tracking/TrackingPageHeader"
import { TrackingNumberBanner } from "../components/tracking/TrackingNumberBanner"
import { ShipmentInfoCards } from "../components/tracking/ShipmentInfoCards"
import { ShipmentProgress } from "../components/tracking/ShipmentProgress"
import { DeliveryProgressBar } from "../components/tracking/DeliveryProgressBar"
import { ShipmentHistory } from "../components/tracking/ShipmentHistory"
import { ShipmentMap } from "../components/tracking/ShipmentMap"
import { ParcelInformation } from "../components/tracking/ParcelInformation"
import { TrackFormSection } from "../components/sections/TrackFormSection"

function PaymentBanner({ trackingNumber }: { trackingNumber: string }) {
  const status = getPaymentStatus(trackingNumber)
  if (!status) return null

  if (status === "pending") {
    return (
      <div className="mx-auto max-w-[1200px] px-5 pt-4">
        <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-3.5">
          <Clock className="h-5 w-5 shrink-0 text-amber-600" />
          <p className="text-[0.98rem] font-semibold text-amber-700">
            Your clearance payment is pending verification. We'll notify you once the admin confirms your payment.
          </p>
          <a href={`/deposits?tracking=${encodeURIComponent(trackingNumber)}`} className="ml-auto shrink-0 text-[0.92rem] font-bold text-amber-700 underline">View Status</a>
        </div>
      </div>
    )
  }
  if (status === "approved") {
    return (
      <div className="mx-auto max-w-[1200px] px-5 pt-4">
        <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-5 py-3.5">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />
          <p className="text-[0.98rem] font-semibold text-green-700">
            Your clearance payment has been approved. Your shipment has been released and is proceeding to delivery.
          </p>
        </div>
      </div>
    )
  }
  if (status === "declined") {
    return (
      <div className="mx-auto max-w-[1200px] px-5 pt-4">
        <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-3.5">
          <AlertTriangle className="h-5 w-5 shrink-0 text-red-600" />
          <p className="text-[0.98rem] font-semibold text-red-700">
            Your clearance payment was declined. Please try again with the correct payment details.
          </p>
          <a href={`/deposits?tracking=${encodeURIComponent(trackingNumber)}`} className="ml-auto shrink-0 text-[0.92rem] font-bold text-red-700 underline">Retry Payment</a>
        </div>
      </div>
    )
  }
  return null
}

export function TrackingResultPage() {
  const [data, setData] = useState<TrackingResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const trackingNumber = trackingFromUrl()

  useEffect(() => {
    if (!trackingNumber) return

    setLoading(true)
    setError("")
    apiJson<TrackingResult>(`/api/shipments/${encodeURIComponent(trackingNumber)}`)
      .then((shipment) => {
        rememberTrackingNumber(shipment.trackingNumber)
        setData(shipment)
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Shipment not found"))
      .finally(() => setLoading(false))
  }, [trackingNumber])

  if (!trackingNumber || (!data && !loading)) {
    return (
      <div className="min-h-screen bg-[#f8fafc]">
        <TrackingPageHeader />
        {error && <div className="mx-auto max-w-[1200px] px-5 pt-4 text-[0.95rem] font-bold text-red-600">{error}</div>}
        <TrackFormSection />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <TrackingPageHeader />
      {loading && <div className="mx-auto max-w-[1200px] px-5 py-4 text-[0.95rem] font-bold text-blue-700">Loading shipment...</div>}
      {error && <div className="mx-auto max-w-[1200px] px-5 py-4 text-[0.95rem] font-bold text-red-600">{error}</div>}
      {data && (
        <>
      <PaymentBanner trackingNumber={data.trackingNumber} />
      <TrackingNumberBanner data={data} />
      <ShipmentInfoCards data={data} />
      <ShipmentProgress data={data} />
      <DeliveryProgressBar data={data} />

      {/* History + Map side by side */}
      <div className="mx-auto max-w-[1200px] px-5 pb-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr] lg:items-stretch">
          <ShipmentHistory data={data} />
          <ShipmentMap data={data} />
        </div>
      </div>

      <ParcelInformation data={data} />
        </>
      )}
    </div>
  )
}
