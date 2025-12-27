import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar2 from "@/components/headers/Topbar2";
import Breadcumb from "@/components/products/Breadcumb";
import Features from "@/components/products/Features";
import Products5 from "@/components/products/Products5";
import React from "react";

export const metadata = {
  title: "Shop Grid 3 Columns || Vineta - Multipurpose React Nextjs eCommerce",
  description: "Vineta - Multipurpose React Nextjs eCommerce",
};
export default function page() {
  return (
    <>
      <Topbar2 parentClass="tf-topbar bg-dark-5 topbar-bg" />
      <Header1 />
      <Breadcumb />

      <Products5 />
      <Features />
      <Footer1 />
    </>
  );
}
