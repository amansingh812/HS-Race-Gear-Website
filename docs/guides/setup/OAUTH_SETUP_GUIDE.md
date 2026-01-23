# OAuth Setup Guide - Facebook & Google Authentication

## Overview
This guide explains how to set up Facebook and Google OAuth authentication for your HS Race Gear e-commerce website. OAuth allows users to sign in using their existing social media accounts instead of creating a new password.

## Prerequisites
- Next.js application with NextAuth.js installed
- Environment variables properly configured
- Developer accounts on Facebook and Google

---

## Part 1: Google OAuth Setup

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: `HS-Race-Gear` (or your preferred name)
4. Click "Create"

### Step 2: Enable Google+ API

1. In the Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for "Google+ API"
3. Click on it and press "Enable"

### Step 3: Create OAuth Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. If prompted, configure the OAuth consent screen:
   - User Type: External
   - App name: HS Race Gear
   - User support email: your email
   - Developer contact email: your email
   - Click "Save and Continue"
   - Scopes: Click "Save and Continue" (use defaults)
   - Test users: Add your email for testing
   - Click "Save and Continue"

4. Create OAuth Client ID:
   - Application type: Web application
   - Name: HS Race Gear Web Client
   - Authorized JavaScript origins:
     - `http://localhost:3000` (for development)
     - `https://yourdomain.com` (for production)
   - Authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (for development)
     - `https://yourdomain.com/api/auth/callback/google` (for production)
   - Click "Create"

5. **Save your credentials:**
   - Copy the **Client ID** (looks like: `123456789-abcdefg.apps.googleusercontent.com`)
   - Copy the **Client Secret** (looks like: `GOCSPX-abcdefghijklmnop`)

### Step 4: Add to Environment Variables

Add these to your `.env.local` file:
```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

---

## Part 2: Facebook OAuth Setup

### Step 1: Create a Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click "My Apps" → "Create App"
3. Select "Consumer" as the app type → Click "Next"
4. Fill in the details:
   - App Name: HS Race Gear
   - App Contact Email: your email
   - Click "Create App"

### Step 2: Add Facebook Login Product

1. In your app dashboard, find "Facebook Login" in the products list
2. Click "Set Up" on Facebook Login
3. Select "Web" as the platform
4. Enter your site URL: `http://localhost:3000` (for development)
5. Click "Save" and "Continue"

### Step 3: Configure Facebook Login Settings

1. In the left sidebar, go to "Facebook Login" → "Settings"
2. Configure the following:
   - **Valid OAuth Redirect URIs:**
     - `http://localhost:3000/api/auth/callback/facebook` (for development)
     - `https://yourdomain.com/api/auth/callback/facebook` (for production)
   - **Client OAuth Login:** Yes
   - **Web OAuth Login:** Yes
   - Click "Save Changes"

### Step 4: Get App Credentials

1. Go to "Settings" → "Basic" in the left sidebar
2. **Save your credentials:**
   - Copy the **App ID** (looks like: `1234567890123456`)
   - Click "Show" next to **App Secret** and copy it (looks like: `abcdef1234567890abcdef1234567890`)

### Step 5: Add to Environment Variables

Add these to your `.env.local` file:
```env
FACEBOOK_CLIENT_ID=your-facebook-app-id
FACEBOOK_CLIENT_SECRET=your-facebook-app-secret
```

---

## Part 3: NextAuth Configuration

### Step 1: Generate NextAuth Secret

Run this command in your terminal:
```bash
openssl rand -base64 32
```

Add the output to your `.env.local`:
```env
NEXTAUTH_SECRET=your-generated-secret-here
NEXTAUTH_URL=http://localhost:3000
```

For production:
```env
NEXTAUTH_URL=https://yourdomain.com
```

### Step 2: Complete Environment Variables

Your final `.env.local` file should include:

