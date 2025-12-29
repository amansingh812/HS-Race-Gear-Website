#!/usr/bin/env node

/**
 * API Test Script for H&S Race Gear Backend
 * Tests all API endpoints to ensure Phase 1 infrastructure is working
 */

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

const BASE_URL = 'http://localhost:3000/api';
let testResults = {
  passed: 0,
  failed: 0,
  total: 0
};

// Helper function to make HTTP requests
async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    const data = await response.json();
    
    return {
      ok: response.ok,
      status: response.status,
      data
    };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      error: error.message
    };
  }
}

// Test function wrapper
async function test(name, testFn) {
  testResults.total++;
  
  try {
    await testFn();
    testResults.passed++;
    log.success(name);
  } catch (error) {
    testResults.failed++;
    log.error(`${name}: ${error.message}`);
  }
}

// Health Check Tests
async function testHealthCheck() {
  await test('Health Check - GET /api/health', async () => {
    const response = await request('/health');
    
    if (!response.ok) {
      throw new Error(`Health check failed with status ${response.status}`);
    }
    
    if (!response.data.status || response.data.status !== 'ok') {
      throw new Error('Health check returned invalid status');
    }
  });
}

// Product Tests
async function testProducts() {
  let createdProductId;
  
  // Test GET /api/products (empty list initially)
  await test('Products - GET /api/products', async () => {
    const response = await request('/products');
    
    if (!response.ok) {
      throw new Error(`GET products failed with status ${response.status}`);
    }
    
    if (!response.data.success) {
      throw new Error('GET products returned invalid response structure');
    }
  });

  // Test POST /api/products (create product)
  await test('Products - POST /api/products', async () => {
    const testProduct = {
      name: 'Test Racing Helmet',
      description: 'High-performance racing helmet for testing',
      price: 299.99,
      sku: 'TEST-HELMET-001',
      category: 'Safety Gear',
      brand: 'TestBrand',
      inStock: true,
      stockQuantity: 10,
      specifications: {
        material: 'Carbon Fiber',
        weight: '1.2kg',
        certification: 'FIA 8859-2015'
      }
    };

    const response = await request('/products', {
      method: 'POST',
      body: JSON.stringify(testProduct)
    });
    
    if (!response.ok) {
      throw new Error(`POST product failed with status ${response.status}: ${JSON.stringify(response.data)}`);
    }
    
    if (!response.data.success || !response.data.data._id) {
      throw new Error('POST product returned invalid response structure');
    }
    
    createdProductId = response.data.data._id;
  });

  // Test GET /api/products/[id]
  if (createdProductId) {
    await test('Products - GET /api/products/[id]', async () => {
      const response = await request(`/products/${createdProductId}`);
      
      if (!response.ok) {
        throw new Error(`GET product by ID failed with status ${response.status}`);
      }
      
      if (!response.data.success || !response.data.data) {
        throw new Error('GET product by ID returned invalid response structure');
      }
    });

    // Test PUT /api/products/[id]
    await test('Products - PUT /api/products/[id]', async () => {
      const updateData = {
        price: 349.99,
        stockQuantity: 15
      };

      const response = await request(`/products/${createdProductId}`, {
        method: 'PUT',
        body: JSON.stringify(updateData)
      });
      
      if (!response.ok) {
        throw new Error(`PUT product failed with status ${response.status}`);
      }
      
      if (!response.data.success || response.data.data.price !== 349.99) {
        throw new Error('PUT product did not update correctly');
      }
    });

    // Test DELETE /api/products/[id]
    await test('Products - DELETE /api/products/[id]', async () => {
      const response = await request(`/products/${createdProductId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error(`DELETE product failed with status ${response.status}`);
      }
      
      if (!response.data.success) {
        throw new Error('DELETE product returned invalid response structure');
      }
    });
  }
}

// User Tests
async function testUsers() {
  let createdUserId;
  
  // Test GET /api/users (empty list initially)
  await test('Users - GET /api/users', async () => {
    const response = await request('/users');
    
    if (!response.ok) {
      throw new Error(`GET users failed with status ${response.status}`);
    }
    
    if (!response.data.success) {
      throw new Error('GET users returned invalid response structure');
    }
  });

  // Test POST /api/users (create user)
  await test('Users - POST /api/users', async () => {
    const testUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      phone: '+1234567890',
      role: 'customer'
    };

    const response = await request('/users', {
      method: 'POST',
      body: JSON.stringify(testUser)
    });
    
    if (!response.ok) {
      throw new Error(`POST user failed with status ${response.status}: ${JSON.stringify(response.data)}`);
    }
    
    if (!response.data.success || !response.data.data._id) {
      throw new Error('POST user returned invalid response structure');
    }
    
    // Ensure password is not returned
    if (response.data.data.password) {
      throw new Error('Password should not be returned in response');
    }
    
    createdUserId = response.data.data._id;
  });

  // Test duplicate email validation
  await test('Users - POST duplicate email validation', async () => {
    const duplicateUser = {
      name: 'Another User',
      email: 'test@example.com', // Same email
      password: 'password123'
    };

    const response = await request('/users', {
      method: 'POST',
      body: JSON.stringify(duplicateUser)
    });
    
    if (response.ok) {
      throw new Error('Duplicate email should have been rejected');
    }
    
    if (response.status !== 409) {
      throw new Error(`Expected 409 conflict status, got ${response.status}`);
    }
  });
}

// Database Connectivity Test
async function testDatabaseConnectivity() {
  await test('Database Connectivity', async () => {
    // Test that we can connect and perform operations
    const response = await request('/users');
    
    if (!response.ok && response.status === 500) {
      throw new Error('Database connection failed');
    }
    
    // If we get here without errors, DB connection is working
  });
}

// Main test runner
async function runAllTests() {
  console.log(`${colors.blue}🧪 Starting H&S Race Gear API Tests${colors.reset}\n`);
  
  // Check if server is running
  log.info('Checking if development server is running...');
  try {
    const healthCheck = await request('/health');
    if (!healthCheck.ok) {
      throw new Error('Server not responding');
    }
    log.success('Development server is running');
  } catch (error) {
    log.error('Development server is not running. Please start with: npm run dev');
    process.exit(1);
  }

  console.log('\n📋 Running API Tests:\n');

  // Run all test suites
  await testHealthCheck();
  await testDatabaseConnectivity();
  await testProducts();
  await testUsers();

  // Print results
  console.log(`\n📊 Test Results:`);
  console.log(`${colors.green}✓ Passed: ${testResults.passed}${colors.reset}`);
  console.log(`${colors.red}✗ Failed: ${testResults.failed}${colors.reset}`);
  console.log(`📝 Total: ${testResults.total}`);

  if (testResults.failed === 0) {
    console.log(`\n${colors.green}🎉 All tests passed! Phase 1 backend infrastructure is working correctly.${colors.reset}`);
    console.log(`${colors.blue}✅ Ready to proceed to Phase 2: Authentication System${colors.reset}`);
  } else {
    console.log(`\n${colors.red}❌ Some tests failed. Please fix the issues before proceeding.${colors.reset}`);
    process.exit(1);
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Run tests
runAllTests().catch((error) => {
  console.error('Test runner error:', error);
  process.exit(1);
});