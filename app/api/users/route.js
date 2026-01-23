import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { logger } from '@/lib/utils';
import { ValidationError, ConflictError } from '@/lib/errors';

// GET /api/users - Get all users (Admin only, will be protected later)
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const role = searchParams.get('role');
    const active = searchParams.get('active') !== 'false';

    const query = {};
    
    if (role) query.role = role;
    if (active !== undefined) query.isActive = active;

    const skip = (page - 1) * limit;

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await User.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    const pagination = {
      currentPage: page,
      totalPages,
      totalUsers: total,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    };

    logger.info(`Retrieved ${users.length} users`, { pagination });

    return Response.json({
      success: true,
      data: { users, pagination },
      message: 'Users retrieved successfully'
    });
  } catch (error) {
    logger.error('Error retrieving users:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/users - Create new user (Registration)
export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { 
      name, 
      email, 
      password, 
      phone,
      role = 'customer' 
    } = body;

    // Validation
    if (!name || !email || !password) {
      return Response.json({ error: 'Name, email, and password are required' }, { status: 400 });
    }

    if (password.length < 6) {
      return Response.json({ error: 'Password must be at least 6 characters long' }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return Response.json({ error: 'User with this email already exists' }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone,
      role
    });

    const savedUser = await user.save();
    
    // Remove password from response
    const userResponse = savedUser.toObject();
    delete userResponse.password;

    logger.info('User created successfully', { 
      userId: savedUser._id, 
      email: savedUser.email,
      role: savedUser.role 
    });

    return Response.json({
      success: true,
      data: userResponse,
      message: 'User created successfully'
    }, { status: 201 });
  } catch (error) {
    if (error.code === 11000) {
      return Response.json({ error: 'User with this email already exists' }, { status: 409 });
    }
    logger.error('Error creating user:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}