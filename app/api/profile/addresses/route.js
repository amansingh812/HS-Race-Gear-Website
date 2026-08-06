import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { requireAuth } from '@/lib/auth';
import { logger } from '@/lib/utils';

/**
 * POST /api/profile/addresses
 * 
 * Add New Address to User Profile
 * 
 * Frontend Usage:
 * const response = await fetch('/api/profile/addresses', {
 *   method: 'POST',
 *   headers: {
 *     'Authorization': `Bearer ${token}`,
 *     'Content-Type': 'application/json'
 *   },
 *   body: JSON.stringify({
 *     street, city, state, zipCode, country, isDefault
 *   })
 * });
 */
async function addAddress(request) {
  try {
    await connectDB();

    const user = request.user;
    const body = await request.json();
    
    // `type` is required:true on the address subschema in models/User.js, but
    // was never read from the body or defaulted here — so every POST failed
    // Mongoose validation and no address could be saved. Defaulting to
    // 'shipping' (the only kind the account UI collects) and validating the
    // enum so a bad value returns 400 rather than a 500 from the model.
    const {
      street,
      city,
      state,
      zipCode,
      country,
      isDefault = false,
      type = 'shipping'
    } = body;

    if (!['billing', 'shipping'].includes(type)) {
      return Response.json(
        {
          success: false,
          error: "Address type must be 'billing' or 'shipping'"
        },
        { status: 400 }
      );
    }

    // Validation
    if (!street || !city || !state || !zipCode || !country) {
      return Response.json(
        { 
          success: false,
          error: 'All address fields are required' 
        },
        { status: 400 }
      );
    }

    // Find user
    const dbUser = await User.findById(user._id);

    if (!dbUser) {
      return Response.json(
        { 
          success: false,
          error: 'User not found' 
        },
        { status: 404 }
      );
    }

    // If this is the default address, unset others
    if (isDefault) {
      dbUser.addresses.forEach(addr => {
        addr.isDefault = false;
      });
    }

    // If this is the first address, make it default
    const makeDefault = isDefault || dbUser.addresses.length === 0;

    // Add new address
    dbUser.addresses.push({
      type,
      street,
      city,
      state,
      zipCode,
      country,
      isDefault: makeDefault
    });

    await dbUser.save();

    // Get updated user
    const updatedUser = await User.findById(user._id)
      .select('-password')
      .lean();

    logger.info('Address added', { 
      userId: user._id,
      addressCount: updatedUser.addresses.length 
    });

    return Response.json({
      success: true,
      message: 'Address added successfully',
      data: {
        addresses: updatedUser.addresses
      }
    });

  } catch (error) {
    logger.error('Add address error:', error);
    return Response.json(
      { 
        success: false,
        error: 'Failed to add address',
        message: error.message 
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/profile/addresses/[id]
 * 
 * Update Existing Address
 * 
 * Frontend Usage:
 * const response = await fetch(`/api/profile/addresses/${addressId}`, {
 *   method: 'PUT',
 *   headers: {
 *     'Authorization': `Bearer ${token}`,
 *     'Content-Type': 'application/json'
 *   },
 *   body: JSON.stringify({ street, city, ... })
 * });
 */
async function updateAddress(request, { params }) {
  try {
    await connectDB();

    const user = request.user;
    const { id: addressId } = params;
    const body = await request.json();

    // Find user
    const dbUser = await User.findById(user._id);

    if (!dbUser) {
      return Response.json(
        { 
          success: false,
          error: 'User not found' 
        },
        { status: 404 }
      );
    }

    // Find address
    const address = dbUser.addresses.id(addressId);

    if (!address) {
      return Response.json(
        { 
          success: false,
          error: 'Address not found' 
        },
        { status: 404 }
      );
    }

    // Update fields
    if (body.street) address.street = body.street;
    if (body.city) address.city = body.city;
    if (body.state) address.state = body.state;
    if (body.zipCode) address.zipCode = body.zipCode;
    if (body.country) address.country = body.country;

    // Handle default address
    if (body.isDefault === true) {
      // Unset other defaults
      dbUser.addresses.forEach(addr => {
        addr.isDefault = false;
      });
      address.isDefault = true;
    }

    await dbUser.save();

    // Get updated user
    const updatedUser = await User.findById(user._id)
      .select('-password')
      .lean();

    logger.info('Address updated', { 
      userId: user._id,
      addressId 
    });

    return Response.json({
      success: true,
      message: 'Address updated successfully',
      data: {
        addresses: updatedUser.addresses
      }
    });

  } catch (error) {
    logger.error('Update address error:', error);
    return Response.json(
      { 
        success: false,
        error: 'Failed to update address',
        message: error.message 
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/profile/addresses/[id]
 * 
 * Delete Address
 */
async function deleteAddress(request, { params }) {
  try {
    await connectDB();

    const user = request.user;
    const { id: addressId } = params;

    // Find user
    const dbUser = await User.findById(user._id);

    if (!dbUser) {
      return Response.json(
        { 
          success: false,
          error: 'User not found' 
        },
        { status: 404 }
      );
    }

    // Find and remove address
    const address = dbUser.addresses.id(addressId);

    if (!address) {
      return Response.json(
        { 
          success: false,
          error: 'Address not found' 
        },
        { status: 404 }
      );
    }

    const wasDefault = address.isDefault;
    address.deleteOne();

    // If deleted address was default, make first remaining address default
    if (wasDefault && dbUser.addresses.length > 0) {
      dbUser.addresses[0].isDefault = true;
    }

    await dbUser.save();

    // Get updated user
    const updatedUser = await User.findById(user._id)
      .select('-password')
      .lean();

    logger.info('Address deleted', { 
      userId: user._id,
      addressId 
    });

    return Response.json({
      success: true,
      message: 'Address deleted successfully',
      data: {
        addresses: updatedUser.addresses
      }
    });

  } catch (error) {
    logger.error('Delete address error:', error);
    return Response.json(
      { 
        success: false,
        error: 'Failed to delete address',
        message: error.message 
      },
      { status: 500 }
    );
  }
}

// Export with authentication
export const POST = requireAuth(addAddress);