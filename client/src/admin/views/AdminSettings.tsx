import { useEffect, useState } from "react"
import { AlertCircle, CheckCircle, Phone, Save, Shield } from "lucide-react"
import { apiJson } from "../../lib/api"
import type { AdminProfile, SiteSettings } from "../types"
import { Field, TextArea } from "../components/FormFields"

export function AdminSettings() {
  const [profile, setProfile] = useState<AdminProfile | null>(null)
  const [newEmail, setNewEmail] = useState("")
  const [currentPw, setCurrentPw] = useState("")
  const [newPw, setNewPw] = useState("")
  const [confirmPw, setConfirmPw] = useState("")
  const [acctSaving, setAcctSaving] = useState(false)
  const [acctMsg, setAcctMsg] = useState<{ ok: boolean; text: string } | null>(null)

  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    contactPhone: "", contactEmail: "", contactAddress: "",
    formDestinationEmail: "", socialFacebook: "", socialX: "",
    socialInstagram: "", socialTiktok: "",
  })
  const [siteSaving, setSiteSaving] = useState(false)
  const [siteMsg, setSiteMsg] = useState<{ ok: boolean; text: string } | null>(null)

  useEffect(() => {
    apiJson<AdminProfile>("/api/admin/profile").then((p) => { setProfile(p); setNewEmail(p.email) }).catch(() => undefined)
    apiJson<SiteSettings>("/api/admin/settings").then(setSiteSettings).catch(() => undefined)
  }, [])

  async function saveAccount(e: React.FormEvent) {
    e.preventDefault()
    if (newPw && newPw !== confirmPw) { setAcctMsg({ ok: false, text: "Passwords do not match." }); return }
    setAcctSaving(true); setAcctMsg(null)
    try {
      const body: Record<string, string> = {}
      if (newEmail !== profile?.email) body.email = newEmail
      if (newPw) body.password = newPw
      if (!Object.keys(body).length) { setAcctMsg({ ok: true, text: "Nothing to update." }); return }
      await apiJson("/api/admin/profile", { method: "PUT", body: JSON.stringify(body) })
      setAcctMsg({ ok: true, text: "Account updated successfully." })
      setCurrentPw(""); setNewPw(""); setConfirmPw("")
      if (body.email) setProfile((p) => p ? { ...p, email: body.email } : p)
    } catch (err) {
      setAcctMsg({ ok: false, text: err instanceof Error ? err.message : "Failed to save." })
    } finally {
      setAcctSaving(false)
    }
  }

  async function saveSiteSettings(e: React.FormEvent) {
    e.preventDefault()
    setSiteSaving(true); setSiteMsg(null)
    try {
      await apiJson("/api/admin/settings", { method: "PUT", body: JSON.stringify(siteSettings) })
      setSiteMsg({ ok: true, text: "Site settings saved successfully." })
    } catch (err) {
      setSiteMsg({ ok: false, text: err instanceof Error ? err.message : "Failed to save." })
    } finally {
      setSiteSaving(false)
    }
  }

  function MsgBanner({ msg }: { msg: { ok: boolean; text: string } }) {
    return (
      <div className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-sm font-semibold ${msg.ok ? "border-green-200 bg-green-50 text-green-700" : "border-red-200 bg-red-50 text-red-600"}`}>
        {msg.ok ? <CheckCircle className="h-4 w-4 shrink-0" /> : <AlertCircle className="h-4 w-4 shrink-0" />}
        {msg.text}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500 mt-0.5">Manage your account credentials and site-wide contact information.</p>
      </div>

      <form onSubmit={saveAccount} className="space-y-5 rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2459d8]/8">
            <Shield className="h-4 w-4 text-[#2459d8]" />
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-slate-900">Account Credentials</h2>
            <p className="text-xs text-slate-500">Change your admin login email or password</p>
          </div>
        </div>
        {acctMsg && <MsgBanner msg={acctMsg} />}
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Admin Email" type="email" value={newEmail} onChange={setNewEmail} />
          <div />
          <Field label="Current Password" type="password" value={currentPw} onChange={setCurrentPw} placeholder="Required to change password" />
          <Field label="New Password" type="password" value={newPw} onChange={setNewPw} placeholder="Leave blank to keep current" />
          <Field label="Confirm New Password" type="password" value={confirmPw} onChange={setConfirmPw} placeholder="Repeat new password" />
        </div>
        <button type="submit" disabled={acctSaving} className="flex h-11 items-center gap-2 rounded-xl bg-[#2459d8] px-6 text-sm font-bold text-white shadow-md shadow-[#2459d8]/20 hover:bg-[#1d4bc0] disabled:opacity-60 transition">
          <Save className="h-4 w-4" />{acctSaving ? "Saving…" : "Save Account"}
        </button>
      </form>

      <form onSubmit={saveSiteSettings} className="space-y-5 rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2459d8]/8">
            <Phone className="h-4 w-4 text-[#2459d8]" />
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-slate-900">Site Contact Information</h2>
            <p className="text-xs text-slate-500">Displayed in the website header, footer, and contact page</p>
          </div>
        </div>
        {siteMsg && <MsgBanner msg={siteMsg} />}
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Contact Phone" value={siteSettings.contactPhone} onChange={(v) => setSiteSettings((s) => ({ ...s, contactPhone: v }))} placeholder="+1 800 123 4567" />
          <Field label="Contact Email" type="email" value={siteSettings.contactEmail} onChange={(v) => setSiteSettings((s) => ({ ...s, contactEmail: v }))} placeholder="support@company.com" />
          <div className="md:col-span-2">
            <TextArea label="Office Address" value={siteSettings.contactAddress} onChange={(v) => setSiteSettings((s) => ({ ...s, contactAddress: v }))} />
          </div>
          <Field label="Contact Form Destination Email" type="email" value={siteSettings.formDestinationEmail} onChange={(v) => setSiteSettings((s) => ({ ...s, formDestinationEmail: v }))} placeholder="info@company.com" />
        </div>
        <div className="border-t border-slate-100 pt-5">
          <p className="mb-3 text-[0.72rem] font-bold uppercase tracking-wider text-slate-500">Social Media Links</p>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Facebook URL" value={siteSettings.socialFacebook} onChange={(v) => setSiteSettings((s) => ({ ...s, socialFacebook: v }))} placeholder="https://facebook.com/yourpage" />
            <Field label="X (Twitter) URL" value={siteSettings.socialX} onChange={(v) => setSiteSettings((s) => ({ ...s, socialX: v }))} placeholder="https://x.com/yourhandle" />
            <Field label="Instagram URL" value={siteSettings.socialInstagram} onChange={(v) => setSiteSettings((s) => ({ ...s, socialInstagram: v }))} placeholder="https://instagram.com/yourhandle" />
            <Field label="TikTok URL" value={siteSettings.socialTiktok} onChange={(v) => setSiteSettings((s) => ({ ...s, socialTiktok: v }))} placeholder="https://tiktok.com/@yourhandle" />
          </div>
        </div>
        <button type="submit" disabled={siteSaving} className="flex h-11 items-center gap-2 rounded-xl bg-[#2459d8] px-6 text-sm font-bold text-white shadow-md shadow-[#2459d8]/20 hover:bg-[#1d4bc0] disabled:opacity-60 transition">
          <Save className="h-4 w-4" />{siteSaving ? "Saving…" : "Save Site Info"}
        </button>
      </form>
    </div>
  )
}
