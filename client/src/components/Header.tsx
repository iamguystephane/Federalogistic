import { ChevronDown, Clock, Globe, Layers, Mail, Menu, Package, Phone, Plane, Search, ScanLine, Ship, Truck, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Button } from "./ui/button"
import { navLinks } from "../data/navigation"

import { goToTrackingResult } from "../lib/tracking"
import { useSiteSettings } from "../lib/siteSettings"

const serviceItems = [
  { id: "sea-freight", label: "Sea / Ocean Freight", desc: "Global maritime shipping", icon: Ship, href: "/services/sea-freight" },
  { id: "road", label: "Road Transportation", desc: "Reliable ground freight", icon: Truck, href: "/services/road" },
  { id: "air-freight", label: "Air Freight", desc: "Express air cargo", icon: Plane, href: "/services/air-freight" },
  { id: "warehousing", label: "Warehousing", desc: "Secure storage solutions", icon: Layers, href: "/services/warehousing" },
  { id: "packaging", label: "Packaging & Storage", desc: "Professional packing services", icon: Package, href: "/services/packaging" },
  { id: "diplomatic", label: "Diplomatic Services", desc: "Government & embassy logistics", icon: Globe, href: "/services/diplomatic" },
]

function SearchDropdown({ onClose }: { onClose: () => void }) {
  const [trackingNumber, setTrackingNumber] = useState("")
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [onClose])

  function handleTrack(e: React.FormEvent) {
    e.preventDefault()
    if (trackingNumber.trim()) {
      goToTrackingResult(trackingNumber)
    }
  }

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full z-50 mt-2 w-80 rounded-2xl bg-white p-5 shadow ring-1 ring-slate-200"
    >
      <p className="mb-3 text-[0.95rem] font-bold text-slate-900">Track Your Shipment</p>
      <form onSubmit={handleTrack} className="space-y-3">
        <div className="relative">
          <ScanLine className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            autoFocus
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Enter tracking number..."
            className="h-11 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <Button type="submit" className="h-11 w-full rounded-xl text-sm font-semibold">
          <Search className="h-4 w-4" />
          Track Now
        </Button>
      </form>
    </div>
  )
}

