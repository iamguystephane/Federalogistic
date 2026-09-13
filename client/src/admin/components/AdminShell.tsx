import { useState } from "react"
import { ChevronRight, DollarSign, LayoutDashboard, LogOut, PackagePlus, Settings, Truck, X } from "lucide-react"
import { clearAdminToken } from "../../lib/api"
import type { AdminView } from "../types"

const navItems = [
  { id: "dashboard", label: "Dashboard",        icon: LayoutDashboard },
  { id: "manage",    label: "Manage Shipments",  icon: Truck },
  { id: "create",    label: "Create Shipment",   icon: PackagePlus },
  { id: "deposits",  label: "Deposits",          icon: DollarSign },
  { id: "settings",  label: "Settings",          icon: Settings },
] as const

export function AdminShell({
  view,
  setView,
  children,
}: {
  view: AdminView
  setView: (v: AdminView) => void
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  function logout() {
    clearAdminToken()
    window.location.replace("/login")
  }

  return (
    <div className="min-h-screen bg-[#f4f6fb] text-slate-900 flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-30 h-17 bg-[#0f1c3f] flex items-center justify-between overflow-hidden px-5 lg:px-8">
        <div className="flex items-center gap-3">
          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-1.5 rounded-lg hover:bg-white/10 transition"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="block h-0.5 w-5 bg-white rounded" />
            <span className="block h-0.5 w-5 bg-white rounded" />
            <span className="block h-0.5 w-5 bg-white rounded" />
          </button>
          {/* Logo */}
          <div className="flex items-end gap-2">
            <img src="/atlas-assets/logo-dark.svg" alt="Federalogistic" className="h-45 w-auto object-contain mb-4" />
            <span className="text-[10px] font-semibold text-white/40 leading-none mb-4">Admin Panel</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-white/8 rounded-lg px-3 py-1.5">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-semibold text-white/80">Active session</span>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/8 px-3 py-2 text-sm font-bold text-white/70 hover:border-red-400/40 hover:bg-red-500/15 hover:text-red-300 transition"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0f1c3f] flex flex-col transition-transform duration-200 lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Mobile close */}
          <div className="flex items-center justify-between p-5 lg:hidden">
            <span className="text-sm font-extrabold text-white">Menu</span>
            <button onClick={() => setSidebarOpen(false)} className="text-white/60 hover:text-white transition">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav label */}
          <div className="px-5 pt-6 pb-3 hidden lg:block">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/30">Navigation</p>
          </div>

          <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto pb-6">
            {navItems.map(({ id, label, icon: Icon }) => {
              const active = view === id
              return (
                <button
                  key={id}
                  onClick={() => { setView(id); setSidebarOpen(false) }}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition group ${
                    active
                      ? "bg-[#2459d8] text-white shadow-lg shadow-[#2459d8]/30"
                      : "text-white/55 hover:bg-white/8 hover:text-white"
                  }`}
                >
                  <Icon className={`h-4.5 w-4.5 shrink-0 ${active ? "text-white" : "text-white/40 group-hover:text-white/70"}`} />
                  <span>{label}</span>
                  {active && <ChevronRight className="ml-auto h-3.5 w-3.5 opacity-60" />}
                </button>
              )
            })}
          </nav>

          {/* Sidebar footer */}
          <div className="p-4 border-t border-white/8">
            <div className="rounded-xl bg-white/6 px-4 py-3">
              <p className="text-[0.68rem] font-bold text-white/40 uppercase tracking-wider">Logged in as</p>
              <p className="text-sm font-bold text-white mt-0.5 truncate">Federalogistic Admin</p>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0 px-5 py-7 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  )
}
