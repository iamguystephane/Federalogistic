import { useEffect, useRef, useState } from "react"
import { AlertCircle, CheckCircle, Clock, Copy, Save, Upload, X } from "lucide-react"
import { apiForm, apiJson } from "../../lib/api"
import type { TrackingResult } from "../../data/trackingResult"
import { emptyForm, DRAFT_KEY, SHIPMENT_REQUIRED, statusOptions, paymentOptions, currencyOptions } from "../constants"
import { geocodeAddress, sleep } from "../geocode"
import { buildFormData } from "../shipmentUtils"
import type { ShipmentForm } from "../types"
import { Field, TextArea, SelectField, FormSection } from "./FormFields"

// ── Progress updater ─────────────────────────────────────────────────────────

function ProgressSection({ shipmentId, initialProgress }: { shipmentId: string; initialProgress: number }) {
  const [progress, setProgress] = useState(Math.min(100, Math.max(0, initialProgress)))
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState("")

  async function savePatch(newVal: number) {
    setSaving(true)
    setSaved(false)
    setSaveError("")
    try {
      await apiJson(`/api/admin/shipments/${shipmentId}/progress`, {
        method: "PATCH",
        body: JSON.stringify({ deliveryProgress: newVal }),
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Failed to save")
    } finally {
      setSaving(false)
    }
  }

  function change(delta: number) {
    const next = Math.min(100, Math.max(0, progress + delta))
    setProgress(next)
    savePatch(next)
  }

  return (
    <div className="mt-5 rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-sm font-extrabold text-slate-800 flex items-center gap-2">
        <span className="h-4 w-1 rounded-full bg-[#2459d8] inline-block" />
        Delivery Progress
      </h3>
      <div className="relative h-4 w-full overflow-hidden rounded-full bg-slate-100 mb-3">
        <div
          className="h-full rounded-full bg-[#2459d8] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-extrabold text-[#2459d8]">{progress}%</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={saving || progress <= 0}
            onClick={() => change(-1)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-lg font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-40"
          >
            −
          </button>
          <button
            type="button"
            disabled={saving || progress >= 100}
            onClick={() => change(1)}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2459d8] text-lg font-bold text-white transition hover:bg-[#1d4bc0] disabled:opacity-40"
          >
            +
          </button>
        </div>
      </div>
      {saving && <p className="mt-2 text-xs font-semibold text-slate-400">Saving…</p>}
      {saved && !saving && <p className="mt-2 text-xs font-semibold text-green-600">✓ Saved</p>}
      {saveError && <p className="mt-2 text-xs font-semibold text-red-500">{saveError}</p>}
    </div>
  )
}

// ── Main form ────────────────────────────────────────────────────────────────

export function ShipmentFormView({
  initial = emptyForm,
  shipmentId,
  currentImageUrl,
  initialProgress = 0,
  onSaved,
}: {
  initial?: ShipmentForm
  shipmentId?: string
  currentImageUrl?: string
  initialProgress?: number
  onSaved?: (s: TrackingResult) => void
}) {
  const isCreate = !shipmentId
  const [form, setForm] = useState<ShipmentForm>(initial)
  const [image, setImage] = useState<File | null>(null)
  const [created, setCreated] = useState<TrackingResult | null>(null)
  const [saving, setSaving] = useState(false)
  const [savingMsg, setSavingMsg] = useState("")
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ShipmentForm | "itemImage", string>>>({})
  const [draftBanner, setDraftBanner] = useState<"restore" | "saved" | null>(null)
  const [copied, setCopied] = useState(false)
  const topRef = useRef<HTMLDivElement>(null)

  const scrollTop = () => setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50)
  const set = (k: keyof ShipmentForm) => (v: string) => {
    setForm((f) => ({ ...f, [k]: v }))
    setFieldErrors((e) => { const n = { ...e }; delete n[k]; return n })
  }

  useEffect(() => {
    if (!isCreate) return
    try {
      if (localStorage.getItem(DRAFT_KEY)) setDraftBanner("restore")
    } catch { /* ignore */ }
  }, [isCreate])

  useEffect(() => setForm(initial), [initial])

  function saveDraft() {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(form))
      setDraftBanner("saved")
      scrollTop()
    } catch { /* ignore */ }
  }

  function restoreDraft() {
    try {
      const raw = localStorage.getItem(DRAFT_KEY)
      if (raw) setForm(JSON.parse(raw))
      setDraftBanner(null)
    } catch { /* ignore */ }
  }

  function discardDraft() {
    try { localStorage.removeItem(DRAFT_KEY) } catch { /* ignore */ }
    setDraftBanner(null)
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const errors: Partial<Record<keyof ShipmentForm | "itemImage", string>> = {}
    SHIPMENT_REQUIRED.forEach((k) => {
      if (!String(form[k]).trim()) errors[k] = "This field is required"
    })
    if (Object.keys(errors).length > 0) { setFieldErrors(errors); scrollTop(); return }

    setSaving(true); setFieldErrors({}); setError("")
    try {
      // Only re-geocode a field when its text actually changed since the last save —
      // otherwise every edit (e.g. toggling a hold) would re-query Nominatim and risk
      // silently swapping in a different, wrong pin for an address that didn't change.
      const originChanged = form.originLocation.trim() !== initial.originLocation.trim()
      const destChanged = form.destinationLocation.trim() !== initial.destinationLocation.trim()
      const currentChanged = form.currentLocation.trim() !== initial.currentLocation.trim()

      let origin = { lat: Number(form.originLat) || 0, lng: Number(form.originLng) || 0 }
      let dest = { lat: Number(form.destinationLat) || 0, lng: Number(form.destinationLng) || 0 }
      let waypointGeo: { lat: number; lng: number } | null =
        form.currentLat && form.currentLng ? { lat: Number(form.currentLat), lng: Number(form.currentLng) } : null

      let queried = false
      if (originChanged) {
        setSavingMsg("Finding origin on map…")
        try {
          origin = await geocodeAddress(form.originLocation)
        } catch {
          setFieldErrors({ originLocation: "Location not found — try a simpler format like \"City, Country\"" })
          scrollTop(); return
        }
        queried = true
      }
      if (destChanged) {
        if (queried) await sleep(1100)
        setSavingMsg("Finding destination on map…")
        try {
          dest = await geocodeAddress(form.destinationLocation)
        } catch {
          setFieldErrors({ destinationLocation: "Location not found — try a simpler format like \"City, Country\"" })
          scrollTop(); return
        }
        queried = true
      }
      if (!form.currentLocation.trim()) {
        waypointGeo = null
      } else if (currentChanged) {
        if (queried) await sleep(1100)
        setSavingMsg("Finding current location on map…")
        try { waypointGeo = await geocodeAddress(form.currentLocation) } catch { /* keep previous */ }
      }
      const geocodedForm: ShipmentForm = {
        ...form,
        originLat: String(origin.lat), originLng: String(origin.lng),
        destinationLat: String(dest.lat), destinationLng: String(dest.lng),
        currentLat: waypointGeo ? String(waypointGeo.lat) : "",
        currentLng: waypointGeo ? String(waypointGeo.lng) : "",
      }
      setSavingMsg("Saving…")
      const result = await apiForm<TrackingResult>(
        shipmentId ? `/api/admin/shipments/${shipmentId}` : "/api/admin/shipments",
        buildFormData(geocodedForm, image),
        shipmentId ? "PUT" : "POST",
      )
      setCreated(result)
      if (isCreate) { try { localStorage.removeItem(DRAFT_KEY) } catch { /* ignore */ } }
      onSaved?.(result)
      scrollTop()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save shipment")
      scrollTop()
    } finally {
      setSaving(false); setSavingMsg("")
    }
  }

  return (<>
    <form onSubmit={submit} className="space-y-5">
      <div ref={topRef} />

      {isCreate && draftBanner === "restore" && (
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
          <Clock className="h-4 w-4 shrink-0 text-amber-500" />
          <p className="flex-1 text-sm font-semibold text-amber-800">You have an unsaved draft. Restore it?</p>
          <button type="button" onClick={restoreDraft} className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-bold text-white hover:bg-amber-600 transition">Restore Draft</button>
          <button type="button" onClick={discardDraft} className="rounded-lg bg-white border border-amber-200 px-3 py-1.5 text-xs font-bold text-amber-700 hover:bg-amber-100 transition">Discard</button>
        </div>
      )}

      {isCreate && draftBanner === "saved" && (
        <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
          <CheckCircle className="h-4 w-4 shrink-0 text-green-500" />
          <p className="flex-1 text-sm font-semibold text-green-700">Draft saved — you can safely leave and come back later.</p>
          <button type="button" onClick={() => setDraftBanner(null)} className="text-green-400 hover:text-green-600"><X className="h-4 w-4" /></button>
        </div>
      )}

      {created && (
        <div className="flex flex-wrap items-center gap-4 rounded-xl border border-green-200 bg-green-50 px-5 py-4">
          <CheckCircle className="h-5 w-5 shrink-0 text-green-500" />
          <div>
            <p className="text-sm font-bold text-green-700">{shipmentId ? "Shipment updated" : "Tracking order created"}</p>
            <p className="mt-0.5 text-xl font-extrabold text-slate-900">{created.trackingNumber}</p>
          </div>
          <button
            type="button"
            onClick={() => { navigator.clipboard.writeText(created.trackingNumber); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
            className={`ml-auto flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold text-white transition ${copied ? "bg-emerald-700" : "bg-green-600 hover:bg-green-700"}`}
          >
            <Copy className="h-4 w-4" />
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
          <p className="text-sm font-semibold text-red-600">{error}</p>
        </div>
      )}

      {Object.keys(fieldErrors).length > 0 && !error && (
        <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
          <p className="text-sm font-semibold text-red-600">Please fix the highlighted fields below.</p>
        </div>
      )}

      <FormSection title="Sender Information">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Sender Name" value={form.senderName} onChange={set("senderName")} required error={fieldErrors.senderName} />
          <Field label="Sender Email" type="email" value={form.senderEmail} onChange={set("senderEmail")} required error={fieldErrors.senderEmail} />
          <Field label="Sender Phone" value={form.senderPhone} onChange={set("senderPhone")} required error={fieldErrors.senderPhone} />
          <Field label="Origin City / Location" value={form.originLocation} onChange={set("originLocation")} required placeholder="e.g. New York, USA" error={fieldErrors.originLocation} />
        </div>
        <div className="mt-4">
          <TextArea label="Sender Address" value={form.senderAddress} onChange={set("senderAddress")} required error={fieldErrors.senderAddress} />
        </div>
      </FormSection>

      <FormSection title="Receiver Information">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Receiver Name" value={form.receiverName} onChange={set("receiverName")} required error={fieldErrors.receiverName} />
          <Field label="Receiver Email" type="email" value={form.receiverEmail} onChange={set("receiverEmail")} required error={fieldErrors.receiverEmail} />
          <Field label="Receiver Phone" value={form.receiverPhone} onChange={set("receiverPhone")} required error={fieldErrors.receiverPhone} />
          <Field label="Destination City / Location" value={form.destinationLocation} onChange={set("destinationLocation")} required placeholder="e.g. Sydney, Australia" error={fieldErrors.destinationLocation} />
        </div>
        <div className="mt-4">
          <TextArea label="Receiver Address" value={form.receiverAddress} onChange={set("receiverAddress")} required error={fieldErrors.receiverAddress} />
        </div>
      </FormSection>

      <FormSection title="Package Information">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <SelectField label="Current Status" value={form.currentStatus} options={statusOptions} onChange={set("currentStatus")} required error={fieldErrors.currentStatus} />
          <Field label="Current / Hold Location (optional)" value={form.currentLocation} onChange={set("currentLocation")} placeholder="e.g. Dubai, UAE" error={fieldErrors.currentLocation} />
          <Field label="Shipment Type" value={form.shipmentType} onChange={set("shipmentType")} required error={fieldErrors.shipmentType} />
          <Field label="Delivery Mode" value={form.deliveryMode} onChange={set("deliveryMode")} required error={fieldErrors.deliveryMode} />
          <Field label="Package Type" value={form.packageType} onChange={set("packageType")} required error={fieldErrors.packageType} />
          <Field label="Weight" value={form.weight} onChange={set("weight")} required error={fieldErrors.weight} />
          <div className="block">
            <span className="text-[0.72rem] font-bold uppercase tracking-wider text-slate-500">Item Image</span>
            <label className={`mt-1.5 flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-dashed px-3 text-sm font-semibold transition ${fieldErrors.itemImage ? "border-red-400 bg-red-50 text-red-500" : "border-[#2459d8]/30 bg-[#2459d8]/4 text-[#2459d8] hover:bg-[#2459d8]/8"}`}>
              <Upload className="h-4 w-4 shrink-0" />
              <input type="file" accept="image/*" onChange={(e) => { setImage(e.target.files?.[0] || null); setFieldErrors((err) => { const n = { ...err }; delete n.itemImage; return n }) }} className="text-xs" />
            </label>
            {(image || currentImageUrl) && (
              <div className="mt-2 flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-2">
                <img src={image ? URL.createObjectURL(image) : currentImageUrl} alt="Item preview" className="h-16 w-16 rounded-lg object-cover shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-700 truncate">{image ? image.name : "Current image"}</p>
                  <p className="text-[0.7rem] text-slate-400 mt-0.5">{image ? "New upload (replaces current)" : "Saved image"}</p>
                </div>
              </div>
            )}
            {!image && !currentImageUrl && (
              <p className="mt-1.5 text-[0.7rem] text-slate-400">No image uploaded — you can add one at any time.</p>
            )}
          </div>
        </div>
        <div className="mt-4">
          <TextArea label="Item Description" value={form.itemDescription} onChange={set("itemDescription")} required error={fieldErrors.itemDescription} />
        </div>

        {shipmentId && (
          <div className="mt-4 space-y-3">
            <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
              <p className="text-sm font-bold text-slate-800 mb-1">Update Date & Time</p>
              <p className="text-xs text-slate-500 mb-2">This timestamp will be applied to the status change and any toggles turned on below.</p>
              <Field label="" type="datetime-local" value={form.milestoneDate} onChange={set("milestoneDate")} error={fieldErrors.milestoneDate} />
            </div>
            <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-800">Package on Hold</p>
                <p className="text-xs text-slate-500 mt-0.5">Creates a red "Stop" stage in the progress bar</p>
              </div>
              <button type="button" role="switch" aria-checked={form.isOnHold === "true"} onClick={() => set("isOnHold")(form.isOnHold === "true" ? "false" : "true")}
                style={{ position: "relative", width: 48, height: 28, borderRadius: 999, border: "none", cursor: "pointer", flexShrink: 0, background: form.isOnHold === "true" ? "#ef4444" : "#cbd5e1", transition: "background 0.2s" }}>
                <span style={{ position: "absolute", top: 4, width: 20, height: 20, borderRadius: "50%", background: "white", boxShadow: "0 1px 4px rgba(0,0,0,0.25)", transition: "left 0.2s", left: form.isOnHold === "true" ? 24 : 4 }} />
              </button>
            </div>
            <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-800">Add "In Transit" Update</p>
                <p className="text-xs text-slate-500 mt-0.5">Appends an extra transit stage to the progress bar</p>
              </div>
              <button type="button" role="switch" aria-checked={form.addTransitMilestone === "true"} onClick={() => set("addTransitMilestone")(form.addTransitMilestone === "true" ? "false" : "true")}
                style={{ position: "relative", width: 48, height: 28, borderRadius: 999, border: "none", cursor: "pointer", flexShrink: 0, background: form.addTransitMilestone === "true" ? "#2459d8" : "#cbd5e1", transition: "background 0.2s" }}>
                <span style={{ position: "absolute", top: 4, width: 20, height: 20, borderRadius: "50%", background: "white", boxShadow: "0 1px 4px rgba(0,0,0,0.25)", transition: "left 0.2s", left: form.addTransitMilestone === "true" ? 24 : 4 }} />
              </button>
            </div>
            <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-800">Add "On the Way" Update</p>
                <p className="text-xs text-slate-500 mt-0.5">Appends an "On the Way" stage to the progress bar</p>
              </div>
              <button type="button" role="switch" aria-checked={form.addOnTheWayMilestone === "true"} onClick={() => set("addOnTheWayMilestone")(form.addOnTheWayMilestone === "true" ? "false" : "true")}
                style={{ position: "relative", width: 48, height: 28, borderRadius: 999, border: "none", cursor: "pointer", flexShrink: 0, background: form.addOnTheWayMilestone === "true" ? "#2459d8" : "#cbd5e1", transition: "background 0.2s" }}>
                <span style={{ position: "absolute", top: 4, width: 20, height: 20, borderRadius: "50%", background: "white", boxShadow: "0 1px 4px rgba(0,0,0,0.25)", transition: "left 0.2s", left: form.addOnTheWayMilestone === "true" ? 24 : 4 }} />
              </button>
            </div>
          </div>
        )}
      </FormSection>

      <FormSection title="Cost & Dates">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {isCreate && <SelectField label="Currency" value={form.currency} options={currencyOptions} onChange={set("currency")} required />}
          <Field label="Shipping Cost" type="number" value={form.shippingCost} onChange={set("shippingCost")} required error={fieldErrors.shippingCost} />
          <Field label="Clearance Cost" type="number" value={form.clearanceCost} onChange={set("clearanceCost")} required error={fieldErrors.clearanceCost} />
          <Field label="Total Cost" type="number" value={form.totalCost} onChange={set("totalCost")} required error={fieldErrors.totalCost} />
          <Field label="Date Shipped" type="datetime-local" value={form.dateShipped} onChange={set("dateShipped")} required error={fieldErrors.dateShipped} />
          <Field label="Pickup Date" type="datetime-local" value={form.pickupDate} onChange={set("pickupDate")} required error={fieldErrors.pickupDate} />
          <Field label="Expected Delivery" type="datetime-local" value={form.expectedDeliveryDate} onChange={set("expectedDeliveryDate")} required error={fieldErrors.expectedDeliveryDate} />
          <SelectField label="Payment Status" value={form.paymentStatus} options={paymentOptions} onChange={set("paymentStatus")} required />
          {isCreate && (
            <Field label="Order Confirmed Date & Time" type="datetime-local" value={form.milestoneDate} onChange={set("milestoneDate")} error={fieldErrors.milestoneDate} />
          )}
        </div>
        <div className="mt-4">
          <TextArea label="Comment / History Note" value={form.comment} onChange={set("comment")} required error={fieldErrors.comment} />
        </div>
      </FormSection>

      <div className="flex gap-3">
        {isCreate && (
          <button type="button" onClick={saveDraft} className="flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 transition hover:bg-slate-50 shrink-0">
            <Clock className="h-4 w-4" />
            Save Draft
          </button>
        )}
        <button disabled={saving} className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#2459d8] text-sm font-extrabold text-white shadow-md shadow-[#2459d8]/20 transition hover:bg-[#1d4bc0] disabled:opacity-60">
          <Save className="h-4.5 w-4.5" />
          {saving ? savingMsg || "Saving…" : shipmentId ? "Save Changes" : "Create Tracking Order"}
        </button>
      </div>
    </form>

    {shipmentId && (
      <ProgressSection shipmentId={shipmentId} initialProgress={initialProgress} />
    )}
  </>)
}
