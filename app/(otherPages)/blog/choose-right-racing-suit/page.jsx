import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import BlogPost2ChooseSuit from "@/components/hsRaceGear/blog/BlogPost2ChooseSuit";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import "@/public/css/compare.css";
import React from "react";

export const metadata = {
  title: "How to Choose the Right Racing Suit for Your Discipline | HS Race Gear Blog",
  description:
    "Complete buyer's guide to SFI certified racing suits. Learn which suit matches your racing discipline — from stock cars and drag racing to sprint cars and endurance events.",
  keywords:
    "how to choose racing suit, SFI racing suit guide, racing suit for drag racing, stock car racing suit, sprint car suit buyer guide",
};

export default function BlogPost2Page() {
  return (
    <>
      <Topbar1 />
      <Header3 />
      <BlogPost2ChooseSuit />
      <Footer3 />
    </>
  );
}
