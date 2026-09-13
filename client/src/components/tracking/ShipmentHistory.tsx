import { CalendarDays } from "lucide-react"
import type { TrackingResult } from "../../data/trackingResult"
import { getStatusBadgeClass } from "../../data/trackingResult"
import { formatDateTime } from "../../lib/utils"

type Props = { data: TrackingResult }

function getEventColors(status: string): { dot: string; line: string; badge: string } {
  switch (status) {
    case "On Hold":
      return { dot: "bg-red-500", line: "bg-red-300", badge: "bg-red-100 text-red-700" }
    case "Hold Released":
      return { dot: "bg-green-500", line: "bg-green-300", badge: "bg-green-100 text-green-700" }
    case "In Transit":
      return { dot: "bg-blue-500", line: "bg-blue-300", badge: "bg-blue-100 text-blue-700" }
    case "Custom Hold":
      return { dot: "bg-orange-500", line: "bg-slate-200", badge: "bg-orange-100 text-orange-700" }
    default: {
      const badge = getStatusBadgeClass(status as Parameters<typeof getStatusBadgeClass>[0]) ?? "bg-slate-100 text-slate-600"
      return { dot: "bg-blue-600", line: "bg-slate-200", badge }
    }
  }
}

export function ShipmentHistory({ data }: Props) {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <CalendarDays className="h-5 w-5 text-blue-600" />
        <h2 className="text-[1.2rem] font-extrabold text-slate-900">Shipment History</h2>
      </div>

      <div className="space-y-0">
        {data.history.map((event, i) => {
          const { dot, line, badge } = getEventColors(event.status)
          return (
            <div key={i} className="flex gap-4">
              {/* Timeline spine */}
              <div className="flex flex-col items-center">
                <div className={`mt-1 h-5 w-5 shrink-0 rounded-full ${dot} flex items-center justify-center`}>
                  <div className="h-2 w-2 rounded-full bg-white" />
                </div>
                {i < data.history.length - 1 && (
                  <div className={`mt-1 w-px flex-1 ${line}`} style={{ minHeight: 32 }} />
                )}
              </div>

              {/* Content */}
              <div className="pb-6">
                <p className="text-[0.9rem] text-slate-400">{formatDateTime(event.date)}</p>
                <span className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-[0.82rem] font-bold ${badge}`}>
                  {event.status}
                </span>
                {event.location && (
                  <p className="mt-1 text-[0.92rem] font-semibold text-slate-700">{event.location}</p>
                )}
                <p className="mt-1 text-[0.92rem] leading-relaxed text-slate-600">{event.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
