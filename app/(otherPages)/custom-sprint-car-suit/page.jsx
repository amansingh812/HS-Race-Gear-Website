import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import DisciplineLandingPage from "@/components/hsRaceGear/disciplineLanding/DisciplineLandingPage";
import { DISCIPLINE_DATA } from "@/components/hsRaceGear/disciplineLanding/disciplineData";
import "@/public/css/contact-us.css";
import "@/public/css/compare.css";

const data = DISCIPLINE_DATA["sprint-car"];

export const metadata = {
  alternates: { canonical: "/custom-sprint-car-suit" },
  title: "Custom Sprint Car Suits — USAC, World of Outlaws, ASCS Compliant | HS Race Gear",
  description: "Custom sprint car racing suits with arm-restraint-compatible shoulders, dust-seal collar, methanol-spec SFI 3.2A/5 multi-layer Nomex®. USAC, WoO, ASCS, POWRi compliant. Made in USA. From $329.",
  keywords: "custom sprint car suit, USAC racing suit, World of Outlaws sprint suit, ASCS sprint suit, POWRi racing suit, winged sprint car suit, methanol fire suit, Knoxville Nationals",
  openGraph: {
    type: "website",
    title: "Custom Sprint Car Suits — USAC, World of Outlaws, ASCS Compliant",
    description: "Arm-restraint-compatible shoulders, dust-seal collar, methanol-spec multi-layer Nomex®. From $329.",
    url: "https://www.hsracegear.com/custom-sprint-car-suit",
    images: ["https://www.hsracegear.com/images/og-image.jpg"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hsracegear.com" },
    { "@type": "ListItem", "position": 2, "name": "Custom Sprint Car Suit", "item": "https://www.hsracegear.com/custom-sprint-car-suit" },
  ],
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Custom Sprint Car Racing Suit",
  "description": "SFI 3.2A/5 multi-layer Nomex® custom sprint car suit with arm-restraint-compatible shoulders, dust-seal collar, and reinforced abrasion panels.",
  "image": "https://www.hsracegear.com/images/og-image.jpg",
  "brand": { "@type": "Brand", "name": "HS Race Gear" },
  "category": "Sprint Car Racing Suit",
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
