import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import CustomMeasurementForm from "@/components/hsRaceGear/customMeasurementForm/CustomMeasurementForm";

import React from "react";

export const metadata = {
  alternates: { canonical: "/custom-measurement" },
  title: "How to Measure for a Custom Racing Suit — Free PDF Form | HS Race Gear",
  description: "Take 7 body measurements for a perfect custom racing suit fit. Free downloadable PDF form with step-by-step instructions.",
  keywords: "how to measure for racing suit, custom racing suit measurements, measurement form PDF, body measurements racing suit, SFI racing suit order, custom fit form",
  openGraph: {
    type: 'article',
    title: 'How to Measure for a Custom Racing Suit — Free PDF',
    description: 'Step-by-step measurement guide for a perfect-fit custom racing suit. 7 key body measurements explained.',
    url: 'https://www.hsracegear.com/custom-measurement',
    images: ['https://www.hsracegear.com/images/og-image.jpg'],
  },
};

// HowTo schema — eligible for Google rich results + voice/AI answers
const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  'name': 'How to Take Measurements for a Custom Racing Suit',
  'description': 'Take 7 body measurements for a perfectly-fitting custom SFI-certified racing suit. Each measurement uses a soft tape measure against close-fitting clothing.',
  'totalTime': 'PT10M',
  'tool': [
    { '@type': 'HowToTool', 'name': 'Soft cloth measuring tape' },
    { '@type': 'HowToTool', 'name': 'A helper (recommended for accuracy)' },
  ],
  'supply': [
    { '@type': 'HowToSupply', 'name': 'Close-fitting clothing (worn during measurement)' },
    { '@type': 'HowToSupply', 'name': 'HS Race Gear measurement form (printable PDF)' },
  ],
  'step': [
    { '@type': 'HowToStep', 'position': 1, 'name': 'Measure your chest', 'text': 'Wrap the tape around the fullest part of your chest, under your armpits. Keep the tape level all the way around. Breathe normally.' },
    { '@type': 'HowToStep', 'position': 2, 'name': 'Measure your natural waist', 'text': 'Find the natural waist (above the hip bones, narrowest part of torso). Wrap the tape level around it.' },
    { '@type': 'HowToStep', 'position': 3, 'name': 'Measure your hip', 'text': 'Wrap the tape around the widest part of your hips and seat. Keep the tape level.' },
    { '@type': 'HowToStep', 'position': 4, 'name': 'Measure shoulder seam to seam', 'text': 'Across your back, measure from the outer edge of one shoulder bone to the other. This drives harness clearance.' },
    { '@type': 'HowToStep', 'position': 5, 'name': 'Measure your outseam', 'text': 'From the natural waist down the outside of the leg to the ankle bone.' },
    { '@type': 'HowToStep', 'position': 6, 'name': 'Measure your inseam', 'text': 'From the crotch down the inside of the leg to the ankle bone. Critical for sprint car cockpit fit.' },
    { '@type': 'HowToStep', 'position': 7, 'name': 'Measure your sleeve length', 'text': 'From the outer shoulder edge down to the wrist bone, with your arm slightly bent.' },
    { '@type': 'HowToStep', 'position': 8, 'name': 'Submit your measurements', 'text': 'Submit the completed form via /custom-measurement or email it to info@hsracegear.com. HS Race Gear will follow up within 24 hours to begin the digital mockup.' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  'itemListElement': [
    { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://www.hsracegear.com' },
    { '@type': 'ListItem', 'position': 2, 'name': 'Custom Measurement', 'item': 'https://www.hsracegear.com/custom-measurement' },
  ],
};

export default function page() {
    return (
        <>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <Topbar1 />
            <Header3 />
            <CustomMeasurementForm />
            <Footer3 />
        </>
    );
}
