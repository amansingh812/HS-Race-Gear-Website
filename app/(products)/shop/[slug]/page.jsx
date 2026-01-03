import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import RacingSuitProduct from '@/components/products/RacingSuitProduct';
import Header1 from '@/components/headers/Header1';
import Footer1 from '@/components/footers/Footer1';
import Topbar2 from '@/components/headers/Topbar2';
import Breadcumb from '@/components/common/Breadcumb';
import { notFound } from 'next/navigation';

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  try {
    await connectDB();
    const product = await Product.findOne({ slug }).lean();
    
    if (!product) {
      return {
        title: 'Product Not Found | HS Race Gear',
      };
    }

    return {
      title: `${product.name} | HS Race Gear`,
      description: product.shortDescription || product.description?.substring(0, 160),
      openGraph: {
        title: product.name,
        description: product.shortDescription || product.description?.substring(0, 160),
        images: product.images?.[0]?.url ? [product.images[0].url] : [],
      },
    };
  } catch (error) {
    return {
      title: 'Product | HS Race Gear',
    };
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

    // Convert ObjectIds and Dates to strings for serialization
    const serializedProduct = {
      _id: product._id.toString(),
      name: product.name,
      slug: product.slug,
      description: product.description,
      shortDescription: product.shortDescription,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      certification: product.certification,
      material: product.material,
      construction: product.construction,
      customFitAvailable: product.customFitAvailable,
      customFitPrice: product.customFitPrice,
      customFitLeadTime: product.customFitLeadTime,
      isFeatured: product.isFeatured,
      isNewArrival: product.isNewArrival,
      status: product.status,
      viewCount: product.viewCount,
      images: product.images?.map(img => ({
        url: img.url,
        altText: img.altText,
        isPrimary: img.isPrimary
      })) || [],
      inventory: product.inventory?.map(inv => ({
        size: inv.size,
        stock: inv.stock,
        sku: inv.sku,
        isAvailable: inv.isAvailable
      })) || [],
      customOptions: product.customOptions?.map(opt => ({
        name: opt.name,
        slug: opt.slug,
        description: opt.description,
        price: opt.price,
        isDefault: opt.isDefault
      })) || [],
      category: product.category ? {
        _id: product.category._id?.toString(),
        name: product.category.name,
        slug: product.category.slug
      } : null,
      subcategory: product.subcategory ? {
        _id: product.subcategory._id?.toString(),
        name: product.subcategory.name,
        slug: product.subcategory.slug
      } : null,
      discountPercentage: product.discountPercentage
    };

    return (
      <>
        <Topbar2 parentClass="tf-topbar bg-dark-5 topbar-bg" />
        <Header1 />
        <Breadcumb 
          pageName={product.name} 
          pageTitle={product.name}
          parentPage="Racing Suits"
          parentLink="/shop-default"
        />
        <div className="flat-spacing-10">
          <div className="container">
            <RacingSuitProduct product={serializedProduct} />
          </div>
        </div>
        <Footer1 />
      </>
    );
  } catch (error) {
    console.error('Error fetching product:', error);
    notFound();
  }
}
