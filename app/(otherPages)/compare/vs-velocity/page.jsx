import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import VsVelocityContent from "@/components/hsRaceGear/compare/vsVelocity/VsVelocityContent";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import React from "react";

export const metadata = {
    title: "HS Racegear vs Velocita Racing Gear – Custom SFI Suits Comparison | HS Race Gear",
    description:
        "Compare HS Racegear vs Velocita Racing Gear. Custom SFI-certified suits starting at $289 — faster production, full design freedom, premium Nomex® materials for all racing disciplines.",
    keywords:
        "HS Racegear vs Velocita, Velocita Racing Gear alternative, custom SFI race suits, dirt track suit, sprint car suit, drag racing suit",
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hsracegear.com" },
        { "@type": "ListItem", "position": 2, "name": "Compare", "item": "https://www.hsracegear.com/compare" },
        { "@type": "ListItem", "position": 3, "name": "HS Racegear vs Velocita Racing Gear", "item": "https://www.hsracegear.com/compare/vs-velocity" }
    ]
};

export default function VsVelocityPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <Topbar1 />
            <Header3 />
            <VsVelocityContent />
            <Footer3 />
        </>
    );
}
