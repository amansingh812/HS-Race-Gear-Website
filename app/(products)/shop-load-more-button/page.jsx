import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar2 from "@/components/headers/Topbar2";
import Breadcumb from "@/components/products/Breadcumb";
import Features from "@/components/products/Features";
import Products6 from "@/components/products/Products6";
import React from "react";

export const metadata = {
  title:
    "Shop Load More Button || Vineta - Multipurpose React Nextjs eCommerce",
  description: "Vineta - Multipurpose React Nextjs eCommerce",
};
export default function page() {
  return (
    <>
      <Topbar2 parentClass="tf-topbar bg-dark-5 topbar-bg" />
      <Header1 />
      <Breadcumb />

      <Products6 />
      <Features />
      <Footer1 />
    </>
  );
}
