# Troubleshooting Guide

## Signup Issues Fixed

### What Was Fixed

1. **Better Error Handling**
   - Added duplicate email detection before database insert
   - Improved error messages for constraint violations
   - Proper HTTP status codes (409 for conflicts)

2. **Database Error Propagation**
   - Fixed UNIQUE constraint error handling in database layer
   - Errors now properly bubble up with correct error codes

3. **User-Friendly Error Messages**
   - "Email already registered" instead of generic errors
   - Clear validation messages for password requirements

## How to Start the Application

### Option 1: Use the Startup Script (Recommended)

**Windows:**
```bash
start-dev.bat
```

**Mac/Linux:**
```bash
chmod +x start-dev.sh
./start-dev.sh
```

### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Testing Signup

1. Open http://localhost:5173/signup
2. Fill in the form:
   - Name: Your Name
   - Email: your.email@example.com
   - Password: minimum 6 characters
   - Confirm Password: same as password
   - Role: Choose any role

3. Click "Sign Up"

### Expected Results

✅ **Success**: Automatically logged in and redirected to dashboard
❌ **Email exists**: "Email already registered" error
❌ **Password mismatch**: "Passwords do not match" error
❌ **Short password**: "Password must be at least 6 characters" error

## Common Issues and Solutions

### Issue 1: "Signup failed" Error

**Symptoms:**
- Generic "Signup failed" message
- No specific error details

**Possible Causes:**
1. Backend server not running
2. Database not initialized
3. Network connection issue

**Solutions:**

1. **Check Backend Server**
   ```bash
   # Make sure this is running in a terminal
   npm run dev
   ```
   You should see:
   ```
   ✅ Database initialized
   🚀 Server running on port 3000
   ```

2. **Initialize Database**
   ```bash
   npm run seed
   ```

3. **Check Browser Console**
   - Open Developer Tools (F12)
   - Look for network errors
   - Check if API calls are reaching http://localhost:3000

### Issue 2: "Email already registered"

**Symptoms:**
- Can't sign up with an email

**Cause:**
- Email already exists in database

**Solutions:**

1. **Use a different email**
   - Try a new email address

2. **Delete existing user** (if testing)
   - Stop the backend server
   - Delete `finance.db` file
   - Run `npm run seed` to recreate database
   - Restart backend server

### Issue 3: Network Error / CORS Error

**Symptoms:**
- "Network Error" in browser console
- CORS policy errors

**Cause:**
- Backend not running
- Proxy misconfigured

**Solutions:**

1. **Verify Backend is Running**
   ```bash
   curl http://localhost:3000/health
   ```
   Should return: `{"status":"ok","timestamp":"..."}`

2. **Check Vite Proxy**
   - File: `frontend/vite.config.ts`
   - Should have:
   ```typescript
   proxy: {
     '/api': {
       target: 'http://localhost:3000',
       changeOrigin: true
     }
   }
   ```

3. **Restart Frontend**
   ```bash
   cd frontend
   npm run dev
   ```

### Issue 4: Port Already in Use

**Symptoms:**
- "Port 3000 is already in use"
- "Port 5173 is already in use"

**Solutions:**

**Windows:**
```bash
# Find process using port 3000
netstat -ano | findstr :3000
# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Find process using port 5173
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Find and kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### Issue 5: Dependencies Not Installed

**Symptoms:**
- "Cannot find module" errors
- Import errors

**Solutions:**

```bash
# Backend dependencies
npm install

# Frontend dependencies
cd frontend
npm install
cd ..
```

## Verification Steps

After starting both servers, verify everything is working:

1. **Backend Health Check**
   ```bash
   curl http://localhost:3000/health
   ```
   Expected: `{"status":"ok","timestamp":"..."}`

2. **Frontend Loading**
   - Open http://localhost:5173
   - Should see the login page

3. **API Connection**
   - Open browser Developer Tools (F12)
   - Go to Network tab
   - Try to login or signup
   - Should see API calls to `/api/auth/...`

## Still Having Issues?

1. **Check Backend Logs**
   - Look at the terminal running `npm run dev`
   - Check for error messages

2. **Check Browser Console**
   - Press F12 to open Developer Tools
   - Look for JavaScript errors
   - Check Network tab for failed requests

3. **Verify Environment Variables**
   - Check `.env` file exists in root directory
   - Should contain:
   ```
   PORT=3000
   JWT_SECRET=finance-backend-secret-key-change-in-production-2024
   NODE_ENV=development
   ```

4. **Clean Start**
   ```bash
   # Stop all servers
   # Delete node_modules
   rm -rf node_modules frontend/node_modules
   
   # Delete database
   rm finance.db
   
   # Reinstall
   npm install
   cd frontend && npm install && cd ..
   
   # Seed database
   npm run seed
   
   # Start fresh
   npm run dev
   ```

## Test Accounts

After running `npm run seed`, these accounts are available:

| Email | Password | Role |
|-------|----------|------|
| admin@example.com | admin123 | admin |
| analyst@example.com | analyst123 | analyst |
| viewer@example.com | viewer123 | viewer |

You can login with these or create new accounts via signup.
