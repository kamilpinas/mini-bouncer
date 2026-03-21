import React from "react"

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Mini Bouncer",
  description:
    "Modern and aesthetic bounce house rentals for toddlers and kids in the Volo, IL area.",
  url: "https://minibouncer.com",
  logo: "https://minibouncer.com/logo.png",
  email: "minibouncerfoxlake@gmail.com",
  telephone: "+1-224-607-9212",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Volo",
    addressRegion: "IL",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 42.3328,
    longitude: -88.1612
  },
  areaServed: [
    { "@type": "City", "name": "Volo" },
    { "@type": "City", "name": "Fox Lake" },
    { "@type": "City", "name": "Lakemoor" },
    { "@type": "City", "name": "McHenry" },
    { "@type": "City", "name": "Wauconda" },
    { "@type": "City", "name": "Round Lake" }
  ],
  image: "https://minibouncer.com/og-image.jpg",
  priceRange: "$$",
  openingHours: ["Mo-Fr 09:00-19:00", "Sa-Su 08:00-20:00"],
  sameAs: ["https://www.instagram.com/mini.bouncer"],
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
