import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import PaymentMethods from "@/components/hsRaceGear/legal/PaymentMethods";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import React from "react";

export const metadata = {
  title: "Payment Methods | HS Race Gear",
  description:
    "HS Racegear accepts Stripe (Visa, Mastercard, Amex), Google Pay, Apple Pay, and PayPal. All payments are secure and processed through trusted payment gateways.",
};

export default function PaymentMethodsPage() {
  return (
    <>
      <Topbar1 />
      <Header3 />
      <PaymentMethods />
      <Footer3 />
    </>
  );
}
