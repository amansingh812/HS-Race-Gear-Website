import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar2 from "@/components/headers/Topbar2";
import Topbar1 from "@/components/headers/Topbar1";
import RacegearDeals from "@/components/hsRaceGear/deals/RacegearDeals";

import "@/public/css/racegear-deals.css";
import React from "react";
import Link from "next/link";
import Breadcumb from "@/components/common/Breadcumb";

export const metadata = {
  title: "Racegear Deals | HS Race Gear",
  description: "Check out our amazing deals on SFI-certified race suits, gloves, and shoes. Limited time offers on custom race gear.",
};

export default function page() {
  return (
    <>

      <Topbar1 />
      <Header1 />
      <RacegearDeals />
      <Footer1 />
    </>
  );
}
