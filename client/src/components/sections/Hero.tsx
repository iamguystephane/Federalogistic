import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "../ui/button"
import { asset } from "../../lib/asset"

const heroSlides = [
  {
    media: "image",
    src: asset("hero-slide-image.jpg"),
    eyebrow: "Global Freight Network",
    title: "Move Cargo Across Every Border",
    accent: "Without the Guesswork",
    body: "Coordinated air, sea, and ground logistics for shipments that need clear routing, careful handling, and dependable delivery.",
  },
  // {
  //   media: "image",
  //   src: asset("service2.jpg"),
  //   eyebrow: "Ocean Freight",
  //   title: "Ship Smarter With",
  //   accent: "Ocean Freight Planning",
  //   body: "From full containers to shared loads, we connect your cargo to major ports with documentation, visibility, and door-to-door support.",
  // },
  {
    media: "video",
    src: "https://res.cloudinary.com/demo/video/upload/airplane.mp4",
    eyebrow: "Air Freight",
    title: "When Time Matters,",
    accent: "We Get Cargo Airborne",
    body: "Priority routing and airport-to-door coordination keep urgent shipments moving with speed, security, and constant updates.",
  },
  {
    media: "image",
    src: asset("air-water-road-transport.jpg"),
    eyebrow: "Road Transportation",
    title: "Reliable Ground Delivery",
    accent: "From First Mile to Last",
    body: "Flexible road transport keeps regional deliveries, final-mile drops, and time-sensitive cargo moving on schedule.",
  },
] as const

export function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)
  const currentSlide = heroSlides[activeSlide]

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((slide) => (slide + 1) % heroSlides.length)
    }, 4000)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden text-center text-white">
      {heroSlides.map((slide, index) => (
        <div
          key={`${slide.media}-${slide.src}`}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === activeSlide ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={index !== activeSlide}
        >
          {slide.media === "video" ? (
            <video
              className="h-full w-full object-cover"
              src={slide.src}
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.src})` }}
            />
          )}
        </div>
      ))}
      <div className="absolute inset-0 bg-slate-950/68" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(14,165,233,0.25),transparent_32%)]" />
      <div className="relative mx-auto w-full max-w-[1280px] px-5 pt-8">
        <p className="mb-4 text-[0.82rem] font-extrabold uppercase tracking-[0.22em] text-blue-200">
          {currentSlide.eyebrow}
        </p>
        <h1 className="mx-auto max-w-[35rem] break-words text-[clamp(2.1rem,9vw,2.85rem)] font-extrabold leading-[1.04] sm:max-w-[1280px] sm:text-[clamp(2.85rem,5.8vw,5rem)] sm:leading-[1]">
          {currentSlide.title}
          <span className="block text-[#60a5fa]">{currentSlide.accent}</span>
        </h1>
        <p className="mx-auto mt-6 max-w-[24rem] text-[clamp(1rem,1.8vw,1.32rem)] font-semibold leading-snug text-white/88 sm:max-w-[1080px]">
          {currentSlide.body}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
          <Button size="lg" className="w-full max-w-[230px] sm:min-w-[155px]" onClick={() => (window.location.href = "/services")}>
            Learn More
          </Button>
          <Button variant="outline" size="lg" className="w-full max-w-[230px] sm:min-w-[175px]" onClick={() => (window.location.href = "/contact")}>
            Contact Us <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
        <div className="mt-10 flex justify-center gap-2">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.eyebrow}
              type="button"
              className={`h-1.5 rounded-full transition-all ${
                index === activeSlide ? "w-12 bg-blue-300" : "w-5 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Show ${slide.eyebrow} slide`}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
