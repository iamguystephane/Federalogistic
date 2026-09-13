import { ChevronRight, Clock, Mail, Phone, Search } from "lucide-react"
import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { IconCircle } from "./IconCircle"
import { quickLinks } from "../data/navigation"

import { goToTrackingResult } from "../lib/tracking"
import { useSiteSettings } from "../lib/siteSettings"

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.791-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.883v2.27h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

function TiktokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.2 8.2 0 004.79 1.53V6.75a4.85 4.85 0 01-1.02-.06z" />
    </svg>
  )
}

const quickLinkMap: Record<string, string> = {
  Home: "/",
  About: "/about",
  "About Us": "/about",
  Services: "/services",
  "Our Services": "/services",
  Tracking: "/track-order",
  "Track Shipment": "/track-order",
  Contact: "/contact",
  "Contact Us": "/contact",
  "Diplomatic Services": "/services/diplomatic",
}

export function Footer() {
  const [footerTrack, setFooterTrack] = useState("")
  const siteInfo = useSiteSettings()

  const contactItems = [
    ...(siteInfo.contactEmail ? [{ label: "Email Us", value: siteInfo.contactEmail, icon: Mail }] : []),
    ...(siteInfo.contactPhone ? [{ label: "Call Us", value: siteInfo.contactPhone, icon: Phone }] : []),
    { label: "Working Hours", value: "24/7 Global Support", icon: Clock },
  ]

  const socialLinks = [
    { key: "facebook",  href: siteInfo.socialFacebook,  label: "Facebook",  Icon: FacebookIcon },
    { key: "x",         href: siteInfo.socialX,          label: "X",         Icon: XIcon },
    { key: "instagram", href: siteInfo.socialInstagram,  label: "Instagram", Icon: InstagramIcon },
    { key: "tiktok",    href: siteInfo.socialTiktok,     label: "TikTok",    Icon: TiktokIcon },
  ].filter((s) => s.href)

  return (
    <footer className="bg-[#172231] text-white">
      <div className="mx-auto grid max-w-300 gap-10 px-5 py-14 lg:grid-cols-[1.55fr_0.8fr_1fr]">
        <div>
          <a href="/" className="inline-block select-none">
            <img src="/full-logo.png" alt="Federalogistic" className="h-14 w-auto object-contain" />
          </a>
          <p className="mt-4 max-w-190 text-[0.9rem] leading-relaxed text-white/90">
            Providing Smart Logistics Solutions Across The World. We deliver excellence in shipping,
            courier services, and package tracking with our global network of trusted partners.
          </p>
          {socialLinks.length > 0 && (
            <div className="mt-5 flex gap-3">
              {socialLinks.map(({ key, href, label, Icon }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-8.5 w-8.5 items-center justify-center rounded-full bg-blue-600 transition-colors hover:bg-blue-500"
                  aria-label={label}
                >
                  <Icon />
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <h3 className="text-[1rem] font-extrabold">Quick Links</h3>
          <ul className="mt-5 space-y-3 text-[0.9rem]">
            {quickLinks.map((link) => (
              <li key={link}>
                <a href={quickLinkMap[link] || "/"} className="flex items-center gap-2 text-white/90">
                  <ChevronRight className="h-4 w-4 text-blue-500" />
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[1rem] font-extrabold">Contact Info</h3>
          <div className="mt-5 space-y-4">
            {contactItems.map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <IconCircle icon={item.icon} className="h-7 w-7" />
                <div>
                  <div className="text-xs text-white/60">{item.label}</div>
                  <div className="text-[0.85rem] font-semibold">{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          <form
            className="mt-6"
            onSubmit={(e) => {
              e.preventDefault()
              goToTrackingResult(footerTrack)
            }}
          >
            <label className="text-sm font-extrabold" htmlFor="footer-track">
              Quick Track
            </label>
            <Input
              id="footer-track"
              value={footerTrack}
              onChange={(e) => setFooterTrack(e.target.value)}
              placeholder="Enter tracking number..."
              className="mt-3 h-9 border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/45"
            />
            <Button type="submit" className="mt-2 h-9 w-full text-sm">
              <Search className="h-4 w-4" />
              Track
            </Button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-300 flex-wrap items-center justify-between gap-4 px-5 py-5 text-xs text-white/65">
          <p>Copyright © 2026 Federalogistic. All rights reserved.</p>
          <div className="flex flex-wrap gap-6">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of Service</a>
            <a href="/shipping-policy">Shipping Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
