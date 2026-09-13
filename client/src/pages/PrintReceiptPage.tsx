import { useEffect, useState } from "react"
import { CheckCircle2, Grid3X3, Printer } from "lucide-react"
import type { TrackingResult } from "../data/trackingResult"
import { getStatusBadgeClass } from "../data/trackingResult"

import { apiJson } from "../lib/api"
import { formatMoney } from "../lib/utils"
import { rememberedTrackingNumber, rememberTrackingNumber, trackingFromUrl } from "../lib/tracking"

// ── Barcode ──────────────────────────────────────────────────────────────────
function Barcode({ value }: { value: string }) {
  const bars: { x: number; w: number }[] = []
  let x = 4
  for (let i = 0; i < value.length; i++) {
    const c = value.charCodeAt(i)
    const wide = c % 3 === 0 ? 4 : c % 2 === 0 ? 3 : 2
    bars.push({ x, w: wide })
    x += wide + (c % 2 === 0 ? 2 : 1)
    bars.push({ x, w: 1 })
    x += 1 + 1
  }
  const totalW = x + 4

  return (
    <svg viewBox={`0 0 ${totalW} 58`} xmlns="http://www.w3.org/2000/svg" className="w-full">
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y={3} width={b.w} height={44} fill="#111" />
      ))}
      <text x={totalW / 2} y={56} textAnchor="middle" fontSize="6.5" fill="#555" fontFamily="monospace">
        {value}
      </text>
    </svg>
  )
}

// ── QR Code (placeholder SVG) ─────────────────────────────────────────────────
function QrCode() {
  const cells = [
    [1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,1,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,0,1,0,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
    [1,1,0,1,1,0,1,1,0,1,1,0,1,0,1,1,0],
    [0,0,0,0,0,0,0,0,1,1,0,1,0,1,0,0,1],
    [1,1,1,1,1,1,1,0,0,0,1,0,1,1,0,1,1],
    [1,0,0,0,0,0,1,0,1,0,0,1,0,0,1,0,0],
    [1,0,1,1,1,0,1,0,0,1,1,0,1,0,0,1,1],
    [1,0,1,1,1,0,1,0,1,0,0,1,0,1,1,0,0],
    [1,0,1,1,1,0,1,0,0,1,1,0,1,0,0,1,1],
    [1,0,0,0,0,0,1,0,1,1,0,1,0,0,1,0,0],
    [1,1,1,1,1,1,1,0,0,0,1,1,0,1,0,1,1],
  ]
  const s = 5
  return (
    <svg viewBox={`0 0 ${cells[0].length * s} ${cells.length * s}`} className="h-16 w-16">
      {cells.flatMap((row, r) =>
        row.map((cell, c) =>
          cell ? (
            <rect key={`${r}-${c}`} x={c * s} y={r * s} width={s} height={s} fill="#111" />
          ) : null
        )
      )}
    </svg>
  )
}

// ── Official Stamp SVG ────────────────────────────────────────────────────────
function OfficialStampSvg() {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="h-28 w-28 opacity-75">
      <circle cx="60" cy="60" r="55" fill="none" stroke="#94a3b8" strokeWidth="3" strokeDasharray="6 3" />
      <circle cx="60" cy="60" r="45" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="60" y="48" textAnchor="middle" fontSize="6.5" fontFamily="serif" fill="#64748b" fontWeight="bold" letterSpacing="1.5">FEDERALOGISTIC</text>
      <text x="60" y="64" textAnchor="middle" fontSize="6" fontFamily="serif" fill="#94a3b8" letterSpacing="1">LOGISTICS</text>
      <text x="60" y="78" textAnchor="middle" fontSize="5.5" fontFamily="serif" fill="#94a3b8" letterSpacing="1">OFFICIAL</text>
      <path d="M35,88 Q60,95 85,88" fill="none" stroke="#94a3b8" strokeWidth="1" />
    </svg>
  )
}

