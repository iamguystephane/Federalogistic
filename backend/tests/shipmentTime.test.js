const assert = require("node:assert/strict")
const { test } = require("node:test")
const { shipmentEventDate, shipmentPayload, requiredShipmentFields } = require("../utils/helpers")
const { serializeShipment } = require("../utils/serializers")

let saved
let existing
const prismaPath = require.resolve("../prisma")
require.cache[prismaPath] = { id: prismaPath, filename: prismaPath, loaded: true, exports: {
  shipment: {
    findUnique: async () => existing,
    update: async ({ data }) => {
      saved = data
      return { ...existing, ...data, updatedAt: new Date("2026-10-09T18:00:00Z") }
    },
  },
} }
const { updateShipment } = require("../controllers/shipmentController")

function fixture() {
  return {
    id: "test-shipment", currentStatus: "ORDER_CONFIRMED", paymentStatus: "UNPAID",
    updatedAt: new Date("2026-10-08T15:40:00Z"),
    history: [{ date: "2026-10-08T15:40:00Z", status: "Order Confirmed" }],
    progress: [{ step: "Order Confirmed", date: "2026-10-08T15:40:00Z" }, { step: "Package received by Federalogistic" }],
  }
}

async function update(overrides = {}) {
  existing = fixture()
  saved = undefined
  const body = Object.fromEntries(requiredShipmentFields.map((field) => [field, "1"]))
  Object.assign(body, { currentStatus: "Order Confirmed", milestoneDate: "2026-10-07T09:30", isOnHold: "false" }, overrides)
  let result
  let error
  await updateShipment({ params: { id: existing.id }, body }, { json: (data) => { result = data } }, (err) => { error = err })
  return { result, error }
}

test("preserves admin clock fields and rejects invalid dates", () => {
  assert.equal(shipmentEventDate("2026-10-07T09:30"), "2026-10-07T09:30:00")
  assert.equal(shipmentEventDate("2026-10-07T00:00:05"), "2026-10-07T00:00:05")
  for (const value of ["invalid", "2026-02-30T09:30", "2026-10-07T24:30", "2026-10-07T09:60"]) {
    assert.throws(() => shipmentEventDate(value), { status: 400 })
  }
})

test("a date-only edit records the selected time in history, current progress and banner", async () => {
  const { result, error } = await update()
  assert.ifError(error)
  assert.equal(result.history.at(-1).date, "2026-10-07T09:30:00")
  assert.equal(result.progress[0].date, "2026-10-07T09:30:00")
  assert.equal(result.lastUpdated, "2026-10-07T09:30:00")
  assert.equal(result.history[0].date, "2026-10-08T15:40:00Z")
})

test("hold, transit and on-the-way entries share the exact selected time", async () => {
  const { result, error } = await update({ isOnHold: "true", addTransitMilestone: "true", addOnTheWayMilestone: "true" })
  assert.ifError(error)
  assert.deepEqual(result.history.slice(1).map((entry) => entry.status), ["On Hold", "In Transit", "On the Way"])
  assert.ok(result.history.slice(1).every((entry) => entry.date === "2026-10-07T09:30:00"))
  assert.ok(result.progress.filter((stage) => stage.type).every((stage) => stage.date === "2026-10-07T09:30:00"))
  assert.equal(result.progress[0].date, existing.progress[0].date)
  assert.equal(result.lastUpdated, "2026-10-07T09:30:00")
})

test("status changes use the admin time for the reached progress stage", async () => {
  const { result, error } = await update({ currentStatus: "Package received by Federalogistic" })
  assert.ifError(error)
  assert.equal(result.progress[1].date, "2026-10-07T09:30:00")
  assert.equal(result.lastUpdated, "2026-10-07T09:30:00")
})

test("invalid update timestamps fail before saving", async () => {
  const { error } = await update({ milestoneDate: "2026-02-30T12:00" })
  assert.equal(error.status, 400)
  assert.equal(saved, undefined)
})

test("an edit without a selected timestamp records a fallback time and preserves existing progress dates", async () => {
  const { result, error } = await update({ milestoneDate: "" })
  assert.ifError(error)
  assert.ok(Number.isFinite(Date.parse(result.history.at(-1).date)))
  assert.equal(result.lastUpdated, result.history.at(-1).date)
  assert.equal(result.progress[0].date, existing.progress[0].date)
})

test("creation uses the chosen milestone time in both history and progress", () => {
  const data = shipmentPayload({ currentStatus: "Order Confirmed", milestoneDate: "2026-10-07T09:30", originLat: "0", originLng: "0", destinationLat: "1", destinationLng: "1" })
  assert.equal(data.history[0].date, "2026-10-07T09:30:00")
  assert.equal(data.progress[0].date, data.history[0].date)
})

test("banner falls back to the save timestamp when no history exists", () => {
  const shipment = { ...fixture(), history: [] }
  assert.equal(serializeShipment(shipment).lastUpdated, shipment.updatedAt.toISOString())
})
