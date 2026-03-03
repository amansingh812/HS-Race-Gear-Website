import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import ReturnPolicy from "@/components/hsRaceGear/legal/ReturnPolicy";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import React from "react";

export const metadata = {
    title: "Return Policy | HS Race Gear",
    description:
        "Read the HS RaceGear Return Policy. Learn about our return and exchange process for custom racing suits, gloves, and shoes.",
};

export default function ReturnPolicyPage() {
    return (
        <>
            <Topbar1 />
            <Header3 />
            <ReturnPolicy />
            <Footer3 />
        </>
    );
}
