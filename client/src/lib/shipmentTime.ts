// Read the saved clock fields directly so every viewer sees the admin's time.
// Older ISO timestamps retain their stored clock fields as well.
function clockParts(raw: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:\d{2})?$/.exec(raw)
  if (!match) return null
  const [, year, month, day, hour, minute] = match
  const monthNumber = Number(month)
  const dayNumber = Number(day)
  const hours = Number(hour)
  const leapYear = Number(year) % 4 === 0 && (Number(year) % 100 !== 0 || Number(year) % 400 === 0)
  const monthDays = [31, leapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  if (monthNumber < 1 || monthNumber > 12 || dayNumber < 1 || dayNumber > monthDays[monthNumber - 1] || hours > 23 || Number(minute) > 59) return null
  return { year, month, day, monthNumber, dayNumber, minute, hour: hours % 12 || 12, period: hours >= 12 ? "PM" : "AM" }
}

export function formatShipmentDateTime(raw?: string): string {
  if (!raw) return ""
  const parts = clockParts(raw)
  if (!parts) return raw
  return `${parts.year}-${parts.month}-${parts.day} at ${parts.hour}:${parts.minute}${parts.period.toLowerCase()}`
}

export function formatShipmentLastUpdated(raw: string): string {
  const parts = clockParts(raw)
  if (!parts) return raw
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  return `${months[parts.monthNumber - 1]} ${parts.dayNumber}, ${parts.year} - ${parts.hour}:${parts.minute} ${parts.period}`
}
