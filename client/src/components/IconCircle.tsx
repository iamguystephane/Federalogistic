import type { LucideIcon } from "lucide-react"

type IconCircleProps = {
  icon: LucideIcon
  className?: string
}

export function IconCircle({ icon: Icon, className = "" }: IconCircleProps) {
  return (
    <span
      className={`inline-flex h-[42px] w-[42px] items-center justify-center rounded-full bg-blue-600 text-white ${className}`}
    >
      <Icon className="h-5 w-5" strokeWidth={2.6} />
    </span>
  )
}
