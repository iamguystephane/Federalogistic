import { BarChart3, CheckCircle, Clock, DollarSign, PackagePlus, Settings, Truck } from "lucide-react"
import type { TrackingResult } from "../../data/trackingResult"
import type { AdminView } from "../types"
import { StatusBadge, PaymentBadge } from "../components/Badges"

export function DashboardHome({ shipments, setView }: { shipments: TrackingResult[]; setView: (v: AdminView) => void }) {
  const paid = shipments.filter((s) => s.parcel.paymentStatus === "Paid").length
  const pending = shipments.filter((s) => s.parcel.paymentStatus === "Pending").length
  const delivered = shipments.filter((s) => s.currentStatus === "Delivered").length

  const stats = [
    { label: "Total Shipments", value: shipments.length, icon: Truck,       light: "bg-[#2459d8]/8 text-[#2459d8]",  color: "bg-[#2459d8]" },
    { label: "Paid",            value: paid,             icon: DollarSign,  light: "bg-green-50 text-green-600",      color: "bg-green-500" },
    { label: "Pending Payment", value: pending,          icon: Clock,       light: "bg-amber-50 text-amber-600",      color: "bg-amber-500" },
    { label: "Delivered",       value: delivered,        icon: CheckCircle, light: "bg-emerald-50 text-emerald-600",  color: "bg-emerald-500" },
  ]

  const quickActions = [
    { label: "New Shipment",  desc: "Create a tracking order", view: "create"   as AdminView, icon: PackagePlus, primary: true },
    { label: "All Shipments", desc: "Browse & edit shipments", view: "manage"   as AdminView, icon: Truck,       primary: false },
    { label: "Deposits",      desc: "Review payment status",   view: "deposits" as AdminView, icon: DollarSign,  primary: false },
    { label: "Settings",      desc: "Account & site config",   view: "settings" as AdminView, icon: Settings,    primary: false },
  ]

  const recent = shipments.slice(0, 5)
  const chartRows = [
    { label: "Confirmed", value: shipments.filter((s) => s.currentStatus === "Order Confirmed").length,  color: "bg-slate-500" },
    { label: "Picked",    value: shipments.filter((s) => s.currentStatus === "Package received by Federalogistic").length, color: "bg-indigo-500" },
    { label: "Transit",   value: shipments.filter((s) => s.currentStatus === "Out for Delivery").length,  color: "bg-blue-500" },
    { label: "Hold",      value: shipments.filter((s) => s.currentStatus === "Custom Hold").length,       color: "bg-amber-500" },
    { label: "Delivered", value: delivered,                                                                color: "bg-emerald-500" },
  ]
  const maxChartValue = Math.max(...chartRows.map((r) => r.value), 1)

  return (
    <div className="space-y-7">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-0.5">Welcome back — here's an overview of your shipments.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, color, light }) => (
          <div key={label} className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm flex items-center gap-4">
            <div className={`w-11 h-11 rounded-xl ${light} flex items-center justify-center shrink-0`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900 leading-none">{value}</p>
              <p className="text-xs font-semibold text-slate-500 mt-1">{label}</p>
            </div>
            <div className={`ml-auto w-1 h-10 rounded-full ${color} opacity-20`} />
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-700">Shipment Status Graph</h2>
              <p className="mt-0.5 text-xs font-semibold text-slate-400">Live counts from the database</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#2459d8]">
              <BarChart3 className="h-5 w-5" />
            </div>
          </div>
          <div className="space-y-4">
            {chartRows.map((row) => (
              <div key={row.label} className="grid grid-cols-[92px_1fr_34px] items-center gap-3">
                <span className="text-xs font-bold text-slate-500">{row.label}</span>
                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                  <div className={`h-full rounded-full ${row.color}`} style={{ width: `${Math.max((row.value / maxChartValue) * 100, row.value ? 8 : 0)}%` }} />
                </div>
                <span className="text-right text-xs font-extrabold text-slate-800">{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-700">Financial Snapshot</h2>
          <div className="mt-5 space-y-4">
            {[
              { label: "Paid Shipments",    value: paid,    color: "text-green-600" },
              { label: "Pending Payments",  value: pending, color: "text-amber-600" },
              { label: "Unpaid Shipments",  value: shipments.filter((s) => s.parcel.paymentStatus === "Unpaid").length, color: "text-red-600" },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
                <span className="text-sm font-bold text-slate-600">{row.label}</span>
                <span className={`text-lg font-extrabold ${row.color}`}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-extrabold text-slate-700 uppercase tracking-wider mb-3">Quick Actions</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map(({ label, desc, view, icon: Icon, primary }) => (
            <button key={view} onClick={() => setView(view)}
              className={`rounded-xl p-4 text-left transition flex flex-col gap-2 group ${primary ? "bg-[#2459d8] text-white shadow-md shadow-[#2459d8]/25 hover:bg-[#1d4bc0]" : "bg-white border border-slate-100 shadow-sm hover:border-[#2459d8]/30 hover:shadow-md"}`}>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${primary ? "bg-white/15" : "bg-[#2459d8]/8"}`}>
                <Icon className={`h-4.5 w-4.5 ${primary ? "text-white" : "text-[#2459d8]"}`} />
              </div>
              <div>
                <p className={`text-sm font-extrabold ${primary ? "text-white" : "text-slate-800"}`}>{label}</p>
                <p className={`text-xs mt-0.5 ${primary ? "text-white/70" : "text-slate-500"}`}>{desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {recent.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-extrabold text-slate-700 uppercase tracking-wider">Recent Shipments</h2>
            <button onClick={() => setView("manage")} className="text-xs font-bold text-[#2459d8] hover:underline">View all</button>
          </div>
          <div className="rounded-xl border border-slate-100 bg-white shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-sm text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>{["Tracking #", "Receiver", "Status", "Payment"].map((h) => (
                    <th key={h} className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}</tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recent.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50/70 transition">
                      <td className="px-4 py-3 font-extrabold text-[#2459d8] text-xs">{s.trackingNumber}</td>
                      <td className="px-4 py-3 font-medium text-slate-700">{s.receiver.name}</td>
                      <td className="px-4 py-3"><StatusBadge status={s.currentStatus} /></td>
                      <td className="px-4 py-3"><PaymentBadge status={s.parcel.paymentStatus || "Unpaid"} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
