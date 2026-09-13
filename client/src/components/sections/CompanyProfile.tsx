import { useEffect, useState } from "react"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../ui/button"
import { asset } from "../../lib/asset"

const slides = [
  { src: asset("company-slide-1.jpg"), alt: "Federalogistic operations" },
  { src: asset("company-slide-2.jpg"), alt: "Freight handling" },
  { src: asset("company-slide-3.jpg"), alt: "Warehouse logistics" },
  { src: asset("about_our_mission.jpg"), alt: "Our mission" },
  { src: asset("about_our_vision.jpg"), alt: "Our vision" },
  { src: asset("core-value-image.jpg"), alt: "Core values" },
]

export function CompanyProfile() {
  const [active, setActive] = useState(0)
  const [animating, setAnimating] = useState(false)

  function goTo(index: number) {
    if (animating || index === active) return
    setAnimating(true)
    setActive(index)
    setTimeout(() => setAnimating(false), 500)
  }

  function prev() { goTo((active - 1 + slides.length) % slides.length) }
  function next() { goTo((active + 1) % slides.length) }

  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a + 1) % slides.length)
    }, 4500)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="bg-white py-20">
      <div className="mx-auto grid max-w-[1200px] items-center gap-14 px-5 lg:grid-cols-[1fr_1fr]">
        <div>
          <h2 className="text-[2rem] font-extrabold text-slate-950">Company Profile</h2>
          <p className="mt-4 max-w-[760px] text-[1.05rem] font-extrabold leading-snug text-blue-600">
            Federalogistic is a privately owned, premier international freight forwarder,
            delivery and logistics service provider.
          </p>
          <div className="mt-6 space-y-5 text-[0.9rem] leading-relaxed text-slate-700">
            <p>
              Federalogistic has extensive experience handling and delivery sensitive domestic
              and industrial products including consumer technology products like networking
              equipment, desktop and mobile computers, servers, cell phones and more.
            </p>
            <p>
              Federalogistic delivers real-time, actionable information reliably and ensures
              optimal efficiency and on-time activities by utilizing advanced, custom software
              systems. Fully EDI capable, Federalogistic's systems interface with your trading
              partners to provide unprecedented product visibility throughout the entire supply chain.
            </p>
            <p>
              Our global regional hubs offer a wide range of mission-critical technology, logistic,
              IT and security services to clients and its partners overseas. Through our overseas
              secure services to more than 250 diplomatic offices, across 160 countries, we support
              around 14,000 staff globally, as well as many more from other government departments
              co-located at posts under the One HMG ethos.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button className="h-[42px] rounded-lg px-6 text-sm" onClick={() => (window.location.href = "/contact")}>
              Get In Touch <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              className="h-[42px] rounded-lg border border-blue-600 px-6 text-sm text-blue-600 hover:bg-blue-50"
              onClick={() => (window.location.href = "/services")}
            >
              Our Services
            </Button>
          </div>
        </div>

        {/* Slideshow */}
        <div className="relative overflow-hidden rounded-2xl shadow-md shadow-slate-900/15 group">
          {/* Slides */}
          <div className="relative h-90">
            {slides.map((slide, i) => (
              <img
                key={i}
                src={slide.src}
                alt={slide.alt}
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
                style={{ opacity: i === active ? 1 : 0, zIndex: i === active ? 1 : 0 }}
              />
            ))}
          </div>

          {/* Prev / Next arrows */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/35 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/55"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/35 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/55"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === active ? "w-6 bg-white" : "w-2.5 bg-white/60 hover:bg-white/90"
                }`}
              />
            ))}
          </div>

          {/* Slide counter */}
          <div className="absolute right-3 top-3 z-10 rounded-full bg-black/35 px-2.5 py-0.5 text-[0.7rem] font-bold text-white">
            {active + 1} / {slides.length}
          </div>
        </div>
      </div>
    </section>
  )
}
