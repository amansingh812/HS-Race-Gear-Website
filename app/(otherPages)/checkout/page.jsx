import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import Checkout from "@/components/otherPages/Checkout";
import React from "react";
import "@/public/css/cart-checkout.css";

export const metadata = {
  alternates: { canonical: "/checkout" },
  title: "Checkout | HS Race Gear - Secure Checkout",
  description: "Confirm your HS Race Gear order — no card details needed. We'll email your confirmation and our team will contact you to arrange payment.",
};

export default function page() {
  return (
    <div className="page-light-bg">
      <Topbar1 />
      <Header3 />
      <Checkout />
      <Footer3 topBg="#ffffff" />
    </div>
  );
}

