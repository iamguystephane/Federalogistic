import { Headphones, Mail, MapPin, Phone, Plane, Shield, Ship, Truck, Warehouse } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export type ContactCard = {
  title: string
  description: string
  value: string
  href: string
  icon: LucideIcon
}

export type FormFeature = {
  title: string
  description: string
  icon: LucideIcon
}

export type Faq = {
  question: string
  answer: string
}

export type RouteType = {
  label: string
  icon: LucideIcon
}

export const contactCards: ContactCard[] = [
  {
    title: "Call Us",
    description: "Our support team is available 24/7",
    value: "TOLL FREE",
    href: "tel:+233543212188",
    icon: Phone,
  },
  {
    title: "Email Us",
    description: "Send us an email for any inquiry",
    value: "support@demo2.mazcapitals.com",
    href: "mailto:support@demo2.mazcapitals.com",
    icon: Mail,
  },
  {
    title: "Our Location",
    description: "Our head office is located at",
    value: "Your Address here",
    href: "#",
    icon: MapPin,
  },
]

export const formFeatures: FormFeature[] = [
  {
    title: "Customer Support",
    description: "24/7 dedicated support for all shipping inquiries",
    icon: Headphones,
  },
  {
    title: "Fast Response",
    description: "Quick turnaround on shipping quotes and inquiries",
    icon: Truck,
  },
  {
    title: "Secure Communications",
    description: "Your information is encrypted and securely handled",
    icon: Shield,
  },
]

export const faqs: Faq[] = [
  {
    question: "How can I track my shipment?",
    answer:
      "You can track your shipment by entering your tracking number on our Track Shipment page. We provide real-time updates via our advanced GPS tracking system available 24/7.",
  },
  {
    question: "What shipping services do you offer?",
    answer:
      "We offer a comprehensive range of logistics services including air freight, sea/ocean freight, road transportation, diplomatic bag & secure logistics, warehousing, and packaging & storage.",
  },
  {
    question: "How do I get a shipping quote?",
    answer:
      "You can get a free shipping quote by clicking the 'Get Quote' button in our navigation bar, or by filling out our contact form with your specific shipping requirements.",
  },
  {
    question: "What are your delivery timeframes?",
    answer:
      "Delivery timeframes vary depending on the service selected and destination. Air freight typically takes 1–5 business days, while sea freight can take 15–45 days. Contact us for exact estimates.",
  },
]

export const routeTypes: RouteType[] = [
  { label: "Air Routes", icon: Plane },
  { label: "Sea Routes", icon: Ship },
  { label: "Ground Routes", icon: Truck },
  { label: "Distribution Centers", icon: Warehouse },
]
