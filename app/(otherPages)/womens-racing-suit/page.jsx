import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import WomensRaceSuitContent from "@/components/hsRaceGear/customGear/WomensRaceSuitContent";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import React from "react";

// Created 2026-08-22 — women's racing suit lander.
//
// Biggest single gap in the client keyword list: 10 women's/female terms,
// ZERO of them covered by any page on the site.
//   custom womens racing fire suits         made to measure womens sfi race suit
//   custom sfi 3.2a/5 racing suit women     bespoke women's motorsport fire suit
//   custom tailored female race suits       women's custom auto racing fire suits
//   buy custom female drag racing suit      custom fit women's fireproof race gear
//   female racing fire suits                women's racing suit
//
// Client confirmed female-specific patterns are genuinely cut, so the page
// leads on the pattern rather than on "we can measure anyone". That claim is
// the whole differentiator — if it ever stops being true, this page has to
// change with it.
export const metadata = {
  alternates: { canonical: "https://www.hsracegear.com/womens-racing-suit" },
  title: "Women's Racing Suits — Custom SFI Fire Suits From $329",
  description:
    "Women's custom racing fire suits cut from a female-specific pattern, not a men's suit in a smaller size. SFI 3.2A/1 and 3.2A/5 certified, made to your exact measurements in the USA. Unlimited colors and logos, from $329 with free shipping.",
  keywords:
    "womens racing suit, women's racing suit, custom womens racing fire suits, female racing fire suits, made to measure womens sfi race suit, custom sfi 3.2a/5 racing suit women, bespoke women's motorsport fire suit, custom tailored female race suits, women's custom auto racing fire suits, buy custom female drag racing suit, custom fit women's fireproof race gear, ladies racing suit, womens fire suit, womens drag racing suit, womens nomex race suit",
  openGraph: {
    type: "website",
    title: "Women's Racing Suits — Custom SFI Fire Suits From $329",
    description:
      "Cut from a female-specific pattern, not a men's suit in a smaller size. SFI certified, made to your exact measurements in the USA.",
    url: "https://www.hsracegear.com/womens-racing-suit",
    siteName: "HS Race Gear",
    images: ["https://www.hsracegear.com/images/og-image.jpg"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hsracegear.com" },
    { "@type": "ListItem", "position": 2, "name": "Women's Racing Suits", "item": "https://www.hsracegear.com/womens-racing-suit" },
  ],
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Women's Custom SFI Racing Suit",
  "description":
    "Custom women's racing fire suit cut from a female-specific pattern and built to individual measurements. SFI 3.2A/1 or 3.2A/5 certified, genuine Nomex meta-aramid, one-piece or two-piece, made in the USA.",
  "image": "https://www.hsracegear.com/images/og-image.jpg",
  "brand": { "@type": "Brand", "name": "HS Race Gear" },
  "category": "Women's Racing Suit",
  "material": "Nomex",
  "audience": { "@type": "PeopleAudience", "suggestedGender": "female" },
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "329",
    "highPrice": "599",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "seller": { "@type": "Organization", "name": "HS Race Gear", "url": "https://www.hsracegear.com" },
  },
};

// FAQ targets the question-form variants and is the block most likely to be
// cited by AI answer engines for "do women's race suits fit differently".
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Are women's racing suits different from men's?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "They should be, though most manufacturers simply sell a men's suit in a smaller size. A men's pattern assumes a different chest-to-waist ratio, a longer back rise and wider limbs, so a downsized men's suit bunches at the shoulders, twists at the waist and pulls the crotch seam low. HS Race Gear cuts women's suits from a female-specific base pattern and then builds to the individual's measurements. The safety specification — Nomex fabric, SFI certification, construction standards — is identical; only the pattern changes.",
      },
    },
    {
      "@type": "Question",
      "name": "What SFI rating do women's racing suits come in?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The same range as any other suit. SFI 3.2A/1 is single layer with roughly 3 seconds of thermal protection, accepted in karting, sportsman drag and many grassroots classes. SFI 3.2A/5 is double layer with roughly 7 to 10 seconds and is required by USAC, World of Outlaws, ASCS and most sprint car and dirt late model series. The rating you need depends on your class, not your size.",
      },
    },
    {
      "@type": "Question",
      "name": "How do I measure for a women's race suit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The same 15 measurement points as any custom suit. Three deserve extra care: measure the chest at its fullest point while wearing the base layer you actually race in, since fire-resistant underwear changes the number; measure the waist at your natural waist, which is usually higher than a men's pattern places it; and take torso length carefully, as it is the most commonly mismeasured point and determines whether the suit pulls at the shoulders.",
      },
    },
    {
      "@type": "Question",
      "name": "How much does a custom women's racing suit cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HS Race Gear women's custom racing suits start at $329 with free shipping, made in Watertown, Massachusetts with a 2 to 3 week production time. There is no surcharge for the female-specific pattern.",
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Topbar1 />
      <Header3 />
      <WomensRaceSuitContent />
      <Footer3 />
    </>
  );
}
