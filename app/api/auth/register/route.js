import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { generateToken, generateRefreshToken } from '@/lib/auth';
import { logger } from '@/lib/utils';

/**
 * POST /api/auth/register
 * 
 * User Registration Endpoint
 * Creates new user account with encrypted password
 * 
 * Frontend Usage:
 * const response = await fetch('/api/auth/register', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ name, email, password, phone })
 * });
 * const { token, user } = await response.json();
 */
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { 
      name, 
      email, 
      password,
      confirmPassword,
      phone 
    } = body;

    // Input validation
    if (!name || !email || !password) {
      return Response.json(
        { 
          success: false,
          error: 'Name, email, and password are required' 
        },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { 
          success: false,
          error: 'Invalid email format' 
        },
        { status: 400 }
      );
    }

    // Password strength validation
    if (password.length < 8) {
      return Response.json(
        { 
          success: false,
          error: 'Password must be at least 8 characters long' 
        },
        { status: 400 }
      );
    }

    // Password confirmation check
    if (confirmPassword && password !== confirmPassword) {
      return Response.json(
        { 
          success: false,
          error: 'Passwords do not match' 
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ 
      email: email.toLowerCase() 
    });

    if (existingUser) {
      logger.warning('Registration attempt with existing email', { email });
      return Response.json(
        { 
          success: false,
          error: 'An account with this email already exists' 
        },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const user = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone: phone || undefined,
      role: 'customer', // Default role
      isActive: true
    });

    await user.save();

    // Generate authentication tokens
    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    // Prepare user data for response (exclude password)
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      addresses: user.addresses,
      createdAt: user.createdAt
    };

    logger.info('New user registered successfully', { 
      userId: user._id,
      email: user.email 
    });

    return Response.json({
      success: true,
      message: 'Registration successful',
      data: {
        token,
        refreshToken,
        user: userData,
        expiresIn: '7d'
      }
    }, { status: 201 });

  } catch (error) {
    logger.error('Registration error:', error);
    
    // Handle duplicate key error (in case of race condition)
    if (error.code === 11000) {
      return Response.json(
        { 
          success: false,
          error: 'An account with this email already exists' 
        },
        { status: 409 }
      );
    }

    return Response.json(
      { 
        success: false,
        error: 'Registration failed',
        message: error.message 
      },
      { status: 500 }
    );
  }
}