import React from "react"

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Mini Bouncer",
  description:
    "Modern bounce house rentals for toddlers and kids in the Volo, IL area.",
  url: "https://www.minibouncer.com",
  email: "minibouncerfoxlake@gmail.com",
  telephone: "224-607-9212",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Volo",
    addressRegion: "IL",
    addressCountry: "US",
  },
  areaServed: {
    "@type": "GeoShape",
    description: "Volo, IL and surrounding suburbs",
    polygon: "42.2,-88.4 41.6,-88.4 41.6,-87.5 42.2,-87.5",
  },
  image: "https://www.minibouncer.com/og-image.jpg",
  priceRange: "$$",
  openingHours: ["Mo-Fr 09:00-19:00", "Sa-Su 08:00-20:00"],
  sameAs: ["https://www.instagram.com/mini.bouncer"],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "200",
  },
}

const StructuredData: React.FC = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export default StructuredData
