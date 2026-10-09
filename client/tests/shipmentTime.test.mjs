import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { test } from "node:test"
import ts from "typescript"

const source = readFileSync(new URL("../src/lib/shipmentTime.ts", import.meta.url), "utf8")
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } })
const { formatShipmentDateTime, formatShipmentLastUpdated } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`)

test("history, progress and banner retain the entered clock time in every timezone", () => {
  for (const raw of ["2026-10-07T09:30", "2026-10-07T09:30:00", "2026-10-07T09:30:00Z", "2026-10-07T09:30:00+01:00"]) {
    assert.equal(formatShipmentDateTime(raw), "2026-10-07 at 9:30am")
    assert.equal(formatShipmentLastUpdated(raw), "Oct 7, 2026 - 9:30 AM")
  }
})

test("midnight, noon and afternoon format correctly without moving the date", () => {
  assert.equal(formatShipmentDateTime("2026-01-01T00:00"), "2026-01-01 at 12:00am")
  assert.equal(formatShipmentDateTime("2026-01-01T12:00"), "2026-01-01 at 12:00pm")
  assert.equal(formatShipmentLastUpdated("2026-10-08T15:40"), "Oct 8, 2026 - 3:40 PM")
  assert.equal(formatShipmentDateTime("2026-12-31T23:59:00Z"), "2026-12-31 at 11:59pm")
})

test("empty and unsupported values have readable fallbacks", () => {
  assert.equal(formatShipmentDateTime(), "")
  for (const raw of ["invalid", "2026-02-30T09:30", "Jan 28, 2026 - 11:07 PM"]) {
    assert.equal(formatShipmentDateTime(raw), raw)
    assert.equal(formatShipmentLastUpdated(raw), raw)
  }
})
