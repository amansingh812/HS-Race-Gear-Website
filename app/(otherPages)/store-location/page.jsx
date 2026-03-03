import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import StoreLocations from "@/components/hsRaceGear/shop/StoreLocations";
import "@/public/css/store-locations.css";
import React from "react";
import Link from "next/link";
import Breadcumb from "@/components/common/Breadcumb";
export const metadata = {
  title: "Store Location || HS Race Gear",
  description: "HS Race Gear",
};
export default function page() {
  return (
    <>
      <Topbar1 />
      <Header3 />
      <Breadcumb pageName="Store Locations" pageTitle="Store Locations" />
      <StoreLocations />
      <Footer3 />
    </>
  );
}
