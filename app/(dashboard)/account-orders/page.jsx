import Breadcumb from "@/components/common/Breadcumb";
import Orders from "@/components/dashboard/Orders";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar2 from "@/components/headers/Topbar2";
import OrderDetails from "@/components/modals/OrderDetails";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Account Orders || Vineta - Multipurpose React Nextjs eCommerce",
  description: "Vineta - Multipurpose React Nextjs eCommerce",
};
export default function page() {
  return (
    <>
      <Topbar2 parentClass="tf-topbar bg-dark-5 topbar-bg" />
      <Header1 />
      <Breadcumb pageName="Orders" pageTitle="My Orders" />
      <Orders />
      <Footer1 />
      <OrderDetails />
    </>
  );
}
