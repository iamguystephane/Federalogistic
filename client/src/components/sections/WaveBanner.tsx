import { ChevronRight } from "lucide-react"

type WaveBannerProps = {
  title: string
  subtitle: string
  breadcrumb: string
}

export function WaveBanner({ title, subtitle, breadcrumb }: WaveBannerProps) {
  return (
    <section className="relative overflow-hidden -mb-px bg-linear-to-b from-[#2459d8] to-[#1a3faf] pb-28 pt-24 text-center text-white">
      <div className="px-5">
        <h1 className="text-[3.2rem] font-extrabold leading-tight">{title}</h1>
        <p className="mx-auto mt-5 max-w-[660px] text-[1.05rem] leading-relaxed text-white/85">
          {subtitle}
        </p>
        <div className="mt-7 flex items-center justify-center gap-2 text-[0.9rem] font-medium text-white/70">
          <a href="/" className="transition-colors hover:text-white">Home</a>
          <ChevronRight className="h-4 w-4" />
          <span className="font-bold text-white">{breadcrumb}</span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block w-full"
          style={{ height: 100 }}
        >
          <path
            fill="white"
            d="M0,70 C250,95 480,95 700,30 C860,0 1100,50 1440,65 L1440,100 L0,100 Z"
          />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-0.75 bg-white" />
    </section>
  )
}
