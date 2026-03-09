import Topbar1 from "@/components/headers/Topbar1";
import Header3 from "@/components/headers/Header3";
import { RacingCategories, CustomizeSection, DriversSection } from "@/components/homes/home-racing";
import {
  HeroSection,
  AnnouncementStrip,
  HeroBannersTop,
  HeroBannersMiddle,
  PromoBanner,
  FeaturedProducts,
  ProductSpecsSection,
  HomeTestimonials,
  BlogSection,
  BrandStory,
  NewsletterSignup,
} from "@/components/hsRaceGear/homepage";
import Footer3 from "@/components/footers/Footer3";
import "@/public/css/homepage.css";

export const metadata = {
  title: "HS Race Gear — Custom SFI Certified Racing Suits, Gloves & Shoes",
  description:
    "HS Race Gear offers custom-fit, SFI certified racing suits, gloves, shoes, and motorsport safety equipment. Made-to-order with unlimited customization. Trusted by racers worldwide.",
  keywords:
    "custom racing suits, SFI certified racing gear, custom fit racing suit, racing gloves, racing shoes, Nomex racing suit, karting suits, motorsport safety equipment",
};

// JSON-LD Structured Data for Homepage SEO
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://hsracegear.com/#localbusiness",
  "name": "HS Race Gear",
  "image": "https://hsracegear.com/images/logo/logo.webp",
  "logo": "https://hsracegear.com/images/logo/logo.webp",
  "description":
    "HS Race Gear is a leading provider of custom-fit, SFI-certified racing suits, gloves, shoes, and motorsport accessories. Over a decade of experience crafting made-to-order racing gear using premium Nomex fire-resistant materials.",
  "url": "https://hsracegear.com",
  "telephone": "+1-617-319-6993",
  "email": "info@hsracegear.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "59 Kondazian St",
    "addressLocality": "Watertown",
    "addressRegion": "MA",
    "postalCode": "02472",
    "addressCountry": "US",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 42.3709,
    "longitude": -71.1828,
  },
  "areaServed": {
    "@type": "Country",
    "name": "Worldwide",
  },
  "priceRange": "$$",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ],
    "opens": "09:00",
    "closes": "18:00",
  },
  "sameAs": [
    "https://www.facebook.com/hsracegear",
    "https://www.instagram.com/hsracegear",
    "https://www.tiktok.com/@hsracegear",
  ],
  "foundingDate": "2014",
  "knowsAbout": [
    "Custom Racing Suits",
    "SFI Certified Fire Suits",
    "Nomex Racing Gear",
    "Karting Suits",
    "Racing Gloves",
    "Racing Shoes",
    "Motorsport Safety Equipment",
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Racing Gear Collection",
    "itemListElement": [
      {
        "@type": "OfferCatalog",
        "name": "Custom Racing Suits",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "Custom SFI Racing Suit",
              "description":
                "Custom-fit SFI 3.2A/1 and SFI 3.2A/5 certified racing suits with unlimited color and logo options",
            },
          },
        ],
      },
      {
        "@type": "OfferCatalog",
        "name": "Racing Accessories",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "Custom Racing Gloves",
              "description":
                "SFI 3.3/5 certified racing gloves with Nomex construction",
            },
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "Custom Racing Shoes",
              "description":
                "SFI 3.3/5 certified racing shoes with premium cowhide leather",
            },
          },
        ],
      },
    ],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://hsracegear.com/#website",
  "name": "HS Race Gear",
  "url": "https://hsracegear.com",
  "description":
    "Custom-fit, SFI certified racing suits, gloves, shoes, and motorsport safety equipment",
  "publisher": { "@id": "https://hsracegear.com/#localbusiness" },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://hsracegear.com/shop?search={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const siteNavigationSchema = {
  "@context": "https://schema.org",
  "@type": "SiteNavigationElement",
  "name": [
    "Custom Race Suit",
    "Custom Gloves",
    "Custom Shoes",
    "Shop Race Suits",
    "Pricing",
    "How to Measure",
    "FAQs",
    "About Us",
  ],
  "url": [
    "https://hsracegear.com/custom-race-suit",
    "https://hsracegear.com/custom-gloves",
    "https://hsracegear.com/custom-shoes",
    "https://hsracegear.com/shop",
    "https://hsracegear.com/StandardPricing",
    "https://hsracegear.com/custom-fit",
    "https://hsracegear.com/faqs",
    "https://hsracegear.com/about-us",
  ],
};

export default function Home() {
  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(siteNavigationSchema),
        }}
      />
      <Topbar1 />
      <Header3 />
      <HeroSection />
      <AnnouncementStrip />
      <HeroBannersTop />
      <CustomizeSection />
      <PromoBanner />
      <FeaturedProducts />
      <ProductSpecsSection />
      <HeroBannersMiddle />
      {/* <HomeTestimonials /> */}
      <BlogSection />
      <BrandStory />
      <NewsletterSignup />
      <Footer3 />
    </>
  );
}
