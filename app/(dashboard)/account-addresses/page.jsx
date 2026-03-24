import Breadcumb from "@/components/common/Breadcumb";
import Address from "@/components/dashboard/Address";
import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";

import React from "react";

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
      <Breadcumb pageName="Addresses" pageTitle="Addresses" />
      <Address />
      <Footer3 />
    </>
  );
}
