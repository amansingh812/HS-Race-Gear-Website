import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { verifyRefreshToken, generateToken } from '@/lib/auth';
import { logger } from '@/lib/utils';

/**
 * POST /api/auth/refresh
 * 
 * Refresh Token Endpoint
 * Generates new access token using refresh token
 * 
 * Frontend Usage:
 * const response = await fetch('/api/auth/refresh', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ refreshToken })
 * });
 * const { token } = await response.json();
 * localStorage.setItem('token', token);
 */
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { refreshToken } = body;

    if (!refreshToken) {
      return Response.json(
        { 
          success: false,
          error: 'Refresh token is required' 
        },
        { status: 400 }
      );
    }

    // Verify refresh token
    let decoded;
    try {
      decoded = verifyRefreshToken(refreshToken);
    } catch (error) {
      logger.warning('Invalid refresh token attempt');
      return Response.json(
        { 
          success: false,
          error: 'Invalid or expired refresh token' 
        },
        { status: 401 }
      );
    }

    // Get user from database
    const user = await User.findById(decoded.userId)
      .select('-password')
      .lean();

    if (!user) {
      return Response.json(
        { 
          success: false,
          error: 'User not found' 
        },
        { status: 404 }
      );
    }

    if (!user.isActive) {
      return Response.json(
        { 
          success: false,
          error: 'User account is deactivated' 
        },
        { status: 403 }
      );
    }

    // Generate new access token
    const newToken = generateToken(user);

    logger.info('Token refreshed successfully', { userId: user._id });

    return Response.json({
      success: true,
      message: 'Token refreshed successfully',
      data: {
        token: newToken,
        expiresIn: '7d'
      }
    });

  } catch (error) {
    logger.error('Token refresh error:', error);
    return Response.json(
      { 
        success: false,
        error: 'Token refresh failed',
        message: error.message 
      },
      { status: 500 }
    );
  }
}