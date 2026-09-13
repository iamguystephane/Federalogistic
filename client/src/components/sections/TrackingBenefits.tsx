import { Card, CardContent } from "../ui/card"
import { trackingBenefits } from "../../data/tracking"

export function TrackingBenefits() {
  return (
    <section className="bg-[#f8fafc] py-16">
      <div className="mx-auto max-w-[1200px] px-5 text-center">
        <p className="text-[0.8rem] font-bold uppercase tracking-widest text-blue-600">
          Tracking Features
        </p>
        <h2 className="mt-3 text-[2rem] font-extrabold text-slate-950">
          Real-Time Tracking Benefits
        </h2>
        <p className="mx-auto mt-4 max-w-[700px] text-[1rem] text-slate-500">
          Monitor your shipments with precision and confidence using our advanced tracking system
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {trackingBenefits.map((benefit) => (
            <Card key={benefit.title} className="shadow-md">
              <CardContent className="p-8 text-left">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <benefit.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mt-6 text-[1.05rem] font-bold text-slate-900">{benefit.title}</h3>
                <p className="mt-3 text-[0.875rem] leading-relaxed text-slate-600">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
