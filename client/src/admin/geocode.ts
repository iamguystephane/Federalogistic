import { validCoordinates } from "../lib/coordinates"

export type LocationMatch = { label: string; lat: number; lng: number }
const cache = new Map<string, LocationMatch[]>()
let queue: Promise<unknown> = Promise.resolve()
let lastRequest = 0

// Explicit searches only; share request spacing across the three fields.
export function searchLocations(address: string): Promise<LocationMatch[]> {
  const query = address.trim()
  if (!query) return Promise.resolve([])
  const cached = cache.get(query)
  if (cached) return Promise.resolve(cached)
  const request = queue.then(async () => {
    const cachedAfterWait = cache.get(query)
    if (cachedAfterWait) return cachedAfterWait
    const delay = Math.max(0, 1100 - (Date.now() - lastRequest))
    if (delay) await new Promise<void>((resolve) => setTimeout(resolve, delay))
    lastRequest = Date.now()
    const params = new URLSearchParams({ q: query, format: "jsonv2", limit: "5", "accept-language": "en" })
    const res = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, { signal: AbortSignal.timeout(15000) })
    if (!res.ok) throw new Error("Location search is unavailable. Please try again.")
    const data: { display_name: string; lat: string; lon: string }[] = await res.json()
    const matches = data.filter((place) => place.display_name && validCoordinates(place.lat, place.lon))
      .map((place) => ({ label: place.display_name, lat: Number(place.lat), lng: Number(place.lon) }))
    if (matches.length) cache.set(query, matches)
    return matches
  })
  queue = request.catch(() => undefined)
  return request
}
