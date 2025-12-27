import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar2 from "@/components/headers/Topbar2";
import Breadcumb from "@/components/products/Breadcumb";
import Features from "@/components/products/Features";
import Products7 from "@/components/products/Products7";
import React from "react";

export const metadata = {
  title: "Shop Infinity Scroll || Vineta - Multipurpose React Nextjs eCommerce",
  description: "Vineta - Multipurpose React Nextjs eCommerce",
};
export default function page() {
  return (
    <>
      <Topbar2 parentClass="tf-topbar bg-dark-5 topbar-bg" />
      <Header1 />
      <Breadcumb />

      <Products7 />
      <Features />
      <Footer1 />
    </>
  );
}
