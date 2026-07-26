import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import Breadcumb from "@/components/common/Breadcumb";
import CustomFitFormPage from "@/components/hsRaceGear/howToMeasure/CustomFitFormPage";

import React from "react";

// Metadata rewritten 2026-07-26 from 3-month GSC data.
// This page had 143 impressions and ZERO clicks over the full quarter.
// Diagnosis: it ranks for sizing *research* queries — "race suit measurements"
// (pos 4.0), "race suit sizing" (pos 55), "race suit size" (pos 69.7),
// "custom-fit pdf" (pos 31.8), "measurement form" (pos 67) — but the old title
// ("Submit Your Measurements") asked for commitment before offering any value.
// Searchers at the sizing-research stage aren't ready to fill in a form, so
// nobody clicked. New title leads with the measurement guide they searched for
// and keeps the order path as the secondary action.
// Title intentionally avoids "custom racing suit" to prevent cannibalizing
// /custom-race-suit.
export const metadata = {
  alternates: { canonical: "https://www.hsracegear.com/custom-fit" },
  title: "Race Suit Measurements & Sizing Guide — How to Measure | HS Race Gear",
  description: "How to measure for a race suit: chest, waist, inseam, sleeve and torso rise, with the seated-in-car adjustments most size charts miss. Submit your numbers and we build to an exact fit. Free shipping on custom suits.",
  keywords: "race suit measurements, race suit sizing, racing suit sizes, how to measure for a racing suit, custom race suit measurements, measurement form, made to measure racing suit, racing suit size chart",
  openGraph: {
    title: "Race Suit Measurements & Sizing Guide — How to Measure",
    description: "Chest, waist, inseam, sleeve and torso rise — plus the seated-in-car adjustments most size charts miss. Then submit your numbers for an exact-fit custom suit.",
    url: "https://www.hsracegear.com/custom-fit",
    siteName: "HS Race Gear",
    type: "website",
  },
};

export default function page() {
  return (
    <>
      <Topbar1 />
      <Header3 />
      {/* <Breadcumb pageName="Custom Gear" pageTitle="Custom Gear Racing Suits" /> */}
      <CustomFitFormPage />
      <Footer3 />
    </>
  );
}
