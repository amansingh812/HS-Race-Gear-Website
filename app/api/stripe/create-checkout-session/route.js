import { NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import dbConnect from "@/lib/mongodb";
import Cart from "@/models/Cart";
import Product from "@/models/Product";
import Category from "@/models/Category";
import { verifyToken } from "@/lib/auth";
import { calculateShipping } from "@/lib/shipping";

/**
 * POST /api/stripe/create-checkout-session
 *
 * Creates a Stripe Checkout Session for either:
 *   - type: "shop"   → off-the-rack products from the user's cart
 *   - type: "custom"  → custom order (race suit, karting, gloves, shoes, powerboat)
 *
 * Returns { url } — the frontend redirects the browser there.
 *
 * IMPORTANT: Prices are ALWAYS read from the server (Product collection or
 * the known custom package price list). Client-sent prices are ignored for
 * the Stripe line items — this prevents price tampering.
 */

// ── Known custom package prices (server-side source of truth) ──────────
// These MUST match the PACKAGES arrays in the order page components.
// If a package ID isn't in this map the checkout is rejected.
const CUSTOM_PACKAGE_PRICES = {
  // Race suits (CustomOrderPage.jsx + PowerboatOrderPage.jsx)
  "single-suit": 549,
  "double-suit": 649,
  "triple-suit": 749,
  "single-suit-gloves": 649,
  "double-suit-gloves": 749,
  "triple-suit-gloves": 849,
  "single-suit-gloves-shoes": 729,
  "double-suit-gloves-shoes": 829,
  "triple-suit-gloves-shoes": 929,
  // Karting suits (KartingOrderPage.jsx)
  "karting-suit": 289,
  "karting-suit-gloves": 315,
  "karting-suit-gloves-shoes": 415,
  // Standalone gloves (GlovesOrderPage.jsx)
  "custom-gloves": 115,
  // Standalone shoes (ShoesOrderPage.jsx)
  "custom-shoes": 285,
};

export async function POST(request) {
  try {
    const body = await request.json();
    const { type } = body;

    if (type === "shop") {
      return await handleShopCheckout(request, body);
    } else if (type === "custom") {
      return await handleCustomCheckout(request, body);
    } else {
      return NextResponse.json(
        { error: 'Invalid checkout type. Must be "shop" or "custom".' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("[create-checkout-session] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}

/* ────────────────────────────────────────────────────────────────
 * SHOP CHECKOUT
 *
 * Reads cart items, validates prices against Product collection,
 * builds Stripe line_items, creates the session.
 * ──────────────────────────────────────────────────────────────── */
async function handleShopCheckout(request, body) {
  const { customer, items: guestItems } = body;

  if (!customer?.email) {
    return NextResponse.json(
      { error: "Customer email is required" },
      { status: 400 }
    );
  }

  await dbConnect();

  // Determine if authenticated
  let userId = null;
  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    const decoded = verifyToken(authHeader.split(" ")[1]);
    if (decoded) userId = decoded.userId;
  }

  // Get cart items — from DB (authenticated) or request body (guest)
  let cartItems = [];

  if (userId) {
    const cart = await Cart.findOne({ user: userId }).populate({
      path: "items.product",
      select: "name slug price images status category",
      populate: { path: "category", select: "slug" },
    });
    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }
    cartItems = cart.items;
  } else {
    // Guest — validate items from the request
    if (!Array.isArray(guestItems) || guestItems.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    for (const item of guestItems) {
      const product = await Product.findById(item.productId || item.id).populate("category", "slug");
      if (!product || product.status !== "active") {
        return NextResponse.json(
          { error: `Product not found or unavailable: ${item.productId || item.id}` },
          { status: 400 }
        );
      }
      cartItems.push({
        product,
        quantity: item.quantity || 1,
        size: item.size || "Standard",
        isCustomFit: item.isCustomFit || false,
        productSnapshot: {
          name: product.name,
          slug: product.slug,
          price: product.price,
          image: product.images?.[0]?.url,
        },
        basePrice: product.price,
      });
    }
  }

  // Build Stripe line items — prices from DB, never from client
  const line_items = cartItems.map((item) => {
    const product = item.product;
    // Use server-side price: basePrice for auth carts, product.price for guest
    // NOTE: Product.price and Cart.basePrice are stored in CENTS in MongoDB
    const unitPriceCents = item.basePrice || product?.price || 0;
    const name =
      item.productSnapshot?.name || product?.name || "Racing Gear";
    const image =
      item.productSnapshot?.image || product?.images?.[0]?.url || "";

    return {
      price_data: {
        currency: "usd",
        product_data: {
          name,
          description: `Size: ${item.size || "Standard"}${item.isCustomFit ? " (Custom Fit)" : ""}`,
          ...(image && {
            images: [
              image.startsWith("http")
                ? image
                : `https://www.hsracegear.com${image}`,
            ],
          }),
        },
        // Stripe expects amounts in cents — DB prices are already in cents
        unit_amount: Math.round(unitPriceCents),
      },
      quantity: item.quantity || 1,
    };
  });

  // TODO: REVERT — shipping temporarily disabled for prod payment test
  // ── Calculate shipping (server-side, tamper-proof) ──
  // const shippingItems = cartItems.map((item) => ({
  //   categorySlug: item.product?.category?.slug || "",
  //   quantity: item.quantity || 1,
  // }));
  // const { totalCents: shippingCents } = calculateShipping(shippingItems);
  //
  // if (shippingCents > 0) {
  //   line_items.push({
  //     price_data: {
  //       currency: "usd",
  //       product_data: {
  //         name: "Shipping",
  //         description: "Standard shipping (7–10 business days)",
  //       },
  //       unit_amount: shippingCents,
  //     },
  //     quantity: 1,
  //   });
  // }

  // Serialize minimal cart reference for the webhook
  const cartItemIds = cartItems.map((item) => ({
    productId: (item.product?._id || item.product)?.toString(),
    size: item.size,
    quantity: item.quantity,
    isCustomFit: item.isCustomFit || false,
  }));

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items,
    customer_email: customer.email,
    shipping_address_collection: {
      allowed_countries: [
        "US", "AU", "NZ", "CA", "GB", "DE", "FR", "IT", "ES", "NL",
        "BE", "AT", "CH", "SE", "NO", "DK", "FI", "IE", "PT",
      ],
    },
    metadata: {
      orderType: "shop",
      userId: userId || "guest",
      customerName: customer.name || "",
      customerPhone: customer.phone || "",
      cartItems: JSON.stringify(cartItemIds).slice(0, 500),
    },
    success_url: `${getSiteUrl()}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${getSiteUrl()}/checkout`,
  });

  return NextResponse.json({ url: session.url });
}

/* ────────────────────────────────────────────────────────────────
 * CUSTOM ORDER CHECKOUT
 *
 * Single line item for the package. Order details (mockup, colours,
 * measurements) are stored in metadata so the webhook can create
 * the full order record.
 * ──────────────────────────────────────────────────────────────── */
async function handleCustomCheckout(request, body) {
  const {
    customer,
    packageData,    // { id, name, price, includes }
    productType,    // "custom-race-suit", "karting-suit", etc.
    suitMockup,
    glovesMockup,
    shoesMockup,
    shoeSize,
    colors,
    customLogoUrl,
    customLogoNotes,
    quantity = 1,
  } = body;

  if (!customer?.email || !customer?.name || !customer?.phone) {
    return NextResponse.json(
      { error: "Customer name, email, and phone are required" },
      { status: 400 }
    );
  }

  if (!packageData?.id) {
    return NextResponse.json(
      { error: "Package selection is required" },
      { status: 400 }
    );
  }

  // ── Server-side price validation ──
  const serverPrice = CUSTOM_PACKAGE_PRICES[packageData.id];
  if (serverPrice === undefined) {
    return NextResponse.json(
      { error: `Unknown package: ${packageData.id}` },
      { status: 400 }
    );
  }

  const qty = Math.max(1, parseInt(quantity, 10) || 1);
  const productLabels = {
    "custom-race-suit": "Custom Race Suit",
    "karting-suit": "Custom Karting Suit",
    "powerboat-suit": "Custom Power Boat Suit",
    "custom-shoes": "Custom Shoes",
    "custom-gloves": "Custom Gloves",
  };
  const productLabel = productLabels[productType] || "Custom Racing Gear";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: packageData.name || productLabel,
            description: `${productLabel} — Custom SFI Certified`,
          },
          unit_amount: Math.round(serverPrice * 100),
        },
        quantity: qty,
      },
    ],
    customer_email: customer.email,
    shipping_address_collection: {
      allowed_countries: [
        "US", "AU", "NZ", "CA", "GB", "DE", "FR", "IT", "ES", "NL",
        "BE", "AT", "CH", "SE", "NO", "DK", "FI", "IE", "PT",
      ],
    },
    metadata: {
      orderType: "custom",
      productType: productType || "",
      productLabel,
      packageId: packageData.id,
      packageName: packageData.name || "",
      packagePrice: String(serverPrice),
      quantity: String(qty),
      customerName: customer.name,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      // Design selections — truncated to fit Stripe's 500-char limit per value
      suitMockup: JSON.stringify(suitMockup || null).slice(0, 500),
      glovesMockup: JSON.stringify(glovesMockup || null).slice(0, 500),
      shoesMockup: JSON.stringify(shoesMockup || null).slice(0, 500),
      shoeSize: JSON.stringify(shoeSize || null).slice(0, 500),
      colors: JSON.stringify(colors || {}).slice(0, 500),
      customLogoUrl: customLogoUrl || "",
      customLogoNotes: customLogoNotes || "",
    },
    success_url: `${getSiteUrl()}/order-confirmation?session_id={CHECKOUT_SESSION_ID}&type=custom`,
    cancel_url: `${getSiteUrl()}${getCustomCancelUrl(productType)}`,
  });

  return NextResponse.json({ url: session.url });
}

/* ────────────────────────────────────────────────────────────────
 * Helpers
 * ──────────────────────────────────────────────────────────────── */

function getCustomCancelUrl(productType) {
  const cancelPaths = {
    "custom-race-suit": "/custom-race-suit/order",
    "karting-suit": "/custom-karting-suit/order",
    "powerboat-suit": "/custom-powerboat-suit/order",
    "custom-gloves": "/custom-gloves/order",
    "custom-shoes": "/custom-shoes/order",
  };
  return cancelPaths[productType] || "/custom-race-suit/order";
}

function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}
