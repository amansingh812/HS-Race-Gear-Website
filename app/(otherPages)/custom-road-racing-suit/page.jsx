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
  // CTR FIX 2026-08-11 — GSC: 41 impressions, position 7.7, ZERO clicks.
  // Top-10 ranking, so this is a title problem not a ranking problem. Two
  // changes: lead with the sanctioning bodies (racers self-identify by series
  // before they think "road racing"), and move the $329 price anchor into the
  // title, which is the pattern that works on the compare pages.
  // Also added "fire suit" phrasing — "scca fire suits" is a live query
  // (5 imp @ pos 19.8) and the page only said "racing suit".
  // Brand suffix dropped; old title was 61 chars and truncating.
  title: "SCCA & NASA Road Racing Suits — Custom SFI From $329",
  description: "Custom road racing suits and fire suits for SCCA, NASA, Trans Am, IMSA and vintage. SFI 3.2A/5 or FIA 8856-2018, stretch panels for road-course range of motion, moisture-wicking liner, cool-shirt compatible. Built to your measurements in the USA.",
  keywords: "scca fire suits, scca racing suit, scca fire suit, nasa road racing suit, custom road racing suit, road racing fire suit, club racing suit, Trans Am racing suit, IMSA fire suit, FIA 8856-2018 suit, vintage racing suit, road course racing suit",
  openGraph: {
    type: "website",
    title: "SCCA & NASA Road Racing Suits — Custom SFI From $329",
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
