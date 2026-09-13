import { IconCircle } from "../IconCircle"
import { statCards, performanceCards, achievementCards } from "../../data/stats"

export function ImpactSection() {
  return (
    <section className="bg-gradient-to-br from-[#2e6cf0] to-[#1e40af] py-16 text-white">
      <div className="mx-auto max-w-[1200px] px-5">
        <div className="text-center">
          <h2 className="text-[2rem] font-extrabold">Our Impact & Achievements</h2>
          <p className="mt-4 text-[1.1rem] text-white/75">
            Delivering excellence across the globe with industry-leading standards
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {statCards.map((stat) => (
            <div key={stat.label} className="rounded-lg bg-white/10 px-5 py-5 text-center">
              <IconCircle icon={stat.icon} className="h-[40px] w-[40px] bg-white/20" />
              <div className="mt-4 text-[2rem] font-extrabold leading-tight">{stat.value}</div>
              <div className="mt-2 text-sm font-bold text-white/75">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 xl:grid-cols-3">
          {performanceCards.map((item) => (
            <div key={item.title} className="rounded-lg bg-white/10 p-5">
              <div className="flex items-center gap-4">
                <IconCircle icon={item.icon} className="h-[34px] w-[34px] bg-white/20" />
                <h3 className="text-[1.1rem] font-extrabold">{item.title}</h3>
              </div>
              <div className="mt-5 flex flex-wrap items-end gap-2">
                <span className="text-[1.75rem] font-extrabold leading-none">{item.value}</span>
                <span className="text-sm text-white/75">{item.suffix}</span>
              </div>
              <p className="mt-3 text-sm leading-snug text-white/75">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-5 xl:grid-cols-3">
          {achievementCards.map((item) => (
            <div key={item.title} className="flex items-center gap-4 rounded-lg bg-white/10 p-4">
              <IconCircle icon={item.icon} className="h-[46px] w-[46px] bg-white/20" />
              <div>
                <div className="text-[1.25rem] font-extrabold leading-tight">{item.title}</div>
                <div className="text-sm text-white/75">{item.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
