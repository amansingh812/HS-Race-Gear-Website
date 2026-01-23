import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';

/**
 * GET /api/orders/[id]
 * Get single order by ID or order number
 * Supports both authenticated users and guest order lookup
 */
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const guestEmail = searchParams.get('email');
    
    await dbConnect();
    
    // Find order by ID or order number
    let order;
    if (id.startsWith('HS-')) {
      order = await Order.findOne({ orderNumber: id });
    } else {
      order = await Order.findById(id);
    }
    
    if (!order) {
      return NextResponse.json(
        { success: false, message: 'Order not found' },
        { status: 404 }
      );
    }
    
    // Check authorization
    const authHeader = request.headers.get('authorization');
    
    if (order.isGuest) {
      // Guest order - verify by email
      if (guestEmail && guestEmail.toLowerCase() === order.guestEmail?.toLowerCase()) {
        return NextResponse.json({
          success: true,
          data: order.toClientJSON()
        });
      }
      
      // Also allow authenticated admin to view guest orders
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        const decoded = verifyToken(token);
        if (decoded) {
          const user = await User.findById(decoded.userId);
          if (user?.role === 'admin') {
            return NextResponse.json({
              success: true,
              data: order.toClientJSON()
            });
          }
        }
      }
      
      // If no email provided for guest order, return limited info
      if (!guestEmail) {
        return NextResponse.json({
          success: true,
          data: {
            orderNumber: order.orderNumber,
            status: order.status,
            createdAt: order.createdAt,
            totals: order.toClientJSON().totals
          }
        });
      }
      
      return NextResponse.json(
        { success: false, message: 'Email verification required for guest orders' },
        { status: 401 }
      );
    }
    
    // Authenticated user order - require valid token
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
    
    // Check if user owns this order (unless admin)
    const user = await User.findById(decoded.userId);
    if (order.user?.toString() !== decoded.userId && user?.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Access denied' },
        { status: 403 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: order.toClientJSON()
    });
    
  } catch (error) {
    console.error('Get order error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/orders/[id]
 * Update order (admin only)
 */
export async function PUT(request, { params }) {
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
    
    // Check if admin
    const user = await User.findById(decoded.userId);
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Admin access required' },
        { status: 403 }
      );
    }
    
    const { id } = await params;
    const body = await request.json();
    
    const order = await Order.findById(id);
    
    if (!order) {
      return NextResponse.json(
        { success: false, message: 'Order not found' },
        { status: 404 }
      );
    }
    
    // Update allowed fields
    const allowedFields = [
      'status', 'trackingNumber', 'carrier', 'internalNotes',
      'estimatedDelivery', 'shippingMethod'
    ];
    
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        order[field] = body[field];
      }
    }
    
    // Add status history note
    if (body.statusNote && order.statusHistory.length > 0) {
      order.statusHistory[order.statusHistory.length - 1].note = body.statusNote;
      order.statusHistory[order.statusHistory.length - 1].updatedBy = decoded.userId;
    }
    
    await order.save();
    
    return NextResponse.json({
      success: true,
      message: 'Order updated',
      data: order.toClientJSON()
    });
    
  } catch (error) {
    console.error('Update order error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/orders/[id]
 * Perform specific operations on order
 */
export async function PATCH(request, { params }) {
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
    
    const { id } = await params;
    const body = await request.json();
    const { operation } = body;
    
    await dbConnect();
    
    const order = await Order.findById(id);
    
    if (!order) {
      return NextResponse.json(
        { success: false, message: 'Order not found' },
        { status: 404 }
      );
    }
    
    // Check permissions
    const user = await User.findById(decoded.userId);
    const isOwner = order.user.toString() === decoded.userId;
    const isAdmin = user?.role === 'admin';
    
    switch (operation) {
      case 'cancel':
        // User can cancel pending/confirmed orders, admin can cancel any
        if (!isOwner && !isAdmin) {
          return NextResponse.json(
            { success: false, message: 'Access denied' },
            { status: 403 }
          );
        }
        
        if (!['pending', 'confirmed'].includes(order.status) && !isAdmin) {
          return NextResponse.json(
            { success: false, message: 'Cannot cancel order in current status' },
            { status: 400 }
          );
        }
        
        await order.cancelOrder(body.reason, decoded.userId);
        
        // Restore inventory for non-custom-fit items
        const Product = (await import('@/models/Product')).default;
        for (const item of order.items) {
          if (!item.isCustomFit && item.product) {
            await Product.findOneAndUpdate(
              { _id: item.product, 'inventory.size': item.size },
              { $inc: { 'inventory.$.stock': item.quantity } }
            );
          }
        }
        break;
        
      case 'updateStatus':
        // Admin only
        if (!isAdmin) {
          return NextResponse.json(
            { success: false, message: 'Admin access required' },
            { status: 403 }
          );
        }
        
        await order.updateStatus(body.status, body.note, decoded.userId);
        break;
        
      case 'addTracking':
        // Admin only
        if (!isAdmin) {
          return NextResponse.json(
            { success: false, message: 'Admin access required' },
            { status: 403 }
          );
        }
        
        await order.addTracking(body.trackingNumber, body.carrier);
        break;
        
      default:
        return NextResponse.json(
          { success: false, message: 'Invalid operation' },
          { status: 400 }
        );
    }
    
    return NextResponse.json({
      success: true,
      message: `Order ${operation} successful`,
      data: order.toClientJSON()
    });
    
  } catch (error) {
    console.error('Patch order error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
