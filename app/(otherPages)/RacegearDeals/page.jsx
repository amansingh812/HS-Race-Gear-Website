import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";

import RacegearDeals from "@/components/hsRaceGear/deals/RacegearDeals";

import "@/public/css/racegear-deals.css";
import React, { Suspense } from "react";
import Link from "next/link";
import Breadcumb from "@/components/common/Breadcumb";

export const metadata = {
  alternates: { canonical: "https://www.hsracegear.com/RacegearDeals" },
  // Leading with the discount % — the strongest click signal for this page
  title: "Race Suit Sale — 45% Off SFI-Certified Racing Suits | HS Race Gear",
  description:
    "Save 45% on SFI-certified race suits, gloves, and shoes. Pre-built suits start at $329 and ship in days — or go fully custom. Free shipping. Limited stock.",
  keywords:
    "racing suit sale, race suit discount, cheap racing suits, SFI suit deals, affordable race suits, racing gear sale",
};

export default function page() {
  return (
    <>
      <Topbar1 />
      <Header3 />
      <Suspense fallback={null}>
        <RacegearDeals />
      </Suspense>
      <Footer3 />
    </>
  );
}
