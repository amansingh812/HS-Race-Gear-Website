import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import DisciplineLandingPage from "@/components/hsRaceGear/disciplineLanding/DisciplineLandingPage";
import { DISCIPLINE_DATA } from "@/components/hsRaceGear/disciplineLanding/disciplineData";
import "@/public/css/contact-us.css";
import "@/public/css/compare.css";

const data = DISCIPLINE_DATA["junior-karting"];

// RETARGETED 2026-08-11. This page was well built but aimed at the wrong
// words — it said "junior / cadet / mini / micro" while buyers search "youth"
// and "children's". Keyword Planner (US):
//   youth karting suits        500/mo   <- was not targeted
//   youth kart racing suit     500/mo   <- was not targeted
//   childrens karting suits    500/mo   <- was not targeted
//   junior karting suits        50/mo   <- was the only term targeted
// 1,500 of the 1,900/mo youth cluster sat in words the page never used.
// Cadet/micro/mini stay in keywords + body as valid long-tail.
export const metadata = {
  alternates: { canonical: "/custom-junior-karting-suit" },
  title: "Youth & Kids Karting Suits — Custom Fit, Made in USA",
  description: "Custom youth karting suits for kids and junior drivers ages 8–15. Built to your child's measurements with growth room, Velcro cuffs and sublimated graphics. From $329.",
  keywords: "youth karting suits, youth kart racing suit, childrens karting suits, kids karting suit, youth go kart suit, go kart racing suit youth, youth karting gear, custom junior karting suit, cadet karting suit, mini karting suit, micro karting suit, junior karting suits, WKA junior suit, SKUSA mini suit, Rotax junior suit",
  openGraph: {
    type: "website",
    title: "Youth & Kids Karting Suits — Custom Fit, Made in USA",
    description: "Built to your child's measurements with growth room, Velcro cuffs and sublimated graphics. From $329.",
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
  "description": "Custom junior karting suit with growth-room stretch panels, adjustable Velcro cuffs and full sublimation graphics.",
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
