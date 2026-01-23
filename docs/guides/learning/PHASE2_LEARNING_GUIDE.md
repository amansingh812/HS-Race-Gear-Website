# H&S Race Gear Backend - Phase 2 Learning Documentation

## 📚 Authentication System Complete Guide

### Table of Contents
1. [Understanding Authentication](#understanding-authentication)
2. [JWT Tokens Explained](#jwt-tokens-explained)
3. [Authentication Flow](#authentication-flow)
4. [Protected Routes](#protected-routes)
5. [Password Reset Flow](#password-reset-flow)
6. [User Profile Management](#user-profile-management)
7. [Frontend Integration Guide](#frontend-integration-guide)
8. [Security Best Practices](#security-best-practices)

---

## Understanding Authentication

### 🔐 What is Authentication?

**Frontend Analogy**: Like showing your ID card to enter a building
- **Authentication**: Proving who you are (login)
- **Authorization**: What you're allowed to do (permissions)

### Why Do We Need It?

**Without Authentication:**
```javascript
// Anyone can access any user's data
fetch('/api/profile') // Gets random profile? Security nightmare!
```

**With Authentication:**
```javascript
// Must prove identity first
fetch('/api/profile', {
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1...' // Your unique token
  }
})
```

---

## JWT Tokens Explained

### 🎫 What is a JWT?

**JWT (JSON Web Token)** = A secure way to represent user identity

**Frontend Analogy**: Like a concert wristband
- ✅ Given after you buy a ticket (login)
- ✅ Shows you're allowed to enter (authentication)
- ✅ Can't be faked (cryptographically signed)
- ✅ Has an expiration date

### JWT Structure

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTRhYmMxMjM0NTYiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20ifQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

HEADER.PAYLOAD.SIGNATURE
```

**Decoded Payload:**
```json
{
  "userId": "654abc123456",
  "email": "user@example.com",
  "role": "customer",
  "iat": 1672531200,  // Issued at
  "exp": 1673136000   // Expires
}
```

### How Tokens Work in Our System

```javascript
// 1. User logs in
POST /api/auth/login
Body: { email: "user@example.com", password: "password123" }

// 2. Server validates credentials
const isValid = await bcrypt.compare(password, user.password);

// 3. Server generates token
const token = jwt.sign(
  { userId: user._id, email: user.email },
  SECRET_KEY,
  { expiresIn: '7d' }
);

// 4. Client stores token
localStorage.setItem('token', token);

// 5. Client includes token in future requests
headers: { 'Authorization': `Bearer ${token}` }
```

---

## Authentication Flow

### 📝 User Registration Flow

```
Frontend                    Backend                     Database
   │                           │                            │
   │  POST /api/auth/register  │                            │
   │ ─────────────────────────>│                            │
   │                           │                            │
   │                           │ Validate input             │
   │                           │ (email format, password)   │
   │                           │                            │
   │                           │ Check if user exists       │
   │                           │ ─────────────────────────>│
   │                           │<───────────────────────────│
   │                           │ (user not found = OK)      │
   │                           │                            │
   │                           │ Hash password with bcrypt  │
   │                           │                            │
   │                           │ Create new user            │
   │                           │ ─────────────────────────>│
   │                           │<───────────────────────────│
   │                           │ (user saved)               │
   │                           │                            │
   │                           │ Generate JWT token         │
   │                           │                            │
   │<─────────────────────────│                            │
   │ { token, user }           │                            │
   │                           │                            │
   │ Store token in            │                            │
   │ localStorage              │                            │
```

**Implementation:**
```javascript
// Frontend - Registration
const registerUser = async (userData) => {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  
  const data = await response.json();
  
  if (data.success) {
    // Store token
    localStorage.setItem('token', data.data.token);
    localStorage.setItem('user', JSON.stringify(data.data.user));
    
    // Redirect to dashboard
    router.push('/dashboard');
  }
};
```

### 🔑 Login Flow

```
Frontend                    Backend                     Database
   │                           │                            │
   │  POST /api/auth/login     │                            │
   │ ─────────────────────────>│                            │
   │                           │                            │
   │                           │ Find user by email         │
   │                           │ ─────────────────────────>│
   │                           │<───────────────────────────│
   │                           │ (user found)               │
   │                           │                            │
   │                           │ Compare password:          │
   │                           │ bcrypt.compare(            │
   │                           │   inputPassword,           │
   │                           │   hashedPassword           │
   │                           │ )                          │
   │                           │                            │
   │                           │ Generate token             │
   │                           │                            │
   │<─────────────────────────│                            │
   │ { token, user }           │                            │
```

**Implementation:**
```javascript
// Frontend - Login
const loginUser = async (email, password) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  const data = await response.json();
  
  if (data.success) {
    localStorage.setItem('token', data.data.token);
    localStorage.setItem('user', JSON.stringify(data.data.user));
    return data.data.user;
  } else {
    throw new Error(data.error);
  }
};
```

### 🚪 Logout Flow

**Frontend Perspective:**
```javascript
const logoutUser = async () => {
  // Optional: Notify backend
  await fetch('/api/auth/logout', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  
  // Clear local storage
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  
  // Redirect to login
  router.push('/login');
};
```

**Why JWT Logout is Different:**
- **Sessions**: Server stores who's logged in (stateful)
- **JWT**: Server doesn't track tokens (stateless)
- **Logout**: Just delete token from client
- **Advanced**: Implement token blacklist on server

---

## Protected Routes

### 🛡️ Middleware Concept

**Frontend Analogy**: Like Route Guards in React Router

**Without Middleware:**
```javascript
// Every route must check authentication manually ❌
export async function GET(request) {
  const token = request.headers.get('authorization');
  if (!token) return error;
  const user = await verifyToken(token);
  if (!user) return error;
  // ... actual logic
}
```

**With Middleware:**
```javascript
// Middleware handles authentication automatically ✅
export const GET = requireAuth(async (request) => {
  // request.user is already available!
  const user = request.user;
  // ... actual logic
});
```

### 🔧 How Our Middleware Works

**lib/auth.js - requireAuth**
```javascript
export function requireAuth(handler) {
  return async (request, context) => {
    // 1. Extract token from Authorization header
    const authHeader = request.headers.get('authorization');
    // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    
    // 2. Verify token
    const decoded = await verifyToken(authHeader);
    // { userId: "123", email: "user@example.com" }
    
    // 3. Fetch user from database
    const user = await User.findById(decoded.userId);
    
    // 4. Check if user exists and is active
    if (!user || !user.isActive) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // 5. Attach user to request
    request.user = user;
    
    // 6. Call actual handler
    return await handler(request, context);
  };
}
```

### 👑 Admin-Only Routes

```javascript
export const DELETE = requireAdmin(async (request) => {
  // Only admins can reach this code
  const adminUser = request.user; // Has role: 'admin'
  // ... delete product logic
});
```

**Difference from requireAuth:**
- `requireAuth`: Any logged-in user
- `requireAdmin`: Only users with `role === 'admin'`

---

## Password Reset Flow

### 📧 Complete Password Reset Journey

**Step 1: User Forgets Password**
```
User                    Frontend                Backend                Email
 │                         │                        │                     │
 │ Clicks "Forgot          │                        │                     │
 │ Password"               │                        │                     │
 │                         │                        │                     │
 │ Enters email ──────────>│                        │                     │
 │                         │                        │                     │
 │                         │ POST /api/auth/        │                     │
 │                         │ forgot-password        │                     │
 │                         │───────────────────────>│                     │
 │                         │                        │                     │
 │                         │                        │ Generate reset      │
 │                         │                        │ token (random)      │
 │                         │                        │                     │
 │                         │                        │ Hash token          │
 │                         │                        │ Save to DB          │
 │                         │                        │                     │
 │                         │                        │ Send email ────────>│
 │                         │                        │                     │
 │<────────────────────────│                        │                     │
 │ "Email sent"            │                        │                     │
 │                         │                        │                     │
 │                    Opens email                   │                     │
 │<─────────────────────────────────────────────────────────────────────│
 │ Clicks reset link                                │                     │
```

**Step 2: User Resets Password**
```
User                    Frontend                Backend                Database
 │                         │                        │                     │
 │ Clicks reset link       │                        │                     │
 │ (with token)            │                        │                     │
 │                         │                        │                     │
 │ Opens /reset-password   │                        │                     │
 │ ?token=abc123def        │                        │                     │
 │                         │                        │                     │
 │ Enters new password ───>│                        │                     │
 │                         │                        │                     │
 │                         │ POST /api/auth/        │                     │
 │                         │ reset-password         │                     │
 │                         │ { token, password }    │                     │
 │                         │───────────────────────>│                     │
 │                         │                        │                     │
 │                         │                        │ Hash token          │
 │                         │                        │                     │
 │                         │                        │ Find user with      │
 │                         │                        │ matching token      │
 │                         │                        │ and not expired     │
 │                         │                        │───────────────────>│
 │                         │                        │<───────────────────│
 │                         │                        │ (user found)        │
 │                         │                        │                     │
 │                         │                        │ Hash new password   │
 │                         │                        │                     │
 │                         │                        │ Update user &       │
 │                         │                        │ clear reset token   │
 │                         │                        │───────────────────>│
 │                         │                        │                     │
 │<────────────────────────│                        │                     │
 │ "Password updated"      │                        │                     │
 │                         │                        │                     │
 │ Redirected to login     │                        │                     │
```

### 🔒 Security Measures

**Why Hash the Reset Token?**
```javascript
// If database is compromised, tokens are safe
const resetToken = crypto.randomBytes(32).toString('hex');
// Sent in email: "abc123def456..."

const hashedToken = crypto
  .createHash('sha256')
  .update(resetToken)
  .digest('hex');
// Stored in DB: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"

// Attacker can't use database token to reset password
```

**Token Expiration:**
```javascript
passwordResetExpires: Date.now() + 60 * 60 * 1000 // 1 hour

// When verifying:
const user = await User.findOne({
  passwordResetToken: hashedToken,
  passwordResetExpires: { $gt: Date.now() } // Must be in future
});
```

---

## User Profile Management

### 👤 Profile Endpoints

**GET /api/profile** - Get Current User
```javascript
// Frontend
const getProfile = async () => {
  const token = localStorage.getItem('token');
  
  const response = await fetch('/api/profile', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  const data = await response.json();
  return data.data.user;
};
```

**PUT /api/profile** - Update Profile
```javascript
// Frontend
const updateProfile = async (updates) => {
  const response = await fetch('/api/profile', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updates)
  });
  
  return await response.json();
};

// Usage
await updateProfile({
  name: 'John Doe',
  phone: '+1234567890'
});
```

**Change Password:**
```javascript
await updateProfile({
  currentPassword: 'old123',
  newPassword: 'new456',
  confirmNewPassword: 'new456'
});
```

### 📍 Address Management

**Add Address:**
```javascript
const addAddress = async (address) => {
  const response = await fetch('/api/profile/addresses', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(address)
  });
  
  return await response.json();
};

// Usage
await addAddress({
  street: '123 Race Track Rd',
  city: 'Daytona',
  state: 'FL',
  zipCode: '32114',
  country: 'USA',
  isDefault: true
});
```

**Update Address:**
```javascript
await fetch(`/api/profile/addresses/${addressId}`, {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ city: 'Miami' })
});
```

**Delete Address:**
```javascript
await fetch(`/api/profile/addresses/${addressId}`, {
  method: 'DELETE',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

---

## Frontend Integration Guide

### 🎨 React Context for Authentication

**Create Auth Context:**
```javascript
// context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (data.success) {
      setToken(data.data.token);
      setUser(data.data.user);
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
    }
    
    return data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```

**Use in Components:**
```javascript
// components/LoginForm.jsx
import { useAuth } from '@/context/AuthContext';

export default function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const result = await login(email, password);
      
      if (result.success) {
        router.push('/dashboard');
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}
```

### 🔐 Protected Pages

```javascript
// components/ProtectedRoute.jsx
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
}
```

**Usage:**
```javascript
// pages/dashboard.jsx
import ProtectedRoute from '@/components/ProtectedRoute';

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div>
        <h1>Dashboard</h1>
        {/* Dashboard content */}
      </div>
    </ProtectedRoute>
  );
}
```

### 📡 API Utility with Auth

```javascript
// lib/api.js
export const apiClient = {
  async request(url, options = {}) {
    const token = localStorage.getItem('token');
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(url, {
      ...options,
      headers
    });
    
    const data = await response.json();
    
    // Handle token expiration
    if (response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    return data;
  },
  
  get(url) {
    return this.request(url);
  },
  
  post(url, body) {
    return this.request(url, {
      method: 'POST',
      body: JSON.stringify(body)
    });
  },
  
  put(url, body) {
    return this.request(url, {
      method: 'PUT',
      body: JSON.stringify(body)
    });
  },
  
  delete(url) {
    return this.request(url, {
      method: 'DELETE'
    });
  }
};

// Usage
const user = await apiClient.get('/api/profile');
await apiClient.post('/api/profile', { name: 'New Name' });
```

---

## Security Best Practices

### ✅ What We Implemented

1. **Password Hashing (bcrypt)**
   - Never store plain text passwords
   - Salt rounds: 12 (good balance of security/performance)

2. **JWT Secret**
   - Strong, random secret key
   - Stored in environment variables
   - Never committed to Git

3. **Token Expiration**
   - Access tokens: 7 days
   - Refresh tokens: 30 days
   - Expired tokens automatically rejected

4. **Input Validation**
   - Email format validation
   - Password strength requirements
   - SQL injection prevention (Mongoose handles this)

5. **Error Messages**
   - Never reveal if user exists: "Invalid email or password"
   - Consistent response times (prevent timing attacks)

6. **HTTPS Only** (Production)
   - Tokens only sent over encrypted connections
   - Prevent man-in-the-middle attacks

### 🚨 Common Security Mistakes to Avoid

**❌ DON'T:**
```javascript
// Don't store sensitive data in JWT payload
const token = jwt.sign({
  password: user.password, // ❌ Never!
  creditCard: '1234-5678' // ❌ Never!
}, SECRET);

// Don't use weak secrets
JWT_SECRET="password123" // ❌ Too simple

// Don't trust client-side validation only
if (password.length >= 8) { // ❌ Client can bypass
  submit();
}

// Don't expose error details
return Response.json({
  error: error.stack // ❌ Reveals code structure
});
```

**✅ DO:**
```javascript
// Only store necessary, non-sensitive data
const token = jwt.sign({
  userId: user._id,
  role: user.role
}, SECRET);

// Use strong, random secrets
JWT_SECRET="be0e36705bf6861e..." // ✅ 256-bit random

// Always validate on server
if (!password || password.length < 8) { // ✅ Server-side
  return error;
}

// Generic error messages
return Response.json({
  error: 'Authentication failed' // ✅ Doesn't reveal details
});
```

---

## Phase 2 Summary

### ✅ What We Built

1. **Authentication Middleware** (`lib/auth.js`)
   - `requireAuth()` - Protect routes requiring login
   - `requireAdmin()` - Protect admin-only routes
   - `optionalAuth()` - Routes that work with or without auth

2. **Auth Endpoints**
   - `POST /api/auth/register` - User registration
   - `POST /api/auth/login` - User login
   - `POST /api/auth/logout` - User logout
   - `POST /api/auth/refresh` - Refresh access token
   - `POST /api/auth/forgot-password` - Request password reset
   - `POST /api/auth/reset-password` - Reset password with token

3. **Profile Management**
   - `GET /api/profile` - Get current user
   - `PUT /api/profile` - Update profile & change password
   - `POST /api/profile/addresses` - Add address
   - `PUT /api/profile/addresses/[id]` - Update address
   - `DELETE /api/profile/addresses/[id]` - Delete address

4. **Email System** (`lib/email.js`)
   - Password reset emails
   - Welcome emails
   - Order confirmation emails

5. **Security Features**
   - Password hashing with bcrypt
   - JWT token generation & verification
   - Refresh token system
   - Password reset with secure tokens
   - Token expiration

### 🎯 What You Learned

- **JWT Tokens**: How authentication works with stateless tokens
- **Middleware Pattern**: Reusable authentication checking
- **Password Security**: Hashing, salting, secure reset flows
- **Email Integration**: Server-side email sending
- **Frontend Integration**: How to connect React to auth APIs
- **Security Best Practices**: Common vulnerabilities and solutions

### 🚀 Ready for Phase 3!

With authentication complete, you now have:
- ✅ Secure user accounts
- ✅ Login/logout functionality
- ✅ Protected routes
- ✅ Profile management
- ✅ Password reset system

**Next: Phase 3 - Product Management & Shopping Cart**

---

*This documentation serves as both a reference and learning guide for understanding authentication systems from a frontend developer's perspective.*