import type { TrackingResult } from "../../data/trackingResult"

type Props = { data: TrackingResult }

export function DeliveryProgressBar({ data }: Props) {
  const progress = Math.min(100, Math.max(0, data.deliveryProgress ?? 0))

  return (
    <div className="mx-auto max-w-300 px-5 pb-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[1.2rem] font-extrabold text-slate-900">Delivery Progress</h2>
          <span className="text-[1.15rem] font-extrabold text-[#2459d8]">{progress}%</span>
        </div>

        {/* Track */}
        <div className="relative h-4 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-[#2459d8] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

      </div>
    </div>
  )
}
