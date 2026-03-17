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

    const productUrl = `https://hsracegear.com/shop/${slug}`;
    const imageUrl = serializedProduct.images?.[0]?.url || 'https://hsracegear.com/images/og-image.jpg';
    const price = serializedProduct.salePrice || serializedProduct.price || '0';
    const categoryName = serializedProduct.category?.name || 'Racing Gear';

    // ── Product Schema (JSON-LD) ──────────────────────────────────────────────
    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": serializedProduct.name,
      "description": serializedProduct.shortDescription || serializedProduct.description || '',
      "image": imageUrl,
      "url": productUrl,
      "sku": serializedProduct.sku || slug,
      "brand": { "@type": "Brand", "name": "HS Race Gear" },
      "category": categoryName,
      "offers": {
        "@type": "Offer",
        "url": productUrl,
        "priceCurrency": "USD",
        "price": String(price),
        "availability": "https://schema.org/InStock",
        "seller": { "@type": "Organization", "name": "HS Race Gear" }
      }
    };

    // ── BreadcrumbList Schema (JSON-LD) ───────────────────────────────────────
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://hsracegear.com" },
        { "@type": "ListItem", "position": 2, "name": "Shop", "item": "https://hsracegear.com/shop" },
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
