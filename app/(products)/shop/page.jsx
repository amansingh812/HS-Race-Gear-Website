import React, { Suspense } from 'react';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import '@/models/Category';
import ShopClient from '@/components/shop/ShopClient';
import Link from 'next/link';

export const metadata = {
  title: 'Shop SFI-Certified Racing Gear — Off-the-Rack Suits, Gloves & Shoes | HS Race Gear',
  description: 'Browse 33+ off-the-rack SFI-certified racing suits from $329 (regularly $599 — 45% off), plus crew shirts and sublimated hoodies. Genuine Nomex® construction. Made in USA. Free shipping on custom suits.',
  keywords: 'racing suits, off the rack racing suits, SFI racing suits, Nomex racing suit, custom race suit, crew shirts, sublimated hoodies, racing accessories, made in USA racing gear',
  alternates: {
    canonical: 'https://www.hsracegear.com/shop',
  },
  openGraph: {
    type: 'website',
    title: 'Shop SFI-Certified Racing Gear — Off-the-Rack Suits From $329',
    description: '33+ off-the-rack SFI-certified racing suits, custom suits, gloves, and shoes. Made in USA.',
    url: 'https://www.hsracegear.com/shop',
    images: ['https://www.hsracegear.com/images/og-image.jpg'],
  },
};

/**
 * Fetch active products server-side so Googlebot sees real content
 * instead of a client-side loading spinner.
 */
async function getProducts() {
  try {
    await connectDB();
    const products = await Product.find({ status: 'active' })
      .populate('category', 'name slug')
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();
    return JSON.parse(JSON.stringify(products));
  } catch (err) {
    console.error('[shop] SSR product fetch failed:', err.message);
    return [];
  }
}

export default async function ShopPage() {
  const products = await getProducts();

  // Build dynamic ItemList schema from real product data
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://www.hsracegear.com/shop',
    'name': 'HS Race Gear Shop',
    'description': 'Off-the-rack SFI-certified racing suits, custom racewear, and team apparel',
    'url': 'https://www.hsracegear.com/shop',
    'isPartOf': { '@type': 'WebSite', 'url': 'https://www.hsracegear.com' },
    'mainEntity': {
      '@type': 'ItemList',
      'itemListOrder': 'https://schema.org/ItemListOrderDescending',
      'numberOfItems': products.length || 33,
      'itemListElement': products.slice(0, 20).map((p, i) => ({
        '@type': 'ListItem',
        'position': i + 1,
        'name': p.name,
        'url': `https://www.hsracegear.com/shop/${p.slug}`,
      })),
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://www.hsracegear.com' },
      { '@type': 'ListItem', 'position': 2, 'name': 'Shop', 'item': 'https://www.hsracegear.com/shop' },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Suspense fallback={
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      }>
        <ShopClient />
      </Suspense>

      {/* ── SSR product grid — visible to crawlers, hidden once JS hydrates ── */}
      <noscript>
        <section style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
          <h2>All Racing Gear</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '24px' }}>
            {products.map((p) => {
              const priceDollars = ((p.price || 0) / 100).toFixed(2);
              const imgUrl = p.images?.[0]?.url || '/images/products/default.webp';
              return (
                <div key={p._id} style={{ border: '1px solid #eee', borderRadius: '8px', padding: '16px' }}>
                  <img
                    src={imgUrl}
                    alt={p.name}
                    width={250}
                    height={300}
                    style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '4px' }}
                  />
                  <h3 style={{ fontSize: '16px', marginTop: '12px' }}>
                    <a href={`/shop/${p.slug}`} style={{ color: '#111', textDecoration: 'none' }}>{p.name}</a>
                  </h3>
                  {p.certification && (
                    <p style={{ fontSize: '12px', color: '#666', margin: '4px 0' }}>{p.certification}</p>
                  )}
                  <p style={{ fontWeight: 'bold', color: '#c8102e' }}>${priceDollars}</p>
                </div>
              );
            })}
          </div>
        </section>
      </noscript>

      {/* ── SSR crawlable product links (always in DOM for Googlebot) ── */}
      <section
        aria-label="Product catalog"
        style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}
      >
        <h2>HS Race Gear — SFI-Certified Racing Suits, Gloves &amp; Shoes</h2>
        <p>
          Browse our full catalog of SFI-certified racing gear. Every suit is made in the USA with genuine
          Nomex fire-resistant material. Off-the-rack suits start at $329 (regularly $599 — 45% off).
          Custom suits built to your exact measurements with unlimited color and logo options.
        </p>
        <ul>
          {products.map((p) => (
            <li key={p._id}>
              <Link href={`/shop/${p.slug}`}>
                {p.name}
                {p.certification ? ` — ${p.certification}` : ''}
                {p.price ? ` — $${((p.price || 0) / 100).toFixed(2)}` : ''}
              </Link>
            </li>
          ))}
        </ul>
        <nav aria-label="Shop categories">
          <Link href="/shop?category=race-suits">Off-the-Rack Racing Suits</Link>
          <Link href="/shop?category=crew-shirts">Crew Shirts</Link>
          <Link href="/shop?category=hoodies">Sublimated Crew Hoodies</Link>
          <Link href="/custom-race-suit">Custom Race Suits</Link>
          <Link href="/custom-karting-suit">Custom Karting Suits</Link>
          <Link href="/custom-gloves">Custom Racing Gloves</Link>
          <Link href="/custom-shoes">Custom Racing Shoes</Link>
        </nav>
      </section>
    </>
  );
}
