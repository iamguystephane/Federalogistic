import { MapPin } from "lucide-react"
import { routeTypes } from "../../data/contact"
import { useSiteSettings } from "../../lib/siteSettings"

export function GlobalNetwork() {
  const { contactAddress } = useSiteSettings()
  const mapSrc = contactAddress
    ? `https://maps.google.com/maps?q=${encodeURIComponent(contactAddress)}&output=embed&z=15`
    : null

  return (
    <section className="bg-[#f8fafc] py-16">
      <div className="mx-auto max-w-[1200px] px-5 text-center">
        <h2 className="text-[2rem] font-extrabold text-slate-950">Our Global Network</h2>
        <p className="mx-auto mt-4 max-w-[700px] text-[1rem] text-slate-500">
          We operate a global network of shipping routes and logistics partners to serve you better.
        </p>

        <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
          {/* Map area */}
          <div className="relative h-[340px] bg-[#e8f0fe]">
            {mapSrc ? (
              <iframe
                title="Office Location"
                src={mapSrc}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                allowFullScreen
              />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-400 text-sm font-semibold">
                No office address set — configure it in the admin dashboard.
              </div>
            )}

            {/* HQ pin card */}
            {contactAddress && (
              <div className="absolute bottom-4 left-4 z-10">
                <div className="flex items-start gap-3 rounded-xl bg-white px-4 py-3 shadow-lg max-w-60 text-left">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[0.82rem] font-extrabold text-slate-900">Our Headquarters</p>
                    <p className="mt-0.5 text-[0.78rem] text-slate-500 leading-snug">{contactAddress}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Route type tabs */}
          <div className="grid grid-cols-2 divide-x divide-y divide-slate-200 border-t border-slate-200 lg:grid-cols-4 lg:divide-y-0">
            {routeTypes.map((route) => (
              <button
                key={route.label}
                className="flex flex-col items-center gap-2 px-6 py-5 text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-600"
              >
                <route.icon className="h-6 w-6 text-blue-600" />
                <span className="text-[0.85rem] font-semibold">{route.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
