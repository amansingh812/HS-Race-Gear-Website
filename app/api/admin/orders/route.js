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
 * GET /api/admin/orders
 * Get all orders with filtering, search, and pagination (admin only)
 */
export async function GET(request) {
  try {
    const adminCheck = await verifyAdmin(request);
    if (!adminCheck.success) {
      return NextResponse.json(
        { success: false, message: adminCheck.message },
        { status: adminCheck.status }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status') || 'all';
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'placedAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    
    await dbConnect();
    
    const result = await Order.getAllOrders({
      page,
      limit,
      status,
      search,
      sortBy,
      sortOrder
    });
    
    return NextResponse.json({
      success: true,
      data: result
    });
    
  } catch (error) {
    console.error('Admin get orders error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
