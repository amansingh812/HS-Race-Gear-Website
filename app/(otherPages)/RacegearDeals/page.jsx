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
  title: "Want 45% Off SFI Racing Suits? Pre-Built Suits From $329",
  description:
    "Looking for the best racing suit deals? Save 45% on SFI-certified Nomex suits ready to ship in days, or order custom-measured suits from $329 with free shipping.",
  keywords:
    "racing suit sale, race suit discount, cheap racing suits, SFI suit deals, affordable race suits, racing gear sale",
  openGraph: {
    title: "Want 45% Off SFI Racing Suits? Pre-Built Suits From $329",
    description:
      "Looking for the best racing suit deals? Save 45% on SFI-certified Nomex suits ready to ship in days, or order custom-measured suits from $329 with free shipping.",
    url: "https://www.hsracegear.com/RacegearDeals",
    siteName: "HS Race Gear",
    type: "website",
  },
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
