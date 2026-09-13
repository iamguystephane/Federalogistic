export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    "Delivered":         "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Out for Delivery":  "bg-blue-50 text-blue-700 border-blue-200",
    "Package received by Federalogistic": "bg-indigo-50 text-indigo-700 border-indigo-200",
    "Custom Hold":       "bg-amber-50 text-amber-700 border-amber-200",
    "Order Confirmed":   "bg-slate-100 text-slate-600 border-slate-200",
  }
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[0.68rem] font-bold ${map[status] ?? "bg-slate-100 text-slate-600 border-slate-200"}`}>
      {status}
    </span>
  )
}

export function PaymentBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    "Paid":    "bg-green-50 text-green-700 border-green-200",
    "Unpaid":  "bg-red-50 text-red-700 border-red-200",
    "Pending": "bg-amber-50 text-amber-700 border-amber-200",
  }
  const normalized = status ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase() : "Unpaid"
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[0.68rem] font-bold ${map[normalized] ?? "bg-slate-100 text-slate-600 border-slate-200"}`}>
      {normalized}
    </span>
  )
}
