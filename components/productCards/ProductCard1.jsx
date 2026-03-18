"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useContextElement } from "@/context/Context";
import CountdownTimer from "../common/Countdown";
import Image from "next/image";

export default function ProductCard1({
  product,
  styleClass = "style-1",
  tooltipDirection = "left",
  textCenter = false,
  ratioClass = "",
}) {
  const [currentImage, setCurrentImage] = useState(product.imgSrc);

  const {
    addProductToCart,
    isAddedToCartProducts,
  } = useContextElement();

  useEffect(() => {
    setCurrentImage(product.imgSrc);
  }, [product]);

  const isOutOfStock = product.isOutofSale;
  const hasSize = product.sizes?.length > 0;
  const hasColors = product.colors?.length > 0;
  const isStyle3 = styleClass.includes("style-3");

  return (
    <div className={`hs-product-card ${hasSize ? "hs-has-sizes" : ""} ${isOutOfStock ? "hs-out-of-stock" : ""} ${styleClass}`}>
      {/* Image Container */}
      <div className={`hs-card-img-wrap ${ratioClass}`}>
        <Link
          href={product.slug ? `/shop/${product.slug}` : `/product-detail/${product.id}`}
          className="hs-card-img-link"
        >
          <Image
            className="hs-card-img"
            alt={product.title}
            src={currentImage}
            width={513}
            height={729}
          />
          <Image
            className="hs-card-hover-img"
            alt={product.title}
            src={product.imgHover}
            width={513}
            height={729}
          />
        </Link>

        {/* Badge - Sale Label, Trending, or Countdown */}
        {product.saleLabel && (
          <div className="hs-card-badge hs-badge-sale">
            <span>{product.saleLabel}</span>
          </div>
        )}

        {product.isTrending && !product.saleLabel && (
          <div className="hs-card-badge hs-badge-trending">
            <span>Trending</span>
          </div>
        )}

        {product.countdownTimer && (
          <div className="hs-card-badge hs-badge-countdown">
            <span className="hs-countdown-timer">
              <CountdownTimer style={1} />
            </span>
          </div>
        )}

        {/* Action Buttons Overlay */}
        {!isOutOfStock && (
          <div className="hs-card-actions">
            {!isStyle3 && (
              <>
                <a
                  href="#shoppingCart"
                  data-bs-toggle="offcanvas"
                  onClick={() => addProductToCart(product.id)}
                  className="hs-card-action-btn hs-btn-cart hover-tooltip"
                  title={isAddedToCartProducts(product.id) ? "Already Added" : "Add to Cart"}
                >
                  <span className="icon icon-cart2" />
                </a>

                <Link
                  href={product.slug ? `/shop/${product.slug}` : `/product-detail/${product.id}`}
                  className="hs-card-action-btn hs-btn-view hover-tooltip"
                  title="View Details"
                >
                  <span className="icon icon-view" />
                </Link>
              </>
            )}

            {isStyle3 && (
              <a
                href="#shoppingCart"
                data-bs-toggle="offcanvas"
                className="hs-btn-add-to-cart"
                onClick={() => addProductToCart(product.id)}
              >
                <span className="icon icon-cart2" />
                <span className="text-md fw-medium">
                  {isAddedToCartProducts(product.id) ? "Already Added" : "Add to Cart"}
                </span>
              </a>
            )}
          </div>
        )}

        {/* Size Display */}
        {hasSize && (
          <div className="hs-card-sizes">
            <ul className="hs-size-list">
              {product.sizes.map((size, index) => (
                <li className="hs-size-item" key={index}>
                  {size}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className={`hs-card-info ${textCenter ? "hs-text-center" : ""}`}>
        <Link
          href={product.slug ? `/shop/${product.slug}` : `/product-detail/${product.id}`}
          className="hs-card-title"
        >
          {product.title}
        </Link>

        <div className="hs-card-price">
          <span className="hs-price-current">
            ${product.price.toFixed(2)}
          </span>
          {product.oldPrice && (
            <span className="hs-price-old">
              ${product.oldPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Color Swatches */}
        {hasColors && (
          <ul className={`hs-card-colors ${textCenter ? "hs-centered" : ""}`}>
            {product.colors.map((color, index) => (
              <li
                className={`hs-color-swatch ${currentImage === color.img ? "hs-active" : ""} ${color.value === "bg-white" ? "hs-white-border" : ""}`}
                key={index}
                onMouseOver={() => setCurrentImage(color.img)}
                title={color.label}
              >
                <span className={`hs-swatch-color ${color.value}`} />
                <Image
                  className="hs-swatch-img"
                  alt={color.label}
                  src={color.img}
                  width={684}
                  height={972}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
