import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import '@/models/Category';
import Details1 from '@/components/productDetails/Details1';
import Description1 from '@/components/productDetails/Description1';
import RaceSuitSeoDescription from '@/components/productDetails/RaceSuitSeoDescription';
import Header3 from '@/components/headers/Header3';
import Footer3 from '@/components/footers/Footer3';
import Topbar1 from '@/components/headers/Topbar1';
import '@/public/css/product-detail.css';
import Breadcumb from '@/components/productDetails/Breadcumb';
import { notFound } from 'next/navigation';

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    await connectDB();
    const product = await Product.findOne({ slug }).lean();

    if (!product) {
      return { title: 'Product Not Found | HS Race Gear' };
    }

    const description = product.shortDescription || product.description?.substring(0, 160);
    const imageUrl = product.images?.[0]?.url || '/images/og-image.jpg';

    return {
      title: `${product.name} | HS Race Gear`,
      description,
      alternates: { canonical: `/shop/${slug}` },
      openGraph: {
        title: product.name,
        description,
        images: [{ url: imageUrl, width: 800, height: 600, alt: product.name }],
      },
    };
  } catch (error) {
    return { title: 'Product | HS Race Gear' };
  }
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;

  try {
    await connectDB();

    const product = await Product.findOne({ slug, status: 'active' })
      .populate('category', 'name slug')
      .populate('subcategory', 'name slug')
      .lean();

    if (!product) {
      notFound();
    }

    // Increment view count (non-blocking)
    Product.updateOne({ _id: product._id }, { $inc: { viewCount: 1 } }).exec();

    // Convert MongoDB ObjectIds and Dates to plain objects
    const serializedProduct = JSON.parse(JSON.stringify(product));

    const productUrl = `https://www.hsracegear.com/shop/${slug}`;
    // Prefer image with isPrimary=true, then first available, then fallback
    const primaryImage = serializedProduct.images?.find(img => img.isPrimary);
    const imageUrl = primaryImage?.url || serializedProduct.images?.[0]?.url || 'https://www.hsracegear.com/images/og-image.jpg';
    // Prices stored in cents (e.g., 32900 = $329). Normalize to dollars for schema.
    const priceCents = serializedProduct.price || 0;
    const compareAtPriceCents = serializedProduct.compareAtPrice || 0;
    const price = (priceCents / 100).toFixed(2);
    const categoryName = serializedProduct.category?.name || 'Racing Gear';
    // priceValidUntil — 1 year from now (recommended for Merchant listings)
    const priceValidUntil = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    // Availability — determined by inventory or custom-fit option
    const totalStock = (serializedProduct.inventory || []).reduce((sum, item) => sum + (item.stock || 0), 0);
    const availability = (totalStock > 0 || serializedProduct.customFitAvailable)
      ? "https://schema.org/InStock"
      : "https://schema.org/OutOfStock";

    // ── Product Schema (JSON-LD) ──────────────────────────────────────────────
    // Enhanced 2026-07-06: SFI/FIA certification as additionalProperty,
    // compareAtPrice via previousPrice, priceValidUntil, shipping/return details,
    // aggregateRating (gated on rating count).
    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": serializedProduct.name,
      "description": serializedProduct.shortDescription || serializedProduct.description || '',
      "image": imageUrl,
      "url": productUrl,
      "sku": serializedProduct.sku || slug,
      "mpn": serializedProduct.sku || slug,
      "brand": { "@type": "Brand", "name": "HS Race Gear" },
      "manufacturer": { "@type": "Organization", "name": "HS Race Gear", "address": { "@type": "PostalAddress", "streetAddress": "59 Kondazian St", "addressLocality": "Watertown", "addressRegion": "MA", "postalCode": "02472", "addressCountry": "US" } },
      "category": categoryName,
      "material": serializedProduct.material || undefined,
      // Certification and construction as structured properties for AI/rich results
      "additionalProperty": [
        serializedProduct.certification ? { "@type": "PropertyValue", "name": "Certification", "value": serializedProduct.certification } : null,
        serializedProduct.layers ? { "@type": "PropertyValue", "name": "Layers", "value": String(serializedProduct.layers) } : null,
        serializedProduct.construction ? { "@type": "PropertyValue", "name": "Construction", "value": serializedProduct.construction } : null,
        { "@type": "PropertyValue", "name": "Country of Origin", "value": "USA" },
      ].filter(Boolean),
      "offers": {
        "@type": "Offer",
        "url": productUrl,
        "priceCurrency": "USD",
        "price": price,
        "priceValidUntil": priceValidUntil,
        "availability": availability,
        "itemCondition": "https://schema.org/NewCondition",
        "seller": { "@type": "Organization", "name": "HS Race Gear", "url": "https://www.hsracegear.com" },
        // Shipping + return details — required for Google Merchant free listings
        "shippingDetails": {
          "@type": "OfferShippingDetails",
          "shippingRate": { "@type": "MonetaryAmount", "value": "0", "currency": "USD" },
          "shippingDestination": { "@type": "DefinedRegion", "addressCountry": "US" },
          "deliveryTime": {
            "@type": "ShippingDeliveryTime",
            "handlingTime": { "@type": "QuantitativeValue", "minValue": 0, "maxValue": 2, "unitCode": "DAY" },
            "transitTime": { "@type": "QuantitativeValue", "minValue": 3, "maxValue": 7, "unitCode": "DAY" }
          }
        },
        "hasMerchantReturnPolicy": {
          "@type": "MerchantReturnPolicy",
          "applicableCountry": "US",
          "returnPolicyCategory": serializedProduct.customFitAvailable
            ? "https://schema.org/MerchantReturnNotPermitted"
            : "https://schema.org/MerchantReturnFiniteReturnWindow",
          "merchantReturnDays": serializedProduct.customFitAvailable ? undefined : 30,
          "returnMethod": "https://schema.org/ReturnByMail",
          "returnFees": "https://schema.org/ReturnShippingFees"
        },
        // compareAtPrice → previousPrice for "was $599, now $329" rich results
        ...(compareAtPriceCents > priceCents && {
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": price,
            "priceCurrency": "USD",
            "referencePrice": {
              "@type": "PriceSpecification",
              "price": (compareAtPriceCents / 100).toFixed(2),
              "priceCurrency": "USD"
            }
          }
        })
      },
      // aggregateRating only when actual reviews exist (Google penalizes fabricated ratings)
      ...(serializedProduct.rating?.count > 0 && {
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": String(serializedProduct.rating.average),
          "reviewCount": String(serializedProduct.rating.count),
          "bestRating": "5",
          "worstRating": "1"
        }
      })
    };

    // ── BreadcrumbList Schema (JSON-LD) ───────────────────────────────────────
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hsracegear.com" },
        { "@type": "ListItem", "position": 2, "name": "Shop", "item": "https://www.hsracegear.com/shop" },
        { "@type": "ListItem", "position": 3, "name": serializedProduct.name, "item": productUrl }
      ]
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <Topbar1 />
        <Header3 />
        <Breadcumb product={serializedProduct} />
        <Details1 product={serializedProduct} />
        {serializedProduct.category?.slug === 'race-suits' ? (
          <RaceSuitSeoDescription />
        ) : (
          <div className="flat-single-product">
            <Description1 product={serializedProduct} />
          </div>
        )}
        <Footer3 paddingBottom />
      </>
    );
  } catch (error) {
    console.error('Error fetching product:', error);
    notFound();
  }
}
