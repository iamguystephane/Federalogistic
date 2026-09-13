import { useState } from "react"
import { Lock, Mail, ArrowLeft, CheckCircle, Eye, EyeOff } from "lucide-react"
import { apiJson, setAdminToken } from "../lib/api"

type Step = "login" | "forgot" | "sent"

const LoginPage = () => {
  const [step, setStep] = useState<Step>("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [devLink, setDevLink] = useState("")

  function goForgot() { setStep("forgot"); setError("") }
  function goLogin() { setStep("login"); setError("") }

  async function login(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const data = await apiJson<{ token: string }>("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      })
      setAdminToken(data.token)
      // replace() removes /login from history so back-button can't return here
      window.location.replace("/admin/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setLoading(false)
    }
  }

  async function requestReset(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const data = await apiJson<{ message: string; devLink?: string }>("/api/admin/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      })
      if (data.devLink) setDevLink(data.devLink)
      setStep("sent")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send reset email")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-105">

        {/* Brand header */}
        <div className="text-center mb-7">
          <div className="flex justify-center mb-3">
            <img src="/atlas-assets/logo-light.svg" alt="Federalogistic" className="h-16 w-auto object-contain rounded-2xl" />
          </div>
          <p className="text-xs text-slate-400 mt-0.5 font-medium uppercase tracking-wider">Admin Portal</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/70 border border-slate-100 p-8">

          {/* ── Login ── */}
          {step === "login" && (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-extrabold text-slate-900">Welcome back</h2>
                <p className="text-sm text-slate-400 mt-1">Sign in to access your admin dashboard</p>
              </div>

              <form onSubmit={login} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@federalogistic.com"
                      className="w-full h-11 border border-slate-200 rounded-xl pl-10 pr-4 text-sm text-slate-800 placeholder-slate-300 outline-none focus:border-[#2459d8] focus:ring-4 focus:ring-[#2459d8]/10 transition bg-slate-50 focus:bg-white font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-11 border border-slate-200 rounded-xl pl-10 pr-11 text-sm text-slate-800 placeholder-slate-300 outline-none focus:border-[#2459d8] focus:ring-4 focus:ring-[#2459d8]/10 transition bg-slate-50 focus:bg-white font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <p className="text-sm font-semibold text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2.5">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 bg-[#2459d8] hover:bg-[#1d4bc0] rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition disabled:opacity-60 shadow-md shadow-[#2459d8]/20 mt-1"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Sign In
                    </>
                  )}
                </button>
              </form>

              <div className="mt-5 text-center">
                <button
                  onClick={goForgot}
                  className="text-sm text-[#2459d8] hover:text-[#1d4bc0] font-semibold transition"
                >
                  Forgot password?
                </button>
              </div>
            </>
          )}

          {/* ── Forgot Password ── */}
          {step === "forgot" && (
            <>
              <button
                onClick={goLogin}
                className="flex items-center gap-1.5 text-slate-400 hover:text-slate-600 text-sm font-semibold transition mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to login
              </button>

              <div className="mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                  <Mail className="w-5 h-5 text-[#2459d8]" />
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900">Forgot password?</h2>
                <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                  Enter your admin email to receive a secure reset link.
                </p>
              </div>

              <form onSubmit={requestReset} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Admin email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@federalogistic.com"
                      className="w-full h-11 border border-slate-200 rounded-xl pl-10 pr-4 text-sm text-slate-800 placeholder-slate-300 outline-none focus:border-[#2459d8] focus:ring-4 focus:ring-[#2459d8]/10 transition bg-slate-50 focus:bg-white font-medium"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-sm font-semibold text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2.5">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 bg-[#2459d8] hover:bg-[#1d4bc0] rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition disabled:opacity-60 shadow-md shadow-[#2459d8]/20"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Mail className="w-4 h-4" />
                      Send Reset Link
                    </>
                  )}
                </button>
              </form>
            </>
          )}

          {/* ── Email Sent ── */}
          {step === "sent" && (
            <div className="text-center py-2">
              <div className="w-14 h-14 rounded-full bg-green-50 border border-green-100 flex items-center justify-center mx-auto mb-5">
                <CheckCircle className="w-7 h-7 text-green-500" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">Check your email</h2>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                A reset link was sent to{" "}
                <span className="text-slate-700 font-semibold">{email}</span>.
                It expires in 1 hour.
              </p>

              {devLink && (
                <div className="mt-5 bg-amber-50 border border-amber-200 rounded-xl p-4 text-left">
                  <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1.5">
                    Dev mode — reset link:
                  </p>
                  <a href={devLink} className="text-xs text-amber-700 break-all hover:underline">
                    {devLink}
                  </a>
                </div>
              )}

              <div className="mt-6 flex flex-col gap-2.5">
                <button
                  onClick={(e) => requestReset(e as unknown as React.FormEvent)}
                  className="text-sm text-[#2459d8] hover:text-[#1d4bc0] font-semibold transition"
                >
                  Didn't receive it? Resend
                </button>
                <button onClick={goLogin} className="text-sm text-slate-400 hover:text-slate-600 transition">
                  Back to login
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          © 2026 Federalogistic · All rights reserved
        </p>
      </div>
    </div>
  )
}

export default LoginPage
