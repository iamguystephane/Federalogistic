const lastTrackingKey = "federalogistic_last_tracking_number"

export function trackingFromUrl() {
  return new URLSearchParams(window.location.search).get("tracking")?.trim() || ""
}

export function rememberTrackingNumber(trackingNumber: string) {
  try {
    window.localStorage.setItem(lastTrackingKey, trackingNumber)
  } catch {
    // Ignore storage failures; the URL still carries the tracking number.
  }
}

export function rememberedTrackingNumber() {
  try {
    return window.localStorage.getItem(lastTrackingKey) || ""
  } catch {
    return ""
  }
}

export function goToTrackingResult(trackingNumber: string) {
  const clean = trackingNumber.trim()
  if (!clean) return
  rememberTrackingNumber(clean)
  window.location.href = `/trackingresult?tracking=${encodeURIComponent(clean)}`
}
