import {
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  Eye,
  Globe,
  Lock,
  MessageCircle,
  Shield,
  ShieldCheck,
  Users,
} from "lucide-react"

const highlights = [
  { icon: Globe, value: "90+", label: "Embassies Served" },
  { icon: ShieldCheck, value: "100%", label: "Security Compliance" },
  { icon: Clock, value: "4hr", label: "Avg. Clearance Time" },
  { icon: Award, value: "20+", label: "Years in Diplomacy" },
]

const services = [
  {
    title: "Embassy & Consulate Support",
    desc: "Comprehensive logistics for diplomatic missions — from household effects relocations to office equipment shipments and event freight.",
    items: ["Diplomatic pouch handling", "Household effects for embassy staff", "Office relocation & furniture freight", "Duty-free clearance facilitation"],
  },
  {
    title: "Government Cargo",
    desc: "Secure, documented freight solutions for government ministries, defence agencies, and inter-governmental organisations with full compliance.",
    items: ["Ministry & department cargo", "Defence logistics (non-armament)", "Inter-governmental transfers", "UNSC & IGO shipment handling"],
  },
  {
    title: "Classified & Sensitive Shipments",
    desc: "Handling of sensitive documents, cultural heritage items, and classified cargo under strict chain-of-custody protocols and non-disclosure agreements.",
    items: ["Full non-disclosure agreements", "Vetted & cleared logistics staff", "Tamper-evident sealing & tracking", "Direct-to-principal delivery only"],
  },
]

const process = [
  { n: "01", title: "Initial Briefing", desc: "We hold a confidential briefing with the requesting mission or department to understand the nature, sensitivity, and timeline of the shipment." },
  { n: "02", title: "Security Vetting", desc: "Assigned staff undergo identity verification and, where required, clearance checks in line with the client's security protocols." },
  { n: "03", title: "Documentation Preparation", desc: "Our specialists prepare all diplomatic notes, customs declarations, exemption certificates, and waybills required for legal passage." },
  { n: "04", title: "Secure Collection", desc: "Cargo is collected by vetted personnel in secure, unmarked vehicles. Chain-of-custody records begin at this point." },
  { n: "05", title: "Transit Management", desc: "Shipments are escorted or monitored in real time through every transit point, with direct communication maintained throughout." },
  { n: "06", title: "Verified Delivery", desc: "Cargo is delivered exclusively to the named principal with a signed and witnessed proof-of-delivery record and a full audit trail." },
]

const whyUs = [
  { icon: Lock, title: "Absolute Discretion", desc: "All diplomatic operations are conducted under strict NDAs. Your mission and its cargo details remain fully confidential at every stage." },
  { icon: ShieldCheck, title: "Security-cleared Personnel", desc: "Key staff involved in sensitive consignments hold appropriate government security clearances and undergo regular background checks." },
  { icon: Users, title: "Dedicated Mission Team", desc: "A named account team is assigned to your mission — familiar with your protocols, your staff, and your recurring logistics needs." },
  { icon: Eye, title: "Full Audit Trail", desc: "Every movement, handover, and document is recorded and archived, providing a complete and irrefutable chain of custody." },
]

export function DiplomaticServicesPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* ── Hero Banner ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden -mb-px bg-linear-to-b from-[#2459d8] to-[#1a3faf] pb-28 pt-20 text-white">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="max-w-[660px]">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-1.5 text-sm font-semibold backdrop-blur-sm">
              <Globe className="h-4 w-4" />
              Diplomatic Services
            </div>
            <h1 className="text-[2.8rem] font-extrabold leading-tight">
              Trusted Logistics for <span className="text-blue-200">Diplomatic Missions</span>
            </h1>
            <p className="mt-5 max-w-[520px] text-[1rem] leading-relaxed text-white/85">
              Specialised freight and logistics for embassies, government agencies, and international organisations — handled with absolute security, discretion, and expertise.
            </p>
            <nav className="mt-5 flex items-center gap-2 text-[0.82rem] text-white/65">
              <a href="/" className="hover:text-white">Home</a>
              <span>/</span>
              <a href="/services" className="hover:text-white">Services</a>
              <span>/</span>
              <span className="font-semibold text-white">Diplomatic Services</span>
            </nav>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-0 right-[5%] top-0 flex items-center opacity-[0.08] lg:opacity-[0.12]">
          <Globe className="h-[340px] w-[340px]" strokeWidth={0.6} />
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
            <h2 className="mt-2 text-[1.9rem] font-extrabold text-slate-900">Diplomatic Logistics Services</h2>
            <p className="mx-auto mt-3 max-w-[540px] text-[0.95rem] leading-relaxed text-slate-500">
              From embassy relocations to classified cargo, our team has the clearances, experience, and discretion your mission demands.
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
            <h2 className="mt-2 text-[1.9rem] font-extrabold text-slate-900">Why Choose Our Diplomatic Services?</h2>
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
                  <Globe className="h-3.5 w-3.5" />
                  Diplomatic Logistics Specialists
                </span>
                <h2 className="mt-5 text-[2rem] font-extrabold leading-tight text-white">
                  Need a Discreet,<br className="hidden md:block" /> Trusted Logistics Partner?
                </h2>
                <p className="mt-3 max-w-[480px] text-[0.95rem] leading-relaxed text-white/75">
                  Speak with our diplomatic logistics team for a confidential consultation. All enquiries are handled with complete discretion and professionalism.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  {[
                    { icon: Lock, text: "Full Confidentiality" },
                    { icon: Shield, text: "Security-cleared Staff" },
                    { icon: Clock, text: "24/7 Mission Support" },
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
                  Request a Consultation
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href="https://wa.me/233543212188" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-[0.92rem] font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20">
                  <MessageCircle className="h-4 w-4" />
                  Message Us
                </a>
                <p className="text-center text-[0.75rem] text-white/50">All enquiries are strictly confidential</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
