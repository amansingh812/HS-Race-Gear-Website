import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import GoKartApparelContent from "@/components/hsRaceGear/customGear/GoKartApparelContent";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import React from "react";

// Created 2026-08-11 — full-kit karting collection page.
//
// Captures a 2,150/mo cluster that had no page. Keyword Planner (US):
//   gokart outfit           500     go kart racing apparel  500
//   go kart racing outfit   500     go kart racing jackets  500
//   go kart driving suit    500     kart overalls            50
//   go karting overalls      50     go kart racing overalls  50
//
// The vocabulary matters: "outfit", "apparel", "overalls" signal someone
// assembling a complete kit rather than buying one suit — a higher-basket
// customer. "Overalls" is also the British/Commonwealth term for a race suit,
// which the site was entirely invisible for.
export const metadata = {
  alternates: { canonical: "https://www.hsracegear.com/go-kart-racing-apparel" },
  title: "Go Kart Racing Apparel & Outfits — Suits, Gloves, Shoes",
  description:
    "Complete go kart racing apparel — custom kart suits and overalls, gloves, shoes and crew kit. CIK Level 2 certified, built to your measurements in the USA with your colors and logos. Suits from $329, free shipping.",
  keywords:
    "go kart racing apparel, go kart racing outfit, gokart outfit, go kart racing jackets, go kart driving suit, kart overalls, go karting overalls, go kart racing overalls, karting apparel, karting outfit, kart racing gear, karting kit, go kart suit",
  openGraph: {
    type: "website",
    title: "Go Kart Racing Apparel & Outfits — Suits, Gloves, Shoes",
    description:
      "Everything you wear on the grid — custom kart suits, gloves and shoes. CIK Level 2, made to your measurements in the USA. From $329.",
    url: "https://www.hsracegear.com/go-kart-racing-apparel",
    siteName: "HS Race Gear",
    images: ["https://www.hsracegear.com/images/og-image.jpg"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hsracegear.com" },
    { "@type": "ListItem", "position": 2, "name": "Go Kart Racing Apparel", "item": "https://www.hsracegear.com/go-kart-racing-apparel" },
  ],
};

// ItemList rather than Product — this is a collection page pointing at the
// individual product landers, not a single purchasable item.
const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Go Kart Racing Apparel",
  "description": "Complete karting kit — CIK Level 2 kart racing suits, gloves, shoes and crew apparel, custom made in the USA.",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Custom Kart Racing Suits", "url": "https://www.hsracegear.com/custom-karting-suit" },
    { "@type": "ListItem", "position": 2, "name": "Youth & Kids Karting Suits", "url": "https://www.hsracegear.com/custom-junior-karting-suit" },
    { "@type": "ListItem", "position": 3, "name": "Shifter Kart Suits", "url": "https://www.hsracegear.com/custom-shifter-kart-suit" },
    { "@type": "ListItem", "position": 4, "name": "Custom Racing Gloves", "url": "https://www.hsracegear.com/custom-gloves" },
    { "@type": "ListItem", "position": 5, "name": "Custom Racing Shoes", "url": "https://www.hsracegear.com/custom-shoes" },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Topbar1 />
      <Header3 />
      <GoKartApparelContent />
      <Footer3 />
    </>
  );
}
