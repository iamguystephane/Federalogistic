import { AlertTriangle, CheckCircle2, Clock } from "lucide-react"
import { Button } from "./ui/button"
import type { TrackingResult } from "../data/trackingResult"
import { getPaymentRecord } from "../lib/paymentStorage"
import { formatMoney } from "../lib/utils"

type Props = { status: "pending" | "declined"; data: TrackingResult; clearanceFee: number }

export function PaymentStatusGate({ status, data, clearanceFee }: Props) {
  const record = getPaymentRecord(data.trackingNumber)

  const nextSteps = [
    "Our team will verify your payment proof (usually within 24 hours)",
    "Once confirmed, your shipment clearance process will begin",
    "You'll receive an email notification with updates on your shipment status",
  ]

  if (status === "declined") {
    return (
      <>
        <section className="relative bg-gradient-to-br from-[#2459d8] to-[#1a3faf] pb-24 pt-16 text-center text-white">
          <h1 className="text-[2.4rem] font-extrabold">Payment Receipt</h1>
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            <svg viewBox="0 0 1440 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style={{ height: 100 }} className="block w-full">
              <path fill="white" d="M0,70 C250,95 480,95 700,30 C860,0 1100,50 1440,65 L1440,100 L0,100 Z" />
            </svg>
          </div>
        </section>
        <div className="min-h-screen bg-[#f8fafc] py-10">
          <div className="mx-auto max-w-[860px] px-5 space-y-5">
            <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-3.5">
              <AlertTriangle className="h-5 w-5 shrink-0 text-red-600" />
              <p className="text-[0.88rem] font-semibold text-red-700">
                Your payment was not verified. Please check your payment details and try again.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-red-100 px-3 py-1 text-[0.78rem] font-bold text-red-700">
                  Status: Declined
                </span>
                <span className="text-[0.85rem] text-slate-500">Your payment could not be verified</span>
              </div>
              <div className="border-t border-slate-100 pt-4 grid gap-y-4 gap-x-10 sm:grid-cols-2 text-[0.88rem]">
                <div><p className="text-slate-400 text-[0.75rem]">Transaction ID</p><p className="font-semibold mt-0.5">{record.txId}</p></div>
                <div><p className="text-slate-400 text-[0.75rem]">Tracking Number</p><p className="font-semibold mt-0.5">{data.trackingNumber}</p></div>
                <div><p className="text-slate-400 text-[0.75rem]">Amount</p><p className="font-semibold mt-0.5">{formatMoney(clearanceFee, data.parcel.currency)}</p></div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 pt-1">
              <Button className="h-11 rounded-xl px-6 text-sm font-semibold" onClick={() => (window.location.href = `/deposits?tracking=${encodeURIComponent(data.trackingNumber)}`)}>
                Try Payment Again
              </Button>
              <Button variant="outline" className="h-11 rounded-xl px-6 text-sm font-semibold" onClick={() => (window.location.href = `/trackingresult?tracking=${encodeURIComponent(data.trackingNumber)}`)}>
                Back to Tracking
              </Button>
            </div>
          </div>
        </div>
      </>
    )
  }

  // pending
  return (
    <>
      <section className="relative bg-gradient-to-br from-[#2459d8] to-[#1a3faf] pb-24 pt-16 text-center text-white">
        <h1 className="text-[2.4rem] font-extrabold">Payment Receipt</h1>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style={{ height: 100 }} className="block w-full">
            <path fill="white" d="M0,70 C250,95 480,95 700,30 C860,0 1100,50 1440,65 L1440,100 L0,100 Z" />
          </svg>
        </div>
      </section>

      <div className="min-h-screen bg-[#f8fafc] py-10">
        <div className="mx-auto max-w-[860px] px-5 space-y-5">

          <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-5 py-3.5">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />
            <p className="text-[0.88rem] font-semibold text-green-700">
              Your payment proof has been submitted successfully. Please wait for confirmation.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-6 py-5">
              <h2 className="text-[1.1rem] font-extrabold text-slate-900">Payment Details</h2>
            </div>
            <div className="px-6 py-5 space-y-5">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-amber-100 px-3 py-1 text-[0.78rem] font-bold text-amber-700 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  Status: Pending
                </span>
                <span className="text-[0.85rem] text-slate-500">Your payment is being verified</span>
              </div>

              <div className="border-t border-slate-100 pt-5 grid gap-y-5 gap-x-10 sm:grid-cols-2 text-[0.88rem]">
                {[
                  { label: "Transaction ID", value: record.txId },
                  { label: "Date", value: `${record.dateStr} ${record.timeStr}` },
                  { label: "Payment Method", value: record.method },
                  { label: "Amount", value: formatMoney(clearanceFee, data.parcel.currency) },
                  { label: "Tracking Number", value: data.trackingNumber },
                  { label: "Recipient", value: data.receiver.name },
                  { label: "Email", value: data.receiver.email },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-[0.75rem] text-slate-400">{label}</p>
                    <p className="mt-0.5 font-semibold text-slate-800">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-6 py-5">
              <h2 className="text-[1.1rem] font-extrabold text-slate-900">What Happens Next?</h2>
            </div>
            <div className="px-6 py-5 space-y-4">
              {nextSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-blue-200 bg-blue-50 text-xs font-extrabold text-blue-600">
                    {i + 1}
                  </div>
                  <p className="mt-0.5 text-[0.88rem] text-slate-700">{step}</p>
                </div>
              ))}
              <p className="border-t border-slate-100 pt-4 text-[0.82rem] text-slate-500">
                For any questions, please contact our support team at{" "}
                <a href="mailto:support@federalogistic.com" className="font-semibold text-blue-600 hover:underline">
                  support@federalogistic.com
                </a>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            <Button className="h-11 rounded-xl px-6 text-sm font-semibold" onClick={() => (window.location.href = "/track-order")}>
              Track Another Shipment
            </Button>
            <Button variant="outline" className="h-11 rounded-xl px-6 text-sm font-semibold" onClick={() => (window.location.href = "/")}>
              Return to Homepage
            </Button>
          </div>

        </div>
      </div>
    </>
  )
}
