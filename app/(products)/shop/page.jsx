import React, { Suspense } from 'react';
import ShopClient from '@/components/shop/ShopClient';

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

// ItemList / CollectionPage schema — eligible for Google rich results
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
    'numberOfItems': 33,
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Off-the-Rack Racing Suits', 'url': 'https://www.hsracegear.com/shop?category=race-suits' },
      { '@type': 'ListItem', 'position': 2, 'name': 'Crew Shirts', 'url': 'https://www.hsracegear.com/shop?category=crew-shirts' },
      { '@type': 'ListItem', 'position': 3, 'name': 'Sublimated Hoodies', 'url': 'https://www.hsracegear.com/shop?category=hoodies' },
      { '@type': 'ListItem', 'position': 4, 'name': 'Racing Gloves', 'url': 'https://www.hsracegear.com/shop?category=gloves' },
      { '@type': 'ListItem', 'position': 5, 'name': 'Accessories', 'url': 'https://www.hsracegear.com/shop?category=accessories' },
    ],
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

export default function ShopPage() {
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
    </>
  );
}
