import { useMemo, useState } from "react"
import { Edit3, Search, X } from "lucide-react"
import type { TrackingResult } from "../../data/trackingResult"
import { StatusBadge, PaymentBadge } from "../components/Badges"
import { ShipmentFormView } from "../components/ShipmentFormView"
import { shipmentToForm } from "../shipmentUtils"

export function ManageShipments({ shipments, refresh }: { shipments: TrackingResult[]; refresh: () => void }) {
  const [query, setQuery] = useState("")
  const [editing, setEditing] = useState<TrackingResult | null>(null)

  const filtered = useMemo(
    () => shipments.filter((s) => s.trackingNumber.toLowerCase().includes(query.toLowerCase())),
    [shipments, query],
  )

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Manage Shipments</h1>
        <p className="text-sm text-slate-500 mt-0.5">{shipments.length} total shipments</p>
      </div>

      <div className="flex items-center gap-3 rounded-xl bg-white border border-slate-100 shadow-sm px-4 py-2.5">
        <Search className="h-4 w-4 text-slate-400 shrink-0" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by tracking number…"
          className="flex-1 text-sm text-slate-800 placeholder-slate-400 outline-none bg-transparent font-medium"
        />
        {query && (
          <button onClick={() => setQuery("")} className="text-slate-400 hover:text-slate-600 transition">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="rounded-xl border border-slate-100 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {["Tracking #", "Receiver", "Route", "Status", "Payment", "Expected Delivery", ""].map((h) => (
                  <th key={h} className="px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-10 text-center text-sm font-semibold text-slate-400">No shipments found</td></tr>
              ) : (
                filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-blue-50/30 transition">
                    <td className="px-4 py-3.5 font-extrabold text-[#2459d8] text-xs whitespace-nowrap">{s.trackingNumber}</td>
                    <td className="px-4 py-3.5 font-medium text-slate-700 whitespace-nowrap">{s.receiver.name}</td>
                    <td className="px-4 py-3.5 text-slate-500 whitespace-nowrap text-xs">{s.mapRoute.origin.label} → {s.mapRoute.destination.label}</td>
                    <td className="px-4 py-3.5 whitespace-nowrap"><StatusBadge status={s.currentStatus} /></td>
                    <td className="px-4 py-3.5 whitespace-nowrap"><PaymentBadge status={s.parcel.paymentStatus || "Unpaid"} /></td>
                    <td className="px-4 py-3.5 text-slate-500 text-xs whitespace-nowrap">
                      {s.parcel.expectedDelivery ? new Date(s.parcel.expectedDelivery).toLocaleDateString() : "—"}
                    </td>
                    <td className="px-4 py-3.5">
                      <button onClick={() => setEditing(s)} className="flex items-center gap-1.5 rounded-lg bg-[#2459d8]/8 px-3 py-1.5 text-xs font-bold text-[#2459d8] hover:bg-[#2459d8]/15 transition whitespace-nowrap">
                        <Edit3 className="h-3.5 w-3.5" />
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 p-4 flex items-start justify-center">
          <div className="w-full max-w-[1100px] rounded-2xl bg-[#f4f6fb] p-5 mt-6 mb-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Edit Shipment</h2>
                <p className="text-xs font-bold text-[#2459d8] mt-0.5">{editing.trackingNumber}</p>
              </div>
              <button onClick={() => setEditing(null)} className="rounded-xl bg-white border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 transition flex items-center gap-2">
                <X className="h-4 w-4" />
                Close
              </button>
            </div>
            <ShipmentFormView
              shipmentId={editing.id}
              initial={shipmentToForm(editing)}
              currentImageUrl={editing.parcel.itemImageUrl}
              initialProgress={editing.deliveryProgress ?? 0}
              onSaved={() => { refresh(); setEditing(null) }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
