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
  title: "Custom Drag Racing Suits — SFI Certified, NHRA & IHRA Compliant | HS Race Gear",
  description: "Custom drag racing suits built to your measurements. SFI 3.2A/1, 3.2A/5, and 3.2A/15 ratings. NHRA, IHRA, bracket-ready. Made in USA. From $329.",
  keywords: "custom drag racing suit, NHRA fire suit, IHRA fire suit, SFI 3.2A/15 drag suit, bracket racing suit, sportsman drag suit, Pro Stock racing suit, Top Sportsman suit",
  openGraph: {
    type: "website",
    title: "Custom Drag Racing Suits — SFI Certified | HS Race Gear",
    description: "Class-rated custom drag racing suits from SFI 3.2A/1 to 3.2A/15. NHRA, IHRA, bracket compliant. From $329.",
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
  "description": "SFI-certified custom drag racing suit for NHRA, IHRA, and bracket racing. Class-rated from SFI 3.2A/1 to 3.2A/15.",
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
