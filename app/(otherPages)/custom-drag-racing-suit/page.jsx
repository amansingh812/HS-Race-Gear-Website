import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import DisciplineLandingPage from "@/components/hsRaceGear/disciplineLanding/DisciplineLandingPage";
import { DISCIPLINE_DATA } from "@/components/hsRaceGear/disciplineLanding/disciplineData";
import "@/public/css/contact-us.css";
import "@/public/css/compare.css";

const data = DISCIPLINE_DATA["drag-racing"];

export const metadata = {
  alternates: { canonical: "/custom-drag-racing-suit" },
  title: "Custom SFI 15 & SFI 20 Drag Racing Suits — NHRA Compliant | HS Race Gear",
  description: "Custom SFI 15 and SFI 20 drag racing suits built to your measurements. SFI 3.2A/1, 3.2A/5, 3.2A/15, and 3.2A/20 ratings for every NHRA and IHRA class. Made in USA from $329.",
  keywords: "custom sfi 20 drag racing suit, custom sfi 15 race suit, drag racing fire suits, custom drag racing suits, SFI 3.2A/20 drag racing suit, SFI 3.2A/15 drag suit, 2 piece drag racing suits, buy custom female drag racing suit, custom drag racing suit, NHRA fire suit, IHRA fire suit, bracket racing suit, sportsman drag suit, Pro Stock racing suit, Top Sportsman suit, Top Fuel fire suit, Funny Car fire suit",
  openGraph: {
    type: "website",
    title: "Custom SFI 15 & SFI 20 Drag Racing Suits | HS Race Gear",
    description: "Custom SFI 15 and SFI 20 drag racing suits. SFI 3.2A/1 through 3.2A/20 for every NHRA and IHRA class. From $329.",
    url: "https://www.hsracegear.com/custom-drag-racing-suit",
    images: ["https://www.hsracegear.com/images/og-image.jpg"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hsracegear.com" },
    { "@type": "ListItem", "position": 2, "name": "Custom Drag Racing Suit", "item": "https://www.hsracegear.com/custom-drag-racing-suit" },
  ],
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Custom Drag Racing Suit",
  "description": "Custom SFI 15 and SFI 20 drag racing suit for NHRA, IHRA, and bracket racing. Class-rated from SFI 3.2A/1 through SFI 3.2A/20 for Top Fuel.",
  "image": "https://www.hsracegear.com/images/og-image.jpg",
  "brand": { "@type": "Brand", "name": "HS Race Gear" },
  "category": "Drag Racing Suit",
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "329",
    "highPrice": "1299",
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
