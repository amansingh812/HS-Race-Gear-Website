import Address from "@/components/dashboard/Address";
import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import "@/public/css/account.css";
import React from "react";

// The <Breadcumb /> banner was removed 2026-08-06 with the account redesign:
// it rendered a light peach gradient that clashed with the dark site theme,
// and the rebuilt Address component carries its own heading.
export const metadata = {
  title: "My Addresses | HS Race Gear",
  description: "Manage your saved shipping addresses.",
  robots: { index: false, follow: false }, // Private page — do not index in Google
};

export default function page() {
  return (
    <>
      <Topbar1 />
      <Header3 />
      <Address />
      <Footer3 />
    </>
  );
}
