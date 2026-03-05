import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import Faqs from "@/components/hsRaceGear/faqs/Faqs";
import "@/public/css/faqs.css";
import React from "react";

export const metadata = {
  alternates: { canonical: "/faq" },
  title: "FAQs | HS Race Gear — Custom Racing Suits & Gear",
  description:
    "Answers to your most common questions about custom racing suits, sizing, SFI certifications, lead times, shipping, and returns. Get the info you need before ordering.",
};

// FAQPage schema → Google shows FAQ rich results in search
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What makes HS Racegear racing suits unique?",
      "acceptedAnswer": { "@type": "Answer", "text": "HS Racegear specializes in custom-built, SFI-certified racing suits designed for serious racers. We combine premium Nomex® fire-resistant fabrics, professional tailoring, and race-proven construction to deliver safety, comfort, and performance at competitive pricing." }
    },
    {
      "@type": "Question",
      "name": "Is HS Racegear an SFI-approved brand?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. HS Racegear produces SFI 3.2A certified racing gear, including suits, gloves, and shoes. All applicable products carry official SFI certification labels and comply with motorsport safety regulations." }
    },
    {
      "@type": "Question",
      "name": "How can I order custom racing gear from HS Racegear?",
      "acceptedAnswer": { "@type": "Answer", "text": "You can place your order directly through our website. Once your order is submitted, our design team will contact you to finalize measurements, colors, logos, and layout, followed by a digital mockup for approval." }
    },
    {
      "@type": "Question",
      "name": "What customization options are available?",
      "acceptedAnswer": { "@type": "Answer", "text": "We offer full customization including custom sizing, color combinations, driver name and flag, sponsor and team logos, and stitching and panel layouts." }
    },
    {
      "@type": "Question",
      "name": "Is there a limit to design revisions?",
      "acceptedAnswer": { "@type": "Answer", "text": "We offer unlimited design revisions. The design process is free and production begins only after your full approval." }
    },
    {
      "@type": "Question",
      "name": "How long does the ordering process take?",
      "acceptedAnswer": { "@type": "Answer", "text": "Design confirmation usually takes 24–72 hours. Custom SFI racing gear typically takes 4–5 weeks for production after approval." }
    },
    {
      "@type": "Question",
      "name": "How do I ensure the correct size?",
      "acceptedAnswer": { "@type": "Answer", "text": "We provide a detailed measurement guide to help you submit accurate body measurements. Our team also reviews measurements to ensure proper fit." }
    },
    {
      "@type": "Question",
      "name": "What materials are used in HS Racegear products?",
      "acceptedAnswer": { "@type": "Answer", "text": "Our products are made using Nomex® meta-aramid fireproof fabrics, fire-resistant inner linings, Kevlar® or Nomex® thread, and high-quality Nomex zippers." }
    },
    {
      "@type": "Question",
      "name": "How much do custom racing suits cost?",
      "acceptedAnswer": { "@type": "Answer", "text": "Pricing depends on SFI rating and custom features. Each product page displays base pricing, with final cost confirmed before production." }
    },
    {
      "@type": "Question",
      "name": "Do you ship internationally?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. HS Racegear ships worldwide, serving racers across the USA, Europe, Australia, and beyond." }
    },
    {
      "@type": "Question",
      "name": "What is your return policy?",
      "acceptedAnswer": { "@type": "Answer", "text": "Custom-made racing suits are non-returnable, except in the case of manufacturing defects." }
    },
    {
      "@type": "Question",
      "name": "How do SFI ratings differ, and which one do I need?",
      "acceptedAnswer": { "@type": "Answer", "text": "SFI 3.2A/1 provides entry-level fire protection. SFI 3.2A/5 provides multi-layer protection for higher-level racing classes. Always follow your sanctioning body's minimum requirements." }
    }
  ]
};

export default function page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Topbar1 />
      <Header3 />
      <Faqs />
      <Footer3 />
    </>
  );
}
