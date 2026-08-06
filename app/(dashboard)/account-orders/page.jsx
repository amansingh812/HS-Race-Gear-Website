import Orders from "@/components/dashboard/Orders";
import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import "@/public/css/account.css";
import React from "react";

// Removed 2026-08-06 with the account redesign:
//  - <Breadcumb />: light peach banner that clashed with the dark theme; the
//    rebuilt Orders component has its own heading.
//  - <OrderDetails />: a Bootstrap modal only ever opened from the old Orders
//    markup. Order items now expand inline, so the modal was dead markup on
//    every render. It was referenced from this page and nowhere else.
export const metadata = {
  title: "My Orders | HS Race Gear",
  description: "View and track your HS Race Gear orders.",
  robots: { index: false, follow: false }, // Private page — do not index in Google
};

export default function page() {
  return (
    <>
      <Topbar1 />
      <Header3 />
      <Orders />
      <Footer3 />
    </>
  );
}
