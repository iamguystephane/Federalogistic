import { Briefcase, CalendarCheck, Globe, Route, Search, Shield, Smile, Star, Trophy, Truck } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export type StatCard = {
  value: string
  label: string
  icon: LucideIcon
}

export type PerformanceCard = {
  title: string
  value: string
  suffix: string
  description: string
  icon: LucideIcon
}

export type AchievementCard = {
  title: string
  label: string
  icon: LucideIcon
}

export const statCards: StatCard[] = [
  { value: "101,273+", label: "Delivered Packages", icon: Briefcase },
  { value: "673,754+", label: "KM Per Year", icon: Route },
  { value: "16,714+", label: "Happy Clients", icon: Smile },
  { value: "160+", label: "Countries Served", icon: Globe },
]

export const performanceCards: PerformanceCard[] = [
  {
    title: "Delivery Performance",
    value: "99.8%",
    suffix: "On-Time Delivery",
    description: "Industry-leading on-time delivery performance across all shipping methods",
    icon: Truck,
  },
  {
    title: "Tracking Precision",
    value: "Real-time",
    suffix: "GPS Accuracy",
    description: "Advanced tracking systems with minute-by-minute updates and GPS precision",
    icon: Search,
  },
  {
    title: "Client Satisfaction",
    value: "4.9/5",
    suffix: "Average Rating",
    description: "Outstanding client satisfaction across all our logistics services",
    icon: Star,
  },
]

export const achievementCards: AchievementCard[] = [
  { title: "11+ Years", label: "Industry Experience", icon: CalendarCheck },
  { title: "ISO 27001", label: "Security Certification", icon: Shield },
  { title: "8+ Awards", label: "Industry Recognition", icon: Trophy },
]

export const aboutAchievements = [
  { value: "101,273+", label: "Delivered Packages" },
  { value: "673,754+", label: "KM Per Year" },
  { value: "11+", label: "Years Experience" },
  { value: "16,714+", label: "Happy Clients" },
  { value: "8+", label: "Industry Awards" },
]
