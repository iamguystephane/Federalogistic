import { IconCircle } from "../IconCircle"
import { features } from "../../data/features"

export function WhyChooseUs() {
  return (
    <section className="bg-white pb-16 pt-14">
      <div className="mx-auto max-w-[1200px] px-5 text-center">
        <h2 className="text-[2rem] font-extrabold text-slate-950">Why Choose Us</h2>
        <p className="mx-auto mt-4 max-w-[1000px] text-[1.1rem] leading-snug text-slate-700">
          Trusted by thousands of customers worldwide for reliable and professional logistics solutions
        </p>

        <div className="mt-12 grid gap-x-14 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="mx-auto max-w-[520px] text-center">
              <IconCircle icon={feature.icon} className="h-[68px] w-[68px]" />
              <h3 className="mt-5 text-[1.1rem] font-extrabold text-slate-950">{feature.title}</h3>
              <p className="mt-4 text-[0.9rem] leading-snug text-slate-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
