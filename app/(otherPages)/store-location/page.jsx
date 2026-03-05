import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import StoreLocations from "@/components/hsRaceGear/shop/StoreLocations";
import "@/public/css/store-locations.css";
import React from "react";
import Breadcumb from "@/components/common/Breadcumb";

export const metadata = {
  alternates: { canonical: "/store-location" },
  title: "Store Location | HS Race Gear — Watertown, MA",
  description:
    "Visit HS Race Gear at 59 Kondazian St, Watertown MA 02472. Open Mon–Sat, 9am–6pm EST. Custom racing suit fittings available by appointment.",
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
