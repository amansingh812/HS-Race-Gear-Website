import Footer3 from "@/components/footers/Footer3";
import Header1 from "@/components/headers/Header1";
import Topbar2 from "@/components/headers/Topbar2";
import Breadcumb from "@/components/common/Breadcumb";
import PaymentMethods from "@/components/hsRaceGear/legal/PaymentMethods";
import "@/public/css/vs-pyrotect.css";
import React from "react";

export const metadata = {
  title: "Payment Methods | HS Race Gear",
  description:
    "HS Racegear accepts Stripe (Visa, Mastercard, Amex), Google Pay, Apple Pay, and PayPal. All payments are secure and processed through trusted payment gateways.",
};

export default function PaymentMethodsPage() {
  return (
    <>
      <Topbar2 parentClass="tf-topbar bg-dark-5 topbar-bg" />
      <Header1 />
      <Breadcumb pageName="Support" pageTitle="Payment Methods" />
      <PaymentMethods />
      <Footer3 />
    </>
  );
}
