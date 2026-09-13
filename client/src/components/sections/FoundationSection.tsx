import { Card, CardContent } from "../ui/card"
import { IconCircle } from "../IconCircle"
import { foundationCards } from "../../data/services"
import { asset } from "../../lib/asset"

export function FoundationSection() {
  return (
    <section className="bg-[#f8fafc] py-20">
      <div className="mx-auto max-w-[1200px] px-5">
        <div className="text-center">
          <h2 className="text-[2rem] font-extrabold text-slate-950">Our Foundation</h2>
          <p className="mt-4 text-[1.1rem] text-slate-700">
            Built on strong values and clear vision, driving excellence in logistics
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {foundationCards.map((item) => (
            <Card key={item.title} className="overflow-hidden">
              <div
                className="h-[210px] bg-cover bg-center"
                style={{ backgroundImage: `url(${asset(item.image)})` }}
              />
              <CardContent className="p-6">
                <IconCircle icon={item.icon} className="h-[40px] w-[40px]" />
                <h3 className="mt-4 text-[1.1rem] font-extrabold text-slate-950">{item.title}</h3>
                <p className="mt-4 min-h-[88px] text-[0.9rem] leading-relaxed text-slate-700">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
