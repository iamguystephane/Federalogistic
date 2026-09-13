import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Globe,
  Layers,
  Package,
  Plane,
  Shield,
  Ship,
  Star,
  Truck,
  Zap,
} from "lucide-react"
import { asset } from "../lib/asset"

const services = [
  {
    id: "sea-freight",
    icon: Ship,
    label: "Sea / Ocean Freight",
    image: "service2.jpg",
    description:
      "Comprehensive maritime shipping solutions connecting businesses worldwide. From full container loads to groupage cargo, we ensure your goods travel safely across every ocean.",
    features: ["Full Container Load (FCL)", "Less Container Load (LCL)", "Reefer & Hazardous Cargo", "Port-to-Port & Door-to-Door"],
    href: "/services/sea-freight",
  },
  {
    id: "road",
    icon: Truck,
    label: "Road Transportation",
    image: "service3.jpg",
    description:
      "Efficient ground logistics across domestic and international corridors. Our modern fleet delivers on schedule with real-time tracking and flexible routing options.",
    features: ["FTL & LTL Shipping", "Cross-border Transport", "Last-mile Delivery", "Temperature-controlled Loads"],
    href: "/services/road",
  },
  {
    id: "air-freight",
    icon: Plane,
    label: "Air Freight",
    image: "service1.jpg",
    description:
      "Time-critical shipments demand speed. Our air freight network spans major airports globally, providing express and deferred options with full cargo security.",
    features: ["Express Air Cargo", "Charter Flights Available", "Dangerous Goods Handling", "Door-to-Door Service"],
    href: "/services/air-freight",
  },
  {
    id: "warehousing",
    icon: Layers,
    label: "Warehousing",
    image: "service5.jpg",
    description:
      "State-of-the-art storage facilities near major transport hubs. Our bonded and climate-controlled warehouses keep your inventory secure and distribution-ready.",
    features: ["Bonded Warehousing", "Climate-controlled Zones", "Inventory Management System", "24/7 Security & CCTV"],
    href: "/services/warehousing",
  },
  {
    id: "packaging",
    icon: Package,
    label: "Packaging & Storage",
    image: "service6.jpg",
    description:
      "Professional packing expertise that shields your cargo from origin to destination. Premium materials, custom crating, and long-term storage solutions for every need.",
    features: ["Custom Crating & Casing", "Fragile Item Specialists", "Industrial Packaging", "Long-term Storage Plans"],
    href: "/services/packaging",
  },
  {
    id: "diplomatic",
    icon: Globe,
    label: "Diplomatic Services",
    image: "service4.jpg",
    description:
      "Specialized logistics for embassies, government agencies, and international organisations. Discrete handling, top-tier security, and guaranteed chain of custody.",
    features: ["Embassy & Consulate Support", "Government Cargo Clearance", "Classified Shipment Handling", "Secure Chain of Custody"],
    href: "/services/diplomatic",
  },
]

const networkStats = [
  { value: "150+", label: "Countries Served" },
  { value: "50K+", label: "Shipments Completed" },
  { value: "99.7%", label: "On-time Delivery" },
  { value: "24/7", label: "Expert Support" },
]

const advantages = [
  {
    icon: Shield,
    title: "Full Cargo Insurance",
    desc: "Every shipment is covered end-to-end. Our comprehensive cargo insurance gives you total peace of mind, whatever the route or cargo type.",
  },
  {
    icon: Zap,
    title: "Real-time Tracking",
    desc: "Monitor your shipment at every stage with live tracking updates, automated alerts, and a dedicated shipment dashboard.",
  },
  {
    icon: Star,
    title: "Dedicated Account Management",
    desc: "A personal logistics expert assigned to your account — familiar with your business, proactive about your shipments.",
  },
]

