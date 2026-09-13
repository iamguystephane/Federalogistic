import { CheckCircle2, ClipboardList, ScanLine } from "lucide-react"
import { useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { trackingTips } from "../../data/tracking"
import { goToTrackingResult } from "../../lib/tracking"

function RouteIllustration() {
  return (
    <div className="flex h-full items-center justify-center p-6">
      <svg
        viewBox="0 0 400 310"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[380px]"
      >
        {/* Background blob */}
        <ellipse cx="210" cy="158" rx="185" ry="148" fill="#f1f5f9" />

        {/* Dashed route lines */}
        <line x1="105" y1="108" x2="188" y2="108" stroke="#6b7280" strokeWidth="2.5" strokeDasharray="8,6" />
        <line x1="188" y1="108" x2="188" y2="196" stroke="#6b7280" strokeWidth="2.5" strokeDasharray="8,6" />
        <line x1="188" y1="196" x2="298" y2="196" stroke="#6b7280" strokeWidth="2.5" strokeDasharray="8,6" />
        <line x1="298" y1="196" x2="298" y2="212" stroke="#6b7280" strokeWidth="2.5" strokeDasharray="8,6" />
        <line x1="298" y1="255" x2="298" y2="268" stroke="#6b7280" strokeWidth="2.5" strokeDasharray="8,6" />
        <line x1="298" y1="268" x2="362" y2="268" stroke="#6b7280" strokeWidth="2.5" strokeDasharray="8,6" />

        {/* Package box (dashed outline) */}
        <rect x="115" y="228" width="148" height="60" rx="5" fill="none" stroke="#9ca3af" strokeWidth="2" strokeDasharray="8,5" />

        {/* Green origin dot */}
        <circle cx="105" cy="108" r="19" fill="#22c55e" />
        <circle cx="105" cy="108" r="9" fill="white" />

        {/* Orange transit dot */}
        <circle cx="188" cy="196" r="17" fill="#f97316" />
        <circle cx="188" cy="196" r="8" fill="white" />

        {/* Blue location pin (destination) */}
        <path
          d="M322,140 C322,122 310,110 296,110 C282,110 270,122 270,140 C270,158 296,182 296,182 C296,182 322,158 322,140 Z"
          fill="#3b82f6"
        />
        <circle cx="296" cy="140" r="12" fill="white" />
        <circle cx="296" cy="140" r="5" fill="#3b82f6" />

        {/* Red end dot */}
        <circle cx="362" cy="268" r="17" fill="#ef4444" />
        <circle cx="362" cy="268" r="8" fill="white" />
      </svg>
    </div>
  )
}

export function TrackFormSection() {
  const [trackingNumber, setTrackingNumber] = useState("")

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-[1200px] px-5">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          {/* Left: form card */}
          <Card className="shadow-md">
            <CardContent className="p-8">
              <h2 className="text-[1.65rem] font-extrabold text-slate-950">Track Your Shipment</h2>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-slate-600">
                Here's the fastest way to check the status of your shipment. No need to call
                Customer Service – our online results give you real-time, detailed progress as your
                shipment speeds through the{" "}
                <a href="/services" className="font-semibold text-blue-600 hover:underline">
                  Shyp Direct
                </a>{" "}
                network.
              </p>

              <div className="mt-7">
                <label className="text-[0.85rem] font-semibold text-slate-700">
                  Tracking Number
                </label>
                <div className="relative mt-2">
                  <ScanLine className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Enter your tracking number"
                    className="h-11 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <Button
                  className="mt-4 h-12 w-full rounded-xl text-sm font-semibold"
                  onClick={() => goToTrackingResult(trackingNumber)}
                >
                  <ClipboardList className="h-4 w-4" />
                  Track Shipment
                </Button>
              </div>

              <hr className="my-7 border-slate-200" />

              <h3 className="text-[1rem] font-bold text-slate-900">Tracking Tips</h3>
              <ul className="mt-4 space-y-3">
                {trackingTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-[0.875rem] text-slate-600">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                    {tip}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Right: illustration card */}
          <Card className="shadow-md">
            <RouteIllustration />
          </Card>
        </div>
      </div>
    </section>
  )
}
