import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import Cart from '@/models/Cart';
import Product from '@/models/Product';
import { verifyToken } from '@/lib/auth';

/**
 * GET /api/orders
 * Get orders for authenticated user (or all orders for admin)
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
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    
    await dbConnect();
    
    // Get orders for user
    const result = await Order.getOrdersForUser(decoded.userId, {
      page,
      limit,
      status
    });
    
    return NextResponse.json({
      success: true,
      data: result
    });
    
  } catch (error) {
    console.error('Get orders error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/orders
 * Create new order from cart
 * Supports both authenticated users and guest checkout
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      shippingAddress,
      billingAddress,
      sameAsBilling = true,
      shippingMethod,
      paymentMethod,
      customerNotes,
      isGift,
      giftMessage,
      isGuestCheckout = false,
      guestCart  // Cart items for guest checkout
    } = body;
    
    // Validate required fields
    if (!shippingAddress) {
      return NextResponse.json(
        { success: false, message: 'Shipping address is required' },
        { status: 400 }
      );
    }
    
    if (!shippingAddress.firstName || !shippingAddress.lastName || 
        !shippingAddress.address1 || !shippingAddress.city || 
        !shippingAddress.state || !shippingAddress.zipCode || 
        !shippingAddress.phone || !shippingAddress.email) {
      return NextResponse.json(
        { success: false, message: 'Complete shipping address is required' },
        { status: 400 }
      );
    }
    
    if (!paymentMethod) {
      return NextResponse.json(
        { success: false, message: 'Payment method is required' },
        { status: 400 }
      );
    }
    
    await dbConnect();
    
    let cart;
    let userId = null;
    let isGuest = isGuestCheckout;
    
    // Check for authenticated user
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = verifyToken(token);
      if (decoded) {
        userId = decoded.userId;
        isGuest = false;
      }
    }
    
    if (!isGuest && userId) {
      // Authenticated user - get cart from database
      cart = await Cart.findOne({ user: userId })
        .populate('items.product', 'name slug price images inventory status customFitPrice');
      
      if (!cart || cart.items.length === 0) {
        return NextResponse.json(
          { success: false, message: 'Cart is empty' },
          { status: 400 }
        );
      }
    } else {
      // Guest checkout - use cart items from request body
      if (!guestCart || guestCart.length === 0) {
        return NextResponse.json(
          { success: false, message: 'Cart is empty' },
          { status: 400 }
        );
      }
      
      // Validate guest cart items and get product data
      const validatedItems = [];
      for (const item of guestCart) {
        const product = await Product.findById(item.productId);
        if (!product) {
          return NextResponse.json(
            { success: false, message: `Product not found: ${item.productId}` },
            { status: 400 }
          );
        }
        
        validatedItems.push({
          product: product,
          size: item.size,
          quantity: item.quantity,
          isCustomFit: item.isCustomFit || false,
          customFitData: item.customFitData,
          productSnapshot: {
            name: product.name,
            slug: product.slug,
            price: product.price,
            image: product.images?.[0]?.url || '/images/placeholder-product.jpg'
          }
        });
      }
      
      // Create a temporary cart-like object for guest checkout
      cart = {
        items: validatedItems,
        user: null
      };
      
      isGuest = true;
    }
    
    // Validate stock availability for all items
    for (const item of cart.items) {
      if (!item.isCustomFit && item.product) {
        const sizeInventory = item.product.inventory?.find(inv => inv.size === item.size);
        if (!sizeInventory || sizeInventory.stock < item.quantity) {
          return NextResponse.json(
            { success: false, message: `Insufficient stock for ${item.productSnapshot?.name || item.product.name} - Size ${item.size}` },
            { status: 400 }
          );
        }
      }
    }
    
    // Create payment object
    const payment = {
      method: paymentMethod,
      status: paymentMethod === 'cod' ? 'pending' : 'captured', // Simulate payment capture
      paidAt: paymentMethod !== 'cod' ? new Date() : undefined
    };
    
    // Create order from cart
    const order = await Order.createFromCart(cart, {
      shippingAddress,
      billingAddress,
      sameAsBilling,
      shippingMethod,
      payment,
      customerNotes,
      isGift,
      giftMessage,
      isGuest
    });
    
    // Update inventory for non-custom-fit items
    for (const item of cart.items) {
      if (!item.isCustomFit && item.product) {
        await Product.findOneAndUpdate(
          { _id: item.product._id, 'inventory.size': item.size },
          { $inc: { 'inventory.$.stock': -item.quantity } }
        );
      }
    }
    
    // Clear cart after successful order (only for authenticated users)
    if (!isGuest && cart.clearCart) {
      await cart.clearCart();
    }
    
    return NextResponse.json({
      success: true,
      message: 'Order placed successfully',
      data: {
        order: order.toClientJSON(),
        orderNumber: order.orderNumber
      }
    }, { status: 201 });
    
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
