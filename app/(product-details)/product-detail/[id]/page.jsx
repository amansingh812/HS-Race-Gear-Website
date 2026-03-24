import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import Breadcumb from "@/components/productDetails/Breadcumb";
import Description1 from "@/components/productDetails/Description1";
import Details1 from "@/components/productDetails/Details1";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    await connectDB();
    const product = await Product.findById(id)
      .populate('category', 'name')
      .lean();
    
    if (!product) {
      return {
        title: "Product Not Found | HS Race Gear",
      };
    }

    return {
      title: `${product.name} | HS Race Gear`,
      description: product.description || product.shortDescription || `Shop ${product.name} at HS Race Gear`,
    };
  } catch (error) {
    return {
      title: "Product | HS Race Gear",
    };
  }
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;

  try {
    await connectDB();
    
    const product = await Product.findById(id)
      .populate('category', 'name slug')
      .populate('subcategory', 'name slug')
      .lean();

    if (!product) {
      notFound();
    }
    
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
    console.error('Error loading product:', error);
    notFound();
  }
}

