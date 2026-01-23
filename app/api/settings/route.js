import connectDB from '@/lib/mongodb';
import Settings from '@/models/Settings';
import { logger } from '@/lib/utils';

/**
 * GET /api/settings
 * Get current store settings
 */
export async function GET(request) {
  try {
    await connectDB();

    let settings = await Settings.findOne().lean();

    // If no settings exist, create default ones
    if (!settings) {
      settings = new Settings();
      await settings.save();
      settings = settings.toObject();
    }

    return Response.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    logger.error('Error fetching settings:', error);
    return Response.json(
      { success: false, error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/settings
 * Update store settings (Admin only)
 */
export async function PUT(request) {
  try {
    await connectDB();

    const body = await request.json();

    // Get or create settings
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
    }

    // Update settings fields
    const allowedFields = [
      'storeName',
      'storeEmail',
      'storePhone',
      'storeAddress',
      'currency',
      'timezone',
      'taxRate',
      'shippingCost',
      'freeShippingThreshold',
      'ordersPerPage',
      'productsPerPage',
      'maintenanceMode',
      'maintenanceMessage',
    ];

    allowedFields.forEach(field => {
      if (body[field] !== undefined) {
        settings[field] = body[field];
      }
    });

    await settings.save();

    logger.info('Settings updated');

    return Response.json({
      success: true,
      message: 'Settings updated successfully',
      data: settings,
    });
  } catch (error) {
    logger.error('Error updating settings:', error);
    return Response.json(
      { success: false, error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
