import mongoose from "mongoose";
import crypto from "crypto";

/**
 * PaymentLink — stores custom payment requests created by the HS Race Gear team.
 *
 * Flow:
 *   1. Team member visits /pay/create, enters amount + customer info
 *   2. This model stores the request with a unique paymentId
 *   3. Customer receives a link: hsracegear.com/pay/{paymentId}
 *   4. Customer clicks "Pay Now" → Stripe Checkout
 *   5. Webhook marks this record as "paid" and sends receipt
 *
 * The paymentId is a short, URL-safe token (not the MongoDB _id).
 * Amounts are stored in CENTS to match the rest of the codebase.
 */

const PaymentLinkSchema = new mongoose.Schema(
  {
    // Short URL-safe identifier: e.g. "pL3x9kQm"
    paymentId: {
      type: String,
      required: true,
      unique: true,
      default: () => crypto.randomBytes(6).toString("base64url"),
    },

    // Amount in CENTS (e.g. 54900 = $549.00)
    amount: {
      type: Number,
      required: true,
      min: 100, // minimum $1.00
    },

    // Customer details
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    customerEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    // Optional description shown on the payment page
    description: {
      type: String,
      default: "Custom Racing Gear",
      trim: true,
    },

    // Payment status
    status: {
      type: String,
      enum: ["pending", "paid", "expired"],
      default: "pending",
    },

    // Stripe session ID — set when the customer initiates checkout
    stripeSessionId: {
      type: String,
      default: null,
    },

    // When the payment was completed
    paidAt: {
      type: Date,
      default: null,
    },

    // Who on the team created this link (optional, for audit trail)
    createdBy: {
      type: String,
      default: "team",
    },
  },
  {
    timestamps: true, // createdAt + updatedAt
  }
);

// Index for quick lookups by paymentId (customer-facing URL)
PaymentLinkSchema.index({ paymentId: 1 });
// Index for webhook lookup by Stripe session
PaymentLinkSchema.index({ stripeSessionId: 1 });

export default mongoose.models.PaymentLink ||
  mongoose.model("PaymentLink", PaymentLinkSchema);
