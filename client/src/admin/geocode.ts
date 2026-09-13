export const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

async function nominatimSearch(query: string): Promise<{ lat: number; lng: number } | null> {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`
  const res = await fetch(url, { headers: { "User-Agent": "Federalogistic/1.0" } })
  if (!res.ok) return null
  const data: { lat: string; lon: string }[] = await res.json()
  return data.length ? { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) } : null
}

export async function geocodeAddress(address: string): Promise<{ lat: number; lng: number }> {
  const r1 = await nominatimSearch(address)
  if (r1) return r1
  await sleep(1100)

  const cleaned = address
    .replace(/#\s*\d+/g, "")
    .replace(/\bC\.P\.?\s*\d{4,6}\b/gi, "")
    .replace(/\b\d{4,6}\b/g, "")
    .replace(/\b(?:Col|Colonia|No|Num|Bo|Urb|Barrio|Calle|Av|Avda|Blvd|Jr|St|Str)\.?\s/gi, "")
    .replace(/\ben\b/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim()
  if (cleaned && cleaned !== address) {
    const r2 = await nominatimSearch(cleaned)
    if (r2) return r2
    await sleep(1100)
  }

  const meaningfulSegments = address
    .split(",")
    .map((s) =>
      s.replace(/\b\d{3,6}\b/g, "")
       .replace(/\b[A-ZÀ-Ÿ][a-zà-ÿ]{0,3}\.\s*$/g, "")
       .replace(/\s{2,}/g, " ")
       .trim()
    )
    .filter((s) => s.length >= 3)

  if (meaningfulSegments.length >= 3) {
    const r3 = await nominatimSearch(meaningfulSegments.slice(-3).join(", "))
    if (r3) return r3
    await sleep(1100)
  }
  if (meaningfulSegments.length >= 2) {
    const r4 = await nominatimSearch(meaningfulSegments.slice(-2).join(", "))
    if (r4) return r4
  }

  // Deliberately no further fallback: past this point the address has already lost its
  // comma-separated hierarchy (street/city/state/country). Guessing from arbitrary leftover
  // words matches unrelated places sharing a generic name and is what produced "random" pins.
  throw new Error(`Could not locate this address — try a simpler format like "City, Country"`)
}
