"use client";
import React from "react";

/**
 * Shared shipping-address fieldset used by all five custom order pages
 * (race suit, karting, powerboat, gloves, shoes).
 *
 * Added 2026-07-26. Previously no order page collected a delivery address,
 * so every order needed a manual email round-trip before it could ship.
 *
 * Kept as one component so the five order pages don't drift apart — they
 * already each carry a duplicated CustomerInfoForm, and duplicating the
 * address markup five more times would guarantee inconsistency.
 *
 * Field names match the `customer` object sent to /api/custom-order:
 *   addressLine1, addressLine2, city, state, postalCode, country, notes
 */

// Common shipping destinations first, then alphabetical.
const COUNTRIES = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "New Zealand",
  "Ireland",
  "Germany",
  "France",
  "Italy",
  "Spain",
  "Netherlands",
  "Sweden",
  "Norway",
  "Denmark",
  "Finland",
  "Belgium",
  "Austria",
  "Switzerland",
  "Poland",
  "Portugal",
  "Czech Republic",
  "Mexico",
  "Brazil",
  "Argentina",
  "Chile",
  "Colombia",
  "South Africa",
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "Kuwait",
  "Bahrain",
  "India",
  "Pakistan",
  "Japan",
  "South Korea",
  "Singapore",
  "Malaysia",
  "Indonesia",
  "Philippines",
  "Thailand",
  "Vietnam",
  "China",
  "Hong Kong",
  "Taiwan",
];

const US_STATES = [
  ["AL", "Alabama"], ["AK", "Alaska"], ["AZ", "Arizona"], ["AR", "Arkansas"],
  ["CA", "California"], ["CO", "Colorado"], ["CT", "Connecticut"], ["DE", "Delaware"],
  ["DC", "District of Columbia"], ["FL", "Florida"], ["GA", "Georgia"], ["HI", "Hawaii"],
  ["ID", "Idaho"], ["IL", "Illinois"], ["IN", "Indiana"], ["IA", "Iowa"],
  ["KS", "Kansas"], ["KY", "Kentucky"], ["LA", "Louisiana"], ["ME", "Maine"],
  ["MD", "Maryland"], ["MA", "Massachusetts"], ["MI", "Michigan"], ["MN", "Minnesota"],
  ["MS", "Mississippi"], ["MO", "Missouri"], ["MT", "Montana"], ["NE", "Nebraska"],
  ["NV", "Nevada"], ["NH", "New Hampshire"], ["NJ", "New Jersey"], ["NM", "New Mexico"],
  ["NY", "New York"], ["NC", "North Carolina"], ["ND", "North Dakota"], ["OH", "Ohio"],
  ["OK", "Oklahoma"], ["OR", "Oregon"], ["PA", "Pennsylvania"], ["RI", "Rhode Island"],
  ["SC", "South Carolina"], ["SD", "South Dakota"], ["TN", "Tennessee"], ["TX", "Texas"],
  ["UT", "Utah"], ["VT", "Vermont"], ["VA", "Virginia"], ["WA", "Washington"],
  ["WV", "West Virginia"], ["WI", "Wisconsin"], ["WY", "Wyoming"],
];

export default function ShippingAddressFields({ info, onChange, errors = {} }) {
  const isUS = (info.country || "United States") === "United States";

  return (
    <>
      <div className="form-group">
        <label className="form-label">Street Address</label>
        <input
          type="text"
          className={`form-input ${errors.addressLine1 ? "error" : ""}`}
          placeholder="123 Main Street"
          autoComplete="address-line1"
          value={info.addressLine1 || ""}
          onChange={(e) => onChange("addressLine1", e.target.value)}
        />
        {errors.addressLine1 && <div className="form-error">{errors.addressLine1}</div>}
      </div>

      <div className="form-group">
        <label className="form-label">
          Apartment, Suite, Unit <span style={{ opacity: 0.55, fontWeight: 400 }}>(optional)</span>
        </label>
        <input
          type="text"
          className="form-input"
          placeholder="Apt 4B"
          autoComplete="address-line2"
          value={info.addressLine2 || ""}
          onChange={(e) => onChange("addressLine2", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Country</label>
        <select
          className={`form-input ${errors.country ? "error" : ""}`}
          autoComplete="country-name"
          value={info.country || "United States"}
          onChange={(e) => onChange("country", e.target.value)}
        >
          {COUNTRIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
          <option value="Other">Other — tell us in the notes below</option>
        </select>
        {errors.country && <div className="form-error">{errors.country}</div>}
      </div>

      <div className="form-group">
        <label className="form-label">City</label>
        <input
          type="text"
          className={`form-input ${errors.city ? "error" : ""}`}
          placeholder="Watertown"
          autoComplete="address-level2"
          value={info.city || ""}
          onChange={(e) => onChange("city", e.target.value)}
        />
        {errors.city && <div className="form-error">{errors.city}</div>}
      </div>

      <div className="form-group">
        <label className="form-label">{isUS ? "State" : "State / Province / Region"}</label>
        {isUS ? (
          <select
            className={`form-input ${errors.state ? "error" : ""}`}
            autoComplete="address-level1"
            value={info.state || ""}
            onChange={(e) => onChange("state", e.target.value)}
          >
            <option value="">Select a state…</option>
            {US_STATES.map(([abbr, name]) => (
              <option key={abbr} value={abbr}>{name}</option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            className={`form-input ${errors.state ? "error" : ""}`}
            placeholder="Region or province"
            autoComplete="address-level1"
            value={info.state || ""}
            onChange={(e) => onChange("state", e.target.value)}
          />
        )}
        {errors.state && <div className="form-error">{errors.state}</div>}
      </div>

      <div className="form-group">
        <label className="form-label">{isUS ? "ZIP Code" : "Postal Code"}</label>
        <input
          type="text"
          className={`form-input ${errors.postalCode ? "error" : ""}`}
          placeholder={isUS ? "02472" : "Postal code"}
          autoComplete="postal-code"
          value={info.postalCode || ""}
          onChange={(e) => onChange("postalCode", e.target.value)}
        />
        {errors.postalCode && <div className="form-error">{errors.postalCode}</div>}
      </div>

      <div className="form-group">
        <label className="form-label">
          Delivery Notes <span style={{ opacity: 0.55, fontWeight: 400 }}>(optional)</span>
        </label>
        <textarea
          className="form-input"
          rows={3}
          placeholder="Gate code, race-weekend deadline, ship-to-track instructions, sponsor logo notes…"
          value={info.notes || ""}
          onChange={(e) => onChange("notes", e.target.value)}
        />
      </div>
    </>
  );
}

/**
 * Validation shared by all five order pages so the rules can't drift.
 * Returns an errors object; empty means valid.
 */
export function validateShippingAddress(info) {
  const errors = {};
  if (!String(info.addressLine1 || "").trim()) errors.addressLine1 = "Please enter your street address";
  if (!String(info.city || "").trim()) errors.city = "Please enter your city";
  if (!String(info.state || "").trim()) errors.state = "Please enter your state or region";
  if (!String(info.postalCode || "").trim()) errors.postalCode = "Please enter your ZIP or postal code";
  if (!String(info.country || "").trim()) errors.country = "Please select your country";
  return errors;
}

/** Blank address fields to spread into each page's customerInfo initial state. */
export const EMPTY_ADDRESS = {
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "United States",
  notes: "",
};