export function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* ── Banner ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden -mb-px bg-linear-to-b from-[#2459d8] to-[#1a3faf] pb-28 pt-20 text-center text-white">
        <div className="px-5">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-1.5 text-sm font-semibold backdrop-blur-sm">
            <Globe className="h-4 w-4" />
            Worldwide Logistics
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-tight">Our Services</h1>
          <p className="mx-auto mt-4 max-w-[520px] text-[1rem] leading-relaxed text-white/85">
            End-to-end logistics solutions designed to move your cargo faster, safer, and smarter across every corner of the globe.
          </p>
          <nav className="mt-5 flex items-center justify-center gap-2 text-[0.82rem] text-white/70">
            <a href="/" className="hover:text-white">Home</a>
            <span>/</span>
            <span className="font-semibold text-white">Services</span>
          </nav>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style={{ height: 100 }} className="block w-full">
            <path fill="#f8fafc" d="M0,70 C250,95 480,95 700,30 C860,0 1100,50 1440,65 L1440,100 L0,100 Z" />
          </svg>
        </div>
      </section>

      {/* ── What We Offer intro ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1200px] px-5 pt-14 pb-4 text-center">
        <p className="text-[0.75rem] font-extrabold uppercase tracking-[0.2em] text-blue-600">What We Offer</p>
        <h2 className="mt-2 text-[2rem] font-extrabold text-slate-900">Comprehensive Logistics Solutions</h2>
        <p className="mx-auto mt-3 max-w-[600px] text-[0.95rem] leading-relaxed text-slate-500">
          From ocean freight to diplomatic cargo, our portfolio covers every logistics challenge your business faces — delivered with precision, reliability, and care.
        </p>
      </section>

      {/* ── Service cards grid ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1200px] px-5 py-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ id, icon: Icon, label, image, description, features, href }) => (
            <div
              key={id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-300 hover:shadow hover:shadow-blue-950/15"
            >
              <div className="pointer-events-none absolute -right-12 top-20 h-40 w-40 rounded-full border-[18px] border-blue-100/80 transition-transform duration-500 group-hover:scale-125 group-hover:border-blue-200" />
              <div className="pointer-events-none absolute -left-20 top-6 h-52 w-52 rounded-full border-[20px] border-cyan-100/70 transition-transform duration-500 group-hover:rotate-12" />

              <div className="relative h-48 overflow-hidden">
                <img
                  src={asset(image)}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/86 via-blue-800/34 to-blue-500/10 transition-colors duration-300 group-hover:from-blue-950/92 group-hover:via-blue-600/40" />
                <div className="absolute bottom-0 left-0 h-1.5 w-full bg-gradient-to-r from-[#283594] via-[#009ee0] to-[#1d4ed8]" />
                <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-950/25 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6" strokeWidth={2.2} />
                </div>
                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="text-[1.2rem] font-extrabold text-white drop-shadow-sm">{label}</h3>
                </div>
              </div>

              <div className="relative flex flex-1 flex-col p-6">
                <p className="mt-2 text-[0.85rem] leading-relaxed text-slate-500 flex-1">{description}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {features.map((f) => (
                    <span
                      key={f}
                      className="rounded-full bg-blue-50 px-2.5 py-1 text-[0.72rem] font-semibold text-blue-700 transition-colors group-hover:bg-blue-600 group-hover:text-white"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <a
                  href={href}
                  className="mt-5 flex items-center gap-1.5 text-[0.85rem] font-bold text-blue-600 transition-all hover:gap-2.5 group-hover:text-blue-700"
                >
                  Learn more
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Global Presence / Network Services ───────────────────────────── */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left: text */}
            <div>
              <p className="text-[0.75rem] font-extrabold uppercase tracking-[0.2em] text-blue-600">Global Presence</p>
              <h2 className="mt-2 text-[1.9rem] font-extrabold leading-tight text-slate-900">Network Services Spanning Every Continent</h2>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-slate-500">
                Our global partner network and in-house operations cover 150+ countries, giving your cargo access to reliable first- and last-mile services wherever it needs to go.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Extensive agent network across 6 continents",
                  "Owned operations in 30+ strategic trade lanes",
                  "Seamless intermodal connectivity",
                  "Local expertise, global standards",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-[0.88rem] text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-blue-500" />
                    {point}
                  </li>
                ))}
              </ul>
              <a href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-[0.88rem] font-bold text-white shadow-sm transition-colors hover:bg-blue-700">
                Talk to Our Team
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* Right: stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {networkStats.map(({ value, label }) => (
                <div key={label} className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-6 text-center shadow-sm">
                  <p className="text-[2.2rem] font-extrabold text-blue-600">{value}</p>
                  <p className="mt-1 text-[0.82rem] font-semibold text-slate-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Our Services ───────────────────────────────────────── */}
      <section className="py-16">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="mb-10 text-center">
            <p className="text-[0.75rem] font-extrabold uppercase tracking-[0.2em] text-blue-600">Our Advantages</p>
            <h2 className="mt-2 text-[1.9rem] font-extrabold text-slate-900">Why Choose Our Services</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {advantages.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600">
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="mt-5 text-[1rem] font-extrabold text-slate-900">{title}</h3>
                <p className="mt-2 text-[0.85rem] leading-relaxed text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="px-5 pb-16">
        <div className="mx-auto max-w-[1200px]">
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-8 py-14 text-center">
            {/* Decorative blurred orbs */}
            <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-blue-600 opacity-20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-indigo-500 opacity-20 blur-3xl" />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[0.78rem] font-bold uppercase tracking-widest text-white/80 backdrop-blur-sm">
                <Zap className="h-3.5 w-3.5 text-yellow-400" />
                Get Started Today
              </span>

              <h2 className="mx-auto mt-5 max-w-[560px] text-[2.2rem] font-extrabold leading-tight text-white">
                Ready to Transform Your Logistics?
              </h2>
              <p className="mx-auto mt-4 max-w-[480px] text-[0.95rem] leading-relaxed text-white/70">
                Tell us about your shipment and our logistics experts will tailor a solution that fits your schedule, budget, and destination.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="/contact"
                  className="flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-[0.9rem] font-bold text-slate-900 shadow-lg transition-all hover:bg-blue-50 hover:shadow"
                >
                  Get a Free Quote
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/track-order"
                  className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 text-[0.9rem] font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
                >
                  Track a Shipment
                </a>
              </div>

              {/* Trust strip */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-6 border-t border-white/10 pt-8">
                {[
                  { icon: Shield, label: "Fully Insured Cargo" },
                  { icon: Clock, label: "24/7 Expert Support" },
                  { icon: Globe, label: "150+ Countries" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-[0.8rem] font-semibold text-white/60">
                    <Icon className="h-4 w-4 text-blue-400" />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
