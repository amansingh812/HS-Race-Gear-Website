import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import Breadcumb from "@/components/products/Breadcumb";
import Features2 from "@/components/products/Features2";
import SubCollections2 from "@/components/products/SubCollections2";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Shop Collection List || HS Race Gear",
  description: "HS Race Gear",
};
export default function page() {
  return (
    <>
      <Topbar1 />
      <Header3 />
      <>
        {/* Title Page */}
        <Breadcumb showCollection={false} />
      </>
      <SubCollections2 />
      <Features2 />
      <Footer3 />
    </>
  );
}
