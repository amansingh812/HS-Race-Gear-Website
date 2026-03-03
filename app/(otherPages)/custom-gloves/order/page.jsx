import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import GlovesOrderPage from "@/components/hsRaceGear/customGear/GlovesOrderPage";
import "@/public/css/custom-order.css";

import React from "react";

export const metadata = {
    title: "Start Custom Gloves Order | HS Race Gear - SFI Certified Racing Gloves",
    description: "Build your custom racing gloves order. Select your design, choose your size and colors, and get a professional mockup within 24 hours.",
    keywords: "custom racing gloves order, SFI certified gloves, custom motorsport gloves, racing gloves",
};

export default function page() {
    return (
        <>
            <Topbar1 />
            <Header3 />
            <GlovesOrderPage />
            <Footer3 />
        </>
    );
}
