import connectDB from '@/lib/mongodb';
import Category from '@/models/Category';
import { logger } from '@/lib/utils';

/**
 * GET /api/categories
 * 
 * Get all categories with optional tree structure
 * 
 * Query Parameters:
 * - tree: Return hierarchical tree structure (default: false)
 * - parent: Filter by parent category ID (null for main categories)
 * - active: Filter by active status (default: true)
 * - featured: Filter featured categories only
 */
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    
    const returnTree = searchParams.get('tree') === 'true';
    const parentId = searchParams.get('parent');
    const activeOnly = searchParams.get('active') !== 'false';
    const featured = searchParams.get('featured');
    
    // If tree format requested
    if (returnTree) {
      const tree = await Category.getCategoryTree();
      return Response.json({
        success: true,
        data: { categories: tree }
      });
    }
    
    // Build filter
    const filter = {};
    
    if (activeOnly) {
      filter.isActive = true;
      filter.isVisible = true;
    }
    
    if (parentId === 'null' || parentId === '') {
      filter.parent = null;
    } else if (parentId) {
      filter.parent = parentId;
    }
    
    if (featured === 'true') {
      filter.isFeatured = true;
    }
    
    const categories = await Category.find(filter)
      .populate('parent', 'name slug')
      .sort({ order: 1, name: 1 })
      .lean();
    
    return Response.json({
      success: true,
      data: { categories }
    });

  } catch (error) {
    logger.error('Error fetching categories:', error);
    return Response.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/categories
 * 
 * Create a new category (Admin only)
 */
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    
    const { name } = body;
    
    if (!name) {
      return Response.json(
        { success: false, error: 'Category name is required' },
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
    const existingCategory = await Category.findOne({ slug: body.slug });
    if (existingCategory) {
      return Response.json(
        { success: false, error: 'A category with this slug already exists' },
        { status: 409 }
      );
    }
    
    // If parent is provided, set level
    if (body.parent) {
      const parentCategory = await Category.findById(body.parent);
      if (parentCategory) {
        body.level = parentCategory.level + 1;
      }
    }
    
    const category = new Category(body);
    await category.save();
    
    if (category.parent) {
      await category.populate('parent', 'name slug');
    }
    
    logger.info('Category created', { categoryId: category._id, name: category.name });
    
    return Response.json({
      success: true,
      message: 'Category created successfully',
      data: { category }
    }, { status: 201 });

  } catch (error) {
    logger.error('Error creating category:', error);
    
    if (error.code === 11000) {
      return Response.json(
        { success: false, error: 'A category with this slug already exists' },
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
      { success: false, error: 'Failed to create category' },
      { status: 500 }
    );
  }
}