```env
# Database
MONGODB_URI=your-mongodb-connection-string

# JWT Secrets
JWT_SECRET=your-jwt-secret
JWT_REFRESH_SECRET=your-jwt-refresh-secret

# NextAuth
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Facebook OAuth
FACEBOOK_CLIENT_ID=your-facebook-app-id
FACEBOOK_CLIENT_SECRET=your-facebook-app-secret

# Email Configuration (for password reset)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@hsracegear.com
```

---

## Part 4: Testing OAuth Integration

### Test Google Login

1. Start your development server: `npm run dev`
2. Open your website: `http://localhost:3000`
3. Click the login button
4. Click "GOOGLE" button
5. Select your Google account
6. Grant permissions
7. You should be redirected back and logged in

### Test Facebook Login

1. Click the login button
2. Click "FACEBOOK" button
3. Log in with your Facebook account
4. Grant permissions
5. You should be redirected back and logged in

---

## Common Issues and Solutions

### Google OAuth Issues

**Issue: "Error 400: redirect_uri_mismatch"**
- **Solution:** Make sure the redirect URI in your Google Console exactly matches your NextAuth callback URL
- Check for http vs https
- Check for trailing slashes
- Verify the port number

**Issue: "Access blocked: This app's request is invalid"**
- **Solution:** Complete the OAuth consent screen configuration
- Make sure your email is added as a test user

### Facebook OAuth Issues

**Issue: "URL Blocked: This redirect failed"**
- **Solution:** Add the exact callback URL to "Valid OAuth Redirect URIs" in Facebook Login settings
- Format: `http://localhost:3000/api/auth/callback/facebook`

**Issue: "App Not Set Up: This app is still in development mode"**
- **Solution:** This is normal for development. Add your Facebook account as a test user in App Roles → Roles

### General OAuth Issues

**Issue: Users created via OAuth can't log in with email/password**
- **Solution:** This is expected behavior. OAuth users should continue using their social login method
- If needed, implement a "link accounts" feature to connect OAuth and password-based accounts

**Issue: User data not saved to database**
- **Solution:** Check the `signIn` callback in your NextAuth configuration
- Verify MongoDB connection is working
- Check console logs for errors

---

## Security Best Practices

1. **Never commit `.env.local` to version control**
   - Add it to `.gitignore`
   - Use `.env.example` as a template

2. **Use different credentials for development and production**
   - Create separate apps in Google/Facebook for prod
   - Use environment-specific redirect URIs

3. **Regularly rotate secrets**
   - Change NEXTAUTH_SECRET periodically
   - Update OAuth app secrets if compromised

4. **Validate user emails**
   - Google OAuth provides verified emails
   - Facebook OAuth may need additional verification

5. **Implement rate limiting**
   - Prevent OAuth abuse
   - Use libraries like `express-rate-limit`

---

## Production Checklist

Before deploying to production:

- [ ] Create production OAuth apps in Google Cloud Console
- [ ] Create production Facebook app
- [ ] Update redirect URIs with production domain
- [ ] Set production environment variables
- [ ] Test OAuth flows in production environment
- [ ] Complete OAuth consent screen (Google)
- [ ] Submit Facebook app for review (if needed for public use)
- [ ] Enable HTTPS for your domain
- [ ] Configure proper CORS settings
- [ ] Set up error monitoring (Sentry, etc.)

---

## User Experience Flow

### First-time OAuth User
1. User clicks "Sign in with Google/Facebook"
2. Redirected to provider for authentication
3. User grants permissions
4. Account created in your database automatically
5. User redirected back to your site, logged in
6. Welcome email sent (optional)

### Returning OAuth User
1. User clicks "Sign in with Google/Facebook"
2. Redirected to provider (may auto-authenticate)
3. User redirected back to your site, logged in
4. No new account created, existing account used

---

## Additional Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Facebook Login Documentation](https://developers.facebook.com/docs/facebook-login)
- [OAuth 2.0 Explained](https://oauth.net/2/)

---

## Support

If you encounter issues:
1. Check the browser console for errors
2. Check Next.js server logs
3. Verify all environment variables are set correctly
4. Test with different browsers
5. Check provider-specific dashboards for errors

For development questions, consult the PHASE2_LEARNING_GUIDE.md for authentication concepts.
