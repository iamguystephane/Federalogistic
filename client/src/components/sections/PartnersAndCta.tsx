import { Button } from "../ui/button"

type PartnersAndCtaProps = {
  ctaTitle?: string
  ctaSubtitle?: string
  partnersSubtitle?: string
  primaryCta?: string
  secondaryCta?: string
}

export function PartnersAndCta({
  ctaTitle = "Ready to Ship with Confidence?",
  ctaSubtitle = "Get started with our professional logistics services today. Contact us for a free quote and experience the difference.",
  partnersSubtitle = "Working with industry leaders to provide the best logistics solutions",
  primaryCta = "Get Free Quote",
  secondaryCta = "Track Shipment",
}: PartnersAndCtaProps) {
  return (
    <>
      <section className="bg-white pb-32 pt-14 text-center">
        <h2 className="text-[1.75rem] font-extrabold text-slate-950">Trusted Partners</h2>
        <p className="mt-4 text-[0.95rem] text-slate-700">{partnersSubtitle}</p>
      </section>

      <section className="bg-gradient-to-r from-[#2d6bf0] to-[#1e40af] px-5 py-16 text-center text-white">
        <h2 className="text-[2rem] font-extrabold">{ctaTitle}</h2>
        <p className="mx-auto mt-6 max-w-[930px] text-[1.1rem] leading-snug text-white/85">
          {ctaSubtitle}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button variant="secondary" size="lg" className="min-w-[175px]" onClick={() => (window.location.href = "/contact")}>
            {primaryCta}
          </Button>
          <Button variant="outline" size="lg" className="min-w-[175px]" onClick={() => (window.location.href = "/track-order")}>
            {secondaryCta}
          </Button>
        </div>
      </section>
    </>
  )
}
