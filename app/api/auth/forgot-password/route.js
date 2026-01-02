import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import crypto from 'crypto';
import { logger } from '@/lib/utils';
import { sendPasswordResetEmail } from '@/lib/email';

/**
 * POST /api/auth/forgot-password
 * 
 * Forgot Password Endpoint
 * Sends password reset link to user's email
 * 
 * Frontend Usage:
 * const response = await fetch('/api/auth/forgot-password', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ email })
 * });
 */
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { email } = body;

    if (!email) {
      return Response.json(
        { 
          success: false,
          error: 'Email is required' 
        },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });

    // Security: Always return success even if user doesn't exist
    // This prevents email enumeration attacks
    if (!user) {
      logger.info('Password reset requested for non-existent email', { email });
      return Response.json({
        success: true,
        message: 'If an account with that email exists, a password reset link has been sent'
      });
    }

    if (!user.isActive) {
      logger.warning('Password reset requested for deactivated account', { 
        userId: user._id 
      });
      return Response.json({
        success: true,
        message: 'If an account with that email exists, a password reset link has been sent'
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    // Hash token before saving (security best practice)
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Save hashed token and expiry to user
    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = Date.now() + 60 * 60 * 1000; // 1 hour
    await user.save();

    // Create reset URL
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;

    // Send email (implement this function in lib/email.js)
    try {
      await sendPasswordResetEmail(user.email, user.name, resetUrl);
      
      logger.info('Password reset email sent', { 
        userId: user._id,
        email: user.email 
      });
    } catch (emailError) {
      logger.error('Failed to send password reset email:', emailError);
      
      // Clear reset token if email fails
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();

      return Response.json(
        { 
          success: false,
          error: 'Failed to send reset email. Please try again later.' 
        },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      message: 'If an account with that email exists, a password reset link has been sent'
    });

  } catch (error) {
    logger.error('Forgot password error:', error);
    return Response.json(
      { 
        success: false,
        error: 'Password reset request failed',
        message: error.message 
      },
      { status: 500 }
    );
  }
}