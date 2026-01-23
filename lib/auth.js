import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import User from '@/models/User';
import connectDB from '@/lib/mongodb';
import { logger } from '@/lib/utils';

/**
 * Authentication Middleware
 * Verifies JWT tokens and attaches user data to requests
 * 
 * Frontend Perspective:
 * - Like a security guard checking your ID before letting you in
 * - Validates the token you send in the Authorization header
 * - Provides user information to protected routes
 */

/**
 * Verify JWT token and return decoded user data
 * @param {string} token - JWT token from Authorization header
 * @returns {Object} Decoded token data
 */
export async function verifyToken(token) {
  try {
    if (!token) {
      throw new Error('No token provided');
    }

    // Remove 'Bearer ' prefix if present
    const cleanToken = token.startsWith('Bearer ') ? token.slice(7) : token;

    // Verify token with secret
    const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET);
    
    logger.info('Token verified successfully', { userId: decoded.userId });
    return decoded;
  } catch (error) {
    logger.error('Token verification failed:', error.message);
    
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token has expired');
    }
    if (error.name === 'JsonWebTokenError') {
      throw new Error('Invalid token');
    }
    throw new Error('Authentication failed');
  }
}

/**
 * Get authenticated user from request
 * Fetches full user data from database using token
 * 
 * @param {Request} request - Next.js request object
 * @returns {Object|null} User object without password
 */
export async function getAuthUser(request) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader) {
      return null;
    }

    const decoded = await verifyToken(authHeader);
    
    // Connect to database and fetch user
    await connectDB();
    const user = await User.findById(decoded.userId)
      .select('-password') // Exclude password from response
      .lean();

    if (!user) {
      throw new Error('User not found');
    }

    if (!user.isActive) {
      throw new Error('User account is deactivated');
    }

    return user;
  } catch (error) {
    logger.error('Get auth user failed:', error.message);
    return null;
  }
}

/**
 * Middleware wrapper for protected routes
 * Use this in API routes that require authentication
 * 
 * Frontend Usage Example:
 * fetch('/api/profile', {
 *   headers: {
 *     'Authorization': `Bearer ${token}`
 *   }
 * })
 * 
 * @param {Function} handler - API route handler function
 * @returns {Function} Wrapped handler with auth check
 */
export function requireAuth(handler) {
  return async (request, context) => {
    try {
      const user = await getAuthUser(request);

      if (!user) {
        return NextResponse.json(
          { 
            success: false,
            error: 'Authentication required',
            message: 'Please login to access this resource'
          },
          { status: 401 } // Unauthorized
        );
      }

      // Attach user to request for use in handler
      // Create new request with user data
      const requestWithUser = request;
      requestWithUser.user = user;

      // Call the actual handler
      return await handler(requestWithUser, context);
    } catch (error) {
      logger.error('Auth middleware error:', error);
      return NextResponse.json(
        { 
          success: false,
          error: 'Authentication failed',
          message: error.message 
        },
        { status: 401 }
      );
    }
  };
}

/**
 * Middleware for admin-only routes
 * Checks if user is authenticated AND has admin role
 * 
 * @param {Function} handler - API route handler function
 * @returns {Function} Wrapped handler with admin check
 */
export function requireAdmin(handler) {
  return async (request, context) => {
    try {
      const user = await getAuthUser(request);

      if (!user) {
        return NextResponse.json(
          { 
            success: false,
            error: 'Authentication required',
            message: 'Please login to access this resource'
          },
          { status: 401 }
        );
      }

      // Check if user has admin role
      if (user.role !== 'admin') {
        logger.warning('Unauthorized admin access attempt', { 
          userId: user._id,
          role: user.role 
        });
        
        return NextResponse.json(
          { 
            success: false,
            error: 'Access denied',
            message: 'Admin privileges required'
          },
          { status: 403 } // Forbidden
        );
      }

      // Attach user to request
      request.user = user;

      return await handler(request, context);
    } catch (error) {
      logger.error('Admin middleware error:', error);
      return NextResponse.json(
        { 
          success: false,
          error: 'Authorization failed',
          message: error.message 
        },
        { status: 401 }
      );
    }
  };
}

/**
 * Optional authentication - doesn't block if no token
 * Useful for routes that work differently for logged in vs logged out users
 * 
 * Example: Product listing that shows prices for logged-in users
 */
export function optionalAuth(handler) {
  return async (request, context) => {
    try {
      const user = await getAuthUser(request);
      
      // Attach user if found, but don't block if not
      request.user = user || null;

      return await handler(request, context);
    } catch (error) {
      // Even if auth fails, continue with null user
      request.user = null;
      return await handler(request, context);
    }
  };
}

/**
 * Generate JWT token for a user
 * Called after successful login or registration
 * 
 * @param {Object} user - User object from database
 * @returns {string} JWT token
 */
export function generateToken(user) {
  const payload = {
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
    iat: Math.floor(Date.now() / 1000) // Issued at
  };

  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { 
      expiresIn: '7d', // Token valid for 7 days
      issuer: 'hs-race-gear',
      audience: 'hs-race-gear-api'
    }
  );

  logger.info('Token generated', { userId: user._id, expiresIn: '7d' });
  return token;
}

/**
 * Generate refresh token for extended sessions
 * Refresh tokens have longer expiry and can be used to get new access tokens
 * 
 * @param {Object} user - User object from database
 * @returns {string} Refresh token
 */
export function generateRefreshToken(user) {
  const payload = {
    userId: user._id.toString(),
    tokenType: 'refresh'
  };

  const refreshToken = jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
    { 
      expiresIn: '30d' // Refresh token valid for 30 days
    }
  );

  return refreshToken;
}

/**
 * Verify refresh token
 * @param {string} token - Refresh token
 * @returns {Object} Decoded token data
 */
export function verifyRefreshToken(token) {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET
    );
    
    if (decoded.tokenType !== 'refresh') {
      throw new Error('Invalid token type');
    }
    
    return decoded;
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
}