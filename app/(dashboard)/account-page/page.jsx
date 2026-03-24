import Breadcumb from "@/components/common/Breadcumb";
import Account from "@/components/dashboard/Account";
import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import React from "react";

export const metadata = {
  title: "My Account | HS Race Gear",
  description: "Manage your HS Race Gear account details.",
  robots: { index: false, follow: false }, // Private page — do not index in Google
};
export default function page() {
  return (
    <>
      <Topbar1 />
      <Header3 />
      <Breadcumb pageName="Account" pageTitle="My Account" />
      <Account />
      <Footer3 />
    </>
  );
}
