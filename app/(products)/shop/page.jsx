import React, { Suspense } from 'react';
import ShopClient from '@/components/shop/ShopClient';

export const metadata = {
  title: 'Shop Racing Gear | HS Race Gear',
  description: 'Browse our collection of premium racing suits, crew shirts, and sublimated hoodies. SFI certified racing gear for professionals and enthusiasts.',
  keywords: 'racing suits, crew shirts, sublimated hoodies, racing accessories, SFI certified, Nomex suits',
  alternates: {
    canonical: 'https://www.hsracegear.com/shop',
  },
};

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }>
      <ShopClient />
    </Suspense>
  );
}
