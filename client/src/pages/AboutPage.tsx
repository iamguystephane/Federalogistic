import { AboutAchievements } from "../components/sections/AboutAchievements"
import { CompanyProfile } from "../components/sections/CompanyProfile"
import { FoundationSection } from "../components/sections/FoundationSection"
import { PageBanner } from "../components/sections/PageBanner"
import { PartnersAndCta } from "../components/sections/PartnersAndCta"
import { SafetySecuritySection } from "../components/sections/SafetySecuritySection"
import { Testimonials } from "../components/sections/Testimonials"

export function AboutPage() {
  return (
    <>
      <PageBanner title="About Us" breadcrumb="About Us" image="/atlas-assets/about-us.jpg" />
      <CompanyProfile />
      <FoundationSection />
      <SafetySecuritySection />
      <AboutAchievements />
      <Testimonials subtitle="Trusted by industry leaders worldwide" />
      <PartnersAndCta
        ctaTitle="Ready to Experience Excellence?"
        ctaSubtitle="Join thousands of satisfied customers who trust us with their logistics needs. Get started with Federalogistic today."
        partnersSubtitle="Working with industry leaders worldwide"
        primaryCta="Get Free Quote"
        secondaryCta="Our Services"
      />
    </>
  )
}
