import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import DisciplineLandingPage from "@/components/hsRaceGear/disciplineLanding/DisciplineLandingPage";
import { DISCIPLINE_DATA } from "@/components/hsRaceGear/disciplineLanding/disciplineData";
import "@/public/css/contact-us.css";
import "@/public/css/compare.css";

const data = DISCIPLINE_DATA["road-racing"];

export const metadata = {
  alternates: { canonical: "/custom-road-racing-suit" },
  title: "Custom Road Racing Suits — SCCA, NASA, Vintage | HS Race Gear",
  description: "Custom road racing suits for SCCA, NASA, Trans Am, IMSA, vintage. SFI 3.2A/5 or FIA 8856-2018. Stretch panels for road-course range of motion, moisture-wicking inner liner, cool-shirt compatible. From $329.",
  keywords: "custom road racing suit, SCCA racing suit, NASA road racing suit, Trans Am racing suit, IMSA fire suit, FIA 8856-2018 suit, vintage racing suit, club racing suit",
  openGraph: {
    type: "website",
    title: "Custom Road Racing Suits — SCCA, NASA, Vintage Compliant",
    description: "SFI 3.2A/5 or FIA 8856-2018. Stretch panels, moisture-wicking liner, cool-shirt compatible. From $329.",
    url: "https://www.hsracegear.com/custom-road-racing-suit",
    images: ["https://www.hsracegear.com/images/og-image.jpg"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hsracegear.com" },
    { "@type": "ListItem", "position": 2, "name": "Custom Road Racing Suit", "item": "https://www.hsracegear.com/custom-road-racing-suit" },
  ],
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Custom Road Racing Suit",
  "description": "Custom road racing suit for SCCA, NASA, vintage, and amateur endurance. SFI 3.2A/5 or FIA 8856-2018. Stretch panels, moisture-wicking liner, cool-shirt compatible.",
  "image": "https://www.hsracegear.com/images/og-image.jpg",
  "brand": { "@type": "Brand", "name": "HS Race Gear" },
  "category": "Road Racing Suit",
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "329",
    "highPrice": "1499",
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
