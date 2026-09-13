import { useEffect, useState } from "react"
import { AlertCircle } from "lucide-react"
import { apiJson, adminToken } from "../lib/api"
import type { TrackingResult } from "../data/trackingResult"
import type { AdminView, PaymentDeposit } from "../admin/types"
import { AdminShell } from "../admin/components/AdminShell"
import { ShipmentFormView } from "../admin/components/ShipmentFormView"
import { DashboardHome } from "../admin/views/DashboardHome"
import { ManageShipments } from "../admin/views/ManageShipments"
import { DepositsView } from "../admin/views/DepositsView"
import { AdminSettings } from "../admin/views/AdminSettings"

function AdminDashboard() {
  const path = window.location.pathname
  const [view, setViewState] = useState<AdminView>(
    path.includes("/create-shipping") || path.includes("/shipments/create") ? "create"
      : path.includes("/shipments") ? "manage"
      : path.includes("/deposits") ? "deposits"
      : "dashboard",
  )
  const [shipments, setShipments] = useState<TrackingResult[]>([])
  const [paymentDeposits, setPaymentDeposits] = useState<PaymentDeposit[]>([])
  const [error, setError] = useState("")

  useEffect(() => {
    if (!adminToken()) window.location.replace("/login")
  }, [])

  useEffect(() => {
    window.history.pushState(null, "", window.location.href)
    const block = () => window.history.pushState(null, "", window.location.href)
    window.addEventListener("popstate", block)
    return () => window.removeEventListener("popstate", block)
  }, [])

  const setView = (next: AdminView) => {
    setViewState(next)
    const map: Record<AdminView, string> = {
      dashboard: "/admin/dashboard",
      create:    "/admin/create-shipping",
      manage:    "/admin/shipments",
      deposits:  "/admin/deposits",
      settings:  "/admin/settings",
    }
    window.history.pushState({}, "", map[next])
  }

  async function refresh() {
    try {
      setError("")
      setShipments(await apiJson<TrackingResult[]>("/api/admin/shipments"))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load shipments")
      if (err instanceof Error && err.message.includes("token")) window.location.replace("/login")
    }
  }

  async function refreshPayments() {
    try {
      setError("")
      setPaymentDeposits(await apiJson<PaymentDeposit[]>("/api/admin/payments"))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load payment deposits")
      if (err instanceof Error && err.message.includes("token")) window.location.replace("/login")
    }
  }

  useEffect(() => { refresh(); refreshPayments() }, [])

  if (!adminToken()) return null

  return (
    <AdminShell view={view} setView={setView}>
      {error && (
        <div className="mb-5 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
          <p className="text-sm font-semibold text-red-600">{error}</p>
        </div>
      )}

      {view === "dashboard" && <DashboardHome shipments={shipments} setView={setView} />}

      {view === "create" && (
        <div className="space-y-5">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Create Shipment</h1>
            <p className="text-sm text-slate-500 mt-0.5">Fill in the details to generate a new tracking order.</p>
          </div>
          <ShipmentFormView onSaved={refresh} />
        </div>
      )}

      {view === "manage" && <ManageShipments shipments={shipments} refresh={refresh} />}

      {view === "deposits" && (
        <DepositsView deposits={paymentDeposits} refresh={() => { refreshPayments(); refresh() }} />
      )}

      {view === "settings" && <AdminSettings />}
    </AdminShell>
  )
}

export function AdminPage() {
  if (window.location.pathname === "/admin") {
    window.location.replace("/login")
    return null
  }
  return <AdminDashboard />
}
