import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatMoney(amount: number, currency = "USD"): string {
  const formatted = amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  return `${currency} ${formatted}`
}

/**
 * Formats an ISO date string to a readable date + time.
 * e.g. "2026-05-27T00:50:08.882Z" → "2026-05-27 at 12:50am"
 * Falls back to the raw string if parsing fails.
 */
export function formatDateTime(raw?: string): string {
  if (!raw) return ""
  try {
    const d = new Date(raw)
    if (isNaN(d.getTime())) return raw
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, "0")
    const day = String(d.getDate()).padStart(2, "0")
    const hours = d.getHours()
    const minutes = String(d.getMinutes()).padStart(2, "0")
    const ampm = hours >= 12 ? "pm" : "am"
    const h = hours % 12 || 12
    return `${year}-${month}-${day} at ${h}:${minutes}${ampm}`
  } catch {
    return raw
  }
}
