import {
  Check,
  CheckCircle,
  MapPin,
  OctagonX,
  Package,
  PackageCheck,
  ScanLine,
  Truck,
  type LucideIcon,
} from "lucide-react"
import type { ProgressStage, TrackingResult } from "../../data/trackingResult"
import { formatDateTime } from "../../lib/utils"

type Props = { data: TrackingResult }

function getIcon(stage: ProgressStage): LucideIcon {
  if (stage.type === "stop") return OctagonX
  if (stage.type === "stop_released") return CheckCircle
  if (stage.type === "transit") return MapPin
  switch (stage.step) {
    case "Order Confirmed":   return Check
    case "Package received by Federalogistic": return Package
    case "Out for Delivery":        return Truck
    case "Custom Hold":       return ScanLine
    case "Delivered":         return PackageCheck
    default:                  return MapPin
  }
}

type ColorInfo = { circle: string; line: string }

function getColors(stage: ProgressStage): ColorInfo {
  if (stage.type === "stop" && !stage.released)
    return { circle: "bg-red-500 text-white", line: "bg-red-500" }
  if (stage.type === "stop_released" || (stage.type === "stop" && stage.released))
    return { circle: "bg-green-500 text-white", line: "bg-green-500" }
  if (stage.type === "transit")
    return stage.date
      ? { circle: "bg-blue-600 text-white", line: "bg-blue-600" }
      : { circle: "bg-slate-200 text-slate-400", line: "bg-slate-200" }
  if (!stage.date)
    return { circle: "bg-slate-200 text-slate-400", line: "bg-slate-200" }
  if (stage.step === "Custom Hold")
    return { circle: "bg-yellow-400 text-slate-900", line: "bg-yellow-400" }
  return { circle: "bg-blue-600 text-white", line: "bg-blue-600" }
}

function fmtDate(raw?: string) {
  if (!raw) return null
  return formatDateTime(raw) || null
}

export function ShipmentProgress({ data }: Props) {
  const stages: ProgressStage[] = Array.isArray(data.progress) && data.progress.length > 0
    ? data.progress
    : [
        { step: "Order Confirmed" },
        { step: "Package received by Federalogistic" },
        { step: "Out for Delivery" },
        { step: "Custom Hold" },
        { step: "Delivered" },
      ]

  const showHold = data.isOnHold && !data.holdReleased

  return (
    <div className="mx-auto max-w-300 px-5 pb-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-8 text-[1.2rem] font-extrabold text-slate-900">Shipment Progress</h2>

        {/* ── Mobile: vertical ─────────────────────────────────── */}
        <div className="flex flex-col md:hidden">
          {stages.map((stage, i) => {
            const Icon = getIcon(stage)
            const { circle } = getColors(stage)
            const nextLineColor = i < stages.length - 1 ? getColors(stages[i + 1]).line : ""
            const date = fmtDate(stage.date)

            return (
              <div key={`${stage.step}-${i}`}>
                <div className="flex items-center gap-3">
                  <div className={`flex h-13 w-13 shrink-0 items-center justify-center rounded-full ${circle} shadow-sm`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-[1.05rem] font-bold text-slate-800 leading-tight">{stage.step}</p>
                    {date && <p className="mt-0.5 text-[0.92rem] text-slate-400">{date}</p>}
                  </div>
                </div>
                {i < stages.length - 1 && (
                  <div className={`ml-5.5 w-0.5 h-8 ${nextLineColor} my-0.5`} />
                )}
              </div>
            )
          })}
        </div>

        {/* ── Desktop: horizontal (scrollable when stages overflow) ── */}
        <div className="hidden md:block overflow-x-auto">
          <div className="relative flex items-start" style={{ minWidth: `${stages.length * 10}rem` }}>
          {stages.map((stage, i) => {
            const Icon = getIcon(stage)
            const { circle } = getColors(stage)
            const isLast = i === stages.length - 1
            const nextLineColor = !isLast ? getColors(stages[i + 1]).line : ""
            const date = fmtDate(stage.date)

            return (
              <div key={`${stage.step}-${i}`} className="relative flex flex-1 flex-col items-center" style={{ minWidth: "10rem" }}>
                {/* Connector line to the right */}
                {!isLast && (
                  <div
                    className="absolute top-5.5 left-1/2 h-0.5 w-full"
                    style={{ zIndex: 0 }}
                  >
                    <div className={`h-full w-full ${nextLineColor}`} />
                  </div>
                )}
                {/* Circle */}
                <div className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full ${circle} shadow-sm`}>
                  <Icon className="h-5 w-5" />
                </div>
                {/* Label */}
                <p className="mt-3 text-center text-[0.88rem] font-bold text-slate-800 leading-tight max-w-20">
                  {stage.step}
                </p>
                {date && (
                  <p className="mt-1 text-center text-[0.82rem] text-slate-400">{date}</p>
                )}
              </div>
            )
          })}
          </div>
        </div>

        {/* Hold banner */}
        {showHold && (
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse shrink-0" />
            <p className="text-[0.95rem] font-semibold text-red-800">This shipment is currently on hold.</p>
          </div>
        )}
      </div>
    </div>
  )
}
