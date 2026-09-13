import { aboutAchievements } from "../../data/stats"

export function AboutAchievements() {
  return (
    <section className="bg-gradient-to-br from-[#2e6cf0] to-[#1e40af] py-16 text-center text-white">
      <div className="mx-auto max-w-[1200px] px-5">
        <h2 className="text-[2rem] font-extrabold">Our Achievements</h2>
        <p className="mt-4 text-[1.1rem] text-white/75">Numbers that speak for our excellence</p>
        <div className="mt-10 grid gap-8 md:grid-cols-3 xl:grid-cols-5">
          {aboutAchievements.map((item) => (
            <div key={item.label}>
              <div className="text-[2rem] font-extrabold leading-tight">{item.value}</div>
              <div className="mt-2 text-sm font-semibold text-white/75">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
