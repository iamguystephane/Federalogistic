import { ArrowRight } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import { IconCircle } from "../IconCircle"
import { services } from "../../data/services"
import { asset } from "../../lib/asset"

export function ServicesSection() {
  return (
    <section className="bg-[#f8fafc] pb-20 pt-16">
      <div className="mx-auto max-w-[1200px] px-5">
        <div className="text-center">
          <h2 className="text-[2rem] font-extrabold text-slate-950">Our Services</h2>
          <p className="mt-4 text-[1.15rem] text-slate-700">
            Comprehensive shipping and logistics solutions tailored to your business needs
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <Card
              key={service.title}
              className="group overflow-hidden border border-blue-100 shadow transition-all duration-300 hover:-translate-y-2 hover:border-blue-300 hover:shadow hover:shadow-blue-950/15"
            >
              <div className="relative h-[210px] overflow-hidden">
                <img
                  src={asset(service.image)}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-blue-900/25 to-blue-500/10 transition-colors duration-300 group-hover:from-blue-950/88 group-hover:via-blue-700/35" />
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-700" />
                <IconCircle
                  icon={service.icon}
                  className="absolute left-5 top-5 transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <CardContent className="p-5">
                <h3 className="text-[1.15rem] font-extrabold text-slate-950 transition-colors group-hover:text-blue-700">
                  {service.title}
                </h3>
                <p className="mt-4 min-h-[72px] text-[0.95rem] leading-snug text-slate-600">
                  {service.description}
                </p>
                <div className="mt-4 flex min-h-[58px] flex-wrap content-start gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-blue-100 px-3 py-1 text-[0.74rem] font-semibold text-blue-700 transition-colors group-hover:bg-blue-600 group-hover:text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={service.href}
                  className="mt-4 inline-flex items-center gap-2 text-[0.9rem] font-semibold text-blue-600 transition-all group-hover:gap-3 group-hover:text-blue-800"
                >
                  Learn More <ArrowRight className="h-4 w-4" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
