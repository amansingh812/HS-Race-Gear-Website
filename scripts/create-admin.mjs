import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.join(__dirname, '../.env.local') });

// Import User model
import('../models/User.js').then(async (module) => {
  const User = module.default;

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    // Admin credentials
    const adminData = {
      name: 'Admin User',
      email: 'admin@hsracegear.com',
      password: 'Admin@123',
      phone: '+91-9999999999',
      role: 'admin',
      isActive: true
    };

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists with email:', adminData.email);
      console.log('Email: admin@hsracegear.com');
      console.log('Password: Admin@123');
      mongoose.connection.close();
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(adminData.password, 10);
    adminData.password = hashedPassword;

    // Create admin user
    const admin = new User(adminData);
    await admin.save();

    console.log('🎉 Admin user created successfully!');
    console.log('\n📋 Admin Credentials:');
    console.log('━'.repeat(40));
    console.log(`Email:    admin@hsracegear.com`);
    console.log(`Password: Admin@123`);
    console.log('━'.repeat(40));
    console.log('\n✅ You can now login to the admin panel at /admin');

    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    mongoose.connection.close();
    process.exit(1);
  }
});
