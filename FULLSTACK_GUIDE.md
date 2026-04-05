# Finance Dashboard - Full Stack Application Guide

A complete finance management system with backend API and frontend dashboard.

## 🎯 Project Overview

This is a full-stack application for managing financial records with role-based access control.

### Backend
- **Tech**: Node.js + Express + TypeScript + SQLite
- **Port**: 3000
- **Features**: REST API, JWT auth, RBAC, data aggregation

### Frontend
- **Tech**: React + TypeScript + Vite
- **Port**: 5173
- **Features**: Dashboard, charts, CRUD operations, role-based UI

## 🚀 Quick Start

### 1. Start Backend

```bash
# Terminal 1
npm run dev
```

Backend runs on: http://localhost:3000

### 2. Start Frontend

```bash
# Terminal 2
cd frontend
npm run dev
```

Frontend runs on: http://localhost:5173

### 3. Access the Application

Open your browser and go to: **http://localhost:5173**

## 👥 Test Accounts

| Role | Email | Password | Permissions |
|------|-------|----------|-------------|
| **Admin** | admin@test.com | admin123 | Full access - can create, edit, delete records and manage users |
| **Analyst** | analyst@test.com | analyst123 | Read-only - can view dashboard and records |
| **Viewer** | viewer@test.com | viewer123 | Read-only - can view dashboard and records |

## 📱 Application Features

### Login Page
- Secure authentication with JWT
- Quick login buttons for demo accounts
- Form validation
- Error handling

### Dashboard (All Roles)
- **Summary Cards**: Total income, expense, net balance, transaction count
- **Monthly Trends**: Line chart showing income vs expense over 6 months
- **Category Distribution**: Pie chart of spending by category
- **Category Breakdown**: Bar chart of all categories
- **Recent Activity**: List of last 10 transactions

### Records Page (All Roles)
- **View Records**: Table view of all financial records
- **Filters**: Filter by type (income/expense), category, date range
- **Create Record** (Admin only): Add new transactions
- **Edit Record** (Admin only): Modify existing transactions
- **Delete Record** (Admin only): Remove transactions

### Users Page (Admin Only)
- **View All Users**: Card-based user list
- **Update Roles**: Change user roles (Viewer, Analyst, Admin)
- **Manage Status**: Activate or deactivate user accounts
- **User Details**: View join date and current status

## 🎨 UI/UX Features

### Design
- Modern gradient backgrounds
- Clean, professional interface
- Responsive layout (mobile-friendly)
- Smooth animations and transitions
- Intuitive navigation

