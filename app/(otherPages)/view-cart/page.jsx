import Footer3 from "@/components/footers/Footer3";
import Header1 from "@/components/headers/Header1";
import Topbar2 from "@/components/headers/Topbar2";
import RelatedProducts from "@/components/otherPages/RelatedProducts";
import ShopCart from "@/components/otherPages/ShopCart";
import React from "react";
import Link from "next/link";
import Breadcumb from "@/components/common/Breadcumb";
import "@/public/css/cart-checkout.css";
export const metadata = {
  alternates: { canonical: "/view-cart" },
  title: "Shopping Cart | HS Race Gear",
  description: "Review your racing gear cart before checkout. Premium SFI certified racing equipment.",
};
export default function page() {
  return (
    <>
      <Topbar2 parentClass="tf-topbar bg-dark-5 topbar-bg" />
      <Header1 />
      <>
        <Breadcumb pageName="Cart" pageTitle="Shopping Cart" />
      </>
      <ShopCart />

      <Footer3 />
    </>
  );
}
