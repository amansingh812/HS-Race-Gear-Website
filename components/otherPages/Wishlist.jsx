"use client";
import { useContextElement } from "@/context/Context";
import React, { useEffect, useState } from "react";
import ProductCard12 from "../productCards/ProductCard12";
import Link from "next/link";

export default function Wishlist() {
  const { wishList } = useContextElement();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      if (wishList.length === 0) {
        setItems([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        // Fetch products from API
        const response = await fetch("/api/products?limit=100");
        if (response.ok) {
          const data = await response.json();
          const allProducts = data.products || [];
          
          // Filter to get only wishlist items
          const wishlistProducts = allProducts.filter((product) =>
            wishList.includes(product._id) || wishList.includes(product.id)
          );
          
          // Transform to match ProductCard12 expected format
          const transformedProducts = wishlistProducts.map((product) => ({
            id: product._id || product.id,
            title: product.name || product.title,
            price: product.price,
            salePrice: product.salePrice,
            imgSrc: product.images?.[0]?.url || "/images/products/default.webp",
            imgHover: product.images?.[1]?.url || product.images?.[0]?.url || "/images/products/default.webp",
            badge: product.badge,
            rating: product.rating,
            reviews: product.reviews,
            slug: product.slug,
          }));
          
          setItems(transformedProducts);
        }
      } catch (error) {
        console.error("Error fetching wishlist products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistProducts();
  }, [wishList]);

  if (loading) {
    return (
      <section className="s-account flat-spacing-4 pt_0">
        <div className="container">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading wishlist...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="s-account flat-spacing-4 pt_0">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {items.length ? (
              <div
                className="wrapper-shop tf-grid-layout tf-col-2 lg-col-3 xl-col-4 style-1"
                id="gridLayout"
              >
                {items.map((product, i) => (
                  <ProductCard12 key={product.id || i} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-5">
                <div className="mb-3">
                  <i className="icon-heart fs-1 text-muted" />
                </div>
                <h5>Your wishlist is empty</h5>
                <p className="text-muted">
                  Start adding your favorite racing gear to your wishlist!
                </p>
                <Link
                  className="tf-btn btn-dark2 animate-btn mt-3"
                  href="/shop"
                >
                  Explore Products
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
