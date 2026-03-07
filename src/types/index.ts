export interface Bouncer {
  id: string
  name: string
  slug: string
  description: string
  features: string[]
  ageRange: string
  size: string
  setting: string
  img: string
}

export interface Testimonial {
  id: string
  quote: string
  name: string
  location: string
  eventType: string
  rating: number
}

export interface PricingPlan {
  id: string
  name: string
  price: string
  duration: string
  features: string[]
  isPopular: boolean
}

export interface FAQItem {
  id: string
  question: string
  answer: string
}
