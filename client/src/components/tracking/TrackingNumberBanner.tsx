import { CalendarDays, ClipboardList, UserCircle2 } from "lucide-react"
import type { TrackingResult } from "../../data/trackingResult"
import { getActiveStatus, getActiveBadgeClass, getShortStatus } from "../../data/trackingResult"

type Props = { data: TrackingResult }

function formatLastUpdated(raw: string) {
  try {
    const d = new Date(raw)
    const date = d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    const time = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
    return `${date} - ${time}`
  } catch {
    return raw
  }
}

export function TrackingNumberBanner({ data }: Props) {
  const activeStatus = getActiveStatus(data)
  const badgeClass = getActiveBadgeClass(activeStatus)

  return (
    <div className="mx-auto max-w-[1200px] px-5 pb-6">
      <div className="rounded-2xl bg-gradient-to-br from-[#2459d8] to-[#1a3faf] px-8 py-8 space-y-5">

        {/* Tracking number */}
        <div>
          <div className="flex items-center gap-2 text-[1rem] font-semibold text-white/80">
            <ClipboardList className="h-5 w-5" />
            Tracking Number
          </div>
          <div className="mt-3 flex items-center gap-4">
            <span className="whitespace-nowrap text-[1.5rem] font-extrabold tracking-wide text-white leading-tight">
              {data.trackingNumber}
            </span>
            {data.verified && (
              <span className="shrink-0 rounded-xl bg-green-700 px-4 py-1 text-[0.88rem] font-bold text-white shadow-sm">
                Verified
              </span>
            )}
          </div>
        </div>

        {/* Current status row */}
        <div className="flex items-center gap-3 rounded-2xl bg-white/15 px-5 py-2 w-full md:w-fit">
          <UserCircle2 className="h-6 w-6 shrink-0 text-white/80" />
          <span className="whitespace-nowrap text-[1rem] font-semibold text-white">Current Status:</span>
          <span className={`shrink-0 whitespace-nowrap rounded-full px-4 py-1 text-[0.9rem] font-bold ${badgeClass}`}>
            {getShortStatus(activeStatus)}
          </span>
        </div>

        {/* Last updated */}
        <div className="flex items-center gap-3 text-[0.95rem] text-white/80">
          <CalendarDays className="h-5 w-5 shrink-0" />
          <span>
            Last Updated:{" "}
            <span className="font-semibold text-white">{formatLastUpdated(data.lastUpdated)}</span>
          </span>
        </div>

      </div>
    </div>
  )
}
