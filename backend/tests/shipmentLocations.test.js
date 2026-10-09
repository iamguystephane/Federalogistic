const assert = require("node:assert/strict")
const { test } = require("node:test")
const { shipmentPayload, locationCoordinates } = require("../utils/helpers")
const { serializeShipment } = require("../utils/serializers")

test("chosen coordinates and labels reach the client unchanged, including zero coordinates", () => {
  const body = {
    originLocation: "Jacksonville, Florida, United States", originLat: "30.3321838", originLng: "-81.655651",
    destinationLocation: "Vancouver, British Columbia, Canada", destinationLat: "49.2608724", destinationLng: "-123.113952",
    currentLocation: "Equator checkpoint", currentLat: "0", currentLng: "32.1234567",
  }
  const payload = shipmentPayload(body)
  const result = serializeShipment({ ...payload, updatedAt: new Date() })
  assert.deepEqual(result.mapRoute.origin, { label: body.originLocation, lat: 30.3321838, lng: -81.655651 })
  assert.deepEqual(result.mapRoute.destination, { label: body.destinationLocation, lat: 49.2608724, lng: -123.113952 })
  assert.deepEqual(result.mapRoute.waypoint, { label: body.currentLocation, lat: 0, lng: 32.1234567 })
  const meridian = serializeShipment({ ...payload, currentLng: 0, currentLat: 51, updatedAt: new Date() })
  assert.equal(meridian.mapRoute.waypoint.lng, 0)
})

test("invalid or unresolved coordinates are rejected for all named locations", () => {
  for (const prefix of ["origin", "destination", "current"]) {
    for (const [lat, lng] of [["", ""], [" ", "1"], ["1", undefined], ["NaN", "1"], ["91", "1"], ["1", "181"]]) {
      assert.throws(() => locationCoordinates({ [`${prefix}Location`]: "Test", [`${prefix}Lat`]: lat, [`${prefix}Lng`]: lng }, prefix), { status: 400 })
    }
  }
})

test("clearing the current location removes its old coordinates", () => {
  assert.deepEqual(locationCoordinates({ currentLocation: "", currentLat: "45", currentLng: "80" }, "current"), { lat: null, lng: null })
})
