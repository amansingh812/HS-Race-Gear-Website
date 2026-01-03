import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import { logger } from '@/lib/utils';
import mongoose from 'mongoose';

/**
 * GET /api/products/[id]
 * 
 * Get single product by ID or slug
 * Also increments view count
 */
export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const { id } = await params;
    
    if (!id) {
      return Response.json(
        { success: false, error: 'Product ID or slug is required' },
        { status: 400 }
      );
    }

    // Check if id is a valid MongoDB ObjectId or a slug
    const isObjectId = mongoose.Types.ObjectId.isValid(id);
    
    let product;
    if (isObjectId) {
      product = await Product.findById(id)
        .populate('category', 'name slug')
        .populate('subcategory', 'name slug');
    } else {
      // Search by slug
      product = await Product.findOne({ slug: id })
        .populate('category', 'name slug')
        .populate('subcategory', 'name slug');
    }
    
    if (!product) {
      return Response.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Increment view count (don't await to not slow response)
    Product.updateOne(
      { _id: product._id },
      { $inc: { viewCount: 1 } }
    ).exec();
    
    // Serialize product
    const serializedProduct = {
      _id: product._id.toString(),
      name: product.name,
      slug: product.slug,
      description: product.description,
      shortDescription: product.shortDescription,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      certification: product.certification,
      material: product.material,
      construction: product.construction,
      customFitAvailable: product.customFitAvailable,
      customFitPrice: product.customFitPrice,
      customFitLeadTime: product.customFitLeadTime,
      isFeatured: product.isFeatured,
      isNewArrival: product.isNewArrival,
      status: product.status,
      isVisible: product.isVisible,
      images: product.images?.map(img => ({
        url: img.url,
        altText: img.altText,
        isPrimary: img.isPrimary
      })) || [],
      inventory: product.inventory?.map(inv => ({
        size: inv.size,
        stock: inv.stock,
        sku: inv.sku,
        isAvailable: inv.isAvailable
      })) || [],
      customOptions: product.customOptions?.map(opt => ({
        name: opt.name,
        slug: opt.slug,
        description: opt.description,
        price: opt.price,
        isDefault: opt.isDefault
      })) || [],
      category: product.category ? {
        _id: product.category._id?.toString(),
        name: product.category.name,
        slug: product.category.slug
      } : null,
      subcategory: product.subcategory ? {
        _id: product.subcategory._id?.toString(),
        name: product.subcategory.name,
        slug: product.subcategory.slug
      } : null,
      discountPercentage: product.discountPercentage,
      viewCount: product.viewCount
    };
    
    logger.info('Product retrieved', { productId: product._id, slug: product.slug });
    
    return Response.json({
      success: true,
      data: { product: serializedProduct }
    });

  } catch (error) {
    logger.error('Error retrieving product:', error);
    return Response.json(
      { success: false, error: 'Failed to retrieve product' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/products/[id]
 * 
 * Update product (Admin only)
 */
export async function PUT(request, { params }) {
  try {
    await connectDB();
    
    const { id } = await params;
    
    if (!id) {
      return Response.json(
        { success: false, error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const updateData = await request.json();
    
    // Validate price if provided
    if (updateData.price !== undefined && updateData.price < 0) {
      return Response.json(
        { success: false, error: 'Price cannot be negative' },
        { status: 400 }
      );
    }
    
    // If name is updated, update slug too (unless slug is explicitly provided)
    if (updateData.name && !updateData.slug) {
      updateData.slug = updateData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    const product = await Product.findByIdAndUpdate(
      id,
      { 
        ...updateData,
        updatedAt: new Date()
      },
      { 
        new: true,
        runValidators: true
      }
    ).populate('category', 'name slug')
     .populate('subcategory', 'name slug');
    
    if (!product) {
      return Response.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    logger.info('Product updated', { productId: id, name: product.name });
    
    return Response.json({
      success: true,
      message: 'Product updated successfully',
      data: { product }
    });

  } catch (error) {
    logger.error('Error updating product:', error);
    
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
      { success: false, error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/products/[id]
 * 
 * Partial update product (e.g., status toggle, inventory update)
 */
export async function PATCH(request, { params }) {
  try {
    await connectDB();
    
    const { id } = await params;
    const body = await request.json();
    
    if (!id) {
      return Response.json(
        { success: false, error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // Handle specific operations
    const { operation, ...updateData } = body;
    
    let update = {};
    
    switch (operation) {
      case 'updateInventory':
        // Update specific size inventory
        const { size, stock } = updateData;
        if (!size || stock === undefined) {
          return Response.json(
            { success: false, error: 'Size and stock are required' },
            { status: 400 }
          );
        }
        update = {
          $set: { 'inventory.$[elem].stock': stock }
        };
        const arrayFilters = [{ 'elem.size': size }];
        
        const inventoryResult = await Product.findByIdAndUpdate(
          id,
          update,
          { new: true, arrayFilters }
        );
        
        if (!inventoryResult) {
          return Response.json(
            { success: false, error: 'Product not found' },
            { status: 404 }
          );
        }
        
        return Response.json({
          success: true,
          message: 'Inventory updated',
          data: { product: inventoryResult }
        });
        
      case 'toggleStatus':
        const product = await Product.findById(id);
        if (!product) {
          return Response.json(
            { success: false, error: 'Product not found' },
            { status: 404 }
          );
        }
        product.status = product.status === 'active' ? 'inactive' : 'active';
        await product.save();
        
        return Response.json({
          success: true,
          message: `Product ${product.status === 'active' ? 'activated' : 'deactivated'}`,
          data: { product }
        });
        
      case 'toggleFeatured':
        const featuredProduct = await Product.findById(id);
        if (!featuredProduct) {
          return Response.json(
            { success: false, error: 'Product not found' },
            { status: 404 }
          );
        }
        featuredProduct.isFeatured = !featuredProduct.isFeatured;
        await featuredProduct.save();
        
        return Response.json({
          success: true,
          message: `Product ${featuredProduct.isFeatured ? 'featured' : 'unfeatured'}`,
          data: { product: featuredProduct }
        });
        
      default:
        // Standard partial update
        const updatedProduct = await Product.findByIdAndUpdate(
          id,
          { $set: updateData },
          { new: true, runValidators: true }
        );
        
        if (!updatedProduct) {
          return Response.json(
            { success: false, error: 'Product not found' },
            { status: 404 }
          );
        }
        
        return Response.json({
          success: true,
          message: 'Product updated',
          data: { product: updatedProduct }
        });
    }

  } catch (error) {
    logger.error('Error patching product:', error);
    return Response.json(
      { success: false, error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/products/[id]
 * 
 * Delete product (Admin only)
 * Soft delete by default (sets status to 'archived')
 * Use ?hard=true for permanent deletion
 */
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const hardDelete = searchParams.get('hard') === 'true';
    
    if (!id) {
      return Response.json(
        { success: false, error: 'Product ID is required' },
        { status: 400 }
      );
    }

    if (hardDelete) {
      // Permanent deletion
      const product = await Product.findByIdAndDelete(id);
      
      if (!product) {
        return Response.json(
          { success: false, error: 'Product not found' },
          { status: 404 }
        );
      }
      
      logger.info('Product permanently deleted', { productId: id });
      
      return Response.json({
        success: true,
        message: 'Product permanently deleted'
      });
    } else {
      // Soft delete (archive)
      const product = await Product.findByIdAndUpdate(
        id,
        { 
          status: 'archived',
          isVisible: false
        },
        { new: true }
      );
      
      if (!product) {
        return Response.json(
          { success: false, error: 'Product not found' },
          { status: 404 }
        );
      }
      
      logger.info('Product archived', { productId: id });
      
      return Response.json({
        success: true,
        message: 'Product archived successfully',
        data: { product }
      });
    }

  } catch (error) {
    logger.error('Error deleting product:', error);
    return Response.json(
      { success: false, error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
