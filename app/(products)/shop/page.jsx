import React from 'react';
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar2 from "@/components/headers/Topbar2";
import Features from "@/components/products/Features";
import Products1 from "@/components/products/Products1";
import Link from "next/link";
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

export const metadata = {
  title: 'Shop Racing Gear | HS Race Gear',
  description: 'Browse our collection of premium racing suits, gloves, and accessories. FIA and SFI certified racing gear for professionals and enthusiasts.',
  keywords: 'racing suits, racing gloves, racing accessories, FIA certified, SFI certified, Nomex suits',
};

async function getProducts() {
  try {
    await dbConnect();
    
    const dbProducts = await Product.find({ status: 'active' })
      .populate('category', 'name slug')
      .sort({ createdAt: -1 })
      .lean();
    
    // Transform database products to match the format expected by Products1
    const transformedProducts = dbProducts.map(p => {
      const primaryImage = p.images?.find(img => img.isPrimary) || p.images?.[0];
      const secondaryImage = p.images?.find(img => !img.isPrimary) || p.images?.[1];
      
      // Get available sizes from inventory
      const availableSizes = p.inventory
        ?.filter(inv => inv.isAvailable && inv.stock > 0)
        .map(inv => inv.size) || [];
      
      return {
        id: p._id.toString(),
        imgSrc: primaryImage?.url || '/images/placeholder-product.jpg',
        imgHover: secondaryImage?.url || primaryImage?.url || '/images/placeholder-product.jpg',
        width: 684,
        height: 972,
        saleLabel: p.compareAtPrice && p.compareAtPrice > p.price
          ? `${Math.round(((p.compareAtPrice - p.price) / p.compareAtPrice) * 100)}% Off`
          : null,
        title: p.name,
        price: p.price / 100, // Convert from cents to dollars
        oldPrice: p.compareAtPrice ? p.compareAtPrice / 100 : null,
        
        // Filter properties
        filterSizes: availableSizes,
        filterBrands: p.brand ? [p.brand] : ['HS Race Gear'],
        filterColor: ['Black'], // Default for racing suits
        
        // Product details
        sizes: availableSizes,
        colors: [{
          label: 'Black',
          value: 'bg-black',
          img: primaryImage?.url || '/images/placeholder-product.jpg',
        }],
        inStock: p.inventory?.some(inv => inv.stock > 0) || false,
        
        // Additional data for product detail page
        slug: p.slug,
        certification: p.certification,
        material: p.material,
        customFitAvailable: p.customFitAvailable,
        isFeatured: p.isFeatured,
        isNewArrival: p.isNewArrival,
        category: p.category,
      };
    });
    
    return transformedProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function ShopPage() {
  const products = await getProducts();
  
  return (
    <>
      <Topbar2 parentClass="tf-topbar bg-dark-5 topbar-bg" />
      <Header1 />
      
      {/* Breadcrumb */}
      <section className="tf-page-title">
        <div className="container">
          <div className="box-title text-center">
            <h4 className="title">Racing Gear</h4>
            <div className="breadcrumb-list">
              <Link className="breadcrumb-item" href="/">
                Home
              </Link>
              <div className="breadcrumb-item dot">
                <span />
              </div>
              <div className="breadcrumb-item current">Shop</div>
            </div>
            <p className="desc text-md text-main">
              Discover our premium collection of FIA and SFI certified racing gear. Professional-grade suits, gloves, and accessories for racers.
            </p>
          </div>
        </div>
      </section>

      <Products1 initialProducts={products} />
      <Features />
      <Footer1 />
    </>
  );
}
