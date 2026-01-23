# Quick Start Guide - Authentication System

## 🚀 Get Started in 5 Minutes

This guide helps you get the authentication system running quickly.

---

## Prerequisites

- Node.js installed (v18 or higher)
- MongoDB database (MongoDB Atlas or local)
- Gmail account (for sending emails)

---

## Step 1: Install Dependencies

```bash
cd /path/to/HS-Race-Gear-Website
npm install
```

Dependencies already installed:
- ✅ next
- ✅ react
- ✅ mongoose
- ✅ bcryptjs
- ✅ jsonwebtoken
- ✅ nodemailer
- ✅ zod
- ✅ next-auth

---

## Step 2: Set Up Environment Variables

1. Copy the template:
```bash
cp .env.example .env.local
```

2. Edit `.env.local` with your values:

### Minimum Required (to get started):

```env
# Database (Required)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hsracegear?retryWrites=true&w=majority

# JWT Secrets (Required - generate with: openssl rand -base64 32)
JWT_SECRET=your-random-secret-here
JWT_REFRESH_SECRET=another-random-secret-here

# NextAuth (Required - generate with: openssl rand -base64 32)
NEXTAUTH_SECRET=nextauth-random-secret-here
NEXTAUTH_URL=http://localhost:3000

# Email (Required for password reset)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-gmail-app-password
SMTP_FROM=noreply@hsracegear.com
```

### Optional (for OAuth - can add later):

```env
# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Facebook OAuth (Optional)
FACEBOOK_CLIENT_ID=your-facebook-app-id
FACEBOOK_CLIENT_SECRET=your-facebook-app-secret
```

---

## Step 3: Generate Secrets

Run these commands and paste results into `.env.local`:

```bash
# Generate JWT_SECRET
openssl rand -base64 32

# Generate JWT_REFRESH_SECRET
openssl rand -base64 32

# Generate NEXTAUTH_SECRET
openssl rand -base64 32
```

---

## Step 4: Set Up MongoDB

### Option A: MongoDB Atlas (Recommended - Free)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create a cluster (free tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database password
7. Replace `<database>` with `hsracegear`
8. Paste into `MONGODB_URI` in `.env.local`

### Option B: Local MongoDB

```bash
# Install MongoDB locally
brew install mongodb-community  # macOS
# or download from mongodb.com

# Start MongoDB
brew services start mongodb-community

# Use this connection string
MONGODB_URI=mongodb://localhost:27017/hsracegear
```

---

## Step 5: Set Up Gmail for Emails

### Get Gmail App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification (if not enabled)
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Select "Mail" and "Other (Custom name)"
5. Enter "HS Race Gear"
6. Click "Generate"
7. Copy the 16-character password
8. Paste into `SMTP_PASSWORD` in `.env.local`

### Update SMTP Settings

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-actual-email@gmail.com
SMTP_PASSWORD=your-16-char-app-password
SMTP_FROM=noreply@hsracegear.com
```

---

## Step 6: Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Step 7: Test Authentication

### Test Registration
1. Click "Login" button
2. Click "Create an account"
3. Fill in:
   - First name: John
   - Last name: Doe
   - Email: john@example.com
   - Password: password123
   - Confirm Password: password123
4. Click "Sign up"
5. Should redirect to account page

### Test Login
1. Logout (if logged in)
2. Click "Login" button
3. Enter:
   - Email: john@example.com
   - Password: password123
4. Click "Sign in"
5. Should redirect to account page

### Test Password Reset
1. Click "Forgot your password?"
2. Enter: john@example.com
3. Click "Reset Password"
4. Check your email inbox
5. Click the reset link
6. Set new password

---

## Optional: Set Up OAuth (Later)

If you want Google/Facebook login, follow the detailed guide:
- See `OAUTH_SETUP_GUIDE.md` for complete instructions

Without OAuth configured:
- Email/password authentication works
- Password reset works
- OAuth buttons won't work (need credentials)

---

## Troubleshooting

### "Cannot connect to MongoDB"
- Check `MONGODB_URI` is correct
- Verify MongoDB Atlas IP whitelist (add 0.0.0.0/0 for testing)
- Check database username/password
- Ensure cluster is active

### "Email not sending"
- Verify Gmail App Password is correct (16 chars, no spaces)
- Check 2-Step Verification is enabled
- Try different email provider if Gmail doesn't work
- Check SMTP settings match exactly

### "JWT_SECRET not defined"
- Ensure `.env.local` exists in project root
- Check all secrets are generated and added
- Restart dev server after adding env vars

### Port 3000 already in use
```bash
# Kill the process
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

