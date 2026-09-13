import { ContactBanner } from "../components/sections/ContactBanner"
import { ContactCta } from "../components/sections/ContactCta"
import { ContactFormSection } from "../components/sections/ContactFormSection"
import { FaqSection } from "../components/sections/FaqSection"
import { GetInTouch } from "../components/sections/GetInTouch"
import { GlobalNetwork } from "../components/sections/GlobalNetwork"

export function ContactPage() {
  return (
    <>
      <ContactBanner />
      <GetInTouch />
      <GlobalNetwork />
      <ContactFormSection />
      <FaqSection />
      <ContactCta />
    </>
  )
}
