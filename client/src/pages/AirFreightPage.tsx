import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Globe,
  MessageCircle,
  Plane,
  Shield,
  Timer,
  Zap,
} from "lucide-react"

const highlights = [
  { icon: Globe, value: "200+", label: "Airports Worldwide" },
  { icon: Plane, value: "15K+", label: "Shipments Flown" },
  { icon: Timer, value: "48hr", label: "Avg. Express Transit" },
  { icon: Clock, value: "24/7", label: "Flight Monitoring" },
]

const services = [
  {
    title: "Express Air Cargo",
    desc: "When speed is non-negotiable, our express air freight service connects you to every major global destination with guaranteed priority handling.",
    items: ["Next-flight-out options available", "Priority boarding and handling", "Direct and one-stop routing", "Real-time flight tracking updates"],
  },
  {
    title: "Deferred & Economy Air",
    desc: "Reduce costs without sacrificing reliability. Our deferred air service groups your cargo for economy rates while maintaining consistent schedules.",
    items: ["Scheduled weekly departures", "Consolidated cargo services", "Ideal for non-urgent high-volume loads", "Competitive per-kg pricing"],
  },
  {
    title: "Charter & Specialised Freight",
    desc: "Full aircraft charters and specialist handling for oversized, high-value, or sensitive cargo that standard services cannot accommodate.",
    items: ["Dangerous goods (IATA regulated)", "Valuables & fine art handling", "Pharmaceutical cold chain", "Humanitarian & relief cargo"],
  },
]

const process = [
  { n: "01", title: "Request a Quote", desc: "Share your cargo dimensions, weight, and destination. Receive a detailed air freight quote within the hour." },
  { n: "02", title: "Booking & AWB Issuance", desc: "We confirm your flight booking and issue an Air Waybill (AWB) with full shipment details and routing information." },
  { n: "03", title: "Cargo Collection", desc: "Our team arranges pickup from your premises and transports the cargo to the departure airport facility." },
  { n: "04", title: "Security Screening", desc: "All cargo undergoes mandatory security screening in compliance with IATA and local aviation authority requirements." },
  { n: "05", title: "Air Transit", desc: "Your shipment flies on scheduled or chartered services with full AWB tracking at every point of transit." },
  { n: "06", title: "Customs & Delivery", desc: "We clear your cargo at the destination airport and arrange last-mile delivery to your specified address." },
]

const whyUs = [
  { icon: Zap, title: "Unmatched Speed", desc: "Express routing and priority handling get your cargo airborne faster — with the shortest possible transit times guaranteed." },
  { icon: Shield, title: "Full Cargo Insurance", desc: "All air shipments are covered from point of collection to final delivery, including in-transit and transit risk." },
  { icon: Plane, title: "Global Airline Partnerships", desc: "We leverage preferred rates and blocked space agreements with over 50 major airlines for reliable capacity." },
  { icon: Globe, title: "Customs Expertise", desc: "Our certified air freight brokers clear your shipment at destination airports with minimal delays and full compliance." },
]

export function AirFreightPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* ── Hero Banner ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden -mb-px bg-linear-to-b from-[#2459d8] to-[#1a3faf] pb-28 pt-20 text-white">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="max-w-[660px]">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-1.5 text-sm font-semibold backdrop-blur-sm">
              <Plane className="h-4 w-4" />
              Air Freight
            </div>
            <h1 className="text-[2.8rem] font-extrabold leading-tight">
              Express Air Freight <span className="text-blue-200">Solutions</span>
            </h1>
            <p className="mt-5 max-w-[520px] text-[1rem] leading-relaxed text-white/85">
              Speed, security, and global reach — our air freight service connects your cargo to over 200 airports worldwide with priority handling and real-time tracking.
            </p>
            <nav className="mt-5 flex items-center gap-2 text-[0.82rem] text-white/65">
              <a href="/" className="hover:text-white">Home</a>
              <span>/</span>
              <a href="/services" className="hover:text-white">Services</a>
              <span>/</span>
              <span className="font-semibold text-white">Air Freight</span>
            </nav>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-0 right-[5%] top-0 flex items-center opacity-[0.08] lg:opacity-[0.12]">
          <Plane className="h-[340px] w-[340px]" strokeWidth={0.6} />
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
            <h2 className="mt-2 text-[1.9rem] font-extrabold text-slate-900">Air Freight Services</h2>
            <p className="mx-auto mt-3 max-w-[540px] text-[0.95rem] leading-relaxed text-slate-500">
              From next-flight-out express to economy deferred, we have an air freight option for every urgency and budget.
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
            <h2 className="mt-2 text-[1.9rem] font-extrabold text-slate-900">Why Choose Our Air Freight?</h2>
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
            <div className="absolute inset-0 bg-gradient-to-br from-[#2459d8] to-[#0c2d8e]" />
            <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-10">
              <svg className="absolute -bottom-10 left-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
                <path fill="white" d="M0,192 C240,256 480,128 720,192 C960,256 1200,128 1440,192 L1440,320 L0,320 Z" />
              </svg>
            </div>
            <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue-300 opacity-20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 left-10 h-60 w-60 rounded-full bg-blue-200 opacity-15 blur-3xl" />

            <div className="relative z-10 grid items-center gap-8 px-8 py-14 lg:grid-cols-[1fr_auto]">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-[0.75rem] font-bold uppercase tracking-widest text-white/80 backdrop-blur-sm">
                  <Plane className="h-3.5 w-3.5" />
                  Air Freight Specialists
                </span>
                <h2 className="mt-5 text-[2rem] font-extrabold leading-tight text-white">
                  Need Your Cargo in the Air<br className="hidden md:block" /> Fast?
                </h2>
                <p className="mt-3 max-w-[480px] text-[0.95rem] leading-relaxed text-white/75">
                  Get a tailored air freight quote in minutes. Our specialists will find the fastest, most cost-effective routing for your shipment.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  {[
                    { icon: Shield, text: "Cargo Insurance Included" },
                    { icon: Zap, text: "Express Options Available" },
                    { icon: Clock, text: "24/7 Flight Monitoring" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2 text-[0.82rem] font-semibold text-white/75">
                      <Icon className="h-4 w-4 text-cyan-300" />
                      {text}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex shrink-0 flex-col gap-3 lg:min-w-[240px]">
                <a href="/contact" className="flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-[0.92rem] font-bold text-slate-900 shadow-lg transition-all hover:bg-blue-50 hover:shadow">
                  Get a Free Quote
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href="https://wa.me/233543212188" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-[0.92rem] font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20">
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
