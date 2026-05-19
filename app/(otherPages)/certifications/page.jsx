import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import CertificationHero from "@/components/hsRaceGear/certifications/CertificationHero";
import CertificationsContent from "@/components/hsRaceGear/certifications/CertificationsContent";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import React from "react";

export const metadata = {
  alternates: { canonical: "https://www.hsracegear.com/certifications" },
  title: "SFI Ratings Explained: SFI 3.2A/1, 3.2A/5 & 3.3/5 Racing Gear | HS Race Gear",
  description: "What are SFI ratings? SFI 3.2A/1, SFI 3.2A/5, and SFI 3.3/5 measure fire protection in racing suits, gloves & shoes. Learn what each SFI rating means — and shop SFI-certified gear from HS Race Gear.",
  keywords: "SFI ratings, SFI rating, SFI certified, SFI approved, SFI suit ratings, SFI 3.2A/5, SFI 3.2A/1, SFI 3.3/5, what does SFI stand for, racing suit certification",
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
      <Topbar1 />
      <Header3 />
      <CertificationHero />
      <CertificationsContent />
      <Footer3 />
    </>
  );
}
