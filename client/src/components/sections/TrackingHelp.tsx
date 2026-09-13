import { HeadphonesIcon, Phone } from "lucide-react"
import { Button } from "../ui/button"

export function TrackingHelp() {
  return (
    <section className="bg-gradient-to-br from-[#2459d8] to-[#1a3faf] py-20">
      <div className="mx-auto max-w-[1200px] px-5">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: text + buttons */}
          <div className="text-white">
            <p className="text-[0.8rem] font-bold uppercase tracking-widest text-white/60">
              Need Help?
            </p>
            <h2 className="mt-3 text-[2rem] font-extrabold leading-tight">
              Need Additional Help With Your Shipment?
            </h2>
            <p className="mt-5 text-[1rem] leading-relaxed text-white/80">
              Our dedicated customer support team is available around the clock to assist you with
              any tracking questions, shipment concerns, or delivery issues you may encounter.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                variant="outline"
                className="h-12 rounded-xl border-white/40 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur-sm hover:border-white/70 hover:bg-white/20"
                onClick={() => (window.location.href = "/contact")}
              >
                <HeadphonesIcon className="h-4 w-4" />
                Contact Support
              </Button>
              <Button
                variant="outline"
                className="h-12 rounded-xl border-white/40 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur-sm hover:border-white/70 hover:bg-white/20"
                onClick={() => (window.location.href = "tel:+233543212188")}
              >
                <Phone className="h-4 w-4" />
                Call Us
              </Button>
            </div>
          </div>

          {/* Right: support illustration */}
          <div className="flex items-center justify-center">
            <div className="flex h-64 w-64 items-center justify-center rounded-full bg-white/10">
              <svg
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                className="h-48 w-48"
              >
                {/* Person silhouette */}
                <circle cx="100" cy="60" r="32" fill="white" fillOpacity="0.25" />
                <ellipse cx="100" cy="155" rx="50" ry="35" fill="white" fillOpacity="0.2" />

                {/* Headset arc */}
                <path
                  d="M68,58 A32,32 0 0,1 132,58"
                  fill="none"
                  stroke="white"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                {/* Left ear piece */}
                <rect x="60" y="58" width="12" height="20" rx="6" fill="white" fillOpacity="0.7" />
                {/* Right ear piece */}
                <rect x="128" y="58" width="12" height="20" rx="6" fill="white" fillOpacity="0.7" />
                {/* Mic arm */}
                <path
                  d="M132,70 Q148,90 138,105"
                  fill="none"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fillOpacity="0.7"
                />
                <circle cx="137" cy="107" r="5" fill="white" fillOpacity="0.7" />

                {/* Chat bubble */}
                <rect x="110" y="20" width="60" height="36" rx="8" fill="white" fillOpacity="0.15" />
                <circle cx="124" cy="38" r="3" fill="white" fillOpacity="0.6" />
                <circle cx="136" cy="38" r="3" fill="white" fillOpacity="0.6" />
                <circle cx="148" cy="38" r="3" fill="white" fillOpacity="0.6" />
                <polygon points="118,56 128,48 118,48" fill="white" fillOpacity="0.15" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
