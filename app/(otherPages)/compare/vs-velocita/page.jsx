import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import VsVelocitaContent from "@/components/hsRaceGear/compare/vsVelocita/VsVelocitaContent";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import React from "react";

// Metadata updated 2026-08-11 — Keyword Planner check: "velocita race suit"
// is 500/mo, "velocita custom racing suits" only 50/mo. Leading with the
// higher-volume head term and restoring the $289 price anchor (price in the
// title is the single strongest CTR lever on a competitor-alternative page).
export const metadata = {
    alternates: { canonical: "/compare/vs-velocita" },
    title: "Velocita Race Suit Alternative — Custom SFI Suits From $289",
    description:
        "Comparing Velocita race suits? HS Race Gear builds custom SFI-certified suits from $289 — made to your exact measurements in the USA, with transparent pricing, faster production, and real design freedom for drag, sprint, dirt, and road racing.",
    keywords:
        "velocita custom racing suits, velocita racing suit, velocita racing suits, velocita race suit, velocita racing gear, velocita-usa, velocita alternative, HS Racegear vs Velocita, custom SFI race suits, dirt track suit, sprint car suit, drag racing suit",
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hsracegear.com" },
        { "@type": "ListItem", "position": 2, "name": "Compare", "item": "https://www.hsracegear.com/compare" },
        { "@type": "ListItem", "position": 3, "name": "HS Racegear vs Velocita Racing Gear", "item": "https://www.hsracegear.com/compare/vs-velocita" }
    ]
};

export default function VsVelocitaPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <Topbar1 />
            <Header3 />
            <VsVelocitaContent />
            <Footer3 />
        </>
    );
}
