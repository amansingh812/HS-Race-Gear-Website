import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import PaymentMethods from "@/components/hsRaceGear/legal/PaymentMethods";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import React from "react";

export const metadata = {
  alternates: { canonical: "/payment-methods" },
  title: "Ordering & Payment | HS Race Gear",
  description:
    "How ordering works at HS Race Gear: place your order online with no card details, get an emailed confirmation, then our team contacts you to confirm sizing and arrange payment by card, PayPal or bank transfer.",
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
