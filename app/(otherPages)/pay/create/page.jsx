import React from "react";
import PaymentLinkForm from "@/components/hsRaceGear/payment/PaymentLinkForm";

// Team-facing page — secret URL, no SEO indexing
export const metadata = {
  title: "Create Payment Link | HS Race Gear",
  robots: { index: false, follow: false },
};

export default function CreatePaymentLinkPage() {
  return <PaymentLinkForm />;
}
