import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import StandardPricing from "@/components/hsRaceGear/pricing/StandardPricing";
import "@/public/css/standard-pricing.css";
import React from "react";

export const metadata = {
  alternates: { canonical: "https://www.hsracegear.com/StandardPricing" },
  title: "How Much Does a Custom Race Suit Cost? Suits From $329",
  description:
    "Wondering what a custom SFI race suit costs? Get all-inclusive pricing with unlimited colors, logos, and custom fit from $329. Free worldwide shipping.",
  keywords:
    "racing suit price, how much does a racing suit cost, custom race suit cost, SFI suit pricing, racing gear prices",
  openGraph: {
    title: "How Much Does a Custom Race Suit Cost? Suits From $329",
    description:
      "Wondering what a custom SFI race suit costs? Get all-inclusive pricing with unlimited colors, logos, and custom fit from $329. Free worldwide shipping.",
    url: "https://www.hsracegear.com/StandardPricing",
    siteName: "HS Race Gear",
    type: "website",
  },
};

export default function page() {
  return (
    <>
      <Topbar1 />
      <Header3 />
      <StandardPricing />
      <Footer3 />
    </>
  );
}
