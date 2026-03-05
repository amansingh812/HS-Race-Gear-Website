import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import MoreMockups from "@/components/hsRaceGear/downloads/MoreMockups";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import React from "react";

export const metadata = {
  alternates: { canonical: "/more-mockups" },
    title: "More Mockups | HS Race Gear - Download Racing Suit Design Templates",
    description:
        "Download additional racing suit mockup templates from HS Race Gear. Visualize your custom design before ordering with our detailed design templates.",
};

export default function MoreMockupsPage() {
    return (
        <>
            <Topbar1 />
            <Header3 />
            <MoreMockups />
            <Footer3 />
        </>
    );
}
