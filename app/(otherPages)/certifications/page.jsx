import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import CertificationHero from "@/components/hsRaceGear/certifications/CertificationHero";
import CertificationsContent from "@/components/hsRaceGear/certifications/CertificationsContent";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import React from "react";

// Metadata rewritten 2026-07-16 based on live GSC data — /certifications
// captured 330 impressions in 28 days (2nd highest page) but only 0.9% CTR
// because title/description weren't magnetic enough. Rewritten for the
// 4 head queries: "sfi ratings" (37 imp), "sfi suit ratings" (34), "sfi
// rated racing suit" (19), "sfi approved" (9). Adding year for freshness
// signal + 3.2A/15 to capture drag racing queries.
export const metadata = {
  alternates: { canonical: "https://www.hsracegear.com/certifications" },
  title: "SFI Ratings Explained (2026): 3.2A/1, 3.2A/5, 3.2A/15 & 3.3/5 | HS Race Gear",
  description: "The complete 2026 guide to SFI ratings. 3.2A/1 (3s protection), 3.2A/5 (10s), 3.2A/15 (drag racing), 3.3/5 (gloves & shoes) — every rating decoded and which one your class actually requires.",
  keywords: "SFI ratings, SFI rating, SFI certified, SFI approved, SFI suit ratings, SFI 3.2A/5, SFI 3.2A/1, SFI 3.2A/15, SFI 3.3/5, sfi rated racing suit, what does SFI stand for, racing suit certification",
  openGraph: {
    type: "article",
    title: "SFI Ratings Explained (2026) — Complete Racing Suit Certification Guide",
    description: "Every SFI rating decoded: 3.2A/1 vs 3.2A/5 vs 3.2A/15 vs 3.3/5. Learn which one your class requires before you buy.",
    url: "https://www.hsracegear.com/certifications",
    images: ["https://www.hsracegear.com/images/og-image.jpg"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hsracegear.com" },
    { "@type": "ListItem", "position": 2, "name": "SFI Ratings & Certifications", "item": "https://www.hsracegear.com/certifications" }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does SFI stand for in racing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SFI stands for SFI Foundation, Inc. — an independent non-profit organization that sets and administers performance standards for racing safety equipment including fire suits, gloves, shoes, helmets, and harnesses."
      }
    },
    {
      "@type": "Question",
      "name": "What are SFI ratings for racing suits?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SFI ratings for racing suits measure fire protection level. SFI 3.2A/1 (single-layer) provides approximately 3 seconds of protection from a flash fire, while SFI 3.2A/5 (multi-layer) provides approximately 10 seconds. Most sanctioning bodies require at minimum SFI 3.2A/1, and many competitive series require SFI 3.2A/5."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between SFI 3.2A/1 and SFI 3.2A/5?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SFI 3.2A/1 is a single-layer fire suit offering about 3 seconds of thermal protection — suitable for karting and lower-risk environments. SFI 3.2A/5 is a multi-layer suit offering about 10 seconds of protection, required for most circle-track, drag, and sprint car racing series. HS Race Gear offers both, custom-built to your measurements."
      }
    },
    {
      "@type": "Question",
      "name": "What does SFI approved mean?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SFI approved means the product has been independently tested and certified by the SFI Foundation to meet a specific performance standard. SFI-approved racing gear carries a dated SFI label confirming it passed the required fire resistance, tensile strength, and seam integrity tests."
      }
    },
    {
      "@type": "Question",
      "name": "What is SFI 3.3/5 for gloves and shoes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SFI 3.3/5 is the certification standard for racing gloves and shoes. It certifies that the product provides fire resistance equivalent to a 5-layer suit's protection level at the hands and feet. Most racing series that require an SFI 3.2A/5 suit also require SFI 3.3/5 gloves and shoes."
      }
    },
    {
      "@type": "Question",
      "name": "Do SFI certifications expire?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. SFI-certified racing gear is labeled with a manufacture date, and most sanctioning bodies consider SFI labels valid for 2–5 years depending on the series rules. Always check your series tech inspection requirements. HS Race Gear ships new gear with a current SFI label."
      }
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Topbar1 />
      <Header3 />
      <CertificationHero />
      <CertificationsContent />
      <Footer3 />
    </>
  );
}
