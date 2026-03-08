import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';
import { logger } from '@/lib/utils';

/**
 * GET /api/products
 * 
 * Get all products with filtering, sorting, and pagination
 * 
 * Query Parameters:
 * - page: Page number (default: 1)
 * - limit: Items per page (default: 12)
 * - category: Filter by category ID
 * - subcategory: Filter by subcategory ID
 * - certification: Filter by certification (SFI 3.2A/1, etc.)
 * - material: Filter by material
 * - minPrice: Minimum price filter
 * - maxPrice: Maximum price filter
 * - search: Search in name and description
 * - sort: Sort field (price, name, createdAt, salesCount)
 * - order: Sort order (asc, desc)
 * - featured: Filter featured products only
 * - status: Filter by status (active, inactive, draft)
 */
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    
    // Pagination
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 12;
    const skip = (page - 1) * limit;
    
    // Build filter query
    const filter = {};
    
    // Status filter (default to active for public)
    const status = searchParams.get('status');
    if (status) {
      filter.status = status;
    } else {
      filter.status = 'active';
      filter.isVisible = true;
    }
    
    // Category filter
    const category = searchParams.get('category');
    if (category) {
      filter.category = category;
    }
    
    // Subcategory filter
    const subcategory = searchParams.get('subcategory');
    if (subcategory) {
      filter.subcategory = subcategory;
    }
    
    // Certification filter
    const certification = searchParams.get('certification');
    if (certification) {
      filter.certification = certification;
    }
    
    // Certification Level filter
    const certificationLevel = searchParams.get('certificationLevel');
    if (certificationLevel) {
      filter.certificationLevel = certificationLevel;
    }
    
    // Material filter
    const material = searchParams.get('material');
    if (material) {
      filter.material = material;
    }
    
    // Customizable filter
    const customizable = searchParams.get('customizable');
    if (customizable === 'true') {
      filter.customizable = true;
    }
    
    // Price range filter
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }
    
    // Featured filter
    const featured = searchParams.get('featured');
    if (featured === 'true') {
      filter.isFeatured = true;
    }
    
    // New arrivals filter
    const newArrivals = searchParams.get('newArrivals');
    if (newArrivals === 'true') {
      filter.isNewArrival = true;
    }
    
    // In stock filter
    const inStock = searchParams.get('inStock');
    if (inStock === 'true') {
      filter.$or = [
        { 'inventory.stock': { $gt: 0 } },
        { customFitAvailable: true }
      ];
    }
    
    // Search filter
    const search = searchParams.get('search');
    if (search) {
      filter.$text = { $search: search };
    }
    
    // Build sort query
    const sortField = searchParams.get('sort') || 'createdAt';
    const sortOrder = searchParams.get('order') === 'asc' ? 1 : -1;
    const sort = { [sortField]: sortOrder };
    
    // Only fetch fields the shop page actually needs — excludes heavy fields
    // like description, specifications, metaKeywords, costPrice, etc.
    const shopProjection = {
      name: 1, slug: 1, shortDescription: 1,
      price: 1, compareAtPrice: 1,
      certification: 1, material: 1, construction: 1,
      customFitAvailable: 1,
      isFeatured: 1, isNewArrival: 1,
      status: 1, isVisible: 1,
      'images.url': 1, 'images.altText': 1, 'images.isPrimary': 1,
      'inventory.size': 1, 'inventory.stock': 1, 'inventory.sku': 1, 'inventory.isAvailable': 1,
      category: 1, subcategory: 1,
      viewCount: 1,
    };

    // Execute query — countDocuments reuses the same index scan, both run in parallel
    const [products, totalCount] = await Promise.all([
      Product.find(filter, shopProjection)
        .populate('category', 'name slug')
        .populate('subcategory', 'name slug')
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      Product.countDocuments(filter)
    ]);
    
    // Serialize products to remove ObjectIds from nested fields
    const serializedProducts = products.map(p => ({
      _id: p._id.toString(),
      name: p.name,
      slug: p.slug,
      description: p.description,
      shortDescription: p.shortDescription,
      price: p.price,
      compareAtPrice: p.compareAtPrice,
      certification: p.certification,
      material: p.material,
      construction: p.construction,
      customFitAvailable: p.customFitAvailable,
      customFitPrice: p.customFitPrice,
      customFitLeadTime: p.customFitLeadTime,
      isFeatured: p.isFeatured,
      isNewArrival: p.isNewArrival,
      status: p.status,
      isVisible: p.isVisible,
      images: p.images?.map(img => ({
        url: img.url,
        altText: img.altText,
        isPrimary: img.isPrimary
      })) || [],
      inventory: p.inventory?.map(inv => ({
        size: inv.size,
        stock: inv.stock,
        sku: inv.sku,
        isAvailable: inv.isAvailable
      })) || [],
      customOptions: p.customOptions?.map(opt => ({
        name: opt.name,
        slug: opt.slug,
        description: opt.description,
        price: opt.price,
        isDefault: opt.isDefault
      })) || [],
      category: p.category ? (typeof p.category === 'string' ? p.category : p.category._id?.toString()) : null,
      subcategory: p.subcategory ? (typeof p.subcategory === 'string' ? p.subcategory : p.subcategory._id?.toString()) : null,
      discountPercentage: p.discountPercentage,
      viewCount: p.viewCount
    }));
    
    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;
    
    return Response.json(
      {
        success: true,
        data: {
          products: serializedProducts,
          pagination: {
            currentPage: page,
            totalPages,
            totalCount,
            limit,
            hasNextPage,
            hasPrevPage
          }
        }
      },
      {
        headers: {
          // CDN + browser cache: serve instantly for 60s, revalidate in background for 300s
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        }
      }
    );

  } catch (error) {
    logger.error('Error fetching products:', error);
    return Response.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/products
 * 
 * Create a new product (Admin only)
 */
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    
    // Validate required fields
    const { name, description, price, category } = body;
    
    if (!name || !description || price === undefined || !category) {
      return Response.json(
        { success: false, error: 'Name, description, price, and category are required' },
        { status: 400 }
      );
    }
    
    // Validate price
    if (typeof price !== 'number' || price < 0) {
      return Response.json(
        { success: false, error: 'Price must be a positive number' },
        { status: 400 }
      );
    }
    
    // Generate slug if not provided
    if (!body.slug) {
      body.slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
    
    // Check for duplicate slug
    const existingProduct = await Product.findOne({ slug: body.slug });
    if (existingProduct) {
      // Append timestamp to make slug unique
      body.slug = `${body.slug}-${Date.now()}`;
    }
    
    // Create product
    const product = new Product(body);
    await product.save();
    
    // Populate category info
    await product.populate('category', 'name slug');
    if (product.subcategory) {
      await product.populate('subcategory', 'name slug');
    }
    
    logger.info('Product created', { productId: product._id, name: product.name });
    
    return Response.json({
      success: true,
      message: 'Product created successfully',
      data: { product }
    }, { status: 201 });

  } catch (error) {
    logger.error('Error creating product:', error);
    console.error('Detailed error:', {
      name: error.name,
      message: error.message,
      code: error.code,
      errors: error.errors
    });
    
    if (error.code === 11000) {
      return Response.json(
        { success: false, error: 'A product with this slug already exists' },
        { status: 409 }
      );
    }
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return Response.json(
        { success: false, error: messages.join(', ') },
        { status: 400 }
      );
    }
    
    return Response.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
