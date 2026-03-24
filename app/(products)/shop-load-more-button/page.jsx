import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import Breadcumb from "@/components/products/Breadcumb";
import Features from "@/components/products/Features";
import Products6 from "@/components/products/Products6";
import React from "react";

export const metadata = {
  title:
    "Shop Load More Button || HS Race Gear",
  description: "HS Race Gear",
};
export default function page() {
  return (
    <>
      <Topbar1 />
      <Header3 />
      <Breadcumb />

      <Products6 />
      <Features />
      <Footer3 />
    </>
  );
}
