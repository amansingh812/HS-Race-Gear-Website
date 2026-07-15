import React from "react";
import Link from "next/link";

// Updated 2026-07-09 — replaced old Cloudinary demo images with the actual
// off-the-rack suit WebPs in /public/images/products/off-the-rack/. Each
// image path matches the slug of the product added by
// scripts/add-off-the-rack-suits.mjs. Also fixed missing "$" on Super price.
const products = [
  {
    name: "HS Pro 1 SFI Race Suit",
    price: "$329",
    originalPrice: "$599",
    badge: "45% OFF",
    link: "/shop/hs-pro-1-sfi-race-suit",
    image: "/images/products/off-the-rack/hs-pro-1.webp",
    alt: "HS Pro 1 SFI 3.2A/1 certified single-layer Nomex® racing suit — off-the-rack fire suit made in Watertown, MA by HS Race Gear",
  },
  {
    name: "HS Super SFI Race Suit",
    price: "$329",
    originalPrice: "$599",
    badge: "45% OFF",
    link: "/shop/hs-super-sfi-race-suit",
    image: "/images/products/off-the-rack/hs-super.webp",
    alt: "HS Super SFI 3.2A/1 certified single-layer Nomex® racing suit — premium off-the-rack fire suit made in Watertown, MA by HS Race Gear",
  },
  {
    name: "HS Rush SFI Race Suit",
    price: "$329",
    originalPrice: "$599",
    badge: "45% OFF",
    link: "/shop/hs-rush-sfi-race-suit",
    image: "/images/products/off-the-rack/hs-rush.webp",
    alt: "HS Rush SFI 3.2A/1 certified single-layer Nomex® racing suit — fast-turnaround off-the-rack fire suit made in USA by HS Race Gear",
  },
  {
    name: "HS Ace SFI Race Suit",
    price: "$329",
    originalPrice: "$599",
    badge: "45% OFF",
    link: "/shop/hs-ace-sfi-race-suit",
    image: "/images/products/off-the-rack/hs-ace.webp",
    alt: "HS Ace SFI 3.2A/1 certified single-layer Nomex® racing suit — all-discipline off-the-rack fire suit made in Watertown, MA by HS Race Gear",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="featured-products">
      <div className="container">
        <div className="featured-products__header">
          <h2 className="featured-products__title">Best Sellers</h2>
          <p className="featured-products__subtitle">
            Top-rated racing gear trusted by professional drivers worldwide
          </p>
        </div>

        <div className="featured-products__grid">
          {products.map((product, index) => (
            <div key={index} className="product-card">
              <div className="product-card__image">
                <span className="product-card__badge">{product.badge}</span>
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.alt || product.name}
                    className="product-card__img"
                    loading="lazy"
                    width={400}
                    height={500}
                  />
                ) : (
                  <div className="img-placeholder--light img-placeholder">
                    400 x 500
                  </div>
                )}
              </div>
              <div className="product-card__body">
                <h3 className="product-card__name">{product.name}</h3>
                <div className="product-card__price">
                  {product.price}
                  {product.originalPrice && (
                    <span>{product.originalPrice}</span>
                  )}
                </div>
                <Link href={product.link} className="product-card__link">
                  View Details &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