function ServicesDropdown() {
  return (
    <div className="absolute left-1/2 top-full z-50 mt-1 w-[620px] -translate-x-1/2 pt-1">
      {/* Arrow pointer */}
      <div className="mx-auto mb-0 flex w-fit">
        <div className="h-2 w-4 overflow-hidden">
          <div className="mx-auto h-3 w-3 -translate-y-1/2 rotate-45 bg-white shadow-md ring-1 ring-slate-200" />
        </div>
      </div>
      <div className="rounded-2xl bg-white p-4 shadow ring-1 ring-slate-200">
        <p className="mb-3 px-1 text-[0.7rem] font-extrabold uppercase tracking-widest text-slate-400">Our Services</p>
        <div className="grid grid-cols-2 gap-1">
          {serviceItems.map(({ id, label, desc, icon: Icon, href }) => (
            <a
              key={id}
              href={href}
              className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-blue-50 group"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 transition-colors group-hover:bg-blue-600">
                <Icon className="h-5 w-5 text-blue-600 transition-colors group-hover:text-white" />
              </div>
              <div>
                <p className="text-[0.84rem] font-bold text-slate-900 group-hover:text-blue-700">{label}</p>
                <p className="text-[0.75rem] text-slate-500">{desc}</p>
              </div>
            </a>
          ))}
        </div>
        <div className="mt-3 border-t border-slate-100 pt-3 px-1">
          <a href="/services" className="flex items-center gap-1.5 text-[0.8rem] font-bold text-blue-600 hover:underline">
            View all services
            <ChevronDown className="h-3.5 w-3.5 -rotate-90" />
          </a>
        </div>
      </div>
    </div>
  )
}

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const servicesTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const siteInfo = useSiteSettings()

  function openServices() {
    if (servicesTimer.current) clearTimeout(servicesTimer.current)
    setServicesOpen(true)
  }
  function closeServices() {
    servicesTimer.current = setTimeout(() => setServicesOpen(false), 120)
  }

  return (
    <header className="relative z-40" style={{ boxShadow: "none", filter: "none", borderBottom: "none" }}>
      {/* Top bar */}
      <div className="bg-white text-[#2459d8]">
        <div className="mx-auto flex h-[38px] max-w-[1200px] items-center justify-between px-5 text-sm font-semibold">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 fill-white/20" />
              Open 24/7 for Global Logistics
            </span>
            {siteInfo.contactPhone && (
              <span className="hidden items-center gap-2 sm:flex">
                <Phone className="h-4 w-4 fill-white/20" />
                {siteInfo.contactPhone}
              </span>
            )}
          </div>
          {siteInfo.contactEmail && (
            <span className="hidden items-center gap-2 md:flex">
              <Mail className="h-4 w-4 fill-white/20" />
              {siteInfo.contactEmail}
            </span>
          )}
        </div>
      </div>

      {/* Main nav */}
      <nav className="bg-[#2459d8] py-3">
        <div className="mx-auto flex h-17 max-w-300 items-center justify-between px-5">
          {/* Logo */}
          <a href="/" aria-label="Federalogistic home" className="flex items-center select-none">
            <img src="/full-logo.png" alt="Federalogistic" className="h-11 w-auto object-contain" />
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 text-sm font-semibold text-white lg:flex">
            {navLinks.map((link) => {
              const path = window.location.pathname.replace(/\/$/, "") || "/"
              const isActive = link.href === "/"
                ? path === "/"
                : path === link.href || (link.hasDropdown && path.startsWith(link.href + "/"))

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={openServices}
                    onMouseLeave={closeServices}
                  >
                    <a
                      href={link.href}
                      className="relative flex items-center gap-1 rounded-lg px-3 py-2 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                    >
                      {link.label}
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
                      {isActive && (
                        <span className="absolute bottom-0 left-1/2 h-1.5 w-8 -translate-x-1/2 rounded-full bg-white" />
                      )}
                    </a>
                    {servicesOpen && <ServicesDropdown />}
                  </div>
                )
              }
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative flex items-center gap-1 rounded-lg px-3 py-2 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 h-1.5 w-8 -translate-x-1/2 rounded-full bg-white" />
                  )}
                </a>
              )
            })}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Search toggle */}
            <div className="relative">
              <button
                aria-label="Search / track shipment"
                onClick={() => setSearchOpen((v) => !v)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10"
              >
                {searchOpen ? <X className="h-5 w-5" color="white" /> : <Search className="h-5 w-5" color="white" />}
              </button>
              {searchOpen && <SearchDropdown onClose={() => setSearchOpen(false)} />}
            </div>

            <Button
              size="nav"
              className="hidden rounded-lg px-5 sm:flex bg-white text-[#2459d8] font-bold shadow-none hover:bg-blue-50 hover:shadow-md hover:shadow-blue-900/20 transition-shadow"
              onClick={() => (window.location.href = "/contact")}
            >
              Get Quote
            </Button>

            {/* Hamburger — mobile only */}
            <button
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" color="white" /> : <Menu className="h-5 w-5" color="white" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu drawer */}
      {mobileOpen && (
        <div className="absolute left-0 top-full w-full border-t border-slate-100 bg-white shadow-lg lg:hidden">
          <nav className="mx-auto max-w-[1200px] px-5 py-3">
            {navLinks.map((link) => {
              if (link.hasDropdown) {
                return (
                  <div key={link.href}>
                    <button
                      onClick={() => setMobileServicesOpen((v) => !v)}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                    >
                      {link.label}
                      <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`} />
                    </button>
                    {mobileServicesOpen && (
                      <div className="mb-1 ml-3 space-y-0.5 border-l-2 border-blue-100 pl-3">
                        {serviceItems.map(({ id, label, icon: Icon, href }) => (
                          <a
                            key={id}
                            href={href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[0.84rem] font-semibold text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-600"
                          >
                            <Icon className="h-4 w-4 shrink-0 text-blue-500" />
                            {label}
                          </a>
                        ))}
                        <a
                          href="/services"
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-[0.8rem] font-bold text-blue-600 hover:underline"
                        >
                          View all services →
                        </a>
                      </div>
                    )}
                  </div>
                )
              }
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                >
                  {link.label}
                </a>
              )
            })}
            <div className="mt-3 border-t border-slate-100 pt-3 pb-2">
              <Button className="h-10 w-full rounded-lg text-sm font-semibold" onClick={() => (window.location.href = "/contact")}>
                Get Quote
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
