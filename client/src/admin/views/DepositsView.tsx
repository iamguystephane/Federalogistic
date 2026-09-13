import { useEffect, useState } from "react"
import { AlertCircle, CreditCard, Edit3, ExternalLink, Eye, EyeOff, Plus, ReceiptText, Trash2, X } from "lucide-react"
import { apiJson } from "../../lib/api"
import type { PaymentDeposit, PaymentMethod } from "../types"
import { Field } from "../components/FormFields"

// ── Payment method modal ─────────────────────────────────────────────────────

function PaymentMethodModal({ onClose, onSaved, existing }: { onClose: () => void; onSaved: () => void; existing?: PaymentMethod }) {
  const [name, setName] = useState(existing?.name ?? "")
  const [type, setType] = useState(existing?.type ?? "bank_transfer")
  const [pairs, setPairs] = useState<{ key: string; value: string }[]>(
    existing && Object.keys(existing.details).length > 0
      ? Object.entries(existing.details).map(([key, value]) => ({ key, value: value as string }))
      : [{ key: "", value: "" }]
  )
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  function updatePair(i: number, field: "key" | "value", val: string) {
    setPairs((p) => p.map((pair, idx) => (idx === i ? { ...pair, [field]: val } : pair)))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true); setError("")
    try {
      const details: Record<string, string> = {}
      pairs.filter((p) => p.key.trim()).forEach((p) => { details[p.key.trim()] = p.value.trim() })
      if (existing) {
        await apiJson(`/api/admin/payment-methods/${existing.id}`, { method: "PUT", body: JSON.stringify({ name, type, details }) })
      } else {
        await apiJson("/api/admin/payment-methods", { method: "POST", body: JSON.stringify({ name, type, details }) })
      }
      onSaved()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save payment method")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-[540px] rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-slate-900">{existing ? "Edit Payment Method" : "New Payment Method"}</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"><X className="h-5 w-5" /></button>
        </div>
        <form onSubmit={submit} className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-600">
              <AlertCircle className="h-4 w-4 shrink-0" />{error}
            </div>
          )}
          <Field label="Method Name" value={name} onChange={setName} required placeholder="e.g. Zelle" />
          <label className="block">
            <span className="text-[0.72rem] font-bold uppercase tracking-wider text-slate-500">Type</span>
            <select value={type} onChange={(e) => setType(e.target.value)} className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-800 outline-none transition focus:border-[#2459d8] focus:bg-white focus:ring-3 focus:ring-[#2459d8]/10">
              <option value="bank_transfer">Bank Transfer</option>
              <option value="crypto">Cryptocurrency</option>
              <option value="mobile_money">Mobile Money</option>
              <option value="wire_transfer">Wire Transfer</option>
              <option value="other">Other</option>
            </select>
          </label>
          <div>
            <div className="mb-2.5 flex items-center justify-between">
              <p className="text-[0.72rem] font-bold uppercase tracking-wider text-slate-500">Payment Details</p>
              <button
                type="button"
                onClick={() => setPairs((p) => [...p, { key: "", value: "" }])}
                className="flex items-center gap-1.5 rounded-lg bg-[#2459d8]/8 px-3 py-1.5 text-xs font-bold text-[#2459d8] hover:bg-[#2459d8]/15 transition"
              >
                <Plus className="h-3.5 w-3.5" />Add Field
              </button>
            </div>
            {pairs.length > 0 && (
              <div className="mb-1.5 grid grid-cols-[1fr_1fr_32px] gap-2 px-0.5">
                <span className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">Label</span>
                <span className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">Value</span>
                <span />
              </div>
            )}
            <div className="space-y-2">
              {pairs.map((pair, i) => (
                <div key={i} className="grid grid-cols-[1fr_1fr_32px] items-center gap-2">
                  <input
                    value={pair.key}
                    onChange={(e) => updatePair(i, "key", e.target.value)}
                    placeholder="e.g. Account No."
                    className="h-9 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-800 outline-none focus:border-[#2459d8] focus:bg-white transition"
                  />
                  <input
                    value={pair.value}
                    onChange={(e) => updatePair(i, "value", e.target.value)}
                    placeholder="e.g. 1234567890"
                    className="h-9 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-800 outline-none focus:border-[#2459d8] focus:bg-white transition"
                  />
                  <button
                    type="button"
                    onClick={() => setPairs((p) => p.filter((_, idx) => idx !== i))}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 transition"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
            {pairs.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-200 py-5 text-center">
                <p className="text-xs font-semibold text-slate-400">No fields yet — click <span className="font-bold text-[#2459d8]">Add Field</span> to start</p>
              </div>
            )}
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="h-11 flex-1 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition">Cancel</button>
            <button type="submit" disabled={saving} className="h-11 flex-1 rounded-xl bg-[#2459d8] text-sm font-bold text-white hover:bg-[#1d4bc0] disabled:opacity-60 transition">
              {saving ? "Saving…" : existing ? "Update Method" : "Save Method"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ── Main view ────────────────────────────────────────────────────────────────

export function DepositsView({ deposits, refresh }: { deposits: PaymentDeposit[]; refresh: () => void }) {
  const [tab, setTab] = useState<"methods" | "reviews">("methods")
  const [methods, setMethods] = useState<PaymentMethod[]>([])
  const [loadingMethods, setLoadingMethods] = useState(false)
  const [showNewMethod, setShowNewMethod] = useState(false)
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null)
  const [savingId, setSavingId] = useState("")
  const [error, setError] = useState("")

  async function loadMethods() {
    setLoadingMethods(true)
    try {
      setMethods(await apiJson<PaymentMethod[]>("/api/admin/payment-methods"))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load payment methods")
    } finally {
      setLoadingMethods(false)
    }
  }

  useEffect(() => { loadMethods() }, [])

  async function toggleVisibility(method: PaymentMethod) {
    setSavingId(method.id)
    try {
      await apiJson(`/api/admin/payment-methods/${method.id}`, { method: "PUT", body: JSON.stringify({ isVisible: !method.isVisible }) })
      await loadMethods()
    } finally { setSavingId("") }
  }

  async function deleteMethod(id: string) {
    if (!confirm("Delete this payment method?")) return
    setSavingId(id)
    try {
      await apiJson(`/api/admin/payment-methods/${id}`, { method: "DELETE" })
      await loadMethods()
    } finally { setSavingId("") }
  }

  async function updateDepositStatus(id: string, status: "APPROVED" | "DECLINED") {
    setSavingId(id); setError("")
    try {
      await apiJson(`/api/admin/payments/${id}`, { method: "PUT", body: JSON.stringify({ status }) })
      refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update payment")
    } finally { setSavingId("") }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Deposits</h1>
        <p className="text-sm text-slate-500 mt-0.5">Manage payment methods and review client deposit submissions.</p>
      </div>

      <div className="flex w-fit gap-1 rounded-xl bg-slate-100 p-1">
        {([
          { key: "methods", label: "Payment Methods", icon: CreditCard },
          { key: "reviews", label: "Deposit Reviews", icon: ReceiptText },
        ] as const).map(({ key, label, icon: Icon }) => (
          <button key={key} onClick={() => setTab(key)} className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition ${tab === key ? "bg-white text-[#2459d8] shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
            <Icon className="h-4 w-4" />{label}
          </button>
        ))}
      </div>

      {error && (
        <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <p className="text-sm font-semibold text-red-600">{error}</p>
        </div>
      )}

      {tab === "methods" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button onClick={() => setShowNewMethod(true)} className="flex items-center gap-2 rounded-xl bg-[#2459d8] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#1d4bc0] transition shadow-md shadow-[#2459d8]/20">
              <Plus className="h-4 w-4" />Add Payment Method
            </button>
          </div>
          {loadingMethods ? (
            <p className="text-sm font-semibold text-slate-500">Loading…</p>
          ) : methods.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center">
              <CreditCard className="mx-auto mb-3 h-8 w-8 text-slate-300" />
              <p className="text-sm font-semibold text-slate-500">No payment methods yet. Add one to get started.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {methods.map((method) => (
                <div key={method.id} className="rounded-xl border border-slate-200 bg-white px-5 py-3.5 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#2459d8]/8">
                      <CreditCard className="h-4.5 w-4.5 text-[#2459d8]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-extrabold text-slate-900">{method.name}</p>
                        <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[0.68rem] font-bold text-slate-500">{method.type}</span>
                        <span className={`rounded-full border px-2 py-0.5 text-[0.68rem] font-bold ${method.isVisible ? "border-green-200 bg-green-50 text-green-700" : "border-slate-200 bg-slate-100 text-slate-500"}`}>
                          {method.isVisible ? "Visible" : "Hidden"}
                        </span>
                      </div>
                      {Object.keys(method.details).length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5">
                          {Object.entries(method.details).map(([k, v]) => (
                            <span key={k} className="text-xs text-slate-500"><span className="font-bold text-slate-700">{k}:</span> {v}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <button disabled={savingId === method.id} onClick={() => setEditingMethod(method)} className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700 hover:bg-blue-100 transition">
                        <Edit3 className="h-3.5 w-3.5" />Edit
                      </button>
                      <button disabled={savingId === method.id} onClick={() => toggleVisibility(method)} className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition ${method.isVisible ? "bg-amber-50 text-amber-700 hover:bg-amber-100" : "bg-green-50 text-green-700 hover:bg-green-100"}`}>
                        {method.isVisible ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                        {method.isVisible ? "Hide" : "Show"}
                      </button>
                      <button disabled={savingId === method.id} onClick={() => deleteMethod(method.id)} className="flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-100 transition">
                        <Trash2 className="h-3.5 w-3.5" />Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {showNewMethod && <PaymentMethodModal onClose={() => setShowNewMethod(false)} onSaved={() => { setShowNewMethod(false); loadMethods() }} />}
          {editingMethod && <PaymentMethodModal existing={editingMethod} onClose={() => setEditingMethod(null)} onSaved={() => { setEditingMethod(null); loadMethods() }} />}
        </div>
      )}

      {tab === "reviews" && (
        <div className="space-y-4">
          {deposits.length === 0 ? (
            <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
              <ReceiptText className="mt-0.5 h-5 w-5 shrink-0 text-[#2459d8]" />
              <p className="text-sm font-semibold text-slate-700">No client payment proofs have been submitted yet.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {deposits.map((deposit) => (
                <div key={deposit.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="grid gap-4 lg:grid-cols-[160px_1fr_auto]">
                    <a href={deposit.proofUrl} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                      <img src={deposit.proofUrl} alt="Payment proof" className="h-36 w-full object-cover" />
                    </a>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {[
                        { label: "Tracking",       value: deposit.trackingNumber },
                        { label: "Recipient",      value: deposit.recipientName },
                        { label: "Email",          value: deposit.recipientEmail },
                        { label: "Method",         value: deposit.method },
                        { label: "Transaction ID", value: deposit.transactionId },
                        { label: "Amount",         value: `$${deposit.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}` },
                        { label: "Submitted",      value: new Date(deposit.createdAt).toLocaleString() },
                        { label: "Status",         value: deposit.status },
                      ].map((item) => (
                        <div key={item.label}>
                          <p className="text-[0.7rem] font-bold uppercase tracking-wider text-slate-400">{item.label}</p>
                          <p className="mt-0.5 break-words text-sm font-bold text-slate-800">{item.value}</p>
                        </div>
                      ))}
                      {deposit.shipment && (
                        <div>
                          <p className="text-[0.7rem] font-bold uppercase tracking-wider text-slate-400">Shipment Receiver</p>
                          <p className="mt-0.5 break-words text-sm font-bold text-slate-800">{deposit.shipment.receiver.name}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 lg:min-w-32">
                      <a href={deposit.proofUrl} target="_blank" rel="noreferrer" className="flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 text-xs font-bold text-slate-600 hover:bg-slate-50">
                        <ExternalLink className="h-3.5 w-3.5" />Receipt
                      </a>
                      <button disabled={savingId === deposit.id || deposit.status !== "PENDING"} onClick={() => updateDepositStatus(deposit.id, "APPROVED")} className="h-10 rounded-lg bg-green-600 px-3 text-xs font-bold text-white hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed">Approve</button>
                      <button disabled={savingId === deposit.id || deposit.status !== "PENDING"} onClick={() => updateDepositStatus(deposit.id, "DECLINED")} className="h-10 rounded-lg bg-red-600 px-3 text-xs font-bold text-white hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed">Decline</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
