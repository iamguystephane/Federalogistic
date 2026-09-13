import { Mail, MapPin, Phone } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import { useSiteSettings } from "../../lib/siteSettings"
import { contactCards as staticCards } from "../../data/contact"

export function GetInTouch() {
  const settings = useSiteSettings()

  const cards = [
    {
      title: "Call Us",
      description: "Our support team is available 24/7",
      icon: Phone,
      value: settings.contactPhone || staticCards[0].value,
      href: settings.contactPhone ? `tel:${settings.contactPhone}` : staticCards[0].href,
    },
    {
      title: "Email Us",
      description: "Send us an email for any inquiry",
      icon: Mail,
      value: settings.contactEmail || staticCards[1].value,
      href: settings.contactEmail ? `mailto:${settings.contactEmail}` : staticCards[1].href,
    },
    {
      title: "Our Location",
      description: "Our head office is located at",
      icon: MapPin,
      value: settings.contactAddress || staticCards[2].value,
      href: settings.contactAddress
        ? `https://maps.google.com/?q=${encodeURIComponent(settings.contactAddress)}`
        : staticCards[2].href,
    },
  ]

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-[1200px] px-5 text-center">
        <h2 className="text-[2rem] font-extrabold text-slate-950">Get In Touch</h2>
        <p className="mx-auto mt-4 max-w-[700px] text-[1rem] text-slate-500">
          Contact our customer support team for immediate assistance with your shipments or
          logistics queries.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {cards.map((card) => (
            <Card key={card.title} className="shadow-md">
              <CardContent className="flex flex-col items-center p-10 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <card.icon className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="mt-6 text-[1.1rem] font-bold text-slate-900">{card.title}</h3>
                <p className="mt-2 text-[0.9rem] text-slate-500">{card.description}</p>
                <a
                  href={card.href}
                  className="mt-4 text-[0.95rem] font-semibold text-blue-600 hover:underline"
                >
                  {card.value}
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
