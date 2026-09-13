import { WaveBanner } from "../components/sections/WaveBanner"
import { TrackFormSection } from "../components/sections/TrackFormSection"
import { TrackingBenefits } from "../components/sections/TrackingBenefits"
import { TrackingFaq } from "../components/sections/TrackingFaq"
import { TrackingHelp } from "../components/sections/TrackingHelp"

export function TrackOrderPage() {
  return (
    <>
      <WaveBanner
        title="Track Your Shipment"
        subtitle="Get real-time updates on your package's location and estimated delivery time with our advanced tracking system."
        breadcrumb="Track Shipment"
      />
      <TrackFormSection />
      <TrackingBenefits />
      <TrackingFaq />
      <TrackingHelp />
    </>
  )
}
