import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import BlankTemplate from "@/components/hsRaceGear/downloads/BlankTemplate";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import React from "react";

export const metadata = {
    alternates: { canonical: "/blank-template" },
    title: "blank template | HS Race Gear - Download Design Template",
    description:
        "Download the HS Race Gear blank design template. Use our blank template to create and visualize your custom racing suit design.",
};

export default function BlankTemplatePage() {
    return (
        <>
            <Topbar1 />
            <Header3 />
            <BlankTemplate />
            <Footer3 />
        </>
    );
}
