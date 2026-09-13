import {
  Anchor,
  ArrowRight,
  CheckCircle2,
  Clock,
  Globe,
  MessageCircle,
  Package,
  Shield,
  Ship,
  TrendingUp,
  Truck,
  Zap,
} from "lucide-react"

const highlights = [
  { icon: Globe, value: "150+", label: "Ports Worldwide" },
  { icon: Ship, value: "20K+", label: "Containers Shipped" },
  { icon: Clock, value: "99.4%", label: "Schedule Reliability" },
  { icon: TrendingUp, value: "40%", label: "Avg. Cost Savings" },
]

const services = [
  {
    title: "Full Container Load (FCL)",
    desc: "Exclusive use of a container for large-volume shipments. Maximum security, predictable transit times, and cost efficiency when you fill the box.",
    items: ["20ft, 40ft & 40ft HC containers", "Dedicated carrier booking", "Direct port-to-port routing", "Priority loading & unloading"],
  },
  {
    title: "Less Container Load (LCL)",
    desc: "Share container space with other shippers — ideal for smaller consignments that don't need a full box. Pay only for the space you use.",
    items: ["Flexible minimum shipment size", "Consolidated cargo services", "Weekly sailings on major lanes", "Transparent per-CBM pricing"],
  },
  {
    title: "Reefer & Specialised Cargo",
    desc: "Temperature-controlled and out-of-gauge solutions for cargo that demands extra care. From fresh produce to heavy machinery.",
    items: ["Temperature range: -25°C to +25°C", "Hazardous materials (IMO classes)", "Out-of-gauge & project cargo", "Continuous monitoring en route"],
  },
]

const process = [
  { n: "01", title: "Request a Quote", desc: "Share your cargo details online or speak with our sea freight team for an instant, transparent quote." },
  { n: "02", title: "Booking & Documentation", desc: "We handle booking confirmations, bills of lading, customs paperwork, and carrier coordination." },
  { n: "03", title: "Cargo Collection", desc: "Our team arranges inland transport to the port of loading, including stuffing and container sealing." },
  { n: "04", title: "Ocean Transit", desc: "Your cargo sails under our full management with real-time vessel tracking and proactive updates." },
  { n: "05", title: "Customs Clearance", desc: "Our certified customs brokers clear your shipment at the destination port swiftly and compliantly." },
  { n: "06", title: "Final Delivery", desc: "Door-to-door service completes the journey — we deliver directly to your warehouse or end customer." },
]

const whyUs = [
  { icon: Shield, title: "End-to-end Cargo Insurance", desc: "Full marine insurance cover from origin to destination, protecting your goods against all major risks at sea." },
  { icon: Zap, title: "Live Shipment Tracking", desc: "A real-time dashboard shows vessel position, estimated arrival, and milestone updates — available 24/7." },
  { icon: Anchor, title: "Global Port Network", desc: "Direct connections to 150+ ports across Asia, Europe, the Americas, Africa, and the Middle East." },
  { icon: Package, title: "Customs Expertise", desc: "Our experienced brokers ensure compliant, delay-free clearance in every jurisdiction we operate." },
]

