export type Testimonial = {
  quote: string
  initials: string
  name: string
  role: string
  image?: string
}

export const testimonials: Testimonial[] = [
  {
    quote:
      '"Given my past experiences with other logistics companies, I can say without exception that the services provided by Federalogistic greatly exceed industry standards."',
    initials: "MP",
    name: "Monique Pate",
    role: "Logistics Manager, Martrax Inc.",
    image: "/atlas-assets/review-1.jpg",
  },
  {
    quote:
      "\"More than once, Federalogistic has 'saved the day', delivering our cargo on time with short notice. They have won my gratitude and loyalty with their 'can do' approach.\"",
    initials: "SA",
    name: "Steve Anderson",
    role: "President/Owner, Duplication Factory",
    image: "/atlas-assets/review-2.jpg",
  },
  {
    quote:
      '"I am very pleased with the service provided by Federalogistic. They find good carriers and use them regularly so we get a high level of service. Their communication is outstanding."',
    initials: "CB",
    name: "Cathy Backman",
    role: "Logistics Team, Oxea Chemicals",
    image: "/atlas-assets/review-3.jpg",
  },
  {
    quote:
      '"Federalogistic handled our time-sensitive international freight with remarkable professionalism. The real-time tracking and proactive updates gave us complete peace of mind throughout the journey."',
    initials: "JM",
    name: "James Morrison",
    role: "Supply Chain Director, NovaTech Solutions",
    image: "/atlas-assets/review-4.jpg",
  },
  {
    quote:
      '"We have been partnering with Federalogistic for over three years and they continue to impress us. Their team goes above and beyond to ensure every shipment arrives safely and on schedule."',
    initials: "SW",
    name: "Sarah Williams",
    role: "Operations Manager, Greenfield Exports",
    image: "/atlas-assets/review-5.jpg",
  },
]
