import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import { verifyToken } from '@/lib/auth';

/**
 * Verify admin access
 */
async function verifyAdmin(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { success: false, message: 'Authentication required', status: 401 };
  }
  
  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);
  
  if (!decoded) {
    return { success: false, message: 'Invalid or expired token', status: 401 };
  }
  
  if (decoded.role !== 'admin') {
    return { success: false, message: 'Admin access required', status: 403 };
  }
  
  return { success: true, decoded };
}

/**
 * GET /api/admin/orders/[id]
 * Get single order details (admin only)
 */
export async function GET(request, { params }) {
  try {
    const adminCheck = await verifyAdmin(request);
    if (!adminCheck.success) {
      return NextResponse.json(
        { success: false, message: adminCheck.message },
        { status: adminCheck.status }
      );
    }
    
    const { id } = await params;
    
    await dbConnect();
    
    // Try to find by ID or order number
    let order;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      order = await Order.findById(id).populate('user', 'name email phone');
    } else {
      order = await Order.findOne({ orderNumber: id }).populate('user', 'name email phone');
    }
    
    if (!order) {
      return NextResponse.json(
        { success: false, message: 'Order not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: order.toJSON()
    });
    
  } catch (error) {
    console.error('Admin get order error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/orders/[id]
 * Full update order (admin only)
 */
export async function PUT(request, { params }) {
  try {
    const adminCheck = await verifyAdmin(request);
    if (!adminCheck.success) {
      return NextResponse.json(
        { success: false, message: adminCheck.message },
        { status: adminCheck.status }
      );
    }
    
    const { id } = await params;
    const body = await request.json();
    
    await dbConnect();
    
    const order = await Order.findById(id);
    
    if (!order) {
      return NextResponse.json(
        { success: false, message: 'Order not found' },
        { status: 404 }
      );
    }
    
    // Update allowed fields
    const allowedUpdates = [
      'status',
      'paymentStatus',
      'shippingAddress',
      'notes',
      'tracking',
      'adminNotes'
    ];
    
    allowedUpdates.forEach(field => {
      if (body[field] !== undefined) {
        order[field] = body[field];
      }
    });
    
    // If status is being updated, add to history
    if (body.status && body.status !== order.status) {
      await order.updateStatus(body.status, body.statusNote || 'Updated by admin');
    }
    
    await order.save();
    
    return NextResponse.json({
      success: true,
      data: order.toJSON(),
      message: 'Order updated successfully'
    });
    
  } catch (error) {
    console.error('Admin update order error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/orders/[id]
 * Partial update - specific operations (admin only)
 * Operations: updateStatus, addTracking, addNote
 */
export async function PATCH(request, { params }) {
  try {
    const adminCheck = await verifyAdmin(request);
    if (!adminCheck.success) {
      return NextResponse.json(
        { success: false, message: adminCheck.message },
        { status: adminCheck.status }
      );
    }
    
    const { id } = await params;
    const { operation, ...data } = await request.json();
    
    await dbConnect();
    
    const order = await Order.findById(id);
    
    if (!order) {
      return NextResponse.json(
        { success: false, message: 'Order not found' },
        { status: 404 }
      );
    }
    
    let result;
    
    switch (operation) {
      case 'updateStatus':
        if (!data.status) {
          return NextResponse.json(
            { success: false, message: 'Status is required' },
            { status: 400 }
          );
        }
        result = await order.updateStatus(data.status, data.note || 'Updated by admin');
        break;
        
      case 'addTracking':
        if (!data.carrier || !data.trackingNumber) {
          return NextResponse.json(
            { success: false, message: 'Carrier and tracking number are required' },
            { status: 400 }
          );
        }
        result = await order.addTracking(data.carrier, data.trackingNumber, data.trackingUrl);
        break;
        
      case 'addNote':
        if (!data.note) {
          return NextResponse.json(
            { success: false, message: 'Note is required' },
            { status: 400 }
          );
        }
        order.adminNotes = order.adminNotes || [];
        order.adminNotes.push({
          note: data.note,
          addedAt: new Date(),
          addedBy: adminCheck.decoded.userId
        });
        result = await order.save();
        break;
        
      case 'updatePayment':
        if (!data.paymentStatus) {
          return NextResponse.json(
            { success: false, message: 'Payment status is required' },
            { status: 400 }
          );
        }
        order.paymentStatus = data.paymentStatus;
        if (data.paymentStatus === 'completed') {
          order.paidAt = new Date();
        }
        result = await order.save();
        break;
        
      default:
        return NextResponse.json(
          { success: false, message: 'Invalid operation. Valid: updateStatus, addTracking, addNote, updatePayment' },
          { status: 400 }
        );
    }
    
    return NextResponse.json({
      success: true,
      data: result.toJSON(),
      message: `Operation '${operation}' completed successfully`
    });
    
  } catch (error) {
    console.error('Admin patch order error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
