import { ChevronRight } from "lucide-react"
import { asset } from "../../lib/asset"

type PageBannerProps = {
  title: string
  breadcrumb: string
  image?: string
}

export function PageBanner({ title, breadcrumb, image }: PageBannerProps) {
  return (
    <section
      className="relative flex min-h-[320px] items-center justify-center bg-cover bg-center text-center text-white"
      style={{ backgroundImage: `url(${image ?? asset("about-page-bg.jpg")})` }}
    >
      <div className="absolute inset-0 bg-blue-950/85" />
      <div className="relative px-5 pt-2">
        <h1 className="text-[3.2rem] font-extrabold leading-tight">{title}</h1>
        <div className="mt-4 flex items-center justify-center gap-2 text-[0.9rem] font-medium">
          <a href="/">Home</a>
          <ChevronRight className="h-4 w-4" />
          <span className="font-bold">{breadcrumb}</span>
        </div>
      </div>
    </section>
  )
}
