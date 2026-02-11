import React from "react";
import Link from "next/link";

const products = [
  {
    name: "Custom Racing Suit",
    price: "$599",
    originalPrice: "$749",
    badge: "SFI Certified",
    link: "/custom-race-suit",
  },
  {
    name: "Racing Shoes",
    price: "$179",
    originalPrice: null,
    badge: "SFI 3.3/5",
    link: "/shop-default",
  },
  {
    name: "Crew Shirt",
    price: "$69",
    originalPrice: null,
    badge: "New",
    link: "/shop-default",
  },
  {
    name: "Racing Hoodie",
    price: "$89",
    originalPrice: null,
    badge: "New",
    link: "/shop-default",
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
                <div className="img-placeholder--light img-placeholder">
                  400 x 500
                </div>
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
