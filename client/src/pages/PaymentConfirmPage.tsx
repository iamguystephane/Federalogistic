import { useEffect, useRef, useState } from "react"
import { CheckCircle2, Clock, Copy, CreditCard, ShieldCheck, UploadCloud, XCircle } from "lucide-react"
import { Button } from "../components/ui/button"
import { TrackFormSection } from "../components/sections/TrackFormSection"
import { apiForm, apiJson } from "../lib/api"
import { rememberedTrackingNumber, rememberTrackingNumber, trackingFromUrl } from "../lib/tracking"
import type { TrackingResult } from "../data/trackingResult"
import { formatMoney } from "../lib/utils"

type PaymentDeposit = {
  id: string
  trackingNumber: string
  transactionId: string
  method: string
  amount: number
  status: string
  createdAt: string
  proofUrl: string
}

type PaymentMethod = {
  id: string
  name: string
  type: string
  details: Record<string, string>
}

export function PaymentConfirmPage() {
  const [data, setData] = useState<TrackingResult | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null)
  const [proof, setProof] = useState<File | null>(null)
  const [deposit, setDeposit] = useState<PaymentDeposit | null>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const params = new URLSearchParams(window.location.search)
  const trackingNumber = trackingFromUrl() || rememberedTrackingNumber()
  const selectedMethodId = params.get("method") || ""

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

  useEffect(() => {
    if (!selectedMethodId) return
    apiJson<PaymentMethod>(`/api/public/payment-methods/${selectedMethodId}`)
      .then(setPaymentMethod)
      .catch(() => undefined)
  }, [selectedMethodId])

  function copyValue(key: string, value: string) {
    navigator.clipboard.writeText(value)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  async function submitPayment() {
    if (!data || !paymentMethod) return
    if (!proof) { setError("Please upload your payment proof receipt."); return }

    const amount = data.parcel.clearanceFee ?? data.parcel.totalCost ?? 0
    const fd = new FormData()
    fd.append("trackingNumber", data.trackingNumber)
    fd.append("recipientName", data.receiver.name)
    fd.append("recipientEmail", data.receiver.email)
    fd.append("method", paymentMethod.name)
    fd.append("transactionId", `TX-${Date.now()}`)
    fd.append("amount", String(amount))
    fd.append("proof", proof)

    setSaving(true)
    setError("")
    try {
      setDeposit(await apiForm<PaymentDeposit>("/api/payments", fd))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to submit payment proof")
    } finally {
      setSaving(false)
    }
  }

  if (!trackingNumber || (!data && !loading)) {
    return (
      <div className="bg-[#f8fafc]">
        <section className="relative bg-gradient-to-br from-[#2459d8] to-[#1a3faf] pb-20 pt-16 text-center text-white">
          <h1 className="text-[2.3rem] font-extrabold">Complete Shipment Payment</h1>
          <p className="mx-auto mt-3 max-w-[560px] px-5 text-white/85">Enter a tracking number before submitting payment proof.</p>
        </section>
        {error && <div className="mx-auto max-w-[1200px] px-5 pt-5 text-sm font-bold text-red-600">{error}</div>}
        <TrackFormSection />
      </div>
    )
  }

  const amount = data?.parcel.clearanceFee ?? data?.parcel.totalCost ?? 0
  const paymentStatus = data?.parcel.paymentStatus?.toLowerCase()

  // Success screen after submitting proof
  if (deposit && data) {
    return (
      <div className="min-h-screen bg-[#f8fafc]">
        <section className="relative bg-gradient-to-br from-[#2459d8] to-[#1a3faf] pb-20 pt-16 text-center text-white">
          <h1 className="text-[2.4rem] font-extrabold">Payment Receipt</h1>
        </section>
        <div className="mx-auto max-w-[860px] px-5 py-10">
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-5 py-3.5">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <p className="text-sm font-semibold text-green-700">Your payment proof has been submitted successfully and is pending admin review.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-6 py-5">
              <h2 className="text-[1.1rem] font-extrabold text-slate-900">Payment Details</h2>
            </div>
            <div className="grid gap-5 px-6 py-5 sm:grid-cols-2">
              {[
                { label: "Transaction ID", value: deposit.transactionId },
                { label: "Date", value: new Date(deposit.createdAt).toLocaleString() },
                { label: "Payment Method", value: deposit.method },
                { label: "Amount", value: formatMoney(deposit.amount, data.parcel.currency) },
                { label: "Tracking Number", value: data.trackingNumber },
                { label: "Recipient", value: data.receiver.name },
                { label: "Email", value: data.receiver.email },
                { label: "Status", value: deposit.status },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-[0.75rem] font-bold uppercase tracking-wider text-slate-400">{label}</p>
                  <p className="mt-0.5 text-sm font-bold text-slate-800">{value}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-100 p-6">
              <a href={deposit.proofUrl} target="_blank" rel="noreferrer" className="text-sm font-bold text-blue-600 hover:underline">
                View uploaded payment proof
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      <section className="relative bg-gradient-to-br from-[#2459d8] to-[#1a3faf] pb-20 pt-16 text-center text-white">
        <h1 className="text-[2.4rem] font-extrabold">Complete Your Shipment Payment</h1>
        <p className="mx-auto mt-4 max-w-[560px] px-5 text-white/85">Submit payment proof for {data?.trackingNumber}.</p>
      </section>

      <div className="mx-auto max-w-[980px] px-5 py-12">
        {loading && <p className="text-sm font-bold text-blue-700">Loading shipment...</p>}
        {error && <p className="mb-4 text-sm font-bold text-red-600">{error}</p>}
        {data && (
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center gap-2 border-b border-slate-100 px-6 py-4">
              <CreditCard className="h-5 w-5 text-blue-600" />
              <span className="text-[1rem] font-extrabold text-slate-900">Payment Instructions</span>
            </div>
            <div className="space-y-7 p-6">
              {/* Amount summary */}
              <div className="grid gap-4 rounded-xl border border-blue-100 bg-blue-50 p-5 sm:grid-cols-2">
                <div>
                  <p className="text-[0.72rem] font-bold uppercase tracking-wide text-blue-500">Payment For</p>
                  <p className="mt-1 text-lg font-extrabold text-slate-900">{data.trackingNumber}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-500">{data.receiver.name}</p>
                </div>
                <div className="sm:text-right">
                  <p className="text-[0.72rem] font-bold uppercase tracking-wide text-slate-500">Exact Amount</p>
                  <p className="mt-1 text-3xl font-extrabold text-slate-900">
                    {formatMoney(amount, data?.parcel.currency)}
                  </p>
                </div>
              </div>

              {/* Already paid */}
              {paymentStatus === "paid" && (
                <div className="flex items-start gap-4 rounded-xl border border-green-200 bg-green-50 p-5">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-green-600" />
                  <div>
                    <p className="text-sm font-extrabold text-green-800">Payment Confirmed</p>
                    <p className="mt-1 text-sm text-green-700">Your clearance payment has been approved. No further payment is required at this time.</p>
                  </div>
                </div>
              )}

              {/* Payment pending review */}
              {paymentStatus === "pending" && (
                <div className="flex items-start gap-4 rounded-xl border border-amber-200 bg-amber-50 p-5">
                  <Clock className="mt-0.5 h-6 w-6 shrink-0 text-amber-500" />
                  <div>
                    <p className="text-sm font-extrabold text-amber-800">Payment Under Review</p>
                    <p className="mt-1 text-sm text-amber-700">Your payment proof has been submitted and is awaiting admin review. You will be notified by email once approved.</p>
                  </div>
                </div>
              )}

              {/* Payment form — only show when unpaid */}
              {paymentStatus !== "paid" && paymentStatus !== "pending" && (
                <>
                  {/* Payment method details */}
                  {paymentMethod ? (
                    <div>
                      <p className="mb-3 text-sm font-bold text-slate-800">
                        Payment via <span className="text-[#2459d8]">{paymentMethod.name}</span>
                      </p>
                      <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                        {Object.keys(paymentMethod.details).length > 0 ? (
                          Object.entries(paymentMethod.details).map(([key, value]) => (
                            <div key={key}>
                              <p className="mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">{key}</p>
                              <div className="flex gap-2">
                                <input
                                  readOnly
                                  value={value}
                                  className="h-11 flex-1 rounded-xl border border-slate-300 bg-white px-4 font-mono text-sm outline-none"
                                />
                                <button
                                  type="button"
                                  onClick={() => copyValue(key, value)}
                                  className="flex h-11 items-center gap-2 rounded-xl bg-[#2459d8] px-4 text-sm font-bold text-white hover:bg-[#1d4bc0] transition shrink-0"
                                >
                                  <Copy className="h-4 w-4" />
                                  {copiedKey === key ? "Copied!" : "Copy"}
                                </button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-slate-500">Contact support for payment details.</p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <XCircle className="h-5 w-5 text-slate-400 shrink-0" />
                      <p className="text-sm font-semibold text-slate-600">Payment method details could not be loaded.</p>
                    </div>
                  )}

                  {/* Proof upload */}
                  <div>
                    <p className="mb-2 text-sm font-bold text-slate-800">Payment Proof Receipt</p>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-slate-300 bg-white px-6 py-10 text-center hover:border-blue-300 hover:bg-blue-50/40 transition"
                    >
                      <UploadCloud className="h-8 w-8 text-blue-500" />
                      <span className="text-sm font-bold text-slate-700">{proof ? proof.name : "Choose image receipt"}</span>
                      <span className="text-xs font-semibold text-slate-400">PNG or JPG up to 10MB</span>
                    </button>
                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => setProof(e.target.files?.[0] || null)} />
                  </div>

                  <Button disabled={saving} onClick={submitPayment} className="h-12 w-full rounded-xl text-[0.95rem] font-bold">
                    <ShieldCheck className="h-5 w-5" />
                    {saving ? "Submitting..." : "Complete Shipment Payment"}
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
