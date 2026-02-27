import Footer3 from "@/components/footers/Footer3";
import Header1 from "@/components/headers/Header1";
import Topbar2 from "@/components/headers/Topbar2";
import CustomMeasurementForm from "@/components/hsRaceGear/customMeasurementForm/CustomMeasurementForm";

import React from "react";

export const metadata = {
    title: "Custom Measurement Form | HS Race Gear - Download PDF",
    description: "Download and print the HS Race Gear custom measurement form. Fill in your body measurements and send it back for a perfectly tailored racing suit.",
    keywords: "custom racing suit measurements, measurement form PDF, body measurements racing suit, SFI racing suit order, custom fit form",
};

export default function page() {
    return (
        <>
            <Topbar2 parentClass="tf-topbar bg-dark-5 topbar-bg" />
            <Header1 />
            <CustomMeasurementForm />
            <Footer3 />
        </>
    );
}
