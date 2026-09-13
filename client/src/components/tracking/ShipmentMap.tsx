import { useEffect, useRef } from "react"
import type { TrackingResult } from "../../data/trackingResult"

type Props = { data: TrackingResult }

declare global {
  interface Window {
    L: typeof import("leaflet")
  }
}

function deliveryIconSvg(mode: string): string {
  const m = (mode || "").toLowerCase()
  if (m.includes("air") || m.includes("flight")) {
    return `<svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" width="14" height="14">
      <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
    </svg>`
  }
  if (m.includes("sea") || m.includes("ocean") || m.includes("ship") || m.includes("vessel")) {
    return `<svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" width="14" height="14">
      <path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.65 2.62.99 4 .99h2v-2h-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.78s-.34-.42-.6-.5L20 10.62V6c0-1.1-.9-2-2-2h-3V1H9v3H6c-1.1 0-2 .9-2 2v4.62l-1.29.42c-.26.08-.48.26-.6.5s-.14.52-.06.78L3.95 19zM6 6h12v3.97L12 8 6 9.97V6z"/>
    </svg>`
  }
  if (m.includes("road") || m.includes("ground") || m.includes("truck") || m.includes("drive")) {
    return `<svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" width="14" height="14">
      <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
    </svg>`
  }
  // default: package box
  return `<svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" width="14" height="14">
    <path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z"/>
  </svg>`
}

function makePinHtml(label: string, color: string): string {
  return `
    <div style="display:flex;flex-direction:column;align-items:center;gap:2px">
      <div style="background:rgba(255,255,255,0.97);border:1px solid rgba(0,0,0,0.13);border-radius:5px;padding:2px 8px;font-size:10px;font-weight:800;color:#1e293b;white-space:nowrap;box-shadow:0 1px 5px rgba(0,0,0,0.18);letter-spacing:0.02em">${label}</div>
      <svg width="26" height="38" viewBox="0 0 26 38" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 1C7.20 1 2.5 5.70 2.5 11.5C2.5 20.25 13 37 13 37C13 37 23.5 20.25 23.5 11.5C23.5 5.70 18.80 1 13 1Z" fill="${color}" stroke="white" stroke-width="1.8"/>
        <circle cx="13" cy="11.5" r="5.5" fill="white"/>
      </svg>
    </div>
  `
}

function makeWaypointHtml(label: string): string {
  return `
    <div style="display:flex;flex-direction:column;align-items:center;gap:2px">
      <div style="background:rgba(255,255,255,0.97);border:1px solid rgba(0,0,0,0.13);border-radius:5px;padding:2px 8px;font-size:10px;font-weight:800;color:#1e293b;white-space:nowrap;box-shadow:0 1px 5px rgba(0,0,0,0.18)">${label}</div>
      <div style="width:18px;height:18px;border-radius:50%;background:#f97316;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.35)"></div>
    </div>
  `
}

export function ShipmentMap({ data }: Props) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<import("leaflet").Map | null>(null)
  const { origin, waypoint, destination } = data.mapRoute
  const deliveryMode = data.parcel.deliveryMode || data.shipment.type || ""

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    import("leaflet").then((L) => {
      const map = L.map(mapRef.current!, { zoomControl: true, scrollWheelZoom: false })
      mapInstanceRef.current = map

      // Override Leaflet's default #ddd background with OSM water color so the areas
      // outside the tile projection bounds (above/below ±85° lat) blend seamlessly
      if (mapRef.current) mapRef.current.style.background = "#aad3df"

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map)

      const makePinIcon = (label: string, color: string) =>
        L.divIcon({
          html: makePinHtml(label, color),
          className: "",
          iconSize: [90, 60],
          iconAnchor: [45, 60],
        })

      const makeWaypointIcon = (label: string) =>
        L.divIcon({
          html: makeWaypointHtml(label),
          className: "",
          iconSize: [90, 40],
          iconAnchor: [45, 40],
        })

      // Origin — blue Google Maps-style pin
      L.marker([origin.lat, origin.lng], { icon: makePinIcon("Origin", "#2459d8") })
        .addTo(map)
        .bindPopup(`<strong>Origin:</strong> ${origin.label}`)

      // Waypoint — orange circle
      if (waypoint) {
        L.marker([waypoint.lat, waypoint.lng], { icon: makeWaypointIcon("Current") })
          .addTo(map)
          .bindPopup(`<strong>Current Location:</strong> ${waypoint.label}`)
      }

      // Destination — red Google Maps-style pin
      L.marker([destination.lat, destination.lng], { icon: makePinIcon("Destination", "#EA4335") })
        .addTo(map)
        .bindPopup(`<strong>Destination:</strong> ${destination.label}`)

      // Route polyline
      const points: [number, number][] = [
        [origin.lat, origin.lng],
        ...(waypoint ? [[waypoint.lat, waypoint.lng] as [number, number]] : []),
        [destination.lat, destination.lng],
      ]
      L.polyline(points, { color: "#eab308", weight: 3, opacity: 0.9 }).addTo(map)

      map.invalidateSize()
      map.fitBounds(L.latLngBounds(points), { padding: [60, 60] })
    })

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [data])

  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden" style={{ height: 620 }}>
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between px-6 py-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-blue-600 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          <h2 className="text-[1.1rem] font-extrabold text-slate-900">Complete Shipment Route</h2>
        </div>
        <span className="text-[0.78rem] text-slate-400 font-medium">(Fixed Map View)</span>
      </div>

      {/* Map + overlays */}
      <div className="relative flex-1 min-h-0">
        {/* Wrapper for absolute fill — Leaflet CSS sets position:relative on the ref div,
            so we let the wrapper handle the absolute stretch and give the ref div 100% dimensions */}
        <div className="absolute inset-0">
          <div ref={mapRef} className="w-full h-full" />
        </div>

        {/* Delivery mode badge — top-right */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-2 rounded-xl bg-white/95 border border-slate-100 shadow-md px-3 py-2 backdrop-blur-sm">
          <div
            className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2459d8]"
            dangerouslySetInnerHTML={{ __html: deliveryIconSvg(deliveryMode) }}
          />
          <span className="text-xs font-bold text-slate-700">{deliveryMode || "Shipment"}</span>
        </div>

        {/* Legend — bottom-right */}
        <div className="absolute bottom-2 right-2 z-1000 rounded-lg bg-white/95 border border-slate-100 shadow-md px-2 py-1.5 backdrop-blur-sm">
          <p className="text-[0.55rem] font-bold uppercase tracking-wider text-slate-400 mb-1">Legend</p>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-[#2459d8] border border-white shadow-sm shrink-0" />
              <span className="text-[0.62rem] font-semibold text-slate-700">Origin</span>
            </div>
            {waypoint && (
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-orange-500 border border-white shadow-sm shrink-0" />
                <span className="text-[0.62rem] font-semibold text-slate-700">Current</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-[#EA4335] border border-white shadow-sm shrink-0" />
              <span className="text-[0.62rem] font-semibold text-slate-700">Destination</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-2.5 rounded-full bg-yellow-400 shrink-0" />
              <span className="text-[0.62rem] font-semibold text-slate-700">Route</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
