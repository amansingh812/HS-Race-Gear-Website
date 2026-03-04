import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import '@/models/Category';
import Details1 from '@/components/productDetails/Details1';
import Description1 from '@/components/productDetails/Description1';
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

    // Convert MongoDB ObjectIds and Dates to plain objects
    const serializedProduct = JSON.parse(JSON.stringify(product));

    return (
      <>
        <Topbar1 />
        <Header3 />
        <Breadcumb product={serializedProduct} />
        <Details1 product={serializedProduct} />
        <Description1 product={serializedProduct} />
        <Footer3 paddingBottom />
      </>
    );
  } catch (error) {
    console.error('Error fetching product:', error);
    notFound();
  }
}
