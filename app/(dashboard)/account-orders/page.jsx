import Breadcumb from "@/components/common/Breadcumb";
import Orders from "@/components/dashboard/Orders";
import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import OrderDetails from "@/components/modals/OrderDetails";
import Link from "next/link";
import React from "react";

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
      <Breadcumb pageName="Orders" pageTitle="My Orders" />
      <Orders />
      <Footer3 />
      <OrderDetails />
    </>
  );
}
