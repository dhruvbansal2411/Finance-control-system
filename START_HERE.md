# 🚀 Start Here - Quick Setup Guide

## Step-by-Step Instructions

### Step 1: Delete Old Database (Important!)
```bash
# Windows
del finance.db

# Mac/Linux
rm finance.db
```

### Step 2: Install Dependencies

**Backend:**
```bash
npm install
```

**Frontend:**
```bash
cd frontend
npm install
cd ..
```

### Step 3: Create Database with Test Users
```bash
npm run seed
```

You should see:
```
✓ Admin user created: admin@example.com
✓ Analyst user created: analyst@example.com
✓ Viewer user created: viewer@example.com
✓ Created 50 financial records
```

### Step 4: Start Backend Server
```bash
# Open a new terminal
npm run dev
```

You should see:
```
✅ Database initialized
🚀 Server running on port 3000
```

### Step 5: Start Frontend Server
```bash
# Open another new terminal
cd frontend
npm run dev
```

You should see:
```
Local: http://localhost:5173/
```

### Step 6: Open Browser
Go to: **http://localhost:5173**

### Step 7: Login with Test Credentials

**Admin Account (Full Access):**
- Email: `admin@example.com`
- Password: `admin123`

**Analyst Account (Read-Only):**
- Email: `analyst@example.com`
- Password: `analyst123`

**Viewer Account (Read-Only):**
- Email: `viewer@example.com`
- Password: `viewer123`

---

## Troubleshooting

### Issue: "Login failed" or Nothing Happens

**Solution 1: Check Backend is Running**
```bash
# Test backend health
curl http://localhost:3000/health
```

Should return: `{"status":"ok","timestamp":"..."}`

If not working:
- Make sure backend terminal is running `npm run dev`
- Check for errors in backend terminal

**Solution 2: Check Database is Seeded**
```bash
# Re-seed database
npm run seed
```

**Solution 3: Check Browser Console**
- Press F12 to open Developer Tools
- Go to Console tab
- Look for error messages
- Check Network tab for failed requests

### Issue: "Email already registered" when signing up

**Solution:**
Use a different email address or delete the database and re-seed:
```bash
# Windows
del finance.db
npm run seed

# Mac/Linux
rm finance.db
npm run seed
```

### Issue: Port Already in Use

**Backend (Port 3000):**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

**Frontend (Port 5173):**
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5173 | xargs kill -9
```

### Issue: Signup Not Redirecting to Dashboard

**Check:**
1. Backend is running (http://localhost:3000/health)
2. Browser console for errors (F12)
3. Network tab shows successful API calls

**Solution:**
- Make sure both backend and frontend are running
- Check browser console for JavaScript errors
- Try logging in manually after signup

---

## Quick Test

### Test Backend API
```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@example.com\",\"password\":\"admin123\"}"
```

Should return a token and user data.

### Test Frontend
1. Open http://localhost:5173
2. Enter: admin@example.com / admin123
3. Click "Sign In"
4. Should redirect to dashboard

---

## Common Mistakes

❌ **Using old email addresses**
- Old: admin@test.com
- New: admin@example.com

❌ **Not running backend**
- Frontend needs backend to be running
- Start backend first, then frontend

❌ **Not seeding database**
- Run `npm run seed` before first use
- Creates test users and sample data

❌ **Wrong port**
- Backend: http://localhost:3000
- Frontend: http://localhost:5173

---

## Verification Checklist

Before testing, verify:

- [ ] Backend dependencies installed (`npm install`)
- [ ] Frontend dependencies installed (`cd frontend && npm install`)
- [ ] Database seeded (`npm run seed`)
- [ ] Backend running (`npm run dev` in terminal 1)
- [ ] Frontend running (`cd frontend && npm run dev` in terminal 2)
- [ ] Backend health check works (`curl http://localhost:3000/health`)
- [ ] Browser opened to http://localhost:5173

---

## Need More Help?

1. Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for detailed solutions
2. Check [QUICK_START.md](QUICK_START.md) for more information
3. Check browser console (F12) for error messages
4. Check backend terminal for error logs

---

## Success Indicators

✅ Backend terminal shows: "🚀 Server running on port 3000"
✅ Frontend terminal shows: "Local: http://localhost:5173/"
✅ Browser shows login page
✅ Login with admin@example.com works
✅ Dashboard loads with charts and data

**If all above are ✅, you're ready to go!** 🎉
