import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { generateToken, generateRefreshToken } from '@/lib/auth';
import { logger } from '@/lib/utils';

/**
 * POST /api/auth/login
 * 
 * User Login Endpoint
 * Authenticates user credentials and returns JWT token
 * 
 * Frontend Usage:
 * const response = await fetch('/api/auth/login', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ email, password })
 * });
 * const { token, user } = await response.json();
 * localStorage.setItem('token', token);
 */
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { email, password, rememberMe = false } = body;

    // Validation
    if (!email || !password) {
      return Response.json(
        { 
          success: false,
          error: 'Email and password are required' 
        },
        { status: 400 }
      );
    }

    // Find user by email (include password field which is hidden by default)
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user) {
      logger.warning('Login attempt with non-existent email', { email });
      return Response.json(
        { 
          success: false,
          error: 'Invalid email or password' 
        },
        { status: 401 }
      );
    }

    // Check if user is active
    if (!user.isActive) {
      logger.warning('Login attempt for deactivated account', { 
        userId: user._id,
        email 
      });
      return Response.json(
        { 
          success: false,
          error: 'Your account has been deactivated. Please contact support.' 
        },
        { status: 403 }
      );
    }

    // Verify password
    if (!user.password) {
      logger.warning('User has no password - OAuth account', { 
        userId: user._id,
        email,
        oauthProvider: user.oauthProvider
      });
      return Response.json(
        { 
          success: false,
          error: 'This account uses social login. Please sign in with ' + (user.oauthProvider || 'your provider') + '.' 
        },
        { status: 401 }
      );
    }

    let isPasswordValid = false;
    try {
      isPasswordValid = await bcrypt.compare(password, user.password);
    } catch (bcryptError) {
      logger.error('Bcrypt comparison error', { 
        userId: user._id,
        email,
        error: bcryptError.message
      });
      return Response.json(
        { 
          success: false,
          error: 'Authentication failed. Please try again.' 
        },
        { status: 500 }
      );
    }

    if (!isPasswordValid) {
      logger.warning('Failed login attempt - invalid password', { 
        userId: user._id,
        email 
      });
      return Response.json(
        { 
          success: false,
          error: 'Invalid email or password' 
        },
        { status: 401 }
      );
    }

    // Update last login timestamp
    user.lastLogin = new Date();
    await user.save();

    // Generate tokens
    const token = generateToken(user);
    const refreshToken = rememberMe ? generateRefreshToken(user) : null;

    // Prepare user data (exclude sensitive fields)
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      addresses: user.addresses,
      createdAt: user.createdAt
    };

    logger.info('User logged in successfully', { 
      userId: user._id,
      email: user.email,
      role: user.role
    });

    return Response.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        refreshToken,
        user: userData,
        expiresIn: '7d'
      }
    });

  } catch (error) {
    logger.error('Login error:', error);
    
    // Check if it's a MongoDB connection error
    if (error.name === 'MongoNetworkError' || error.name === 'MongoServerError') {
      return Response.json(
        { 
          success: false,
          error: 'Database connection failed. Please try again later.' 
        },
        { status: 500 }
      );
    }

    // Check if it's a validation error
    if (error.name === 'ValidationError') {
      return Response.json(
        { 
          success: false,
          error: 'Invalid data provided. Please check your input.' 
        },
        { status: 400 }
      );
    }

    return Response.json(
      { 
        success: false,
        error: 'Login failed. Please try again later.',
        ...(process.env.NODE_ENV === 'development' && { message: error.message })
      },
      { status: 500 }
    );
  }
}