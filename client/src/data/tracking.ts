import { Calendar, History, MapPin } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export type TrackingBenefit = {
  title: string
  description: string
  icon: LucideIcon
}

export type TrackingFaqItem = {
  question: string
  answer: string
}

export const trackingBenefits: TrackingBenefit[] = [
  {
    title: "Real-Time Updates",
    description:
      "Stay informed with accurate, up-to-the-minute information about your shipment's location and status throughout its journey.",
    icon: MapPin,
  },
  {
    title: "Estimated Delivery",
    description:
      "Get precise delivery time estimates that help you plan and prepare for your shipment's arrival with confidence.",
    icon: Calendar,
  },
  {
    title: "Shipment History",
    description:
      "Access a detailed timeline of your package's journey, including all transit points and handling activities along the route.",
    icon: History,
  },
]

export const trackingTips = [
  "Your tracking number can be found on your shipping confirmation email",
  "Tracking numbers typically contain 10–15 characters",
  "Updates are available 24/7 and reflect real-time status",
]

export const trackingFaqs: TrackingFaqItem[] = [
  {
    question: "What information do I need to track my package?",
    answer:
      "You only need your tracking number, which is provided in your shipping confirmation email or receipt. Enter it in the tracking field to get real-time updates on your shipment.",
  },
  {
    question: "How often is my tracking information updated?",
    answer:
      "Tracking information is updated in real-time as your package moves through our network. Major status updates occur at each transit point, typically every few hours.",
  },
  {
    question: "What should I do if my tracking isn't working?",
    answer:
      "If your tracking number isn't showing results, please allow 24 hours after shipment for information to appear in our system. If issues persist, contact our support team.",
  },
  {
    question: "Can I track multiple packages at once?",
    answer:
      "Currently, our system handles one shipment at a time. For bulk tracking or enterprise solutions, please contact our customer support team for a custom arrangement.",
  },
]
