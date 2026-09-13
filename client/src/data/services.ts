import { Eye, Heart, Package, Plane, Shield, Ship, Target, Truck, Warehouse } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export type Service = {
  title: string
  description: string
  image: string
  icon: LucideIcon
  href: string
  tags: string[]
}

export const services: Service[] = [
  {
    title: "Air Freight",
    description:
      "Federalogistic, as an IATA-endorsed air forwarder, offers professional and reliable global air-freight solutions.",
    image: "service1.jpg",
    icon: Plane,
    href: "/services/air-freight",
    tags: ["Express Delivery", "Global Coverage", "Priority Shipping"],
  },
  {
    title: "Sea/Ocean Freight",
    description:
      "International ocean freight shipping import and export services. FCL, LCL shipments, port to port or door to door.",
    image: "service2.jpg",
    icon: Ship,
    href: "/services/sea-freight",
    tags: ["FCL Shipping", "LCL Options", "Port to Door"],
  },
  {
    title: "Road Transportation",
    description:
      "Highly experienced and dependable, Federalogistic is a trusted partner in domestic road transportation.",
    image: "service3.jpg",
    icon: Truck,
    href: "/services/road",
    tags: ["Same-Day Delivery", "Last Mile", "Regional Coverage"],
  },
  {
    title: "Diplomatic Bag & Secure Logistics",
    description:
      "Global secure mail and equipment delivery service with complete confidence and security.",
    image: "service4.jpg",
    icon: Shield,
    href: "/services/diplomatic",
    tags: ["Secure Handling", "Embassy Support", "Chain of Custody"],
  },
  {
    title: "Warehousing",
    description:
      "Shared and dedicated warehousing solutions supported by state-of-the-art technology and warehouse services.",
    image: "service5.jpg",
    icon: Warehouse,
    href: "/services/warehousing",
    tags: ["Inventory Control", "Secure Storage", "Fulfilment"],
  },
  {
    title: "Packaging & Storage",
    description:
      "Professional packaging and storage solutions for raw materials, electronics, and finished goods with cargo insurance.",
    image: "service6.jpg",
    icon: Package,
    href: "/services/packaging",
    tags: ["Custom Crating", "Cargo Protection", "Long-Term Storage"],
  },
]

export const foundationCards = [
  {
    title: "Our Mission",
    description:
      "Connecting people, businesses and communities to a better future - through logistics.",
    image: "about_our_mission.jpg",
    icon: Target,
  },
  {
    title: "Our Vision",
    description:
      "To become the world's preferred supply chain logistics company - applying insights, service quality and innovation to create sustainable growth for business and society.",
    image: "about_our_vision.jpg",
    icon: Eye,
  },
  {
    title: "Core Values",
    description:
      "Value Creation - Openness - Integrity - Commitment - Excellence - Mutual Respect - Customer Orientation",
    image: "core-value-image.jpg",
    icon: Heart,
  },
]
