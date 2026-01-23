import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { logger } from '@/lib/utils';

/**
 * POST /api/auth/reset-password
 * 
 * Reset Password Endpoint
 * Resets user password using the token from email
 * 
 * Frontend Usage:
 * const response = await fetch('/api/auth/reset-password', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ token, password, confirmPassword })
 * });
 */
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { token, password, confirmPassword } = body;

    // Validation
    if (!token || !password) {
      return Response.json(
        { 
          success: false,
          error: 'Token and password are required' 
        },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return Response.json(
        { 
          success: false,
          error: 'Password must be at least 8 characters long' 
        },
        { status: 400 }
      );
    }

    if (confirmPassword && password !== confirmPassword) {
      return Response.json(
        { 
          success: false,
          error: 'Passwords do not match' 
        },
        { status: 400 }
      );
    }

    // Hash the token from URL to compare with database
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    // Find user with valid reset token
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() } // Token not expired
    });

    if (!user) {
      logger.warning('Invalid or expired password reset token used');
      return Response.json(
        { 
          success: false,
          error: 'Invalid or expired reset token' 
        },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Update user password and clear reset token fields
    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    logger.info('Password reset successful', { 
      userId: user._id,
      email: user.email 
    });

    return Response.json({
      success: true,
      message: 'Password has been reset successfully. You can now login with your new password.'
    });

  } catch (error) {
    logger.error('Reset password error:', error);
    return Response.json(
      { 
        success: false,
        error: 'Password reset failed',
        message: error.message 
      },
      { status: 500 }
    );
  }
}