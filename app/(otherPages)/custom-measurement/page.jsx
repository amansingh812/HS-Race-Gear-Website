import Footer3 from "@/components/footers/Footer3";
import Header1 from "@/components/headers/Header1";
import Topbar2 from "@/components/headers/Topbar2";
import Breadcumb from "@/components/common/Breadcumb";
import CustomMeasurementForm from "@/components/hsRaceGear/customMeasurementForm/CustomMeasurementForm";
import "@/public/css/custom-measurement-form.css";

import React from "react";

export const metadata = {
    title: "Custom Measurement Form | HS Race Gear - Racing Suit Measurements",
    description: "Submit your custom racing suit measurements with our easy-to-use form. Select stitching style, collar type, and provide accurate body measurements for a perfect fit.",
    keywords: "custom racing suit form, racing suit measurements, custom Gear form, body measurements racing suit, SFI racing suit order",
};

export default function page() {
    return (
        <>
            <Topbar2 parentClass="tf-topbar bg-dark-5 topbar-bg" />
            <Header1 />
            <Breadcumb pageName="Measurement Form" pageTitle="Custom Racing Suit Measurement Form" />
            <CustomMeasurementForm />
            <Footer3 />
        </>
    );
}
