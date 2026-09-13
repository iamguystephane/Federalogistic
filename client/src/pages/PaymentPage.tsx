import { useEffect, useState } from "react"
import { Bitcoin, Building2, CreditCard, Landmark, ShieldCheck, Smartphone, ArrowLeftRight, type LucideIcon } from "lucide-react"
import { Button } from "../components/ui/button"
import { TrackFormSection } from "../components/sections/TrackFormSection"
import { apiJson } from "../lib/api"
import { rememberedTrackingNumber, rememberTrackingNumber, trackingFromUrl } from "../lib/tracking"
import type { TrackingResult } from "../data/trackingResult"
import { formatMoney } from "../lib/utils"

type ApiPaymentMethod = {
  id: string
  name: string
  type: string
  details: Record<string, string>
  isVisible: boolean
}

function methodIcon(type: string): LucideIcon {
  switch (type) {
    case "crypto": return Bitcoin
    case "bank_transfer": return Landmark
    case "mobile_money": return Smartphone
    case "wire_transfer": return ArrowLeftRight
    case "other": return Building2
    default: return CreditCard
  }
}

export function PaymentPage() {
  const [apiMethods, setApiMethods] = useState<ApiPaymentMethod[]>([])
  const [method, setMethod] = useState("")
  const [data, setData] = useState<TrackingResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const trackingNumber = trackingFromUrl() || rememberedTrackingNumber()

  useEffect(() => {
    apiJson<ApiPaymentMethod[]>("/api/public/payment-methods")
      .then((methods) => {
        setApiMethods(methods)
        if (methods.length > 0) setMethod(methods[0].id)
      })
      .catch(() => undefined)
  }, [])

  useEffect(() => {
    if (!trackingNumber) return
    setLoading(true)
    setError("")
    apiJson<TrackingResult>(`/api/shipments/${encodeURIComponent(trackingNumber)}`)
      .then((shipment) => {
        setData(shipment)
        rememberTrackingNumber(shipment.trackingNumber)
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Shipment not found"))
      .finally(() => setLoading(false))
  }, [trackingNumber])

  if (!trackingNumber || (!data && !loading)) {
    return (
      <div className="bg-[#f8fafc]">
        <section className="relative bg-gradient-to-br from-[#2459d8] to-[#1a3faf] pb-20 pt-16 text-center text-white">
          <h1 className="text-[2.3rem] font-extrabold">Shipment Clearance Payment</h1>
          <p className="mx-auto mt-3 max-w-[560px] px-5 text-white/85">Enter a tracking number before opening payment.</p>
        </section>
        {error && <div className="mx-auto max-w-[1200px] px-5 pt-5 text-sm font-bold text-red-600">{error}</div>}
        <TrackFormSection />
      </div>
    )
  }

  const clearanceFee = data?.parcel.clearanceFee ?? data?.parcel.totalCost ?? 0

  return (
    <div className="bg-white">
      <section className="relative bg-gradient-to-br from-[#2459d8] to-[#1a3faf] pb-24 pt-16 text-center text-white">
        <div className="px-5">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-1.5 text-sm font-semibold">
            <ShieldCheck className="h-4 w-4" />
            Secure Payment Gateway
          </div>
          <h1 className="text-[2.4rem] font-extrabold leading-tight">Shipment Clearance Payment</h1>
          <p className="mx-auto mt-4 max-w-[560px] text-[1rem] leading-relaxed text-white/85">
            Complete payment for tracking number {data?.trackingNumber}.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[980px] px-5 py-12">
        {loading && <p className="text-sm font-bold text-blue-700">Loading shipment...</p>}
        {error && <p className="text-sm font-bold text-red-600">{error}</p>}
        {data && (
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center gap-2 border-b border-slate-100 px-6 py-4">
              <CreditCard className="h-5 w-5 text-blue-600" />
              <span className="text-[1rem] font-extrabold text-slate-900">Payment Details</span>
            </div>

            <form
              className="space-y-6 p-6"
              onSubmit={(event) => {
                event.preventDefault()
                window.location.href = `/payment?method=${encodeURIComponent(method)}&tracking=${encodeURIComponent(data.trackingNumber)}`
              }}
            >
              <div className="grid gap-4 rounded-xl border border-blue-100 bg-blue-50 p-5 sm:grid-cols-2">
                <div>
                  <p className="text-[0.72rem] font-bold uppercase tracking-wide text-blue-500">Tracking Number</p>
                  <p className="mt-1 text-lg font-extrabold text-slate-900">{data.trackingNumber}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-500">{data.receiver.name} · {data.receiver.email}</p>
                </div>
                <div className="sm:text-right">
                  <p className="text-[0.72rem] font-bold uppercase tracking-wide text-slate-500">Amount Due</p>
                  <p className="mt-1 text-3xl font-extrabold text-slate-900">
                    {formatMoney(clearanceFee, data.parcel.currency)}
                  </p>
                </div>
              </div>

              <div>
                <p className="mb-3 text-[0.9rem] font-bold text-slate-800">Select Payment Method</p>
                {apiMethods.length === 0 ? (
                  <p className="text-sm text-slate-500">No payment methods available. Contact support.</p>
                ) : (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {apiMethods.map((m) => {
                      const Icon = methodIcon(m.type)
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setMethod(m.id)}
                          className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-[0.88rem] font-semibold transition-colors ${
                            method === m.id
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-slate-200 bg-white text-slate-700 hover:border-blue-300"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{m.name}</span>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>

              <Button type="submit" className="h-12 w-full rounded-xl text-[0.95rem] font-bold">
                <ShieldCheck className="h-5 w-5" />
                Proceed to Payment
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
