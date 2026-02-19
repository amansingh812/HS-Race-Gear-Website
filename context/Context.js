"use client";
import { allProducts } from "@/data/products";
import { openCartModal } from "@/utlis/openCartModal";
// import { openWistlistModal } from "@/utlis/openWishlist";

import React, { useEffect, useCallback } from "react";
import { useContext, useState } from "react";
const dataContext = React.createContext();
export const useContextElement = () => {
  return useContext(dataContext);
};

export default function Context({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [wishList, setWishList] = useState([1, 2, 3]);
  const [compareItem, setCompareItem] = useState([1, 2, 3]);
  const [quickViewItem, setQuickViewItem] = useState(allProducts[0]);
  const [quickAddItem, setQuickAddItem] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartLoading, setCartLoading] = useState(false);
  const [cartError, setCartError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Check authentication status on mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  // Calculate total price from cart products
  useEffect(() => {
    const subtotal = cartProducts.reduce((accumulator, product) => {
      const price = product.finalPrice || product.price || 0;
      return accumulator + product.quantity * price;
    }, 0);
    setTotalPrice(subtotal);
  }, [cartProducts]);

  // Sync cart with database when authenticated
  const syncCartWithDatabase = useCallback(async () => {
    if (!isAuthenticated) return;

    setCartLoading(true);
    setCartError(null);

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const cartData = data.data || data.cart;
        if (cartData && cartData.items) {
          // Transform cart items to match frontend format
          const items = cartData.items.map((item) => ({
            id: item.product?._id || item.product,
            cartItemId: item._id,
            title: item.productSnapshot?.name || item.productSnapshot?.title || "Product",
            imgSrc: item.productSnapshot?.image || item.productSnapshot?.imgSrc || "/images/products/default.webp",
            slug: item.productSnapshot?.slug,
            price: item.basePrice || item.productSnapshot?.price || 0,
            finalPrice: (item.basePrice || 0) + (item.customFitPrice || 0) + (item.optionsPrice || 0),
            quantity: item.quantity,
            size: item.size,
            isCustomFit: item.isCustomFit,
            measurements: item.measurements,
            selectedOptions: item.selectedOptions,
            layer: item.productSnapshot?.layer,
            driverName: item.productSnapshot?.driverName,
          }));
          setCartProducts(items);
          localStorage.setItem("cartList", JSON.stringify(items));
        }
      }
    } catch (error) {
      console.error("Error syncing cart:", error);
      setCartError("Failed to sync cart");
    } finally {
      setCartLoading(false);
    }
  }, [isAuthenticated]);

  // Sync cart when authentication status changes
  useEffect(() => {
    if (isAuthenticated) {
      syncCartWithDatabase();
    }
  }, [isAuthenticated, syncCartWithDatabase]);

  // Login function - call this after successful login
  const handleLogin = useCallback(async (token, userData) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);

    // Merge local cart with database cart
    const localCart = JSON.parse(localStorage.getItem("cartList") || "[]");
    if (localCart.length > 0) {
      try {
        // Add local items to database cart
        for (const item of localCart) {
          await fetch("/api/cart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              productId: item.id,
              quantity: item.quantity,
              size: item.size,
              isCustomFit: item.isCustomFit,
              measurements: item.measurements,
              selectedOptions: item.selectedOptions,
              price: item.finalPrice || item.price,
              layer: item.layer,
              driverName: item.driverName,
            }),
          });
        }
      } catch (error) {
        console.error("Error merging carts:", error);
      }
    }

    // Sync cart from database
    await syncCartWithDatabase();
  }, [syncCartWithDatabase]);

  // Logout function
  const handleLogout = useCallback(() => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("cartList");
    setIsAuthenticated(false);
    setUser(null);
    setCartProducts([]);
    setTotalPrice(0);
  }, []);

  const isAddedToCartProducts = (id) => {
    const strId = String(id);
    return cartProducts.some((elm) => String(elm.id) === strId);
  };

  // Add product to cart (supports both authenticated and guest)
  const addProductToCart = async (id, qty = 1, options = {}, isModal = true) => {
    const { size, isCustomFit, measurements, selectedOptions, price, layer, driverName } = options;

    if (isAuthenticated) {
      // Add to database cart
      setCartLoading(true);
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch("/api/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId: id,
            quantity: qty,
            size,
            isCustomFit,
            measurements,
            selectedOptions,
            price,
            layer,
            driverName,
          }),
        });

        if (response.ok) {
          await syncCartWithDatabase();
          if (isModal) {
            openCartModal();
          }
        } else {
          const error = await response.json();
          setCartError(error.error || "Failed to add to cart");
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
        setCartError("Failed to add to cart");
      } finally {
        setCartLoading(false);
      }
    } else {
      // Guest cart - use local storage
      // First check static products data
      let product = allProducts.find((elm) => elm.id == id);

      // If not found in static data, fetch from API (for MongoDB products)
      if (!product) {
        try {
          const response = await fetch(`/api/products/${id}`);
          if (response.ok) {
            const data = await response.json();
            const p = data.product || data;
            product = {
              id: p._id || p.id,
              title: p.name || p.title,
              imgSrc: p.images?.[0]?.url || "/images/products/default.webp",
              imgHover: p.images?.[1]?.url || p.images?.[0]?.url || "/images/products/default.webp",
              price: p.price || 0,
              salePrice: p.salePrice,
              slug: p.slug,
            };
          }
        } catch (err) {
          console.error("Error fetching product for guest cart:", err);
        }
      }

      if (product && !isAddedToCartProducts(id)) {
        const finalPrice = price || product.salePrice || product.price || 0;
        const item = {
          ...product,
          id: String(id),
          quantity: qty,
          size,
          isCustomFit,
          measurements,
          selectedOptions,
          layer,
          driverName,
          price: finalPrice,
          finalPrice,
        };
        setCartProducts((pre) => [...pre, item]);
        if (isModal) {
          openCartModal();
        }
      }
    }
  };

  // Update quantity
  const updateQuantity = async (id, qty) => {
    if (isAuthenticated) {
      setCartLoading(true);
      try {
        const token = localStorage.getItem("authToken");
        const cartItem = cartProducts.find((elm) => elm.id == id);
        
        const response = await fetch("/api/cart", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            operation: "updateQuantity",
            itemId: cartItem?.cartItemId,
            quantity: qty,
          }),
        });

        if (response.ok) {
          await syncCartWithDatabase();
        }
      } catch (error) {
        console.error("Error updating quantity:", error);
      } finally {
        setCartLoading(false);
      }
    } else {
      // Guest cart
      const strId = String(id);
      if (isAddedToCartProducts(id)) {
        setCartProducts((prev) =>
          prev.map((elm) =>
            String(elm.id) === strId ? { ...elm, quantity: qty / 1 } : elm
          )
        );
      }
    }
  };

  // Remove item from cart
  const removeFromCart = async (id) => {
    if (isAuthenticated) {
      setCartLoading(true);
      try {
        const token = localStorage.getItem("authToken");
        const cartItem = cartProducts.find((elm) => elm.id == id);
        
        const response = await fetch(`/api/cart?itemId=${cartItem?.cartItemId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          await syncCartWithDatabase();
        }
      } catch (error) {
        console.error("Error removing from cart:", error);
      } finally {
        setCartLoading(false);
      }
    } else {
      // Guest cart
      const strId = String(id);
      setCartProducts((pre) => pre.filter((elm) => String(elm.id) !== strId));
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    if (isAuthenticated) {
      setCartLoading(true);
      try {
        const token = localStorage.getItem("authToken");
        
        const response = await fetch("/api/cart", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            operation: "clear",
          }),
        });

        if (response.ok) {
          setCartProducts([]);
          localStorage.setItem("cartList", "[]");
        }
      } catch (error) {
        console.error("Error clearing cart:", error);
      } finally {
        setCartLoading(false);
      }
    } else {
      setCartProducts([]);
    }
  };

  // Apply discount code
  const applyDiscount = async (code) => {
    if (!isAuthenticated) {
      return { success: false, message: "Please login to apply discount" };
    }

    setCartLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      
      const response = await fetch("/api/cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          operation: "applyDiscount",
          discountCode: code,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        await syncCartWithDatabase();
        return { success: true, message: "Discount applied" };
      } else {
        return { success: false, message: data.error || "Invalid discount code" };
      }
    } catch (error) {
      console.error("Error applying discount:", error);
      return { success: false, message: "Failed to apply discount" };
    } finally {
      setCartLoading(false);
    }
  };

  const addToWishlist = (id) => {
    if (!wishList.includes(id)) {
      setWishList((pre) => [...pre, id]);
      //   openWistlistModal();
    } else {
      setWishList((pre) => pre.filter((elm) => elm != id));
    }
  };

  const removeFromWishlist = (id) => {
    if (wishList.includes(id)) {
      setWishList((pre) => [...pre.filter((elm) => elm != id)]);
    }
  };
  const addToCompareItem = (id) => {
    if (!compareItem.includes(id)) {
      setCompareItem((pre) => [...pre, id]);
    }
  };
  const removeFromCompareItem = (id) => {
    if (compareItem.includes(id)) {
      setCompareItem((pre) => [...pre.filter((elm) => elm != id)]);
    }
  };
  const isAddedtoWishlist = (id) => {
    if (wishList.includes(id)) {
      return true;
    }
    return false;
  };
  const isAddedtoCompareItem = (id) => {
    if (compareItem.includes(id)) {
      return true;
    }
    return false;
  };

  // Load guest cart from localStorage on mount
  useEffect(() => {
    if (!isAuthenticated) {
      const items = JSON.parse(localStorage.getItem("cartList"));
      if (items?.length) {
        setCartProducts(items);
      }
    }
  }, [isAuthenticated]);

  // Save guest cart to localStorage
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem("cartList", JSON.stringify(cartProducts));
    }
  }, [cartProducts, isAuthenticated]);

  // Load wishlist from localStorage
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("wishlist"));
    if (items?.length) {
      setWishList(items);
    }
  }, []);

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishList));
  }, [wishList]);

  const contextElement = {
    // Cart state
    cartProducts,
    setCartProducts,
    totalPrice,
    cartLoading,
    cartError,
    
    // Cart actions
    addProductToCart,
    isAddedToCartProducts,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyDiscount,
    syncCartWithDatabase,
    
    // Auth state
    isAuthenticated,
    user,
    handleLogin,
    handleLogout,
    
    // Wishlist
    wishList,
    addToWishlist,
    removeFromWishlist,
    isAddedtoWishlist,
    
    // Compare
    compareItem,
    setCompareItem,
    addToCompareItem,
    isAddedtoCompareItem,
    removeFromCompareItem,
    
    // Quick view
    quickViewItem,
    setQuickViewItem,
    quickAddItem,
    setQuickAddItem,
  };
  
  return (
    <dataContext.Provider value={contextElement}>
      {children}
    </dataContext.Provider>
  );
}
