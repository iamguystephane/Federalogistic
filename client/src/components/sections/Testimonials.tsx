import { Star } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import { testimonials } from "../../data/testimonials"

type TestimonialsProps = {
  subtitle?: string
}

export function Testimonials({ subtitle = "Hear from our satisfied customers about their experience with our logistics solutions" }: TestimonialsProps) {
  return (
    <section className="bg-[#f8fafc] pb-20 pt-16">
      <div className="mx-auto max-w-300 px-5 text-center">
        <h2 className="text-[2rem] font-extrabold text-slate-950">What Our Clients Say</h2>
        <p className="mx-auto mt-4 max-w-225 text-[1.1rem] leading-snug text-slate-700">
          {subtitle}
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.initials} className="text-left">
              <CardContent className="p-6">
                <div className="flex text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-[0.9rem] leading-relaxed text-slate-700">
                  {testimonial.quote}
                </p>
                <div className="mt-5 flex items-center gap-4">
                  {testimonial.image ? (
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-11 w-11 rounded-full object-cover shrink-0"
                    />
                  ) : (
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-extrabold text-white shrink-0">
                      {testimonial.initials}
                    </span>
                  )}
                  <div>
                    <div className="text-base font-extrabold text-slate-950">{testimonial.name}</div>
                    <div className="text-xs text-slate-500">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
