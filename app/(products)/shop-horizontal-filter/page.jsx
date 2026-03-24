import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import Breadcumb from "@/components/products/Breadcumb";
import Features2 from "@/components/products/Features2";

import Products4 from "@/components/products/Products4";
import Subcollections from "@/components/products/Subcollections";
import React from "react";

export const metadata = {
  title:
    "Shop Horaizontal Filter || HS Race Gear",
  description: "HS Race Gear",
};
export default function page() {
  return (
    <>
      <Topbar1 />
      <Header3 />
      <Breadcumb />
      <Products4 />
      <Features2 />
      <Footer3 />
    </>
  );
}
