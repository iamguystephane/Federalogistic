import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { test } from "node:test"
import ts from "typescript"

function moduleUrl(path) {
  const source = readFileSync(new URL(path, import.meta.url), "utf8")
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } })
  return `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`
}
const coordinatesUrl = moduleUrl("../src/lib/coordinates.ts")
const { validCoordinates } = await import(coordinatesUrl)
const geocodeSource = readFileSync(new URL("../src/admin/geocode.ts", import.meta.url), "utf8")
const { outputText } = ts.transpileModule(geocodeSource.replace('"../lib/coordinates"', JSON.stringify(coordinatesUrl)), { compilerOptions: { module: ts.ModuleKind.ESNext } })
const { searchLocations } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`)

test("coordinate validation accepts equator and meridian locations and rejects missing or invalid pins", () => {
  assert.equal(validCoordinates(0, 0), true)
  assert.equal(validCoordinates("0", "32.12345"), true)
  for (const [lat, lng] of [[null, 0], ["", ""], [" ", 1], [NaN, 1], [91, 0], [0, -181]]) assert.equal(validCoordinates(lat, lng), false)
})

test("search preserves the full query and returns choices instead of guessing the first result", async () => {
  const originalFetch = globalThis.fetch
  const calls = []
  globalThis.fetch = async (url) => {
    calls.push(new URL(url))
    return { ok: true, json: async () => [
      { display_name: "Springfield, Illinois, United States", lat: "39.799", lon: "-89.644" },
      { display_name: "Springfield, Massachusetts, United States", lat: "42.101", lon: "-72.589" },
      { display_name: "Invalid pin", lat: "not-a-number", lon: "0" },
    ] }
  }
  try {
    const matches = await searchLocations("Springfield, United States")
    assert.equal(matches.length, 2)
    assert.equal(calls[0].searchParams.get("q"), "Springfield, United States")
    assert.equal(calls[0].searchParams.get("limit"), "5")
    assert.equal(matches[1].lng, -72.589)
    assert.deepEqual(await searchLocations("Springfield, United States"), matches)
    assert.equal(calls.length, 1)
  } finally { globalThis.fetch = originalFetch }
})

test("no match or failed searches never broaden the query to a different location", async () => {
  const originalFetch = globalThis.fetch
  let calls = 0
  globalThis.fetch = async () => { calls++; return { ok: true, json: async () => [] } }
  try {
    assert.deepEqual(await searchLocations("123 Unfindable Street, Actual City, Country"), [])
    assert.equal(calls, 1)
    globalThis.fetch = async () => { calls++; return { ok: false } }
    await assert.rejects(searchLocations("Unavailable City"), /unavailable/)
    assert.equal(calls, 2)
    globalThis.fetch = async () => { calls++; return { ok: true, json: async () => [] } }
    assert.deepEqual(await searchLocations("Unavailable City"), [])
    assert.equal(calls, 3)
  } finally { globalThis.fetch = originalFetch }
})
