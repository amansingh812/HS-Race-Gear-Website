import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import BlogListing from "@/components/hsRaceGear/blog/BlogListing";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import "@/public/css/compare.css";
import React from "react";

export const metadata = {
  title: "Blog | HS Race Gear — Racing Guides, Safety Tips & Gear Advice",
  description:
    "Expert articles on custom racing suits, SFI certifications, how to choose the right racewear, and getting the perfect custom fit. Knowledge built for serious drivers.",
  keywords:
    "racing suit guide, SFI certification, custom racing suit tips, motorsports safety, racewear advice",
};

export default function BlogPage() {
  return (
    <>
      <Topbar1 />
      <Header3 />
      <BlogListing />
      <Footer3 />
    </>
  );
}
