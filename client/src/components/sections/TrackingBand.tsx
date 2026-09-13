import { Search } from "lucide-react"
import { useState } from "react"
import { Button } from "../ui/button"
import { Card } from "../ui/card"
import { Input } from "../ui/input"
import { goToTrackingResult } from "../../lib/tracking"

export function TrackingBand() {
  const [trackingNumber, setTrackingNumber] = useState("")

  return (
    <>
      {/* ── Mobile: card half-overlaps the hero section above ── */}
      <section className="relative bg-[#f8fafc] pb-8 pt-40 md:hidden">
        <Card className="absolute inset-x-4 top-0 z-10 -translate-y-1/2 rounded-2xl px-6 py-8 text-center shadow-md shadow-slate-900/15">
          <h2 className="text-[1.55rem] font-extrabold leading-tight text-slate-950">
            Track & Trace Your Shipment
          </h2>
          <p className="mt-2 text-[0.9rem] text-slate-500">
            Enter your tracking number to get real-time updates on your package
          </p>
          <div className="mx-auto mt-6 flex max-w-[480px] flex-col gap-3">
            <Input
              placeholder="Enter your tracking number..."
              aria-label="Tracking number"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="h-12 rounded-xl text-sm"
            />
            <Button
              className="h-12 w-full rounded-xl text-sm font-semibold"
              onClick={() => goToTrackingResult(trackingNumber)}
            >
              <Search className="h-4 w-4" />
              Track Shipment
            </Button>
          </div>
        </Card>
      </section>

      {/* ── Desktop: absolute card overlapping hero + next section ── */}
      <section className="relative hidden bg-[#f8fafc] pb-12 z-40 mb-12 md:block">
        <div className="mx-auto w-[min(1200px,calc(100%-40px))]">
          <Card className="absolute left-1/2 top-4 -translate-x-1/2 -translate-y-1/2 w-[80%] rounded-2xl px-10 py-10 text-center shadow shadow-slate-900/15">
            <h2 className="text-[1.9rem] font-extrabold leading-tight text-slate-950">
              Track & Trace Your Shipment
            </h2>
            <p className="mt-3 text-[0.95rem] text-slate-500">
              Enter your tracking number to get real-time updates on your package
            </p>
            <form className="mx-auto mt-7 flex max-w-[720px] gap-3">
              <Input
                placeholder="Enter your tracking number..."
                aria-label="Tracking number"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="h-12 rounded-xl text-sm"
              />
              <Button
                className="h-12 shrink-0 rounded-xl px-6 text-sm font-semibold"
                onClick={() => goToTrackingResult(trackingNumber)}
              >
                <Search className="h-4 w-4" />
                Track Shipment
              </Button>
            </form>
          </Card>
        </div>
      </section>
    </>
  )
}
