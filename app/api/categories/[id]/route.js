import connectDB from '@/lib/mongodb';
import Category from '@/models/Category';
import Product from '@/models/Product';
import { logger } from '@/lib/utils';
import mongoose from 'mongoose';

/**
 * GET /api/categories/[id]
 * 
 * Get single category by ID or slug
 */
export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const { id } = await params;
    
    if (!id) {
      return Response.json(
        { success: false, error: 'Category ID or slug is required' },
        { status: 400 }
      );
    }

    const isObjectId = mongoose.Types.ObjectId.isValid(id);
    
    let category;
    if (isObjectId) {
      category = await Category.findById(id)
        .populate('parent', 'name slug')
        .populate('children');
    } else {
      category = await Category.findOne({ slug: id })
        .populate('parent', 'name slug')
        .populate('children');
    }
    
    if (!category) {
      return Response.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }
    
    // Get breadcrumb
    const breadcrumb = await category.getBreadcrumb();
    
    // Get product count
    const productCount = await Product.countDocuments({ 
      category: category._id, 
      status: 'active' 
    });
    
    return Response.json({
      success: true,
      data: { 
        category,
        breadcrumb: breadcrumb.map(c => ({ _id: c._id, name: c.name, slug: c.slug })),
        productCount
      }
    });

  } catch (error) {
    logger.error('Error retrieving category:', error);
    return Response.json(
      { success: false, error: 'Failed to retrieve category' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/categories/[id]
 * 
 * Update category (Admin only)
 */
export async function PUT(request, { params }) {
  try {
    await connectDB();
    
    const { id } = await params;
    const updateData = await request.json();
    
    if (!id) {
      return Response.json(
        { success: false, error: 'Category ID is required' },
        { status: 400 }
      );
    }
    
    // If name is updated, update slug too
    if (updateData.name && !updateData.slug) {
      updateData.slug = updateData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
    
    // If parent is updated, update level
    if (updateData.parent !== undefined) {
      if (updateData.parent === null || updateData.parent === '') {
        updateData.parent = null;
        updateData.level = 0;
      } else {
        const parentCategory = await Category.findById(updateData.parent);
        if (parentCategory) {
          updateData.level = parentCategory.level + 1;
        }
      }
    }

    const category = await Category.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('parent', 'name slug');
    
    if (!category) {
      return Response.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }

    logger.info('Category updated', { categoryId: id, name: category.name });
    
    return Response.json({
      success: true,
      message: 'Category updated successfully',
      data: { category }
    });

  } catch (error) {
    logger.error('Error updating category:', error);
    
    if (error.code === 11000) {
      return Response.json(
        { success: false, error: 'A category with this slug already exists' },
        { status: 409 }
      );
    }
    
    return Response.json(
      { success: false, error: 'Failed to update category' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/categories/[id]
 * 
 * Delete category (Admin only)
 * Will also handle child categories based on ?cascade parameter
 */
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const cascade = searchParams.get('cascade') === 'true';
    
    if (!id) {
      return Response.json(
        { success: false, error: 'Category ID is required' },
        { status: 400 }
      );
    }

    // Check if category has products
    const productCount = await Product.countDocuments({ category: id });
    if (productCount > 0) {
      return Response.json(
        { 
          success: false, 
          error: `Cannot delete category with ${productCount} products. Move or delete products first.` 
        },
        { status: 400 }
      );
    }
    
    // Check for child categories
    const childCount = await Category.countDocuments({ parent: id });
    if (childCount > 0 && !cascade) {
      return Response.json(
        { 
          success: false, 
          error: `Category has ${childCount} subcategories. Use ?cascade=true to delete all.` 
        },
        { status: 400 }
      );
    }
    
    if (cascade) {
      // Delete all child categories
      await Category.deleteMany({ parent: id });
    }
    
    const category = await Category.findByIdAndDelete(id);
    
    if (!category) {
      return Response.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }

    logger.info('Category deleted', { categoryId: id, name: category.name });
    
    return Response.json({
      success: true,
      message: 'Category deleted successfully'
    });

  } catch (error) {
    logger.error('Error deleting category:', error);
    return Response.json(
      { success: false, error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}
