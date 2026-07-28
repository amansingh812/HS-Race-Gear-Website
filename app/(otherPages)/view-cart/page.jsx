import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
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
    <div className="page-light-bg">
      <Topbar1 />
      <Header3 />
      <>
        <Breadcumb pageName="Cart" pageTitle="Shopping Cart" />
      </>
      <ShopCart />

      <Footer3 topBg="#ffffff" />
    </div>
  );
}
