export function validCoordinates(lat: string | number | null | undefined, lng: string | number | null | undefined): boolean {
  if (lat == null || lng == null || String(lat).trim() === "" || String(lng).trim() === "") return false
  const latitude = Number(lat)
  const longitude = Number(lng)
  return Number.isFinite(latitude) && Number.isFinite(longitude) && Math.abs(latitude) <= 90 && Math.abs(longitude) <= 180
}
