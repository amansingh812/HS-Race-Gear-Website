import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { requireAuth } from '@/lib/auth';
import { logger } from '@/lib/utils';

/**
 * PUT /api/profile/addresses/[id]/route.js
 * Update specific address
 */
async function updateAddress(request, { params }) {
  try {
    await connectDB();

    const user = request.user;
    const { id: addressId } = await params;
    const body = await request.json();

    const dbUser = await User.findById(user._id);

    if (!dbUser) {
      return Response.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    const address = dbUser.addresses.id(addressId);

    if (!address) {
      return Response.json(
        { success: false, error: 'Address not found' },
        { status: 404 }
      );
    }

    // Update fields
    if (body.street) address.street = body.street;
    if (body.city) address.city = body.city;
    if (body.state) address.state = body.state;
    if (body.zipCode) address.zipCode = body.zipCode;
    if (body.country) address.country = body.country;

    if (body.isDefault === true) {
      dbUser.addresses.forEach(addr => {
        addr.isDefault = false;
      });
      address.isDefault = true;
    }

    await dbUser.save();

    const updatedUser = await User.findById(user._id)
      .select('-password')
      .lean();

    logger.info('Address updated', { userId: user._id, addressId });

    return Response.json({
      success: true,
      message: 'Address updated successfully',
      data: { addresses: updatedUser.addresses }
    });

  } catch (error) {
    logger.error('Update address error:', error);
    return Response.json(
      { success: false, error: 'Failed to update address' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/profile/addresses/[id]/route.js
 * Delete specific address
 */
async function deleteAddress(request, { params }) {
  try {
    await connectDB();

    const user = request.user;
    const { id: addressId } = await params;

    const dbUser = await User.findById(user._id);

    if (!dbUser) {
      return Response.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    const address = dbUser.addresses.id(addressId);

    if (!address) {
      return Response.json(
        { success: false, error: 'Address not found' },
        { status: 404 }
      );
    }

    const wasDefault = address.isDefault;
    address.deleteOne();

    if (wasDefault && dbUser.addresses.length > 0) {
      dbUser.addresses[0].isDefault = true;
    }

    await dbUser.save();

    const updatedUser = await User.findById(user._id)
      .select('-password')
      .lean();

    logger.info('Address deleted', { userId: user._id, addressId });

    return Response.json({
      success: true,
      message: 'Address deleted successfully',
      data: { addresses: updatedUser.addresses }
    });

  } catch (error) {
    logger.error('Delete address error:', error);
    return Response.json(
      { success: false, error: 'Failed to delete address' },
      { status: 500 }
    );
  }
}

export const PUT = requireAuth(updateAddress);
export const DELETE = requireAuth(deleteAddress);