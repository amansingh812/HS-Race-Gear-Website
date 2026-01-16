import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Order from '@/models/Order';
import { logger } from '@/lib/utils';

/**
 * GET /api/customers
 * Get all customers with their order history
 */
export async function GET(request) {
  try {
    await connectDB();

    // Get all users who have made orders (customers)
    const customers = await User.find({ role: { $ne: 'admin' } })
      .select('-password')
      .lean();

    // Enhance with order data
    const enhancedCustomers = await Promise.all(
      customers.map(async (customer) => {
        const orders = await Order.find({ userId: customer._id }).lean();
        return {
          ...customer,
          orders,
          totalOrders: orders.length,
          totalSpent: orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0),
        };
      })
    );

    return Response.json({
      success: true,
      data: {
        customers: enhancedCustomers,
        total: enhancedCustomers.length,
      },
    });
  } catch (error) {
    logger.error('Error fetching customers:', error);
    return Response.json(
      { success: false, error: 'Failed to fetch customers' },
      { status: 500 }
    );
  }
}
