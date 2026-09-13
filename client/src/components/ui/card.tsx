import type { ComponentProps } from "react"

import { cn } from "../../lib/utils"

function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("rounded-lg bg-white text-slate-950 shadow shadow-slate-900/10", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("p-8", className)} {...props} />
}

export { Card, CardContent }
