import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import DisciplineLandingPage from "@/components/hsRaceGear/disciplineLanding/DisciplineLandingPage";
import { DISCIPLINE_DATA } from "@/components/hsRaceGear/disciplineLanding/disciplineData";
import "@/public/css/contact-us.css";
import "@/public/css/compare.css";

const data = DISCIPLINE_DATA["shifter-kart"];

export const metadata = {
  alternates: { canonical: "/custom-shifter-kart-suit" },
  title: "Custom Shifter Kart Suits — KZ, IAME X30 Shifter, Stock Honda | HS Race Gear",
  description: "Custom shifter kart suits with reinforced right-shoulder, moisture-wicking liner, paddle-shift inner elbow stretch. CIK Level 2. SKUSA Pro Shifter, WKA, IAME X30 Shifter compliant. From $329.",
  keywords: "custom shifter kart suit, KZ karting suit, IAME X30 Shifter suit, SKUSA Pro Shifter, Stock Honda Moto Shifter, shifter karting CIK Level 2",
  openGraph: {
    type: "website",
    title: "Custom Shifter Kart Suits — SKUSA, WKA, IAME Compliant",
    description: "Reinforced right-shoulder, paddle-shift inner elbow stretch, cooler moisture-wicking liner. CIK Level 2. From $329.",
    url: "https://www.hsracegear.com/custom-shifter-kart-suit",
    images: ["https://www.hsracegear.com/images/og-image.jpg"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hsracegear.com" },
    { "@type": "ListItem", "position": 2, "name": "Custom Shifter Kart Suit", "item": "https://www.hsracegear.com/custom-shifter-kart-suit" },
  ],
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Custom Shifter Kart Suit",
  "description": "CIK Level 2 shifter kart suit with reinforced right-shoulder abrasion panel, moisture-wicking inner liner, paddle-shift inner elbow stretch panel. SKUSA, WKA, IAME compliant.",
  "image": "https://www.hsracegear.com/images/og-image.jpg",
  "brand": { "@type": "Brand", "name": "HS Race Gear" },
  "category": "Shifter Kart Suit",
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "329",
    "highPrice": "699",
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
