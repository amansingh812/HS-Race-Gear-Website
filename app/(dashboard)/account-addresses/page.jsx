import Breadcumb from "@/components/common/Breadcumb";
import Address from "@/components/dashboard/Address";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar2 from "@/components/headers/Topbar2";

import React from "react";

export const metadata = {
  title: "Accout Address || Vineta - Multipurpose React Nextjs eCommerce",
  description: "Vineta - Multipurpose React Nextjs eCommerce",
};
export default function page() {
  return (
    <>
      <Topbar2 parentClass="tf-topbar bg-dark-5 topbar-bg" />
      <Header1 />
      <Breadcumb pageName="Addresses" pageTitle="Addresses" />
      <Address />
      <Footer1 />
    </>
  );
}
