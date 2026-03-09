import React from 'react';
import { Helmet } from 'react-helmet-async';
import StructuredData from './StructuredData';

const SEOHead: React.FC = () => {
  const title = "Mini Bouncer | Modern Bounce House Rentals | Volo, IL";
  const description = "Mini Bouncer offers modern, clean, and aesthetic bounce house rentals for toddlers and young children. Free delivery up to 15 miles from Volo, IL. No deposit required. Book your party today!";
  const keywords = "bounce house rental, Volo IL bounce house, kids party rental, toddler bounce house, Volo, bounce house delivery, modern bounce house, pastel bounce house, party rental Volo suburbs, bounce house near me";
  const canonicalUrl = "https://www.minibouncer.com";
  const ogImageUrl = "https://www.minibouncer.com/og-image.jpg";

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Open Graph */}
      <meta property="og:title" content="Mini Bouncer — Modern Bounce House Rentals in Volo, IL" />
      <meta property="og:description" content="Cute, clean, and modern bounce house rentals for kids' parties. Free delivery up to 15 miles from Volo, IL!" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="Mini Bouncer" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Mini Bouncer — Modern Bounce House Rentals" />
      <meta name="twitter:description" content="Aesthetic bounce house rentals for the cutest parties in the Volo area." />
      <meta name="twitter:image" content={ogImageUrl} />
      
      <StructuredData />
    </Helmet>
  );
};

export default SEOHead;
