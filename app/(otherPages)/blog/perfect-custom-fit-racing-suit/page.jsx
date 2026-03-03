import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import BlogPost1CustomFit from "@/components/hsRaceGear/blog/BlogPost1CustomFit";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import "@/public/css/compare.css";
import React from "react";

export const metadata = {
  title: "5 Essential Tips for Getting the Perfect Custom Fit Racing Suit | HS Race Gear Blog",
  description:
    "Learn how to get the perfect custom racing suit fit with these 5 essential tips — from accurate body measurements and driving posture to mobility zones and SFI compliance.",
  keywords:
    "custom racing suit fit, racing suit measurements, SFI racing suit, custom fit racing suit tips, how to measure for racing suit",
};

export default function BlogPost1Page() {
  return (
    <>
      <Topbar1 />
      <Header3 />
      <BlogPost1CustomFit />
      <Footer3 />
    </>
  );
}
