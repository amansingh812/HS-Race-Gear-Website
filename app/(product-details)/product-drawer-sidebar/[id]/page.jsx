import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import Breadcumb from "@/components/productDetails/Breadcumb";
import Description1 from "@/components/productDetails/Description1";
import Details1 from "@/components/productDetails/Details1";
import ProductSidebar from "@/components/productDetails/ProductSidebar";
import RecentlyViewedProducts from "@/components/productDetails/RecentlyViewedProducts";
import RecommendedProdtcts from "@/components/productDetails/RecommendedProdtcts";
import { allProducts } from "@/data/products";
import React from "react";

export const metadata = {
  title: "Product Details || HS Race Gear",
  description: "HS Race Gear",
};
export default async function ProductDetailPage({ params }) {
  const { id } = await params;

  const product = allProducts.filter((p) => p.id == id)[0] || allProducts[0];
  return (
    <>
      <Topbar1 />
      <Header3 />
      <div className="btn-sidebar left d-flex">
        <button
          className="type-hover"
          data-bs-toggle="offcanvas"
          data-bs-target="#sidebarSingle"
          aria-controls="sidebarSingle"
        >
          <i className="icon icon-sidebar" />
          <span className="text">Open sidebar</span>
        </button>
      </div>

      <Breadcumb product={product} />
      <Details1 product={product} />
      <Description1 />
      <RecommendedProdtcts />
      <RecentlyViewedProducts />
      <Footer3 paddingBottom />
      <ProductSidebar />
    </>
  );
}
