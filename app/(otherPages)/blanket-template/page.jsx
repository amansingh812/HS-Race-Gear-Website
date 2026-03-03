import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import BlanketTemplate from "@/components/hsRaceGear/downloads/BlanketTemplate";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import React from "react";

export const metadata = {
    title: "Blanket Template | HS Race Gear - Download Design Template",
    description:
        "Download the HS Race Gear blanket design template. Use our blank template to create and visualize your custom racing suit design.",
};

export default function BlanketTemplatePage() {
    return (
        <>
            <Topbar1 />
            <Header3 />
            <BlanketTemplate />
            <Footer3 />
        </>
    );
}
