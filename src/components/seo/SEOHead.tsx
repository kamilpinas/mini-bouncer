import React from "react"
import { Helmet } from "react-helmet-async"
import StructuredData from "./StructuredData"

const SEOHead: React.FC = () => {
  const title =
    "Mini Bouncer | Modern & Aesthetic Bounce House Rentals | Volo, IL"
  const description =
    "Mini Bouncer offers modern, clean, and aesthetic bounce house rentals for toddlers and young children in Volo, IL and surrounding suburbs. No deposit required. Book your party today!"
  const keywords =
    "bounce house rental, Volo IL bounce house, kids party rental, toddler bounce house, Volo, bounce house delivery, modern bounce house, pastel bounce house, party rental Volo suburbs, bounce house near me"
  const canonicalUrl = "https://mini-bouncer.com"
  const ogImageUrl = "https://mini-bouncer.com/og-image.jpg"

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#F0EEE9" />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Mini Bouncer | Modern & Aesthetic Bounce House Rentals | Volo, IL"
        />
        <meta
          property="og:description"
          content="Mini Bouncer offers modern, clean, and aesthetic bounce house rentals for toddlers and young children in Volo, IL and surrounding suburbs."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Mini Bouncer" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Mini Bouncer | Modern & Aesthetic Bounce House Rentals"
        />
        <meta
          name="twitter:description"
          content="Aesthetic bounce house rentals for the cutest parties in the Volo area."
        />
        <meta name="twitter:image" content={ogImageUrl} />
      </Helmet>
      <StructuredData />
    </>
  )
}

export default SEOHead
