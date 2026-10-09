import { useRef, useState } from "react"
import { searchLocations, type LocationMatch } from "../geocode"
import { validCoordinates } from "../../lib/coordinates"
import { Field } from "./FormFields"

export function LocationField({ label, value, lat, lng, onChange, required, error, disabled }: {
  label: string; value: string; lat: string; lng: string
  onChange: (value: string, lat: string, lng: string) => void
  required?: boolean; error?: string; disabled?: boolean
}) {
  const [matches, setMatches] = useState<LocationMatch[]>([])
  const [resultQuery, setResultQuery] = useState("")
  const [searching, setSearching] = useState(false)
  const [message, setMessage] = useState("")
  const requestId = useRef(0)
  const selected = value.trim() && validCoordinates(lat, lng)

  function change(value: string) {
    requestId.current++
    setMatches([])
    setMessage("")
    setSearching(false)
    onChange(value, "", "")
  }

  async function search() {
    const id = ++requestId.current
    const query = value
    setSearching(true)
    setMessage("")
    setMatches([])
    try {
      const results = await searchLocations(value)
      if (id !== requestId.current) return
      setResultQuery(query)
      setMatches(results)
      if (!results.length) setMessage("No matching place found. Include the city, state or region, and country, then search again.")
    } catch (err) {
      if (id === requestId.current) setMessage(err instanceof Error ? err.message : "Location search failed. Please try again.")
    } finally {
      if (id === requestId.current) setSearching(false)
    }
  }

  return (
    <fieldset disabled={disabled} className="min-w-0">
      <Field label={label} value={value} onChange={change} required={required} placeholder="City, state or region, country" error={error} />
      <div className="mt-2 flex items-center gap-2">
        <button type="button" onClick={search} disabled={!value.trim() || searching || disabled} className="rounded-lg border border-blue-200 px-3 py-1.5 text-xs font-bold text-blue-700 hover:bg-blue-50 disabled:opacity-50">
          {searching ? "Searching…" : "Find location"}
        </button>
        {selected && <span className="text-xs font-semibold text-green-700">Map location selected</span>}
      </div>
      {selected && <p className="mt-1 text-xs text-slate-500">{lat}, {lng}</p>}
      {message && <p role="status" className="mt-2 text-xs text-red-600">{message}</p>}
      {resultQuery === value && matches.length > 0 && (
        <div className="mt-2 rounded-lg border border-slate-200 bg-white">
          <p className="px-3 py-2 text-xs font-semibold text-slate-500">Choose the correct place:</p>
          {matches.map((place) => (
            <button key={`${place.label}-${place.lat}-${place.lng}`} type="button" className="block w-full border-t border-slate-100 px-3 py-2 text-left text-xs text-slate-700 hover:bg-blue-50" onClick={() => {
              requestId.current++
              onChange(place.label, String(place.lat), String(place.lng))
              setMatches([])
              setMessage("")
            }}>{place.label}</button>
          ))}
          <p className="px-3 py-2 text-[0.65rem] text-slate-400">Search results © OpenStreetMap contributors</p>
        </div>
      )}
    </fieldset>
  )
}
