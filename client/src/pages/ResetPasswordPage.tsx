import { useEffect, useState } from "react"
import { Lock, CheckCircle, XCircle, Eye, EyeOff, Package } from "lucide-react"
import { apiJson } from "../lib/api"

type PageState = "loading" | "ready" | "invalid" | "success"

function strengthInfo(pw: string) {
  if (!pw) return null
  if (pw.length < 6) return { label: "Weak", color: "bg-red-500", width: "30%" }
  if (pw.length < 10 || !/[A-Z]/.test(pw) || !/[0-9]/.test(pw))
    return { label: "Fair", color: "bg-yellow-400", width: "60%" }
  return { label: "Strong", color: "bg-green-400", width: "100%" }
}

export function ResetPasswordPage() {
  const token = new URLSearchParams(window.location.search).get("token")

  const [pageState, setPageState] = useState<PageState>("loading")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!token) { setPageState("invalid"); return }
    try {
      const [, payload] = token.split(".")
      const decoded = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")))
      if (decoded.purpose !== "reset" || decoded.exp * 1000 < Date.now()) {
        setPageState("invalid")
      } else {
        setPageState("ready")
      }
    } catch {
      setPageState("invalid")
    }
  }, [token])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (password !== confirm) { setError("Passwords do not match"); return }
    if (password.length < 8) { setError("Password must be at least 8 characters"); return }
    setLoading(true)
    setError("")
    try {
      await apiJson("/api/admin/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, password }),
      })
      setPageState("success")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reset password")
    } finally {
      setLoading(false)
    }
  }

  const strength = strengthInfo(password)
  const mismatch = !!confirm && confirm !== password

  return (
    <div className="min-h-screen flex bg-[#0a1628]">
      {/* Left branded panel */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden flex-col">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d4b5a] via-[#0a3a4a] to-[#061525]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative z-10 flex flex-col h-full p-12">
          <div className="flex items-center">
            <img src="/atlas-assets/logo-light.svg" alt="Federalogistic" className="h-12 w-auto object-contain brightness-0 invert" />
          </div>

          <div className="flex-1 flex flex-col justify-center max-w-lg">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-1.5 mb-8 w-fit">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">Security Reset</span>
            </div>
            <h1 className="text-5xl font-extrabold text-white leading-[1.1] mb-4">
              Secure your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                account
              </span>
            </h1>
            <p className="text-white/55 text-base leading-relaxed">
              Choose a strong password to keep your admin dashboard protected.
            </p>

            <div className="mt-10 bg-white/5 border border-white/10 rounded-xl p-6 space-y-3">
              <p className="text-white/60 text-sm font-bold">Password tips</p>
              {[
                "At least 8 characters long",
                "Mix of uppercase and lowercase letters",
                "Include numbers and special characters",
                "Avoid easily guessable words",
              ].map((tip) => (
                <div key={tip} className="flex items-center gap-3 text-white/40 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 shrink-0" />
                  {tip}
                </div>
              ))}
            </div>
          </div>

          <p className="text-white/25 text-sm">© 2026 Federalogistic. All rights reserved.</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">

          {pageState === "loading" && (
            <div className="text-center">
              <div className="w-10 h-10 border-2 border-white/15 border-t-cyan-400 rounded-full animate-spin mx-auto" />
              <p className="mt-4 text-white/40 text-sm">Validating reset link…</p>
            </div>
          )}

          {pageState === "invalid" && (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-8 h-8 text-red-400" />
              </div>
              <h2 className="text-2xl font-extrabold text-white">Link invalid or expired</h2>
              <p className="mt-3 text-white/40 text-sm leading-relaxed max-w-xs mx-auto">
                This password reset link is no longer valid. Please request a new one from the login page.
              </p>
              <a
                href="/login"
                className="mt-8 inline-flex items-center justify-center h-12 px-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white font-bold text-sm hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20"
              >
                Back to Login
              </a>
            </div>
          )}

          {pageState === "ready" && (
            <>
              <div className="mb-8">
                <div className="flex items-center mb-8 lg:hidden">
                  <img src="/atlas-assets/logo-light.svg" alt="Federalogistic" className="h-10 w-auto object-contain brightness-0 invert" />
                </div>
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6">
                  <Lock className="w-6 h-6 text-cyan-400" />
                </div>
                <h2 className="text-3xl font-extrabold text-white">Set new password</h2>
                <p className="mt-2 text-white/45 text-sm">Enter and confirm your new admin password below.</p>
              </div>

              <form onSubmit={submit} className="space-y-5">
                {/* New password */}
                <div>
                  <label className="block text-sm font-semibold text-white/60 mb-2">New password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-12 bg-white/5 border border-white/10 rounded-xl pl-11 pr-12 text-white placeholder-white/20 outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition text-sm font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {strength && (
                    <div className="mt-2">
                      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${strength.color} rounded-full transition-all duration-300`}
                          style={{ width: strength.width }}
                        />
                      </div>
                      <p className="text-xs text-white/35 mt-1">{strength.label}</p>
                    </div>
                  )}
                </div>

                {/* Confirm password */}
                <div>
                  <label className="block text-sm font-semibold text-white/60 mb-2">Confirm password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type={showConfirm ? "text" : "password"}
                      required
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      placeholder="••••••••"
                      className={`w-full h-12 bg-white/5 border rounded-xl pl-11 pr-12 text-white placeholder-white/20 outline-none focus:ring-2 transition text-sm font-medium ${
                        mismatch
                          ? "border-red-500/40 focus:border-red-500/60 focus:ring-red-500/20"
                          : "border-white/10 focus:border-cyan-500/50 focus:ring-cyan-500/20"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition"
                    >
                      {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {mismatch && <p className="text-xs text-red-400 mt-1">Passwords do not match</p>}
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm font-semibold text-red-400">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || mismatch}
                  className="w-full h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 hover:from-cyan-400 hover:to-blue-500 transition-all disabled:opacity-60 shadow-lg shadow-cyan-500/20 mt-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Update Password
                    </>
                  )}
                </button>
              </form>
            </>
          )}

          {pageState === "success" && (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="text-3xl font-extrabold text-white">Password updated!</h2>
              <p className="mt-3 text-white/45 text-sm leading-relaxed max-w-xs mx-auto">
                Your admin password has been successfully updated. You can now sign in with your new credentials.
              </p>
              <a
                href="/login"
                className="mt-8 inline-flex items-center justify-center gap-2 h-12 px-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white font-bold text-sm hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20"
              >
                <Lock className="w-4 h-4" />
                Sign In Now
              </a>
            </div>
          )}

          <div className="mt-10 flex items-center gap-2 justify-center text-white/20">
            <Package className="w-3.5 h-3.5" />
            <span className="text-xs">Federalogistic Admin Portal</span>
          </div>
        </div>
      </div>
    </div>
  )
}
