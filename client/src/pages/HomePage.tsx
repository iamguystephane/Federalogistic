import { Hero } from "../components/sections/Hero"
import { ImpactSection } from "../components/sections/ImpactSection"
import { PartnersAndCta } from "../components/sections/PartnersAndCta"
import { ServicesSection } from "../components/sections/ServicesSection"
import { Testimonials } from "../components/sections/Testimonials"
import { TrackingBand } from "../components/sections/TrackingBand"
import { WhyChooseUs } from "../components/sections/WhyChooseUs"

export function HomePage() {
  return (
    <>
      <Hero />
      <TrackingBand />
      <ServicesSection />
      <WhyChooseUs />
      <ImpactSection />
      <Testimonials />
      <PartnersAndCta />
    </>
  )
}
