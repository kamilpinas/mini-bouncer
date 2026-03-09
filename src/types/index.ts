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
  pricing: {
    fourHours: string
    sixHours: string
  }
}

export interface Testimonial {
  id: string
  quote: string
  name: string
  location: string
  eventType: string
  rating: number
}

export interface FAQItem {
  id: string
  question: string
  answer: string
}
