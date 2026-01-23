# 🎯 Admin Panel User Guide - HS Race Gear

**Complete Guide to Managing Your Racing Gear Store**

---

## 📋 Table of Contents

1. [Getting Started](#getting-started)
2. [Admin Login](#admin-login)
3. [Dashboard Overview](#dashboard-overview)
4. [Product Management](#product-management)
5. [Category Management](#category-management)
6. [Order Management](#order-management)
7. [Shop Page Integration](#shop-page-integration)
8. [Troubleshooting](#troubleshooting)

---

## 🚀 Getting Started

### Prerequisites

1. **Admin Account Created**
   ```bash
   node scripts/create-admin.mjs
   ```

2. **Database Seeded** (Optional - for demo data)
   ```bash
   node scripts/seed.mjs
   ```

3. **Development Server Running**
   ```bash
   npm run dev
   ```

---

## 🔐 Admin Login

### Access Admin Panel

1. Navigate to: `http://localhost:3000/admin`
2. You'll be redirected to home if not logged in
3. Click "Login" in the header
4. Use admin credentials:
   - **Email:** `admin@hsracegear.com`
   - **Password:** `Admin@123`

### Admin Protection

- Only users with `role: 'admin'` can access `/admin` routes
- Admin pages check authentication on every load
- Non-admin users are automatically redirected

---

## 📊 Dashboard Overview

### Main Dashboard (`/admin`)

Shows real-time statistics:

- **Total Products** - All products in database
- **Active Products** - Products with `status: 'active'`
- **Total Categories** - All category count
- **Low Stock Products** - Products with < 5 units

### Quick Actions

- **Add New Product** - Create a new product
- **View Products** - Manage all products
- **View Categories** - Manage categories
- **View Orders** - View all orders

---

## 🛍️ Product Management

### Accessing Products

Navigate to `/admin/products` to see all products with:

- **Filters:**
  - Search by name/description
  - Filter by category
  - Filter by status (active, inactive, draft, archived)
  - Filter by certification (SFI, FIA, etc.)
  - Clear all filters

- **Sorting:**
  - Products displayed in table format
  - Shows: Product name, category, price, stock, status, featured

- **Pagination:**
  - 10 products per page
  - Navigate through pages

### Product Table Columns

| Column | Description |
|--------|-------------|
| **Product** | Name + certification/material info |
| **Category** | Assigned category badge |
| **Price** | Current price + compare price |
| **Stock** | Total stock with color coding (red=0, yellow<5, green>5) |
| **Status** | Active/Inactive/Draft/Archived button |
| **Featured** | Star icon (★ featured, ☆ not featured) |
| **Actions** | Edit, View, Archive buttons |

### Adding a New Product

#### Step 1: Navigate to Add Product

- Click **"Add New Product"** button on products page
- Or go to `/admin/products/new`

#### Step 2: Fill Basic Information

**Required Fields:**
- **Product Name** - e.g., "GT1 Apex Racing Suit"
- **Description** - Full product description
- **Price** - In dollars (e.g., 299.99)
- **Category** - Select from dropdown

**Optional Fields:**
- **Compare at Price** - Original price for sale display
- **Brand** - Defaults to "HS Race Gear"

#### Step 3: Racing Specifications

- **Certification:** SFI 3.2A/1, SFI 3.2A/5, FIA 8856-2018, or None
- **Certification Level:** Single-Layer, Double-Layer, Triple-Layer
- **Material:** Nomex, FR Cotton, Nomex/Kevlar, Proban
- **Construction:** Single-layer, Double-layer, Triple-layer

#### Step 4: Inventory Management

Add sizes and stock:

1. Click **"+ Add Size"** to add new size row
2. For each size enter:
   - **Size:** XS, S, M, L, XL, 2XL, etc.
   - **SKU:** Unique identifier (e.g., GT1-M-001)
   - **Stock:** Number of units available
   - **Available:** Checkbox (uncheck to hide size)

**Stock Color Coding:**
- 🔴 Red badge = Out of stock (0 units)
- 🟡 Yellow badge = Low stock (< 5 units)
- 🟢 Green badge = In stock (>= 5 units)

#### Step 5: Product Images

Add product images:

1. Click **"+ Add Image"** to add image row
2. For each image enter:
   - **Image URL:** Path to image (e.g., `/images/products/suit1.jpg`)
   - **Alt Text:** Description for SEO
   - **Primary:** Check ONE image as primary (main display)

**Image Requirements:**
- Use high-quality images
- Recommended: 1000x1000px or larger
- Formats: JPG, PNG, WebP
- Store in `/public/images/products/`

#### Step 6: Custom Options (Add-ons)

Add purchasable add-ons:

1. Click **"+ Add Option"** 
2. For each option:
   - **Name:** e.g., "Arm Restraints"
   - **Slug:** URL-friendly (e.g., "arm-restraints")
   - **Price:** Additional cost in dollars
   - **Description:** What this option includes

**Common Add-ons:**
- Arm Restraints
- Foot Stirrups
- Custom Patches
- Logo Embroidery

#### Step 7: SEO Information

Optimize for search engines:

- **Meta Title:** Page title (60 characters max)
- **Meta Description:** Search result description (160 chars)
- **Meta Keywords:** Comma-separated keywords

#### Step 8: Categories

**Required:**
- **Category:** Main category (e.g., "Racing Suits")

**Optional:**
- **Subcategory:** Appears after selecting parent category

#### Step 9: Custom Fit Options

If product offers custom fitting:

1. Check **"Custom Fit Available"**
2. Enter **Custom Fit Price** - Additional charge
3. Enter **Lead Time** - e.g., "3-4 weeks"

#### Step 10: Status & Visibility

**Status Options:**
- **Draft** - Not visible on site (work in progress)
- **Active** - Live and visible to customers
- **Inactive** - Hidden but not deleted
- **Archived** - Soft deleted, can be restored

**Visibility Options:**
- **Featured Product** - Shows in featured sections
- **New Arrival** - Shows in new arrivals

#### Step 11: Save Product

1. Click **"Create Product"** button
2. Wait for confirmation
3. Redirected to products list

### Editing a Product

1. Find product in products table
2. Click **"Edit"** button
3. All fields pre-populated with existing data
4. Make changes
5. Click **"Update Product"**

### Viewing a Product

1. Click **"View"** button in products table
2. Opens product page in new tab
3. See exactly what customers see

### Quick Actions

**Toggle Status:**
- Click status button (Active/Inactive/etc.) in table
- Instantly changes product status
- No confirmation required

**Toggle Featured:**
- Click star icon (★/☆) in table
- Instantly toggles featured status
- Featured products appear in special sections

### Archiving a Product

1. Click **"Archive"** button
2. Confirm deletion
3. Product status set to "archived"
4. Still in database but hidden from shop

**To permanently delete:**
- Use API: `DELETE /api/products/{id}?permanent=true`
- Not available in UI (safety feature)

---

## 📁 Category Management

### Accessing Categories

Navigate to `/admin/categories`

### Category Structure

**Hierarchical System:**
- **Main Categories** (parent = null)
  - Racing Suits
  - Gloves
  - Helmets
  - Accessories

- **Subcategories** (have parent)
  - Racing Suits → Single-Layer Suits
  - Racing Suits → Multi-Layer Suits
  - Gloves → Driving Gloves
  - Gloves → Mechanics Gloves

### Managing Categories

**Create Category:**
1. Click "Add New Category"
2. Enter name, slug, description
3. Select parent (for subcategory)
4. Set display order
5. Save

**Edit Category:**
1. Click edit button
2. Update fields
3. Save changes

**Product Count:**
- Auto-updated when products assigned
- Shows in category list

---

## 📦 Order Management

### Accessing Orders

Navigate to `/admin/orders`

### Order Features

- View all customer orders
- Filter by status
- Search by order number or customer
- Update order status
- Add tracking information

### Order Statuses

- **Pending** - New order, awaiting processing
- **Processing** - Being prepared
- **Shipped** - On the way to customer
- **Delivered** - Customer received
- **Cancelled** - Order cancelled

---

## 🛒 Shop Page Integration

### How Products Appear in Shop

**Automatic Integration:**

When you create/edit a product in admin:

1. **Save Product** → Saved to MongoDB
2. **Shop Page** → Fetches from `/api/products`
3. **Products Displayed** → Real-time data

### Shop Page Features

**URL:** `/shop`

**Filtering Options:**
- **Search:** Text search in product names/descriptions
- **Category:** Filter by main category
- **Certification:** Filter by SFI/FIA certification
- **Material:** Filter by suit material
- **Price Range:** Min/Max price filters
- **In Stock Only:** Show only available products

**Sorting:**
- Newest First
- Price (Low to High / High to Low)
- Name (A-Z / Z-A)
- Most Popular

**Pagination:**
- 12 products per page
- Navigate pages at bottom

### Category Pages

Products automatically appear in:
- Main category pages
- Subcategory pages
- Search results
- Filtered views

### Product Count Updates

**Automatic Updates:**
- Category product counts update when:
  - Product created
  - Product category changed
  - Product archived/deleted

---

## 🔧 Troubleshooting

### Products Not Showing in Shop

**Check:**
1. Product status is **"active"**
2. Product has at least one image
3. Product has inventory with stock > 0 (if filtering by "In Stock")
4. Product is in a valid category
5. Clear browser cache

**Fix:**
```javascript
// Make product visible
1. Go to /admin/products
2. Find product
3. Click status button → Set to "Active"
4. Check inventory has stock
```

### Images Not Displaying

**Check:**
1. Image path is correct (starts with `/`)
2. Image file exists in `/public/images/`
3. Image URL doesn't have typos
4. At least one image marked as "Primary"

**Image Path Examples:**
- ✅ Correct: `/images/products/suit1.jpg`
- ❌ Wrong: `images/products/suit1.jpg` (missing `/`)
- ❌ Wrong: `https://example.com/image.jpg` (external)

### Category Filter Not Working

**Check:**
1. Product has category assigned
2. Category exists and not archived
3. Clear filters and try again

### Stock Not Updating

**Check:**
1. Inventory entries have valid SKU
2. Stock is number, not text
3. "Available" checkbox is checked
4. Save product after changes

### Custom Fit Not Appearing

**Check:**
1. "Custom Fit Available" is checked
2. Custom Fit Price is set
3. Lead Time is filled
4. Product is active

---

## 📊 Best Practices

### Product Management

1. **Use Clear Names**
   - ✅ "GT1 Apex Double-Layer Racing Suit - SFI 3.2A/5"
   - ❌ "Suit 1"

2. **Write Detailed Descriptions**
   - Include all specifications
   - Mention certifications
   - Describe materials and features
   - Add sizing information

3. **Set Proper Prices**
   - Research competitor pricing
   - Use Compare Price for sales
   - Price includes cents (299.99, not 299)

4. **Manage Stock Accurately**
   - Update stock after sales
   - Set low stock alerts
   - Use SKUs consistently

5. **Use High-Quality Images**
   - Multiple angles
   - Clear, well-lit photos
   - Show product details
   - Include size/color variants

6. **Categorize Correctly**
   - Use appropriate main category
   - Add subcategory if applicable
   - Helps customers find products

7. **Optimize SEO**
   - Write unique meta titles
   - Include keywords naturally
   - Fill meta descriptions
   - Use alt text on images

### Inventory Management

**Stock Levels:**
- Keep at least 5 units in stock
- Reorder when low stock warning appears
- Mark out-of-stock sizes as unavailable

**SKU Convention:**
```
Format: PRODUCT-SIZE-VERSION
Example: GT1-M-001
         ↓   ↓  ↓
      Product Size Version
```

### Order Processing

1. **Check orders daily** at `/admin/orders`
2. **Update status** as orders progress
3. **Add tracking** when shipped
4. **Respond to issues** promptly

---

## 🎯 Quick Reference

### Common URLs

| Page | URL |
|------|-----|
| Admin Dashboard | `/admin` |
| All Products | `/admin/products` |
| Add Product | `/admin/products/new` |
| Edit Product | `/admin/products/{id}` |
| Categories | `/admin/categories` |
| Orders | `/admin/orders` |
| Shop (Customer View) | `/shop` |

### API Endpoints

| Action | Method | Endpoint |
|--------|--------|----------|
| Get Products | GET | `/api/products` |
| Create Product | POST | `/api/products` |
| Update Product | PUT | `/api/products/{id}` |
| Delete Product | DELETE | `/api/products/{id}` |
| Get Categories | GET | `/api/categories` |

### Keyboard Shortcuts

- **Ctrl/Cmd + S** - Save form (in most browsers)
- **Ctrl/Cmd + F** - Search on page
- **Esc** - Cancel/Close modal

---

## 📞 Support

### Need Help?

- **Check this guide first**
- **Review error messages** - they often explain the issue
- **Test in incognito mode** - rules out cache issues
- **Check browser console** - for JavaScript errors (F12)

### Common Error Messages

| Error | Meaning | Solution |
|-------|---------|----------|
| "Product name is required" | Missing required field | Fill product name |
| "Category is required" | No category selected | Select a category |
| "Invalid price" | Price format wrong | Use numbers only (299.99) |
| "Duplicate SKU" | SKU already exists | Use unique SKU for each size |

---

**Admin Guide Version:** 1.0  
**Last Updated:** January 10, 2026  
**Compatible With:** HS Race Gear v1.0

---

## 🎉 You're Ready!

You now have a fully functional admin panel to manage your racing gear store. Add products, organize categories, and watch them appear automatically in your shop!

**Next Steps:**
1. Login to admin panel
2. Add your first product
3. Check it appears in `/shop`
4. Continue adding inventory

Good luck with your racing gear business! 🏁
