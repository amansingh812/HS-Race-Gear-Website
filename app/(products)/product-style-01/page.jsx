import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar2 from "@/components/headers/Topbar2";
import Features2 from "@/components/products/Features2";
import Products1 from "@/components/products/Products1";
import Subcollections from "@/components/products/Subcollections";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Shop Style 01 || Vineta - Multipurpose React Nextjs eCommerce",
  description: "Vineta - Multipurpose React Nextjs eCommerce",
};
export default function page() {
  return (
    <>
      <Topbar2 parentClass="tf-topbar bg-dark-5 topbar-bg" />
      <Header1 />
      <Subcollections parentClass="flat-spacing" />

      <Products1 parentClass="flat-spacing-2 pt-0" />
      <Features2 />
      <Footer1 />
    </>
  );
}
