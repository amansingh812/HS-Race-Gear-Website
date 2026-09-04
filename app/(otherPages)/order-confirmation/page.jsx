import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import OrderConfirmation from "@/components/otherPages/OrderConfirmation";
import React from "react";
import "@/public/css/cart-checkout.css";

export const metadata = {
  title: "Order Confirmed | HS Race Gear",
  description:
    "Your payment has been received. Thank you for your order with HS Race Gear.",
  robots: { index: false, follow: false },
};

export default function OrderConfirmationPage() {
  return (
    <div className="page-light-bg">
      <Topbar1 />
      <Header3 />
      <OrderConfirmation />
      <Footer3 topBg="#ffffff" />
    </div>
  );
}
