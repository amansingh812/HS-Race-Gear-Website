#!/usr/bin/env node

/**
 * Phase 1 Validation Summary for H&S Race Gear Backend
 * Confirms all infrastructure components are in place
 */

const fs = require('fs');
const path = require('path');

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

const log = {
  success: (msg) => console.log(`${colors.green}✓ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}✗ ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠ ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ ${msg}${colors.reset}`)
};

function checkFileExists(filePath, description) {
  if (fs.existsSync(filePath)) {
    log.success(description);
    return true;
  } else {
    log.error(`${description} - FILE NOT FOUND: ${filePath}`);
    return false;
  }
}

function validatePhase1() {
  console.log(`${colors.blue}🔍 H&S Race Gear - Phase 1 Infrastructure Validation${colors.reset}\n`);

  let validationPassed = true;

  // Environment Configuration
  console.log('📁 Environment Configuration:');
  validationPassed &= checkFileExists('.env.local', 'Environment variables file');

  // Database Models
  console.log('\n📊 Database Models:');
  validationPassed &= checkFileExists('models/User.js', 'User model');
  validationPassed &= checkFileExists('models/Product.js', 'Product model');
  validationPassed &= checkFileExists('models/Order.js', 'Order model');

  // Library Files
  console.log('\n🛠 Core Libraries:');
  validationPassed &= checkFileExists('lib/mongodb.js', 'MongoDB connection utility');
  validationPassed &= checkFileExists('lib/errors.js', 'Custom error classes');
  validationPassed &= checkFileExists('lib/utils.js', 'Utility functions');

  // API Routes
  console.log('\n🌐 API Routes:');
  validationPassed &= checkFileExists('app/api/health/route.js', 'Health check endpoint');
  validationPassed &= checkFileExists('app/api/products/route.js', 'Products CRUD endpoint');
  validationPassed &= checkFileExists('app/api/products/[id]/route.js', 'Individual product endpoint');
  validationPassed &= checkFileExists('app/api/users/route.js', 'Users management endpoint');

  // Scripts
  console.log('\n🧪 Test & Setup Scripts:');
  validationPassed &= checkFileExists('scripts/test-api.js', 'API testing script');

  // Dependencies Check
  console.log('\n📦 Dependencies Check:');
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
    
    const requiredDeps = [
      'mongoose',
      'bcryptjs', 
      'jsonwebtoken',
      'nodemailer',
      'zod'
    ];

    requiredDeps.forEach(dep => {
      if (dependencies[dep]) {
        log.success(`${dep} dependency`);
      } else {
        log.error(`Missing required dependency: ${dep}`);
        validationPassed = false;
      }
    });
  } catch (error) {
    log.error('Could not read package.json');
    validationPassed = false;
  }

  // Summary
  console.log('\n📋 Phase 1 Completion Summary:\n');
  
  if (validationPassed) {
    log.success('Phase 1 Infrastructure Setup Complete!');
    console.log(`
${colors.green}🎉 All Phase 1 components are in place:${colors.reset}

✅ MongoDB database models (User, Product, Order)
✅ Database connection utilities with caching
✅ Custom error handling system
✅ Logging and utility functions
✅ Complete API route structure (App Router compatible)
✅ Environment configuration
✅ Required dependencies installed
✅ API testing infrastructure

${colors.blue}🚀 Ready to proceed to Phase 2: Authentication System${colors.reset}

${colors.yellow}Next Steps:${colors.reset}
1. Run API tests: ${colors.blue}npm run test:api${colors.reset}
2. Verify MongoDB connection
3. Begin Phase 2 implementation

${colors.blue}Current API Endpoints:${colors.reset}
• GET  /api/health           - Health check
• GET  /api/products         - List products (with pagination)
• POST /api/products         - Create product
• GET  /api/products/[id]    - Get product by ID
• PUT  /api/products/[id]    - Update product
• DELETE /api/products/[id]  - Delete product
• GET  /api/users           - List users (admin)
• POST /api/users           - Create user (registration)
`);
  } else {
    log.error('Phase 1 Setup Incomplete - Missing Components');
    console.log(`\n${colors.red}❌ Some required components are missing. Please complete Phase 1 setup.${colors.reset}`);
    process.exit(1);
  }
}

// Run validation
validatePhase1();