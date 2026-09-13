export const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:4200"

export function adminToken() {
  return window.localStorage.getItem("federalogistic_admin_token")
}

export function setAdminToken(token: string) {
  window.localStorage.setItem("federalogistic_admin_token", token)
}

export function clearAdminToken() {
  window.localStorage.removeItem("federalogistic_admin_token")
}

const TIMEOUT_MS = 30_000
const RETRY_DELAY_MS = 5_000

function isNetworkError(err: unknown): boolean {
  if (err instanceof TypeError) return true
  if (err instanceof Error && ["AbortError", "NetworkError", "TimeoutError"].includes(err.name)) return true
  return false
}

async function fetchWithTimeout(url: string, options: RequestInit): Promise<Response> {
  const ctrl = new AbortController()
  const tid = setTimeout(() => ctrl.abort(), TIMEOUT_MS)
  try {
    return await fetch(url, { ...options, signal: ctrl.signal })
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error("Request timed out — the server may be starting up. Please try again.")
    }
    throw err
  } finally {
    clearTimeout(tid)
  }
}

async function fetchWithRetry(url: string, options: RequestInit, retries = 1): Promise<Response> {
  for (let i = 0; i <= retries; i++) {
    if (i > 0) await new Promise((r) => setTimeout(r, RETRY_DELAY_MS))
    try {
      return await fetchWithTimeout(url, options)
    } catch (err) {
      if (!isNetworkError(err) || i === retries) throw err
    }
  }
  throw new Error("Request failed")
}

export async function apiJson<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers)
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json")
  }
  const token = adminToken()
  if (token) headers.set("Authorization", `Bearer ${token}`)

  const response = await fetchWithRetry(`${API_URL}${path}`, { ...options, headers })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.message || "Request failed")
  return data as T
}

export async function apiForm<T>(path: string, form: FormData, method = "POST"): Promise<T> {
  const headers = new Headers()
  const token = adminToken()
  if (token) headers.set("Authorization", `Bearer ${token}`)

  const response = await fetchWithTimeout(`${API_URL}${path}`, { method, body: form, headers })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.message || "Request failed")
  return data as T
}
