import { useState, useEffect } from "react"
import { API_URL } from "./api"

export type SiteContactInfo = {
  contactPhone: string
  contactEmail: string
  contactAddress: string
  formDestinationEmail: string
  socialFacebook: string
  socialX: string
  socialInstagram: string
  socialTiktok: string
}

const EMPTY: SiteContactInfo = {
  contactPhone: "",
  contactEmail: "",
  contactAddress: "",
  formDestinationEmail: "",
  socialFacebook: "",
  socialX: "",
  socialInstagram: "",
  socialTiktok: "",
}

const cache: { data: SiteContactInfo | null } = { data: null }

export function useSiteSettings(): SiteContactInfo {
  const [settings, setSettings] = useState<SiteContactInfo>(cache.data ?? EMPTY)

  useEffect(() => {
    if (cache.data) return
    fetch(`${API_URL}/api/public/settings`)
      .then((r) => r.json())
      .then((data: SiteContactInfo) => {
        cache.data = data
        setSettings(data)
      })
      .catch(() => undefined)
  }, [])

  return settings
}
