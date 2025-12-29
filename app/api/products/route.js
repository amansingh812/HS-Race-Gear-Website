import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import { logger } from '@/lib/utils';

export async function GET(req) {
  try {
    await connectDB();
    
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const category = url.searchParams.get('category');
    const featured = url.searchParams.get('featured');
    const active = url.searchParams.get('active') !== 'false';
    const search = url.searchParams.get('search');
    const sort = url.searchParams.get('sort') || '-createdAt';

    const query = {};
    
    // Build query filters
    if (category) query.category = category;
    if (featured !== null) query.isFeatured = featured === 'true';
    if (active !== undefined) query.isActive = active;
    if (search) {
      query.$text = { $search: search };
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Execute query
    const products = await Product.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Product.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    const pagination = {
      currentPage: page,
      totalPages,
      totalProducts: total,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    };

    logger.info(`Retrieved ${products.length} products`, { query, pagination });

    return Response.json({
      success: true,
      message: 'Products retrieved successfully',
      data: { products, pagination },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logger.error('Error retrieving products:', error);
    return Response.json({
      success: false,
      message: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    
    const body = await req.json();
    const { 
      name, 
      description, 
      shortDescription,
      price, 
      category, 
      images = [], 
      variants = [],
      specifications = {},
      tags = []
    } = body;

    // Basic validation
    if (!name || !description || !price || !category) {
      return Response.json({
        success: false,
        message: 'Name, description, price, and category are required'
      }, { status: 400 });
    }

    if (price < 0) {
      return Response.json({
        success: false,
        message: 'Price cannot be negative'
      }, { status: 400 });
    }

    // Create product
    const product = new Product({
      name,
      description,
      shortDescription,
      price,
      category,
      images,
      variants,
      specifications,
      tags,
      isActive: true
    });

    const savedProduct = await product.save();
    
    logger.info('Product created successfully', { productId: savedProduct._id, name });

    return Response.json({
      success: true,
      message: 'Product created successfully',
      data: savedProduct,
      timestamp: new Date().toISOString()
    }, { status: 201 });
  } catch (error) {
    if (error.code === 11000) {
      return Response.json({
        success: false,
        message: 'Product with this SKU already exists'
      }, { status: 400 });
    }
    logger.error('Error creating product:', error);
    return Response.json({
      success: false,
      message: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}