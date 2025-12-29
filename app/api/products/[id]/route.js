import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import { logger } from '@/lib/utils';
import { NotFoundError, ValidationError } from '@/lib/errors';

// GET /api/products/[id] - Get single product by ID
export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;
    
    if (!id) {
      return Response.json({ error: 'Product ID is required' }, { status: 400 });
    }

    const product = await Product.findById(id).lean();
    
    if (!product) {
      return Response.json({ error: 'Product not found' }, { status: 404 });
    }

    logger.info('Product retrieved', { productId: id });
    
    return Response.json({
      success: true,
      data: product,
      message: 'Product retrieved successfully'
    });
  } catch (error) {
    logger.error('Error retrieving product:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/products/[id] - Update product (Admin only)
export async function PUT(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;
    
    if (!id) {
      return Response.json({ error: 'Product ID is required' }, { status: 400 });
    }

    const updateData = await request.json();
  
    // Validate price if provided
    if (updateData.price !== undefined && updateData.price < 0) {
      return Response.json({ error: 'Price cannot be negative' }, { status: 400 });
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
    );
    
    if (!product) {
      return Response.json({ error: 'Product not found' }, { status: 404 });
    }

    logger.info('Product updated successfully', { productId: id });
    
    return Response.json({
      success: true,
      data: product,
      message: 'Product updated successfully'
    });
  } catch (error) {
    if (error.code === 11000) {
      return Response.json({ error: 'Product with this SKU already exists' }, { status: 400 });
    }
    logger.error('Error updating product:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/products/[id] - Delete product (Admin only)
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;
    
    if (!id) {
      return Response.json({ error: 'Product ID is required' }, { status: 400 });
    }

    const product = await Product.findByIdAndDelete(id);
    
    if (!product) {
      return Response.json({ error: 'Product not found' }, { status: 404 });
    }

    logger.info('Product deleted successfully', { productId: id });
    
    return Response.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    logger.error('Error deleting product:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}