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

// Metadata rewritten 2026-05-16 to lead with "Custom Racing Suit"
// (singular, higher volume), add "Made in USA" angle (28-imp GSC query
// "racewear USA"), and add one-word brand spelling "HSracegear" (people
// search the domain without the space).
export const metadata = {
  title: "Custom Racing Suit — SFI Certified, Made in USA | HS Race Gear",
  description:
    "HS Race Gear (HSracegear) crafts custom racing suits, karting suits, gloves, and shoes built to your exact measurements in Watertown, MA. SFI 3.2A/1 & 3.2A/5 certified. Made in the USA. Free shipping on custom suits.",
  keywords:
    "custom racing suit, custom race suit, SFI certified racing suit, made in USA racing suit, racewear USA, HSracegear, HS Race Gear, racing gear, aftermarket auto racing suits, custom fit racing suit, racing gloves, racing shoes, Nomex racing suit, karting suit, custom karting suit",
};

// JSON-LD Structured Data for Homepage SEO
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.hsracegear.com/#localbusiness",
  "name": "HS Race Gear",
  "image": "https://www.hsracegear.com/images/logo/logo.png",
  "logo": "https://www.hsracegear.com/images/logo/logo.png",
  "description":
    "HS Race Gear is a leading provider of custom-fit, SFI-certified racing suits, gloves, shoes, and motorsport accessories. Over a decade of experience crafting made-to-order racing gear using premium Nomex fire-resistant materials.",
  "url": "https://www.hsracegear.com",
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
    "https://www.facebook.com/profile.php?id=61580765382460",
    "https://www.instagram.com/hsracegear/",
    "https://www.tiktok.com/@hsracipk5hl",
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
              "offers": {
                "@type": "Offer",
                "priceCurrency": "USD",
                "price": "299",
                "priceValidUntil": "2027-12-31",
                "availability": "https://schema.org/InStock",
                "url": "https://www.hsracegear.com/custom-race-suit",
              },
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
              "offers": {
                "@type": "Offer",
                "priceCurrency": "USD",
                "price": "49",
                "priceValidUntil": "2027-12-31",
                "availability": "https://schema.org/InStock",
                "url": "https://www.hsracegear.com/shop",
              },
            },
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "Custom Racing Shoes",
              "description":
                "SFI 3.3/5 certified racing shoes with premium cowhide leather",
              "offers": {
                "@type": "Offer",
                "priceCurrency": "USD",
                "price": "149",
                "priceValidUntil": "2027-12-31",
                "availability": "https://schema.org/InStock",
                "url": "https://www.hsracegear.com/shop",
              },
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
  "@id": "https://www.hsracegear.com/#website",
  "name": "HS Race Gear",
  "url": "https://www.hsracegear.com",
  "description":
    "Custom-fit, SFI certified racing suits, gloves, shoes, and motorsport safety equipment",
  "publisher": { "@id": "https://www.hsracegear.com/#localbusiness" },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.hsracegear.com/shop?search={search_term_string}",
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
    "https://www.hsracegear.com/custom-race-suit",
    "https://www.hsracegear.com/custom-gloves",
    "https://www.hsracegear.com/custom-shoes",
    "https://www.hsracegear.com/shop",
    "https://www.hsracegear.com/StandardPricing",
    "https://www.hsracegear.com/custom-fit",
    "https://www.hsracegear.com/faq",
    "https://www.hsracegear.com/about-us",
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
      {/* <NewsletterSignup /> */}
      <Footer3 />
    </>
  );
}
