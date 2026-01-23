# Phase 2 Authentication - Quick Start Testing Guide

## 🚀 Quick Start

### 1. Ensure Server is Running
```bash
npm run dev
```
Server should be at: http://localhost:3000

---

## 🧪 Testing Authentication Endpoints

### Test 1: Health Check
```bash
curl http://localhost:3000/api/health
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "status": "ok",
    "services": {
      "api": "healthy",
      "database": "connected"
    }
  }
}
```

---

### Test 2: User Registration
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@hsracegear.com",
    "password": "password123",
    "phone": "+1234567890"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "...",
      "name": "Test User",
      "email": "test@hsracegear.com",
      "role": "customer"
    }
  }
}
```

**📝 Save the token from the response! You'll need it for authenticated requests.**

---

### Test 3: User Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@hsracegear.com",
    "password": "password123"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": { ... }
  }
}
```

---

### Test 4: Get User Profile (Protected Route)
```bash
# Replace YOUR_TOKEN_HERE with actual token from login/register
curl http://localhost:3000/api/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "...",
      "name": "Test User",
      "email": "test@hsracegear.com",
      "role": "customer",
      "addresses": []
    }
  }
}
```

**❌ Without Token:**
```bash
curl http://localhost:3000/api/profile
```
Should return 401 Unauthorized.

---

### Test 5: Update Profile
```bash
curl -X PUT http://localhost:3000/api/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Name",
    "phone": "+1987654321"
  }'
```

---

### Test 6: Add Address
```bash
curl -X POST http://localhost:3000/api/profile/addresses \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "street": "123 Race Track Road",
    "city": "Daytona Beach",
    "state": "FL",
    "zipCode": "32114",
    "country": "USA",
    "isDefault": true
  }'
```

---

### Test 7: Forgot Password
```bash
curl -X POST http://localhost:3000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@hsracegear.com"
  }'
```

**Note:** This will try to send an email. Check server logs for the reset URL if email is not configured.

---

### Test 8: Logout
```bash
curl -X POST http://localhost:3000/api/auth/logout \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🎯 Browser Testing (Postman Alternative)

### Using Browser Console

**1. Registration:**
```javascript
fetch('http://localhost:3000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Browser User',
    email: 'browser@test.com',
    password: 'password123'
  })
})
.then(res => res.json())
.then(data => {
  console.log('Registration:', data);
  localStorage.setItem('token', data.data.token);
});
```

**2. Login:**
```javascript
fetch('http://localhost:3000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'browser@test.com',
    password: 'password123'
  })
})
.then(res => res.json())
.then(data => {
  console.log('Login:', data);
  localStorage.setItem('token', data.data.token);
});
```

**3. Get Profile:**
```javascript
const token = localStorage.getItem('token');

fetch('http://localhost:3000/api/profile', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(res => res.json())
.then(data => console.log('Profile:', data));
```

**4. Update Profile:**
```javascript
const token = localStorage.getItem('token');

fetch('http://localhost:3000/api/profile', {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Updated Browser User'
  })
})
.then(res => res.json())
.then(data => console.log('Updated:', data));
```

---

## 📋 Test Checklist

- [ ] Registration creates new user
- [ ] Login returns valid token
- [ ] Protected routes reject requests without token
- [ ] Protected routes work with valid token
- [ ] Profile update works
- [ ] Address CRUD operations work
- [ ] Password change works
- [ ] Forgot password generates reset token
- [ ] Token refresh works
- [ ] Logout clears session

---

## 🔍 Common Issues & Solutions

### Issue: "Authentication failed" or "Invalid token"
**Solution:**
- Make sure token is being sent correctly in Authorization header
- Check token format: `Bearer YOUR_TOKEN`
- Token might be expired (7-day expiration)

### Issue: "User with this email already exists"
**Solution:**
- Use a different email
- Or manually delete the user from MongoDB

### Issue: Database connection errors
**Solution:**
- Check MONGODB_URI in .env.local
- Ensure MongoDB Atlas IP whitelist includes your IP
- Verify database credentials

### Issue: Email not sending
**Solution:**
- Check EMAIL_SERVER_* variables in .env.local
- For Gmail: Enable "App Passwords" in Google Account settings
- Check server logs for detailed error messages

---

## 🎨 Frontend Integration Example

### Simple Login Form (React)
```jsx
import { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        window.location.href = '/dashboard';
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      
      {error && <div className="error">{error}</div>}
      
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      
      <button type="submit">Login</button>
    </form>
  );
}
```

---

## 📊 Expected Data Flow

```
User Registration
   ↓
Email: test@example.com
Password: password123 (plain text)
   ↓
Backend hashes password
   ↓
Stored in DB: $2a$12$R9h/cIPz0gi...
   ↓
Generate JWT token
   ↓
Return token to frontend
   ↓
Frontend stores in localStorage
   ↓
Include in future API requests
   ↓
Backend verifies token
   ↓
Access granted ✅
```

---

## 🎓 Learning Path

1. **Start Here:** Test basic registration and login
2. **Next:** Try protected routes (profile)
3. **Then:** Test password reset flow
4. **Finally:** Integrate with frontend components

**Happy Testing!** 🚀