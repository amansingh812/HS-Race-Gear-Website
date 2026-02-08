import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar2 from "@/components/headers/Topbar2";
import Breadcumb from "@/components/common/Breadcumb";
import {
    PricingHero,
    PricingSection,
    TrustBadges,
    DealBundles,
    PricingCTA,
    PricingComparison,
    CustomizationAddons,
} from "@/components/hsRaceGear/pricing";
import {
    racingSuitPricing,
    racingGlovesPricing,
    racingShoesPricing,
    undergarmentsPricing,
} from "@/data/pricingData";
import React from "react";

export const metadata = {
    title: "Racing Gear Pricing – SFI Certified Suits, Gloves & Safety Gear | HS Race Gear",
    description:
        "Explore competitive pricing for professional SFI-certified racing suits, gloves, shoes, and safety gear. Custom-fit racing suits starting at $299 with free shipping on orders over $300.",
    keywords:
        "racing suit price, SFI certified suits, racing gloves, racing shoes, motorsport gear pricing, custom racing suits, fire suits, Nomex suits",
    openGraph: {
        title: "Racing Gear Pricing | HS Race Gear",
        description:
            "Professional SFI-certified racing gear at competitive prices. Custom-fit suits, gloves, shoes and accessories.",
        type: "website",
    },
};

export default function PricingPage() {
    return (
        <>
            <Topbar2 parentClass="tf-topbar bg-dark-5 topbar-bg" />
            <Header1 />

            {/* Hero Section */}
            <PricingHero />

            {/* Trust Badges */}
            <TrustBadges />

            {/* Racing Suits Section */}
            <PricingSection
                id="racing-suits"
                title="Racing Suits"
                subtitle="SFI Certified Protection"
                description="Professional-grade fire suits engineered for maximum protection. Every suit is custom-made to your exact measurements at no additional cost."
                products={racingSuitPricing}
                columns={3}
                showCertificationInfo={true}
            />

            {/* Suit Comparison Table */}
            <PricingComparison />

            {/* Deal Bundles Section */}
            <DealBundles />

            {/* Gloves Section */}
            <PricingSection
                id="gloves"
                title="Racing Gloves"
                subtitle="Precision Grip & Protection"
                description="SFI-certified racing gloves designed for optimal feel and fire protection. Available in multiple sizes with custom fit options."
                products={racingGlovesPricing}
                columns={2}
                variant="compact"
            />

            {/* Shoes Section */}
            <PricingSection
                id="shoes"
                title="Racing Shoes"
                subtitle="Performance Footwear"
                description="Lightweight racing shoes with excellent pedal sensitivity and fire-resistant construction."
                products={racingShoesPricing}
                columns={2}
                variant="compact"
            />

            {/* Undergarments Section */}
            <PricingSection
                id="undergarments"
                title="Fire-Resistant Undergarments"
                subtitle="Complete Protection"
                description="Essential base layers for complete head-to-toe fire protection. Worn under your racing suit for added safety."
                products={undergarmentsPricing}
                columns={3}
                variant="minimal"
            />

            {/* Customization Options */}
            <CustomizationAddons />

            {/* Final CTA */}
            <PricingCTA />

            <Footer1 />
        </>
    );
}
