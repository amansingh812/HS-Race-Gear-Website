import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import BlogPost3SFI from "@/components/hsRaceGear/blog/BlogPost3SFI";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import "@/public/css/compare.css";
import React from "react";

export const metadata = {
  title: "Understanding SFI Certifications: A Complete Guide | HS Race Gear Blog",
  description:
    "Learn what SFI certification means for racing suits, how SFI ratings work, what TPP scores measure, and how to choose the right level of fire protection for your racing discipline.",
  keywords:
    "SFI certification guide, SFI rating racing suit, TPP thermal protective performance, SFI 3.2A/5, motorsports safety standards",
};

export default function BlogPost3Page() {
  return (
    <>
      <Topbar1 />
      <Header3 />
      <BlogPost3SFI />
      <Footer3 />
    </>
  );
}
