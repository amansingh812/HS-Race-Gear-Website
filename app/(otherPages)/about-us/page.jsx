import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import AboutHero from "@/components/hsRaceGear/aboutUs/AboutHero";
import AboutStats from "@/components/hsRaceGear/aboutUs/AboutStats";
import AboutMission from "@/components/hsRaceGear/aboutUs/AboutMission";
import AboutProcess from "@/components/hsRaceGear/aboutUs/AboutProcess";
import AboutRacingSeries from "@/components/hsRaceGear/aboutUs/AboutRacingSeries";
import AboutCTA from "@/components/hsRaceGear/aboutUs/AboutCTA";
import "@/public/css/about-us.css";
import React from "react";

// RETARGETED 2026-08-11. Two problems solved at once.
//
// 1. CTR. GSC shows this page at 97 impressions, position 7.3, ZERO clicks.
//    A top-10 page earning nothing. At position 7 the title is the only
//    variable, so this is a genuine CTR fix (unlike /certifications, which
//    sits at position 25 where no title change would help).
//
// 2. "racewear usa" — 98 impressions at position 37.5, and nothing on the
//    site claims it. Made in USA is a real differentiator against imported
//    competitors. This page is the right home for it: it's a company fact,
//    not a product fact, and putting it here avoids loading yet another
//    intent onto /custom-race-suit, which is already overloaded.
//
// ⚠️ Deliberately worded "Racewear Made in the USA" rather than the exact
// string "Racewear USA" — there may be a company trading under that name
// (the query pattern suggests a brand search), and claiming it outright
// would be both risky and misleading. This phrasing gets the keyword
// adjacency without asserting we are that brand. If you confirm no such
// company exists, the exact phrase can be used instead.
//
// Old title was 68 chars and truncating in the SERP.
export const metadata = {
  alternates: { canonical: "https://www.hsracegear.com/about-us" },
  title: "Racewear Made in the USA — Custom SFI Suits Since 2014",
  description:
    "American-made racewear from a Massachusetts workshop. HS Race Gear has built custom SFI-certified race suits, gloves and shoes to riders' exact measurements since 2014 — no size runs, no overseas production, 2–3 week turnaround.",
  keywords:
    "racewear usa, racewear made in usa, made in usa racing suits, american made race suits, usa racewear, custom racewear, SFI certified racing suits, custom racegear, fire-resistant racing gear, motorsports apparel, SFI 3.2A/1, racing safety equipment, HS Race Gear",
  openGraph: {
    type: "website",
    title: "Racewear Made in the USA — Custom SFI Suits Since 2014",
    description:
      "American-made racewear from a Massachusetts workshop. Custom SFI-certified suits, gloves and shoes built to your exact measurements since 2014.",
    url: "https://www.hsracegear.com/about-us",
    siteName: "HS Race Gear",
    images: ["https://www.hsracegear.com/images/og-image.jpg"],
  },
};

export default function AboutUsPage() {
  return (
    <>
      <Topbar1 />
      <Header3 />
      <AboutHero />
      <AboutStats />
      <AboutMission />
      <AboutProcess />
      <AboutRacingSeries />
      <AboutCTA />
      <Footer3 />
    </>
  );
}
