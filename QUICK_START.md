# Quick Start Guide

## 🚨 IMPORTANT: First Time Setup

If this is your first time running the application, please follow [START_HERE.md](START_HERE.md) for detailed step-by-step instructions.

## Quick Start (After Initial Setup)

### Windows
```bash
start-dev.bat
```

### Mac/Linux
```bash
chmod +x start-dev.sh
./start-dev.sh
```

### Manual (Both Platforms)
```bash
# Terminal 1
npm run dev

# Terminal 2
cd frontend
npm run dev
```

## Access the Application

- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- Health Check: http://localhost:3000/health

## Test Accounts (after running `npm run seed`)

| Email | Password | Role |
|-------|----------|------|
| admin@example.com | admin123 | admin |
| analyst@example.com | analyst123 | analyst |
| viewer@example.com | viewer123 | viewer |

## Create New Account

1. Go to http://localhost:5173/signup
2. Fill in:
   - Name
   - Email (must be unique)
   - Password (min 6 characters)
   - Confirm Password
   - Role
3. Click "Sign Up"
4. You'll be automatically logged in

## Troubleshooting

### Backend won't start
```bash
npm install
npm run seed
npm run dev
```

### Frontend won't start
```bash
cd frontend
npm install
npm run dev
```

### "Signup failed" error
- Make sure backend is running (`npm run dev`)
- Check backend terminal for errors
- Try a different email address

### Port already in use

**Windows:**
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
lsof -ti:3000 | xargs kill -9
```

## Features

- ✅ User signup with role selection
- ✅ Auto-login after signup
- ✅ JWT authentication
- ✅ Role-based access control
- ✅ Financial records management
- ✅ Dashboard with analytics
- ✅ User management (admin only)

## Need Help?

See `TROUBLESHOOTING.md` for detailed solutions.
