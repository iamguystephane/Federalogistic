import { Search, Tag } from "lucide-react"
import { Button } from "../ui/button"

export function ContactCta() {
  return (
    <section className="bg-gradient-to-r from-[#2d6bf0] to-[#1e40af] px-5 py-20 text-center text-white">
      <h2 className="text-[2rem] font-extrabold">Ready to Ship with Us?</h2>
      <p className="mx-auto mt-5 max-w-[680px] text-[1rem] leading-relaxed text-white/85">
        Experience premium shipping and logistics services with our global network.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button variant="secondary" className="h-12 min-w-[175px] rounded-xl px-7 text-sm font-semibold" onClick={() => (window.location.href = "/track-order")}>
          <Search className="h-4 w-4" />
          Track Shipment
        </Button>
        <Button variant="outline" className="h-12 min-w-[175px] rounded-xl px-7 text-sm font-semibold" onClick={() => (window.location.href = "/contact")}>
          <Tag className="h-4 w-4" />
          Get a Quote
        </Button>
      </div>
    </section>
  )
}
