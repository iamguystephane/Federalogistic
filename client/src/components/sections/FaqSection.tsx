import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { faqs } from "../../data/contact"

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section className="bg-[#f8fafc] py-16">
      <div className="mx-auto max-w-[1200px] px-5 text-center">
        <h2 className="text-[2rem] font-extrabold text-slate-950">Frequently Asked Questions</h2>
        <p className="mx-auto mt-4 max-w-[600px] text-[1rem] text-slate-500">
          Find answers to common questions about our shipping and courier services
        </p>

        {/* Accordion — narrower, stays centered */}
        <div className="mx-auto mt-12 max-w-[780px] space-y-3 text-left">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
            >
              <button
                className="flex w-full items-center justify-between px-6 py-4 text-left"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
              >
                <span className="text-[0.95rem] font-semibold text-slate-900">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === i && (
                <div className="border-t border-slate-100 px-6 py-4">
                  <p className="text-[0.9rem] leading-relaxed text-slate-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
