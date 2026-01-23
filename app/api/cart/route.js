import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Cart from '@/models/Cart';
import Product from '@/models/Product';
import { verifyToken } from '@/lib/auth';

/**
 * GET /api/cart
 * Get the current user's cart
 */
export async function GET(request) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired token' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    // Get or create cart
    let cart = await Cart.getOrCreateCart(decoded.userId);
    
    // Populate product details
    await cart.populate('items.product', 'name slug price images inventory status');
    
    return NextResponse.json({
      success: true,
      data: cart.toClientJSON()
    });
    
  } catch (error) {
    console.error('Get cart error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/cart
 * Add item to cart
 */
export async function POST(request) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired token' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    const {
      productId,
      size,
      quantity = 1,
      isCustomFit = false,
      measurements,
      selectedOptions = []
    } = body;
    
    // Validate required fields
    if (!productId || !size) {
      return NextResponse.json(
        { success: false, message: 'Product ID and size are required' },
        { status: 400 }
      );
    }
    
    await dbConnect();
    
    // Get product
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }
    
    if (product.status !== 'active') {
      return NextResponse.json(
        { success: false, message: 'Product is not available' },
        { status: 400 }
      );
    }
    
    // Check stock for standard size (not custom fit)
    if (!isCustomFit) {
      const sizeInventory = product.inventory.find(inv => inv.size === size);
      if (!sizeInventory || sizeInventory.stock < quantity) {
        return NextResponse.json(
          { success: false, message: `Insufficient stock for size ${size}` },
          { status: 400 }
        );
      }
    }
    
    // Validate custom fit measurements
    if (isCustomFit && !product.customFitAvailable) {
      return NextResponse.json(
        { success: false, message: 'Custom fit is not available for this product' },
        { status: 400 }
      );
    }
    
    // Calculate prices
    const basePrice = product.price;
    const customFitPrice = isCustomFit ? (product.customFitPrice || 0) : 0;
    
    // Calculate options price
    let optionsPrice = 0;
    const validatedOptions = [];
    
    if (selectedOptions && selectedOptions.length > 0) {
      for (const optSlug of selectedOptions) {
        const option = product.customOptions?.find(o => o.slug === optSlug);
        if (option) {
          optionsPrice += option.price || 0;
          validatedOptions.push({
            slug: option.slug,
            name: option.name,
            price: option.price || 0
          });
        }
      }
    }
    
    // Get primary image
    const primaryImage = product.images?.find(img => img.isPrimary) || product.images?.[0];
    
    // Get or create cart
    let cart = await Cart.getOrCreateCart(decoded.userId);
    
    // Add item to cart
    await cart.addItem({
      product: product._id,
      productSnapshot: {
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: primaryImage?.url,
        certification: product.certification
      },
      size,
      isCustomFit,
      measurements: isCustomFit ? measurements : undefined,
      selectedOptions: validatedOptions,
      quantity,
      basePrice,
      customFitPrice,
      optionsPrice
    });
    
    // Populate and return
    await cart.populate('items.product', 'name slug price images inventory status');
    
    return NextResponse.json({
      success: true,
      message: 'Item added to cart',
      data: cart.toClientJSON()
    });
    
  } catch (error) {
    console.error('Add to cart error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/cart
 * Update cart item quantity or apply discount
 */
export async function PUT(request) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired token' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    const { itemId, quantity, operation, discountCode } = body;
    
    await dbConnect();
    
    let cart = await Cart.findOne({ user: decoded.userId });
    
    if (!cart) {
      return NextResponse.json(
        { success: false, message: 'Cart not found' },
        { status: 404 }
      );
    }
    
    // Handle different operations
    if (operation === 'updateQuantity' && itemId) {
      await cart.updateItemQuantity(itemId, quantity);
    } else if (operation === 'removeItem' && itemId) {
      await cart.removeItem(itemId);
    } else if (operation === 'applyDiscount' && discountCode) {
      // TODO: Validate discount code against database
      // For now, just apply a test discount
      if (discountCode === 'RACING10') {
        await cart.applyDiscount('RACING10', 'percentage', 10);
      } else if (discountCode === 'SAVE20') {
        await cart.applyDiscount('SAVE20', 'fixed', 2000); // $20 off
      } else {
        return NextResponse.json(
          { success: false, message: 'Invalid discount code' },
          { status: 400 }
        );
      }
    } else if (operation === 'removeDiscount') {
      await cart.removeDiscount();
    } else if (operation === 'clear') {
      await cart.clearCart();
    }
    
    // Populate and return
    await cart.populate('items.product', 'name slug price images inventory status');
    
    return NextResponse.json({
      success: true,
      message: 'Cart updated',
      data: cart.toClientJSON()
    });
    
  } catch (error) {
    console.error('Update cart error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/cart
 * Clear cart or remove specific item
 */
export async function DELETE(request) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired token' },
        { status: 401 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const itemId = searchParams.get('itemId');
    
    await dbConnect();
    
    let cart = await Cart.findOne({ user: decoded.userId });
    
    if (!cart) {
      return NextResponse.json({
        success: true,
        message: 'Cart is already empty',
        data: { items: [], subtotal: 0, total: 0, itemCount: 0 }
      });
    }
    
    if (itemId) {
      // Remove specific item
      await cart.removeItem(itemId);
    } else {
      // Clear entire cart
      await cart.clearCart();
    }
    
    await cart.populate('items.product', 'name slug price images inventory status');
    
    return NextResponse.json({
      success: true,
      message: itemId ? 'Item removed from cart' : 'Cart cleared',
      data: cart.toClientJSON()
    });
    
  } catch (error) {
    console.error('Delete cart error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
