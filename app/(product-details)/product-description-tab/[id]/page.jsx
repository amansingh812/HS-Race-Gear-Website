import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar2 from "@/components/headers/Topbar2";
import Breadcumb from "@/components/productDetails/Breadcumb";

import Descriptions3 from "@/components/productDetails/Descriptions3";
import Details1 from "@/components/productDetails/Details1";
import RecentlyViewedProducts from "@/components/productDetails/RecentlyViewedProducts";
import RecommendedProdtcts from "@/components/productDetails/RecommendedProdtcts";
import { allProducts } from "@/data/products";
import React from "react";

export const metadata = {
  title: "Product Details || Vineta - Multipurpose React Nextjs eCommerce",
  description: "Vineta - Multipurpose React Nextjs eCommerce",
};
export default async function ProductDetailPage({ params }) {
  const { id } = await params;

  const product = allProducts.filter((p) => p.id == id)[0] || allProducts[0];
  return (
    <>
      <Topbar2 parentClass="tf-topbar bg-dark-5 topbar-bg" />
      <Header1 />
      <Breadcumb product={product} />
      <Details1 product={product} />
      <Descriptions3 />
      <RecommendedProdtcts />
      <RecentlyViewedProducts />
      <Footer1 paddingBottom />
    </>
  );
}
