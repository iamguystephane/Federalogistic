import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Clock,
  Layers,
  Lock,
  MessageCircle,
  Shield,
  Thermometer,
  Truck,
} from "lucide-react"

const highlights = [
  { icon: Layers, value: "12", label: "Warehouse Facilities" },
  { icon: BarChart3, value: "500K+", label: "sq ft Storage Space" },
  { icon: Shield, value: "99.9%", label: "Security Uptime" },
  { icon: Clock, value: "24/7", label: "Access & Monitoring" },
]

const services = [
  {
    title: "Bonded Warehousing",
    desc: "Store dutiable goods under customs control without paying import duties until the cargo is released into the local market — reducing your cash flow burden.",
    items: ["Customs-approved bonded facilities", "Duty deferral on imported goods", "Controlled entry and exit logging", "Ideal for international trade hubs"],
  },
  {
    title: "Climate-controlled Storage",
    desc: "Maintain precise temperature and humidity conditions for sensitive cargo including pharmaceuticals, food products, fine art, and electronics.",
    items: ["Temperature range: -25°C to +25°C", "Humidity-controlled environments", "Cold chain integrity monitoring", "Pharmaceutical GMP compliance"],
  },
  {
    title: "Distribution & Fulfilment",
    desc: "Outsource your pick, pack, and dispatch operations to our fulfilment team. We process orders accurately and ship them on time, every time.",
    items: ["Pick & pack order fulfilment", "Returns management (reverse logistics)", "E-commerce integration support", "Same-day dispatch cut-offs available"],
  },
]

const process = [
  { n: "01", title: "Needs Assessment", desc: "We evaluate your storage requirements, cargo type, volume, and distribution needs to design the right warehousing solution." },
  { n: "02", title: "Space Allocation", desc: "A dedicated storage zone is configured and labelled in our facility, with your cargo specifications and access controls in place." },
  { n: "03", title: "Inbound Receiving", desc: "Our team receives your cargo, inspects it against the packing list, and logs every item into our inventory management system." },
  { n: "04", title: "Storage & Management", desc: "Your goods are stored securely with ongoing inventory tracking, stock-level alerts, and condition monitoring as required." },
  { n: "05", title: "Order Fulfilment", desc: "When you need goods dispatched, our team picks, packs, and prepares them for outbound transport on your schedule." },
  { n: "06", title: "Reporting & Visibility", desc: "Access real-time inventory dashboards and receive regular stock reports so you always know exactly what you hold." },
]

const whyUs = [
  { icon: Lock, title: "High-security Facilities", desc: "24/7 CCTV, access-controlled zones, alarm systems, and on-site security staff protect your inventory around the clock." },
  { icon: BarChart3, title: "Live Inventory Visibility", desc: "Our warehouse management system gives you a real-time view of stock levels, movements, and order statuses at any time." },
  { icon: Thermometer, title: "Specialist Environments", desc: "From ambient to deep-freeze, our facilities accommodate any cargo with strict environmental controls and compliance records." },
  { icon: Truck, title: "Strategic Locations", desc: "Our warehouses are positioned near major ports, airports, and motorway networks for seamless inbound and outbound logistics." },
]

export function WarehousingPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* ── Hero Banner ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden -mb-px bg-linear-to-b from-[#2459d8] to-[#1a3faf] pb-28 pt-20 text-white">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="max-w-[660px]">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-1.5 text-sm font-semibold backdrop-blur-sm">
              <Layers className="h-4 w-4" />
              Warehousing
            </div>
            <h1 className="text-[2.8rem] font-extrabold leading-tight">
              Secure Warehousing &amp; <span className="text-blue-200">Storage Solutions</span>
            </h1>
            <p className="mt-5 max-w-[520px] text-[1rem] leading-relaxed text-white/85">
              Strategically located, high-security warehouse facilities that keep your inventory safe, organised, and ready for distribution — whenever you need it.
            </p>
            <nav className="mt-5 flex items-center gap-2 text-[0.82rem] text-white/65">
              <a href="/" className="hover:text-white">Home</a>
              <span>/</span>
              <a href="/services" className="hover:text-white">Services</a>
              <span>/</span>
              <span className="font-semibold text-white">Warehousing</span>
            </nav>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-0 right-[5%] top-0 flex items-center opacity-[0.08] lg:opacity-[0.12]">
          <Layers className="h-[340px] w-[340px]" strokeWidth={0.6} />
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
            <h2 className="mt-2 text-[1.9rem] font-extrabold text-slate-900">Warehousing Services</h2>
            <p className="mx-auto mt-3 max-w-[540px] text-[0.95rem] leading-relaxed text-slate-500">
              From bonded customs storage to climate-controlled environments and full order fulfilment, we have a warehousing solution for your cargo.
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
            <h2 className="mt-2 text-[1.9rem] font-extrabold text-slate-900">Why Choose Our Warehousing?</h2>
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
                  <Layers className="h-3.5 w-3.5" />
                  Warehousing Specialists
                </span>
                <h2 className="mt-5 text-[2rem] font-extrabold leading-tight text-white">
                  Need a Secure Home<br className="hidden md:block" /> for Your Inventory?
                </h2>
                <p className="mt-3 max-w-[480px] text-[0.95rem] leading-relaxed text-white/75">
                  Tell us your storage requirements and our team will set up a tailored warehousing solution — from a single pallet to thousands of square feet.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  {[
                    { icon: Lock, text: "24/7 Secured Facility" },
                    { icon: Thermometer, text: "Climate Control Available" },
                    { icon: Clock, text: "Flexible Storage Terms" },
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