// ── Stamp Duty SVG ────────────────────────────────────────────────────────────
function StampDutySvg() {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="h-28 w-28 opacity-80">
      <circle cx="60" cy="60" r="54" fill="none" stroke="#ef4444" strokeWidth="3" />
      <circle cx="60" cy="60" r="48" fill="none" stroke="#ef4444" strokeWidth="1.5" />
      <rect x="28" y="42" width="64" height="36" rx="3" fill="none" stroke="#ef4444" strokeWidth="1.5" />
      <text x="60" y="57" textAnchor="middle" fontSize="9" fontFamily="serif" fill="#ef4444" fontWeight="bold" letterSpacing="1.5">STAMP</text>
      <text x="60" y="71" textAnchor="middle" fontSize="9" fontFamily="serif" fill="#ef4444" fontWeight="bold" letterSpacing="1.5">DUTY</text>
      <path d="M25,35 Q60,25 95,35" fill="none" stroke="#ef4444" strokeWidth="1.5" />
      <path d="M25,85 Q60,95 95,85" fill="none" stroke="#ef4444" strokeWidth="1.5" />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

export function PrintReceiptPage() {
  const [data, setData] = useState<TrackingResult | null>(null)
  const [error, setError] = useState("")
  const trackingNumber = trackingFromUrl() || rememberedTrackingNumber()

  useEffect(() => {
    if (!trackingNumber) return
    apiJson<TrackingResult>(`/api/shipments/${encodeURIComponent(trackingNumber)}`)
      .then((shipment) => {
        setData(shipment)
        rememberTrackingNumber(shipment.trackingNumber)
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Shipment not found"))
  }, [trackingNumber])

  if (!trackingNumber || error || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 px-5 text-center">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-lg font-extrabold text-slate-900">Receipt unavailable</p>
          <p className="mt-2 text-sm font-semibold text-slate-500">{error || "Enter a tracking number before printing a receipt."}</p>
          <button onClick={() => (window.location.href = "/track-order")} className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white">
            Track Shipment
          </button>
        </div>
      </div>
    )
  }

  const generatedAt = new Date()
  const receiptDate = generatedAt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  const receiptTime = generatedAt.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
  const orderId = data.id?.slice(-6).toUpperCase() || data.trackingNumber.slice(-6)
  const currency = data.parcel.currency || "USD"
  const shippingCost = data.parcel.shippingCost ?? Number(data.shipment.shippingCost || 0)
  const clearanceCost = data.parcel.clearanceFee ?? 0
  const totalAmount = data.parcel.totalCost ?? shippingCost + clearanceCost
  const statusBadge = getStatusBadgeClass(data.currentStatus)

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Fixed Print button — hidden on print */}
      <div className="print:hidden fixed right-5 top-5 z-50">
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg hover:bg-blue-700"
        >
          <Printer className="h-4 w-4" />
          Print Receipt
        </button>
      </div>

      {/* Receipt document */}
      <div className="mx-auto max-w-[860px] bg-white shadow print:shadow-none print:max-w-full">
        {/* Blue accent bar */}
        <div className="h-2 w-full bg-gradient-to-r from-blue-600 to-blue-400" />

        <div className="p-8 print:p-6">

          {/* ── Company header ─────────────────────────────────────────────── */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center rounded-xl bg-[#2459d8] px-3 py-2.5">
                <img src="/full-logo.png" alt="Federalogistic" className="h-7 w-auto object-contain" />
              </div>
              <div className="border-l border-slate-200 pl-3">
                <p className="text-[0.78rem] text-slate-500 leading-none">Global Logistics Solutions</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[0.75rem] text-slate-400">Receipt Generated</p>
              <p className="text-[0.9rem] font-bold text-slate-800">{receiptDate}</p>
              <span className="mt-1 inline-block rounded-full border border-slate-300 px-3 py-0.5 text-[0.65rem] font-bold uppercase tracking-widest text-slate-600">
                Official Receipt
              </span>
            </div>
          </div>

          <div className="mt-5 flex items-end justify-between border-b border-slate-100 pb-5">
            <div>
              <p className="text-[1.2rem] font-extrabold text-blue-600">Federalogistic</p>
              <p className="text-[0.85rem] text-slate-500">International Shipping & Logistics Services</p>
            </div>
            <div className="text-right text-[0.78rem] text-slate-500">
              <p>support@federalogistic.com</p>
              <p>https://federalogistic.com</p>
            </div>
          </div>

          {/* ── Tracking number banner ──────────────────────────────────────── */}
          <div className="mt-6 flex items-center justify-between rounded-xl bg-gradient-to-r from-[#2459d8] to-[#1a3faf] px-6 py-5">
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-widest text-white/60">
                Tracking Number
              </p>
              <p className="mt-1 text-[1.4rem] font-extrabold tracking-wide text-white">
                {data.trackingNumber}
              </p>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-bold text-white">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Verified
            </div>
          </div>

          {/* ── Sender / Receiver / Shipment cards ────────────────────────── */}
          <div className="mt-6 grid gap-4 grid-cols-3">
            {/* Sender */}
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="flex items-center gap-1.5 text-[0.78rem] font-bold text-blue-600 mb-3">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
                Sender
              </div>
              <p className="text-[0.9rem] font-bold text-blue-600">{data.sender.name}</p>
              <p className="mt-2 flex items-start gap-1.5 text-[0.8rem] text-slate-600">
                <svg className="mt-0.5 h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {data.sender.address}
              </p>
              <p className="mt-2 flex items-start gap-1.5 text-[0.8rem] text-slate-600">
                <svg className="mt-0.5 h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                {data.receiver.address}
              </p>
            </div>

            {/* Receiver */}
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="flex items-center gap-1.5 text-[0.78rem] font-bold text-blue-600 mb-3">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
                Receiver
              </div>
              <p className="text-[0.9rem] font-bold text-blue-600">{data.receiver.name}</p>
              <p className="mt-2 flex items-center gap-1.5 text-[0.8rem] text-slate-600">
                <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.57 4.9 2 2 0 0 1 3.54 2.72h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10a16 16 0 0 0 6 6l.9-.9a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 17.4z"/></svg>
                {data.receiver.phone}
              </p>
              <p className="mt-2 flex items-start gap-1.5 text-[0.8rem] text-slate-600">
                <svg className="mt-0.5 h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {data.receiver.address}
              </p>
              <p className="mt-2 flex items-start gap-1.5 text-[0.8rem] text-slate-600">
                <svg className="mt-0.5 h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                {data.sender.address}
              </p>
            </div>

            {/* Shipment Details */}
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="flex items-center gap-1.5 text-[0.78rem] font-bold text-blue-600 mb-3">
                <Grid3X3 className="h-4 w-4" />
                Shipment Details
              </div>
              <div className="rounded-lg bg-slate-50 p-2">
                <Barcode value={data.trackingNumber} />
              </div>
              <div className="mt-3 space-y-1.5 text-[0.78rem]">
                <div className="flex justify-between">
                  <span className="text-slate-500">Order ID:</span>
                  <span className="font-bold text-slate-800">{orderId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Booking Mode:</span>
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[0.7rem] font-bold text-blue-700">ToPay</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Shipment Cost:</span>
                  <span className="font-bold text-slate-800">{formatMoney(shippingCost, currency)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Status:</span>
                  <span className={`rounded-full px-2 py-0.5 text-[0.7rem] font-bold ${statusBadge}`}>{data.currentStatus}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Parcel Details & Costs table ───────────────────────────────── */}
          <div className="mt-6 rounded-xl border border-slate-200 overflow-hidden">
            <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-5 py-3">
              <svg className="h-4 w-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              <span className="text-[0.85rem] font-bold text-slate-800">Parcel Details & Costs</span>
            </div>
            <table className="w-full text-[0.78rem]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-slate-500 uppercase tracking-wide">
                  <th className="px-4 py-2.5 text-left font-semibold">QTY</th>
                  <th className="px-4 py-2.5 text-left font-semibold">Product</th>
                  <th className="px-4 py-2.5 text-left font-semibold">Status</th>
                  <th className="px-4 py-2.5 text-left font-semibold">Description</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Shipping Cost</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Clearance Cost</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Total Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-50">
                  <td className="px-4 py-3 text-slate-700">Paid</td>
                  <td className="px-4 py-3 text-slate-700">Parcel</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[0.7rem] font-bold ${statusBadge}`}>{data.currentStatus}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-600 max-w-[180px]">
                    PACKAGE SUCCESSFULLY REGISTERED AND ON HOLD FOR CONFIRMATION.
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-slate-800">{formatMoney(shippingCost, currency)}</td>
                  <td className="px-4 py-3 text-right font-semibold text-slate-800">{formatMoney(clearanceCost, currency)}</td>
                  <td className="px-4 py-3 text-right font-bold text-slate-900">{formatMoney(totalAmount, currency)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ── Payment Methods + Payment Summary ──────────────────────────── */}
          <div className="mt-6 grid gap-5 grid-cols-[1fr_1.1fr]">
            {/* Left: Payment Methods + Stamps */}
            <div className="space-y-5">
              <div className="rounded-xl border border-slate-200 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="h-4 w-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                  <span className="text-[0.85rem] font-bold text-slate-800">Payment Methods</span>
                </div>
                {/* Payment logos (text badges) */}
                <div className="flex items-center gap-2 flex-wrap">
                  {["VISA", "Mastercard", "PayPal"].map((m) => (
                    <span key={m} className="rounded border border-slate-200 bg-slate-50 px-2.5 py-1 text-[0.7rem] font-bold text-slate-600">{m}</span>
                  ))}
                  <span className="rounded border border-green-200 bg-green-50 px-2.5 py-1 text-[0.7rem] font-bold text-green-700">SECURE</span>
                </div>
                <p className="mt-3 text-[0.75rem] leading-relaxed text-slate-500">
                  For your convenience we offer several reliable, fast, and secure payment methods.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-slate-200 p-4 text-center">
                  <div className="flex items-center gap-1.5 justify-center text-[0.72rem] font-bold text-slate-600 mb-3">
                    <CheckCircle2 className="h-3.5 w-3.5 text-blue-500" />
                    Official Stamp
                  </div>
                  <div className="flex justify-center">
                    <OfficialStampSvg />
                  </div>
                  <p className="mt-2 text-[0.7rem] text-slate-400">Mon, Jan 26, 2026 5:43 AM</p>
                </div>
                <div className="rounded-xl border border-slate-200 p-4 text-center">
                  <div className="flex items-center gap-1.5 justify-center text-[0.72rem] font-bold text-slate-600 mb-3">
                    <CheckCircle2 className="h-3.5 w-3.5 text-blue-500" />
                    Stamp Duty
                  </div>
                  <div className="flex justify-center">
                    <StampDutySvg />
                  </div>
                  <p className="mt-2 text-[0.7rem] text-slate-400">Verified & Approved</p>
                </div>
              </div>
            </div>

            {/* Right: Payment Summary */}
            <div className="rounded-xl border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-[#2459d8] to-[#1a3faf] px-5 py-3.5 flex items-center gap-2">
                <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                <span className="text-[0.9rem] font-bold text-white">Payment Summary</span>
              </div>
              <div className="p-5 space-y-3.5">
                <div className="flex justify-between text-[0.85rem]">
                  <span className="text-slate-500">Shipping Cost:</span>
                  <span className="font-semibold text-slate-800">{formatMoney(shippingCost, currency)}</span>
                </div>
                <div className="flex justify-between text-[0.85rem]">
                  <span className="text-slate-500">Clearance Cost:</span>
                  <span className="font-semibold text-slate-800">{formatMoney(clearanceCost, currency)}</span>
                </div>
                <div className="border-t border-slate-100 pt-3 flex justify-between text-[0.9rem]">
                  <span className="font-semibold text-slate-700">Total Amount:</span>
                  <span className="text-[1.1rem] font-extrabold text-blue-600">{formatMoney(totalAmount, currency)}</span>
                </div>
                <div className="flex justify-between items-center text-[0.85rem]">
                  <span className="text-slate-500">Payment Status:</span>
                  <span className="flex items-center gap-1 rounded-full bg-amber-100 px-3 py-0.5 text-[0.72rem] font-bold text-amber-700">
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    To Pay on Delivery
                  </span>
                </div>

                {/* Digital Verification */}
                <div className="mt-2 border-t border-slate-100 pt-4">
                  <div className="flex items-start gap-4">
                    <QrCode />
                    <div>
                      <p className="text-[0.82rem] font-bold text-slate-800">Digital Verification</p>
                      <p className="mt-1 text-[0.75rem] leading-relaxed text-slate-500">
                        Scan this QR code to verify this receipt's authenticity and check real-time shipment status.
                      </p>
                      <div className="mt-2 flex items-center gap-1 text-[0.72rem] font-semibold text-green-600">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Digitally signed and secured
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Thank You footer ───────────────────────────────────────────── */}
          <div className="mt-8 rounded-2xl bg-slate-50 py-8 text-center">
            <svg className="mx-auto h-10 w-10 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/>
              <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
            </svg>
            <p className="mt-3 text-[1rem] font-extrabold text-blue-600">
              Thank You for Choosing Federalogistic
            </p>
            <p className="mt-1 text-[0.85rem] text-slate-500">
              We appreciate your business and look forward to delivering your package safely.
            </p>
            <p className="mt-4 flex items-center justify-center gap-1.5 text-[0.75rem] text-slate-400">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Receipt generated on {receiptDate} - {receiptTime}
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
