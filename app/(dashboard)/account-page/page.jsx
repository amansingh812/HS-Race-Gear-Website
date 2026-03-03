import Breadcumb from "@/components/common/Breadcumb";
import Account from "@/components/dashboard/Account";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar2 from "@/components/headers/Topbar2";
import React from "react";

export const metadata = {
  title: "Account Page || HS Race Gear",
  description: "HS Race Gear",
};
export default function page() {
  return (
    <>
      <Topbar2 parentClass="tf-topbar bg-dark-5 topbar-bg" />
      <Header1 />
      <Breadcumb pageName="Account" pageTitle="My Account" />
      <Account />
      <Footer1 />
    </>
  );
}
