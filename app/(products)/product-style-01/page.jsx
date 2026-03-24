import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import Features2 from "@/components/products/Features2";
import Products1 from "@/components/products/Products1";
import Subcollections from "@/components/products/Subcollections";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Shop Style 01 || HS Race Gear",
  description: "HS Race Gear",
};
export default function page() {
  return (
    <>
      <Topbar1 />
      <Header3 />
      <Subcollections parentClass="flat-spacing" />

      <Products1 parentClass="flat-spacing-2 pt-0" />
      <Features2 />
      <Footer3 />
    </>
  );
}
