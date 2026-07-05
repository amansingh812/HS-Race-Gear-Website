import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import DisciplineLandingPage from "@/components/hsRaceGear/disciplineLanding/DisciplineLandingPage";
import { DISCIPLINE_DATA } from "@/components/hsRaceGear/disciplineLanding/disciplineData";
import "@/public/css/contact-us.css";
import "@/public/css/compare.css";

const data = DISCIPLINE_DATA["dirt-late-model"];

export const metadata = {
  alternates: { canonical: "/custom-dirt-late-model-suit" },
  title: "Custom Dirt Late Model Suits — Lucas Oil & WoO Compliant | HS Race Gear",
  description: "Custom dirt late model suits with abrasion panels, dust-seal collar, SFI 3.2A/5 Nomex®. Lucas Oil, World of Outlaws, weekly track compliant. From $329.",
  keywords: "custom dirt late model suit, Lucas Oil suit, World of Outlaws Late Models suit, dirt track racing suit, late model racing suit, DIRTcar suit",
  openGraph: {
    type: "website",
    title: "Custom Dirt Late Model Suits — Lucas Oil & World of Outlaws Compliant",
    description: "Dust seal, reinforced abrasion panels, SFI 3.2A/5 multi-layer Nomex®. Built for the Saturday-night grind. From $329.",
    url: "https://www.hsracegear.com/custom-dirt-late-model-suit",
    images: ["https://www.hsracegear.com/images/og-image.jpg"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hsracegear.com" },
    { "@type": "ListItem", "position": 2, "name": "Custom Dirt Late Model Suit", "item": "https://www.hsracegear.com/custom-dirt-late-model-suit" },
  ],
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Custom Dirt Late Model Racing Suit",
  "description": "SFI 3.2A/5 multi-layer Nomex® dirt late model suit with dust-seal collar, reinforced abrasion panels, and Lucas Oil / World of Outlaws compliance.",
  "image": "https://www.hsracegear.com/images/og-image.jpg",
  "brand": { "@type": "Brand", "name": "HS Race Gear" },
  "category": "Dirt Late Model Racing Suit",
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "329",
    "highPrice": "899",
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
