import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { requireAuth } from '@/lib/auth';
import { logger } from '@/lib/utils';

/**
 * GET /api/profile
 * 
 * Get Current User Profile
 * Returns authenticated user's profile data
 * 
 * Frontend Usage:
 * const response = await fetch('/api/profile', {
 *   headers: {
 *     'Authorization': `Bearer ${token}`
 *   }
 * });
 * const { user } = await response.json();
 */
async function getProfile(request) {
  try {
    // User is already verified and attached by requireAuth middleware
    const user = request.user;

    logger.info('Profile fetched', { userId: user._id });

    return Response.json({
      success: true,
      data: {
        user
      }
    });

  } catch (error) {
    logger.error('Get profile error:', error);
    return Response.json(
      { 
        success: false,
        error: 'Failed to fetch profile',
        message: error.message 
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/profile
 * 
 * Update User Profile
 * Updates authenticated user's profile data
 * 
 * Frontend Usage:
 * const response = await fetch('/api/profile', {
 *   method: 'PUT',
 *   headers: {
 *     'Authorization': `Bearer ${token}`,
 *     'Content-Type': 'application/json'
 *   },
 *   body: JSON.stringify({ name, phone })
 * });
 */
async function updateProfile(request) {
  try {
    await connectDB();

    const user = request.user;
    const body = await request.json();
    
    const { 
      name, 
      phone, 
      currentPassword,
      newPassword,
      confirmNewPassword 
    } = body;

    // Find user in database (we need the full document to update)
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

    // Update basic fields
    if (name) dbUser.name = name;
    if (phone !== undefined) dbUser.phone = phone;

    // Handle password change
    if (newPassword) {
      // Require current password for security
      if (!currentPassword) {
        return Response.json(
          { 
            success: false,
            error: 'Current password is required to set new password' 
          },
          { status: 400 }
        );
      }

      // Verify current password
      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        dbUser.password
      );

      if (!isPasswordValid) {
        return Response.json(
          { 
            success: false,
            error: 'Current password is incorrect' 
          },
          { status: 400 }
        );
      }

      // Validate new password
      if (newPassword.length < 8) {
        return Response.json(
          { 
            success: false,
            error: 'New password must be at least 8 characters long' 
          },
          { status: 400 }
        );
      }

      // Check password confirmation
      if (confirmNewPassword && newPassword !== confirmNewPassword) {
        return Response.json(
          { 
            success: false,
            error: 'New passwords do not match' 
          },
          { status: 400 }
        );
      }

      // Hash and update password
      dbUser.password = await bcrypt.hash(newPassword, 12);
      
      logger.info('User password updated', { userId: user._id });
    }

    // Save updates
    await dbUser.save();

    // Return updated user data (exclude password)
    const updatedUser = await User.findById(user._id)
      .select('-password')
      .lean();

    logger.info('Profile updated successfully', { userId: user._id });

    return Response.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: updatedUser
      }
    });

  } catch (error) {
    logger.error('Update profile error:', error);
    return Response.json(
      { 
        success: false,
        error: 'Failed to update profile',
        message: error.message 
      },
      { status: 500 }
    );
  }
}

// Export with authentication middleware
export const GET = requireAuth(getProfile);
export const PUT = requireAuth(updateProfile);