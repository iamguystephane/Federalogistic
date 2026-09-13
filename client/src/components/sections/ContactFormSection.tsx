import { CheckCircle, Send } from "lucide-react"
import { useState, useRef } from "react"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { Input } from "../ui/input"
import { formFeatures } from "../../data/contact"
import { API_URL } from "../../lib/api"

export function ContactFormSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")
  const cardRef = useRef<HTMLDivElement>(null)

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  function scrollToCard() {
    setTimeout(() => {
      cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 60)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    setError("")
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.message || "Failed to send message")
      setSent(true)
      setForm({ name: "", email: "", phone: "", subject: "", message: "" })
      scrollToCard()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
      scrollToCard()
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-[1200px] px-5">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.35fr]">
          {/* Left: info */}
          <div>
            <h2 className="text-[1.8rem] font-extrabold leading-snug text-slate-950">
              Let's Discuss Your Shipping Needs
            </h2>
            <p className="mt-4 text-[0.9rem] leading-relaxed text-slate-600">
              Whether you need a quick quote, have a question about our services, or want to request
              a specialized logistics solution, our team is ready to help.
            </p>

            <div className="mt-8 space-y-6">
              {formFeatures.map((f) => (
                <div key={f.title} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100">
                    <f.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-[0.95rem] font-bold text-slate-900">{f.title}</h4>
                    <p className="mt-0.5 text-[0.85rem] text-slate-500">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div ref={cardRef} className="scroll-mt-6">
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-[1.25rem] font-extrabold text-slate-950">Send Us a Message</h3>

                {sent ? (
                  <div className="mt-6 flex flex-col items-center gap-3 rounded-xl border border-green-200 bg-green-50 py-10 text-center">
                    <CheckCircle className="h-10 w-10 text-green-500" />
                    <p className="text-base font-extrabold text-green-700">Message sent!</p>
                    <p className="text-sm text-green-600">We'll get back to you as soon as possible.</p>
                    <button
                      onClick={() => setSent(false)}
                      className="mt-2 text-xs font-bold text-green-700 underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    {error && (
                      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                        {error}
                      </div>
                    )}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="text-[0.85rem] font-semibold text-slate-700">Full Name</label>
                        <Input required value={form.name} onChange={set("name")} placeholder="John Doe" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[0.85rem] font-semibold text-slate-700">Email Address</label>
                        <Input required type="email" value={form.email} onChange={set("email")} placeholder="john@example.com" />
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="text-[0.85rem] font-semibold text-slate-700">Phone Number</label>
                        <Input type="tel" value={form.phone} onChange={set("phone")} placeholder="+1 (555) 000-0000" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[0.85rem] font-semibold text-slate-700">Subject</label>
                        <Input required value={form.subject} onChange={set("subject")} placeholder="Shipping Inquiry" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[0.85rem] font-semibold text-slate-700">Your Message</label>
                      <textarea
                        required
                        value={form.message}
                        onChange={set("message")}
                        placeholder="Please describe how we can help you..."
                        rows={5}
                        className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                    <Button disabled={sending} className="h-12 w-full rounded-xl text-sm font-semibold">
                      <Send className="h-4 w-4" />
                      {sending ? "Sending…" : "Send Message"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
