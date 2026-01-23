# 🚀 Quick Start Guide - Admin Panel Setup

Follow these steps to get your admin panel up and running in 5 minutes!

---

## ✅ Step 1: Verify Environment

Make sure you have your `.env.local` file with MongoDB connection:

```bash
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```

---

## ✅ Step 2: Create Admin User

Run this command to create your admin account:

```bash
node scripts/create-admin.mjs
```

**Output:**
```
✓ Connected to MongoDB
🎉 Admin user created successfully!

📋 Admin Credentials:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Email:    admin@hsracegear.com
Password: Admin@123
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ You can now login to the admin panel at /admin
```

---

## ✅ Step 3: Seed Database (Optional)

Add sample products to test the system:

```bash
node scripts/seed.mjs
```

This creates sample racing products with categories and inventory.

---

## ✅ Step 4: Start Development Server

```bash
npm run dev
```

Server will start at: `http://localhost:3000`

---

## ✅ Step 5: Login to Admin Panel

1. Open browser: `http://localhost:3000`
2. Click **"Login"** in header
3. Enter credentials:
   - **Email:** `admin@hsracegear.com`
   - **Password:** `Admin@123`
4. After login, navigate to: `http://localhost:3000/admin`

---

## 🎯 What You Can Do Now

### Admin Panel Features

**Dashboard** (`/admin`)
- View total products, active products, categories
- See low stock alerts
- Quick access to all management pages

**Products** (`/admin/products`)
- ✅ View all products in table format
- ✅ Filter by category, status, certification
- ✅ Search products
- ✅ Quick toggle status/featured
- ✅ Click "Add New Product" to create

**Add Product** (`/admin/products/new`)
- ✅ Complete form with all product details
- ✅ Add multiple sizes with inventory
- ✅ Upload multiple images
- ✅ Set certifications and materials
- ✅ Add custom fit options
- ✅ Add purchasable add-ons
- ✅ SEO optimization fields

**Edit Product** (`/admin/products/{id}`)
- ✅ All fields pre-filled
- ✅ Update any information
- ✅ Save changes instantly

**Shop Page** (`/shop`)
- ✅ All products from database displayed
- ✅ Filter by category, certification, material
- ✅ Search products
- ✅ Price range filtering
- ✅ Sort by price, name, newest
- ✅ Pagination
- ✅ Real-time updates when products added

---

## 📝 Creating Your First Product

1. **Navigate:** `/admin/products` → Click "Add New Product"

2. **Fill Required Fields:**
   - Product Name: "GT1 Apex Racing Suit"
   - Description: "Professional-grade racing suit..."
   - Price: 299.99
   - Category: Select "Racing Suits"

3. **Add Racing Specs:**
   - Certification: SFI 3.2A/5
   - Material: Nomex
   - Construction: Double-layer

4. **Add Inventory:**
   - Size: M, SKU: GT1-M-001, Stock: 10
   - Size: L, SKU: GT1-L-001, Stock: 15
   - Size: XL, SKU: GT1-XL-001, Stock: 8

5. **Add Image:**
   - URL: `/images/products/gt1-suit.jpg`
   - Alt: "GT1 Apex Racing Suit Front View"
   - Check: ✓ Primary

6. **Set Status:**
   - Status: Active
   - ✓ Featured Product

7. **Click:** "Create Product"

8. **Verify:** Go to `/shop` and see your product!

---

## 🔍 Testing the Integration

### Test 1: Product Appears in Shop

1. Create a product with status "Active"
2. Navigate to `/shop`
3. ✅ Product should appear in grid

### Test 2: Category Filter Works

1. Create products in different categories
2. Go to `/shop`
3. Use category filter in sidebar
4. ✅ Only products from that category show

### Test 3: Search Works

1. Go to `/shop`
2. Type product name in search
3. ✅ Products filter in real-time

### Test 4: Stock Display

1. Create product with 0 stock
2. Create product with 3 stock (low)
3. Create product with 20 stock
4. Go to `/admin/products`
5. ✅ See color-coded stock badges:
   - Red = Out of stock
   - Yellow = Low stock
   - Green = In stock

### Test 5: Edit Product

1. In `/admin/products`, click "Edit" on any product
2. Change price from 299 to 349
3. Click "Update Product"
4. Go to `/shop`
5. ✅ Price updated

---

## 🎨 Admin Panel Pages

### All Available Routes

```
/admin                          - Dashboard with stats
/admin/products                 - Products list with filters
/admin/products/new             - Add new product form
/admin/products/[id]            - Edit product form
/admin/categories               - Categories management
/admin/orders                   - Orders management
```

### Customer-Facing Pages

```
/shop                           - Main shop with filters
/product-detail/[slug]          - Individual product page (coming soon)
```

---

## ⚙️ Configuration Options

### Product Status Options

- **draft** - Not visible, work in progress
- **active** - Live on site
- **inactive** - Hidden but not deleted
- **archived** - Soft deleted

### Certification Options

- SFI 3.2A/1 - Single layer protection
- SFI 3.2A/5 - Multi-layer protection  
- FIA 8856-2018 - International standard
- None - No certification

### Material Options

- Nomex - Fire-resistant aramid fiber
- FR Cotton - Flame-resistant cotton
- Nomex/Kevlar - Blend for extra protection
- Proban - Chemical flame retardant

---

## 🐛 Common Issues

### Issue: Can't Login to Admin

**Solution:**
```bash
# Re-create admin user
node scripts/create-admin.mjs
```

### Issue: Products Not Showing in Shop

**Check:**
1. Product status is "active"
2. Product has images
3. Product is in a category
4. Refresh browser (Ctrl+F5)

### Issue: Images Not Displaying

**Solution:**
1. Images must be in `/public/images/` folder
2. URL must start with `/` (e.g., `/images/products/suit.jpg`)
3. File name matches exactly (case-sensitive)

### Issue: Database Connection Error

**Solution:**
```bash
# Check .env.local file exists
# Verify MONGODB_URI is correct
# Test connection:
node scripts/validate-phase1.js
```

---

## 📚 Next Steps

Now that your admin panel is working:

1. ✅ **Add Real Products** - Replace sample data with your actual inventory
2. ✅ **Upload Images** - Add high-quality product photos
3. ✅ **Create Categories** - Organize your product catalog
4. ✅ **Test Order Flow** - Place test orders
5. ✅ **Customize Design** - Match your brand colors/style

---

## 📖 Documentation

- **[ADMIN_USER_GUIDE.md](ADMIN_USER_GUIDE.md)** - Complete admin panel guide
- **[PROJECT_STATUS_REPORT.md](PROJECT_STATUS_REPORT.md)** - Full project status
- **[PHASE3_COMPLETE.md](PHASE3_COMPLETE.md)** - Product system details
- **[PHASE4_COMPLETE.md](PHASE4_COMPLETE.md)** - Cart & orders details

---

## ✨ You're All Set!

Your admin panel is fully functional with:

✅ Complete product management (CRUD)  
✅ Real-time shop integration  
✅ Category filtering  
✅ Inventory tracking  
✅ Image management  
✅ SEO optimization  
✅ Custom fit options  
✅ Add-ons system  

**Go build your racing gear empire! 🏁**
