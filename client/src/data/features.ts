import { Globe, Headphones, MapPin, Shield, Truck } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export type Feature = {
  title: string
  description: string
  icon: LucideIcon
}

export const features: Feature[] = [
  {
    title: "Track & Trace",
    description:
      "Fast and reliable way to check the real-time status of your shipment with our advanced tracking system.",
    icon: MapPin,
  },
  {
    title: "Secure Warehousing",
    description:
      "We leverage a network of operational warehousing facilities with state-of-the-art security systems.",
    icon: Shield,
  },
  {
    title: "Express Delivery",
    description:
      "We service your shipments via a diverse operating infrastructure for fastest delivery times.",
    icon: Truck,
  },
  {
    title: "Domestic Services",
    description:
      "Next business day delivery for time-sensitive parcels with comprehensive domestic coverage.",
    icon: Truck,
  },
  {
    title: "Global Coverage",
    description:
      "US, Europe & Worldwide coverage by sea & air. We offer a broad range of international freight services.",
    icon: Globe,
  },
  {
    title: "24/7 Support",
    description:
      "Get excellent 24/7 online support and expert advice from our dedicated customer service team.",
    icon: Headphones,
  },
]