### Database errors on startup
- Normal if MongoDB isn't configured yet
- App will run but auth features won't work
- Configure MongoDB to enable full functionality

---

## What Works Without OAuth

✅ Email/password registration
✅ Email/password login
✅ Password reset via email
✅ User profile management
✅ Protected routes
✅ Session management
✅ Logout

❌ Google sign-in (needs OAuth setup)
❌ Facebook sign-in (needs OAuth setup)

---

## Next Steps After Setup

1. **Test all features:**
   - Register a user
   - Login
   - Reset password
   - Update profile
   - Logout

2. **Set up OAuth (optional):**
   - Follow `OAUTH_SETUP_GUIDE.md`
   - Get Google/Facebook credentials
   - Add to `.env.local`

3. **Customize:**
   - Update email templates (`lib/email.js`)
   - Modify password requirements
   - Add profile fields
   - Customize redirects

4. **Deploy:**
   - Choose hosting (Vercel, AWS, etc.)
   - Set production environment variables
   - Update OAuth redirect URIs
   - Configure production MongoDB

---

## Configuration Checklist

Before marking as complete, ensure:

- [x] `.env.local` exists
- [x] MongoDB connection string added
- [x] JWT secrets generated (3 total)
- [x] NextAuth secret generated
- [x] SMTP credentials configured
- [x] Gmail app password obtained
- [x] Dev server starts successfully
- [x] Can register a new user
- [x] Can login with email/password
- [x] Can reset password (receives email)
- [x] No console errors

Optional:
- [ ] Google OAuth credentials
- [ ] Facebook OAuth credentials
- [ ] Production environment variables

---

## Useful Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Generate random secret
openssl rand -base64 32

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Check MongoDB connection
# (Add to a test file)
npm run dev
# Then visit: http://localhost:3000/api/health
```

---

## File Locations

**Configuration:**
- `.env.local` - Your environment variables (create this)
- `.env.example` - Template for env vars

**Authentication Code:**
- `app/api/auth/*` - Backend API routes
- `components/modals/Login.jsx` - Login form
- `components/modals/Register.jsx` - Registration form
- `components/modals/ResetPass.jsx` - Password reset form
- `context/AuthContext.js` - Auth state management

**Documentation:**
- `QUICK_START.md` - This file
- `OAUTH_SETUP_GUIDE.md` - OAuth configuration
- `FRONTEND_AUTH_COMPLETE.md` - Implementation details
- `PHASE2_TESTING_GUIDE.md` - API testing guide

---

## Support

If you get stuck:

1. Check the error message carefully
2. Review the troubleshooting section
3. Verify all environment variables are set
4. Check MongoDB connection
5. Ensure all dependencies are installed
6. Restart the dev server

For detailed explanations:
- Read `FRONTEND_AUTH_COMPLETE.md`
- Read `PHASE2_LEARNING_GUIDE.md`
- Check `OAUTH_SETUP_GUIDE.md` for OAuth

---

## Success! 🎉

Once you see the login modal and can register/login, your authentication system is working!

You now have:
- ✅ Complete user authentication
- ✅ Secure password handling
- ✅ Email functionality
- ✅ Session management
- ✅ Protected routes
- ✅ Production-ready code

**Ready to move to Phase 3: Shopping Cart & Products!**
