import React from "react";
import Link from "next/link";

const products = [
  {
    name: "HS Pro 1 SFI Race Suit",
    price: "$395",
    originalPrice: "$749",
    badge: "SFI Certified",
    link: "/shop/hs-pro-1-sfi-race-suit",
    image: "https://res.cloudinary.com/drygcfes5/image/upload/v1771064344/M3_scqyog.png",
  },
  {
    name: "HS Super SFI Race suit",
    price: "$395",
    originalPrice: null,
    badge: "SFI 3.3/5",
    link: "/shop/hs-super-sfi-race-suit",
    image: "https://res.cloudinary.com/drygcfes5/image/upload/v1771064344/M1_eg60vm.png",
  },
  {
    name: "HS Rush SFI Race suit",
    price: "$395",
    originalPrice: null,
    badge: "New",
    link: "/shop/hs-rush-sfi-race-suit",
    image: "https://res.cloudinary.com/drygcfes5/image/upload/v1771064344/M5_ouwfdw.png",
  },
  {
    name: "HS Ace SFI Race suit",
    price: "$395",
    originalPrice: null,
    badge: "New",
    link: "/shop/hs-ace-sfi-race-suit",
    image: "https://res.cloudinary.com/drygcfes5/image/upload/v1771064344/M2_owokil.png",
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
                  <img src={product.image} alt={product.name} className="product-card__img" />
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