### Color Coding
- **Income**: Green (#48bb78)
- **Expense**: Red (#f56565)
- **Primary**: Purple gradient (#667eea to #764ba2)
- **Admin**: Red badge
- **Analyst**: Blue badge
- **Viewer**: Green badge

### Interactive Elements
- Hover effects on cards and buttons
- Loading states for async operations
- Modal dialogs for forms
- Dropdown filters
- Responsive tables

## 🔐 Security Features

### Backend
- Password hashing with bcrypt
- JWT token authentication
- Role-based authorization middleware
- Input validation with express-validator
- SQL injection protection (prepared statements)
- Inactive user blocking

### Frontend
- Token stored in localStorage
- Automatic token inclusion in requests
- Auto-logout on 401 responses
- Protected routes
- Role-based UI rendering

## 📊 Data Flow

### Authentication Flow
```
1. User enters credentials
2. Frontend → POST /api/auth/login
3. Backend validates credentials
4. Backend returns JWT token + user data
5. Frontend stores token in localStorage
6. Token included in all subsequent requests
```

### Data Fetching Flow
```
1. Component mounts
2. Frontend → GET /api/endpoint (with token)
3. Backend validates token
4. Backend checks user permissions
5. Backend returns data
6. Frontend updates UI
```

### CRUD Operations Flow
```
1. User performs action (create/edit/delete)
2. Frontend → POST/PUT/DELETE /api/endpoint
3. Backend validates token and permissions
4. Backend performs operation
5. Backend returns result
6. Frontend refreshes data
```

## 🗂️ Project Structure

```
finance-backend/
├── src/
│   ├── config/          # Database configuration
│   ├── middleware/      # Auth, authorization, errors
│   ├── routes/          # API endpoints
│   ├── services/        # Business logic
│   ├── types/           # TypeScript types
│   ├── app.ts           # Express app
│   └── server.ts        # Server entry
├── frontend/
│   ├── src/
│   │   ├── api/         # Axios configuration
│   │   ├── components/  # React components
│   │   ├── contexts/    # React contexts
│   │   ├── pages/       # Page components
│   │   ├── types/       # TypeScript types
│   │   ├── App.tsx      # Main app
│   │   └── main.tsx     # Entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
├── finance.db           # SQLite database
├── package.json
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login

### Users
- `GET /api/users` - Get all users (Admin)
- `GET /api/users/me` - Get current user
- `PATCH /api/users/:id/status` - Update status (Admin)
- `PATCH /api/users/:id/role` - Update role (Admin)

### Records
- `GET /api/records` - Get all records (with filters)
- `GET /api/records/:id` - Get single record
- `POST /api/records` - Create record (Admin)
- `PUT /api/records/:id` - Update record (Admin)
- `DELETE /api/records/:id` - Delete record (Admin)

### Dashboard
- `GET /api/dashboard/summary` - Get dashboard data

## 📈 Charts and Visualizations

### Line Chart (Monthly Trends)
- X-axis: Months (last 6 months)
- Y-axis: Amount
- Two lines: Income (green) and Expense (red)

### Pie Chart (Category Distribution)
- Shows percentage of each category
- Color-coded segments
- Interactive tooltips

### Bar Chart (Category Breakdown)
- X-axis: Categories
- Y-axis: Total amount
- Single bar per category

## 🎯 Role-Based Access Control

### Viewer Role
- ✅ View dashboard
- ✅ View records
- ✅ Filter records
- ❌ Create/edit/delete records
- ❌ Manage users
- ❌ Access users page

### Analyst Role
- ✅ View dashboard
- ✅ View records
- ✅ Filter records
- ❌ Create/edit/delete records
- ❌ Manage users
- ❌ Access users page

### Admin Role
- ✅ View dashboard
- ✅ View records
- ✅ Filter records
- ✅ Create/edit/delete records
- ✅ Manage users
- ✅ Access users page

## 🧪 Testing the Application

### 1. Test Authentication
- Try logging in with each role
- Verify quick login buttons work
- Test invalid credentials

### 2. Test Dashboard
- Check all summary cards display correctly
- Verify charts render with data
- Check recent activity list

### 3. Test Records (as Admin)
- Create a new record
- Edit an existing record
- Delete a record
- Test filters (type, category, date)

### 4. Test Records (as Viewer/Analyst)
- Verify no create/edit/delete buttons
- Confirm filters work
- Check read-only access

### 5. Test Users (as Admin)
- Change a user's role
- Deactivate a user
- Reactivate a user

### 6. Test Access Control
- Login as Viewer → verify no Users menu
- Login as Admin → verify Users menu appears
- Try accessing /users as Viewer (should redirect)

## 🐛 Troubleshooting

### Backend not starting
```bash
# Check if port 3000 is in use
netstat -ano | findstr :3000

# Kill the process if needed
taskkill /PID <PID> /F

# Restart backend
npm run dev
```

### Frontend not starting
```bash
# Check if port 5173 is in use
netstat -ano | findstr :5173

# Change port in vite.config.ts if needed
# Restart frontend
cd frontend
npm run dev
```

### CORS errors
- Ensure backend has CORS middleware enabled
- Check that frontend proxy is configured in vite.config.ts

### Authentication errors
- Clear localStorage in browser
- Check JWT_SECRET in .env
- Verify token is being sent in requests

### Database errors
```bash
# Reset database
Remove-Item finance.db
npm run seed
```

## 📦 Deployment

### Backend Deployment (Heroku, Railway, Render)

1. Add start script to package.json
2. Set environment variables
3. Deploy from Git repository

### Frontend Deployment (Netlify, Vercel)

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Deploy the `dist/` folder

3. Update API URL in production:
```typescript
// In frontend/src/api/axios.ts
const api = axios.create({
  baseURL: 'https://your-backend-api.com/api'
})
```

## 🎓 Learning Points

### Backend Concepts
- RESTful API design
- JWT authentication
- Role-based authorization
- Input validation
- Error handling
- Database design
- SQL queries and aggregations

### Frontend Concepts
- React hooks (useState, useEffect, useContext)
- React Router for navigation
- Context API for state management
- Axios for HTTP requests
- Form handling
- Conditional rendering
- Protected routes
- Data visualization with charts

### Full Stack Integration
- API communication
- Token-based authentication
- CORS handling
- Proxy configuration
- Error propagation
- Loading states

## 📝 Assignment Completion

### Core Requirements ✅
1. ✅ User and Role Management
2. ✅ Financial Records Management
3. ✅ Dashboard Summary APIs
4. ✅ Access Control Logic
5. ✅ Validation and Error Handling
6. ✅ Data Persistence

### Bonus Features ✅
1. ✅ JWT Authentication
2. ✅ Professional Frontend UI
3. ✅ Interactive Charts
4. ✅ Role-based UI
5. ✅ Responsive Design
6. ✅ Comprehensive Documentation

## 🎉 Conclusion

You now have a complete, production-ready full-stack finance management application with:
- Secure authentication
- Role-based access control
- Beautiful, responsive UI
- Interactive data visualizations
- Complete CRUD operations
- Professional code structure

**Access the app at: http://localhost:5173**

Login with any test account and explore all features!
