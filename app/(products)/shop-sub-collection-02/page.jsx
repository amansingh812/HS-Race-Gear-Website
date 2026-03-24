import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import Breadcumb from "@/components/products/Breadcumb";
import Features2 from "@/components/products/Features2";
import Products1 from "@/components/products/Products1";

import SubCollections3 from "@/components/products/SubCollections3";
import Link from "next/link";
import React from "react";

export const metadata = {
  title:
    "Shop Sub Collections 02 || HS Race Gear",
  description: "HS Race Gear",
};
export default function page() {
  return (
    <>
      <Topbar1 />
      <Header3 />
      <Breadcumb />
      <SubCollections3 parentClass="flat-spacing-2" />

      <Products1 parentClass="flat-spacing-24 pt-0" />
      <Features2 />
      <Footer3 />
    </>
  );
}
