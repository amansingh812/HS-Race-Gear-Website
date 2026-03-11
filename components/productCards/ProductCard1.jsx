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

  return (
    <div
      className={`card-product ${product.sizes?.length > 0 ? "card-product-size" : ""
        } ${product.isOutofSale ? "out-of-stock" : ""} ${styleClass}`}
    >
      <div className={`card-product-wrapper ${ratioClass} `}>
        <Link href={product.slug ? `/shop/${product.slug}` : `/product-detail/${product.id}`} className="product-img">
          <Image
            className="img-product lazyload"
            alt="image-product"
            src={currentImage}
            width={513}
            height={729}
          />
          <Image
            className="img-hover lazyload"
            data-src={product.imgHover}
            alt="image-product"
            src={product.imgHover}
            width={513}
            height={729}
          />
        </Link>
        {product.saleLabel && (
          <div className="on-sale-wrap">
            <span className="on-sale-item">{product.saleLabel}</span>
          </div>
        )}
        {product.isTrending && (
          <div className="on-sale-wrap">
            <span className="on-sale-item trending">Trending</span>
          </div>
        )}
        {product.countdownTimer && (
          <div className="countdown-box">
            <span className="js-countdown">
              <CountdownTimer style={1} />
            </span>
          </div>
        )}
        {!product.isOutofSale && (
          <>
            <ul className="list-product-btn">
              {!styleClass.includes("style-3") && (
                <li>
                  <a
                    href="#shoppingCart"
                    data-bs-toggle="offcanvas"
                    onClick={() => addProductToCart(product.id)}
                    className={`hover-tooltip tooltip-${tooltipDirection} box-icon`}
                  >
                    <span className="icon icon-cart2" />
                    <span className="tooltip">
                      {isAddedToCartProducts(product.id)
                        ? "Already Added"
                        : "Add to Cart"}
                    </span>
                  </a>
                </li>
              )}
              <li>
                <Link
                  href={product.slug ? `/shop/${product.slug}` : `/product-detail/${product.id}`}
                  className={`hover-tooltip tooltip-${tooltipDirection} box-icon`}
                >
                  <span className="icon icon-view" />
                  <span className="tooltip">View Details</span>
                </Link>
              </li>
            </ul>
            {styleClass.includes("style-3") && (
              <div className="product-btn-main">
                <a
                  href="#shoppingCart"
                  data-bs-toggle="offcanvas"
                  className="btn-main-product"
                  onClick={() => addProductToCart(product.id)}
                >
                  <span className="icon icon-cart2" />
                  <span className="text-md fw-medium">
                    {" "}
                    {isAddedToCartProducts(product.id)
                      ? "Already Added"
                      : "Add to Cart"}{" "}
                  </span>
                </a>
              </div>
            )}
            {product.sizes?.length > 0 && (
              <ul className="size-box">
                {product.sizes.map((size, index) => (
                  <li className="size-item text-xs text-white" key={index}>
                    {size}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
      <div className={`card-product-info ${textCenter ? "text-center" : ""} `}>
        <Link
          href={product.slug ? `/shop/${product.slug}` : `/product-detail/${product.id}`}
          className="name-product link fw-medium text-md"
        >
          {product.title}
        </Link>
        <p className="price-wrap fw-medium">
          <span
            className={`price-new ${product.oldPrice ? "text-primary" : ""} `}
          >
            ${product.price.toFixed(2)}
          </span>{" "}
          {product.oldPrice && (
            <span className="price-old text-dark">
              ${product.oldPrice.toFixed(2)}
            </span>
          )}{" "}
        </p>
        {product.colors?.length > 0 && (
          <ul
            className={`list-color-product ${textCenter ? "justify-content-center" : ""
              } `}
          >
            {product.colors.map((color, index) => (
              <li
                className={`list-color-item color-swatch hover-tooltip tooltip-bot ${currentImage == color.img ? "active" : ""
                  } ${color.value == "bg-white" ? "line" : ""}`}
                key={index}
                onMouseOver={() => setCurrentImage(color.img)}
              >
                <span className="tooltip color-filter">{color.label}</span>
                <span className={`swatch-value ${color.value}`} />
                <Image
                  className="lazyload"
                  data-src={color.img}
                  alt="image-product"
                  src={color.img}
                  width="684"
                  height="972"
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