export function SeaFreightPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* ── Hero Banner ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden -mb-px bg-linear-to-b from-[#2459d8] to-[#0c2d8e] pb-28 pt-20 text-white">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="max-w-[660px]">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-1.5 text-sm font-semibold backdrop-blur-sm">
              <Ship className="h-4 w-4" />
              Sea / Ocean Freight
            </div>
            <h1 className="text-[2.8rem] font-extrabold leading-tight">
              Global Ocean Freight <span className="text-cyan-300">Solutions</span>
            </h1>
            <p className="mt-5 max-w-[520px] text-[1rem] leading-relaxed text-white/85">
              Reliable, cost-efficient sea freight connecting your business to every major port in the world — backed by deep carrier relationships and real-time visibility.
            </p>
            <nav className="mt-5 flex items-center gap-2 text-[0.82rem] text-white/65">
              <a href="/" className="hover:text-white">Home</a>
              <span>/</span>
              <a href="/services" className="hover:text-white">Services</a>
              <span>/</span>
              <span className="font-semibold text-white">Sea / Ocean Freight</span>
            </nav>
          </div>
        </div>

        {/* Large decorative ship icon */}
        <div className="pointer-events-none absolute bottom-0 right-[5%] top-0 flex items-center opacity-[0.07] lg:opacity-[0.12]">
          <Ship className="h-[340px] w-[340px]" strokeWidth={0.6} />
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style={{ height: 100 }} className="block w-full">
            <path fill="#f8fafc" d="M0,70 C250,95 480,95 700,30 C860,0 1100,50 1440,65 L1440,100 L0,100 Z" />
          </svg>
        </div>
      </section>

      {/* ── Key Stats ────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1200px] px-5 py-12">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {highlights.map(({ icon: Icon, value, label }) => (
            <div key={label} className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
                <Icon className="h-5 w-5 text-blue-600" />
              </div>
              <p className="text-[1.9rem] font-extrabold text-blue-600">{value}</p>
              <p className="mt-0.5 text-[0.78rem] font-semibold text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services breakdown ───────────────────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="mb-10 text-center">
            <p className="text-[0.75rem] font-extrabold uppercase tracking-[0.2em] text-blue-600">What's Included</p>
            <h2 className="mt-2 text-[1.9rem] font-extrabold text-slate-900">Sea Freight Services</h2>
            <p className="mx-auto mt-3 max-w-[540px] text-[0.95rem] leading-relaxed text-slate-500">
              Whether you're shipping a small LCL consignment or an entire fleet of containers, we have a tailored solution ready.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {services.map(({ title, desc, items }) => (
              <div key={title} className="group rounded-2xl border border-blue-100 bg-[#f8fafc] p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-300 hover:bg-white hover:shadow hover:shadow-blue-950/10">
                <h3 className="text-[1rem] font-extrabold text-slate-900 transition-colors group-hover:text-blue-700">{title}</h3>
                <p className="mt-2 text-[0.85rem] leading-relaxed text-slate-500">{desc}</p>
                <ul className="mt-5 space-y-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[0.84rem] text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="mb-10 text-center">
            <p className="text-[0.75rem] font-extrabold uppercase tracking-[0.2em] text-blue-600">The Process</p>
            <h2 className="mt-2 text-[1.9rem] font-extrabold text-slate-900">How It Works</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {process.map(({ n, title, desc }) => (
              <div key={n} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-[0.8rem] font-extrabold text-white">
                  {n}
                </div>
                <div>
                  <p className="font-extrabold text-slate-900">{title}</p>
                  <p className="mt-1 text-[0.84rem] leading-relaxed text-slate-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ────────────────────────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="mb-10 text-center">
            <p className="text-[0.75rem] font-extrabold uppercase tracking-[0.2em] text-blue-600">Our Edge</p>
            <h2 className="mt-2 text-[1.9rem] font-extrabold text-slate-900">Why Ship With Us?</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-4 font-extrabold text-slate-900">{title}</h3>
                <p className="mt-1.5 text-[0.83rem] leading-relaxed text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="px-5 py-16">
        <div className="mx-auto max-w-[1200px]">
          <div className="relative overflow-hidden rounded-3xl">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a3faf] to-[#0c2d8e]" />
            {/* Wave decoration */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-10">
              <svg className="absolute -bottom-10 left-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
                <path fill="white" d="M0,192 C240,256 480,128 720,192 C960,256 1200,128 1440,192 L1440,320 L0,320 Z" />
              </svg>
              <svg className="absolute -bottom-4 left-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
                <path fill="white" d="M0,224 C360,288 720,160 1080,224 C1260,256 1380,208 1440,224 L1440,320 L0,320 Z" />
              </svg>
            </div>
            {/* Orb accents */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-cyan-500 opacity-20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 left-10 h-60 w-60 rounded-full bg-blue-300 opacity-15 blur-3xl" />

            <div className="relative z-10 grid items-center gap-8 px-8 py-14 lg:grid-cols-[1fr_auto]">
              {/* Left: text */}
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-[0.75rem] font-bold uppercase tracking-widest text-white/80 backdrop-blur-sm">
                  <Ship className="h-3.5 w-3.5" />
                  Sea Freight Specialists
                </span>
                <h2 className="mt-5 text-[2rem] font-extrabold leading-tight text-white">
                  Ready to Ship Your Cargo<br className="hidden md:block" /> Across the Seas?
                </h2>
                <p className="mt-3 max-w-[480px] text-[0.95rem] leading-relaxed text-white/70">
                  Get a tailored quote in minutes. Our sea freight experts are on hand to plan the optimal route, carrier, and container solution for your shipment.
                </p>

                {/* Trust badges */}
                <div className="mt-6 flex flex-wrap gap-4">
                  {[
                    { icon: Shield, text: "Cargo Insurance Included" },
                    { icon: Truck, text: "Door-to-Door Available" },
                    { icon: Clock, text: "24/7 Shipment Support" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2 text-[0.82rem] font-semibold text-white/75">
                      <Icon className="h-4 w-4 text-cyan-300" />
                      {text}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: action card */}
              <div className="flex shrink-0 flex-col gap-3 lg:min-w-[240px]">
                <a
                  href="/contact"
                  className="flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-[0.92rem] font-bold text-slate-900 shadow-lg transition-all hover:bg-blue-50 hover:shadow"
                >
                  Get a Free Quote
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="https://wa.me/233543212188"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-[0.92rem] font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
                >
                  <MessageCircle className="h-4 w-4" />
                  Message Us
                </a>
                <p className="text-center text-[0.75rem] text-white/50">Average response time: under 2 hours</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
