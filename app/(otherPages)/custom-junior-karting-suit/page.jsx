import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import DisciplineLandingPage from "@/components/hsRaceGear/disciplineLanding/DisciplineLandingPage";
import { DISCIPLINE_DATA } from "@/components/hsRaceGear/disciplineLanding/disciplineData";
import "@/public/css/contact-us.css";
import "@/public/css/compare.css";

const data = DISCIPLINE_DATA["junior-karting"];

export const metadata = {
  alternates: { canonical: "/custom-junior-karting-suit" },
  title: "Custom Junior Karting Suits — CIK Level 2, WKA, SKUSA, Rotax | HS Race Gear",
  description: "Custom junior karting suits for cadet, micro, mini, junior karting drivers ages 8–15. CIK Level 2, stretch panels for growth, Velcro cuffs, sublimated graphics. WKA, SKUSA, Rotax Max, IAME compliant. From $329.",
  keywords: "custom junior karting suit, cadet karting suit, mini karting suit, micro karting suit, WKA junior suit, SKUSA mini suit, Rotax junior suit, CIK Level 2",
  openGraph: {
    type: "website",
    title: "Custom Junior Karting Suits — CIK Level 2 Certified",
    description: "Stretch panels for growth, Velcro cuffs, sublimated graphics. WKA, SKUSA, Rotax Max, IAME compliant. From $329.",
    url: "https://www.hsracegear.com/custom-junior-karting-suit",
    images: ["https://www.hsracegear.com/images/og-image.jpg"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hsracegear.com" },
    { "@type": "ListItem", "position": 2, "name": "Custom Junior Karting Suit", "item": "https://www.hsracegear.com/custom-junior-karting-suit" },
  ],
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Custom Junior Karting Suit",
  "description": "CIK Level 2 junior karting suit with growth-room stretch panels, adjustable Velcro cuffs, full sublimation graphics. WKA, SKUSA, Rotax Max, IAME compliant.",
  "image": "https://www.hsracegear.com/images/og-image.jpg",
  "brand": { "@type": "Brand", "name": "HS Race Gear" },
  "category": "Junior Karting Suit",
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "329",
    "highPrice": "599",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "seller": { "@type": "Organization", "name": "HS Race Gear", "url": "https://www.hsracegear.com" },
  },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <Topbar1 />
      <Header3 />
      <DisciplineLandingPage data={data} />
      <Footer3 topBg="#0a0a0a" />
    </>
  );
}
