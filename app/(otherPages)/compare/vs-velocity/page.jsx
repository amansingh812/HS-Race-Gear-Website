import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import VsVelocityContent from "@/components/hsRaceGear/compare/vsVelocity/VsVelocityContent";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import React from "react";

// Metadata updated 2026-06-01 — exact-phrase audit. Velocita is a niche
// but established brand. Captures "velocita racing suit" + variants.
export const metadata = {
    alternates: { canonical: "/compare/vs-velocity" },
    title: "Velocita Racing Suits Alternative — Custom SFI Suits From $289 | HS Race Gear",
    description:
        "Searching for Velocita racing suits? HS Racegear builds custom SFI-certified race suits from $289 with transparent pricing, faster production, and real design freedom for drag, sprint, dirt, and road racing.",
    keywords:
        "velocita racing suit, velocita racing suits, velocita race suit, velocita racing gear, velocita-usa, velocita alternative, HS Racegear vs Velocita, custom SFI race suits, dirt track suit, sprint car suit, drag racing suit",
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
