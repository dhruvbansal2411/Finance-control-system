# Finance Data Processing and Access Control System

A complete full-stack application for managing financial records with role-based access control.

## 🎯 Quick Access

- **Frontend**: http://localhost:5173 (React Dashboard)
- **Backend API**: http://localhost:3000 (REST API)
- **Full Stack Guide**: See [FULLSTACK_GUIDE.md](FULLSTACK_GUIDE.md)

## Tech Stack

### Backend
- Node.js + Express + TypeScript + SQLite
- JWT Authentication + bcrypt
- express-validator for input validation

### Frontend
- React 18 + TypeScript + Vite
- Recharts for data visualization
- Axios for API communication
- Custom CSS (no framework)

## Features

- **User Management**: Create and manage users with different roles
- **Role-Based Access Control**: Three distinct roles (Viewer, Analyst, Admin) with specific permissions
- **Financial Records Management**: Full CRUD operations for financial transactions
- **Dashboard Analytics**: Aggregated data and insights
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Comprehensive validation using express-validator
- **SQLite Database**: Lightweight, file-based database with proper indexing
- **User Deletion**: Admins can remove users from the system (with cascade deletion of records)

## Architecture

### Project Structure
```
src/
├── config/          # Database configuration
├── middleware/      # Authentication, authorization, error handling
├── routes/          # API route definitions
├── services/        # Business logic layer
├── types/           # TypeScript type definitions
├── app.ts           # Express app setup
└── server.ts        # Server entry point
```

### Design Principles

1. **Separation of Concerns**: Routes handle HTTP, services handle business logic
2. **Type Safety**: Full TypeScript implementation with strict mode
3. **Security First**: Password hashing, JWT tokens, role-based access
4. **Clean Code**: Readable, maintainable, and well-documented

## User Roles & Permissions

| Role | View Records | View Dashboard | Create/Update/Delete Records | Manage Users | Delete Users |
|------|--------------|----------------|------------------------------|--------------|--------------|
| **Viewer** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Analyst** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Admin** | ✅ | ✅ | ✅ | ✅ | ✅ |

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd finance-backend
```

2. Install dependencies
```bash
npm install
```

3. Create environment file
```bash
cp .env.example .env
```

4. Update `.env` with your configuration
```
PORT=3000
JWT_SECRET=your-secure-secret-key
NODE_ENV=development
```

5. Run the development server
```bash
npm run dev
```

The server will start on `http://localhost:3000`

### Build for Production
```bash
npm run build
npm start
```

## API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "role": "viewer"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "role": "viewer",
    "status": "active"
  }
}
```

### User Management Endpoints

All user endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

#### Get Current User
```http
GET /api/users/me
```

#### Get All Users (Admin only)
```http
GET /api/users
```

#### Update User Status (Admin only)
```http
PATCH /api/users/:id/status
Content-Type: application/json

{
  "status": "inactive"
}
```

#### Update User Role (Admin only)
```http
PATCH /api/users/:id/role
Content-Type: application/json

{
  "role": "analyst"
}
```

### Financial Records Endpoints

#### Get All Records (with filters)
```http
GET /api/records?type=income&category=salary&startDate=2024-01-01&endDate=2024-12-31
```

Query Parameters:
- `type`: income | expense
- `category`: string
- `startDate`: ISO 8601 date
- `endDate`: ISO 8601 date

#### Get Single Record
```http
GET /api/records/:id
```

#### Create Record (Admin only)
```http
POST /api/records
Content-Type: application/json

{
  "amount": 5000,
  "type": "income",
  "category": "salary",
  "date": "2024-01-15",
  "description": "Monthly salary"
}
```

#### Update Record (Admin only)
```http
PUT /api/records/:id
Content-Type: application/json

{
  "amount": 5500,
  "type": "income",
  "category": "salary",
  "date": "2024-01-15",
  "description": "Monthly salary with bonus"
}
```

#### Delete Record (Admin only)
```http
DELETE /api/records/:id
```

### Dashboard Endpoints

#### Get Dashboard Summary
```http
GET /api/dashboard/summary?startDate=2024-01-01&endDate=2024-12-31
```

Response:
```json
{
  "totalIncome": 50000,
  "totalExpense": 30000,
  "netBalance": 20000,
  "categoryTotals": [
    {
      "category": "salary",
      "type": "income",
      "total": 50000
    }
  ],
  "recentActivity": [...],
  "monthlyTrends": [
    {
      "month": "2024-01",
      "income": 5000,
      "expense": 3000
    }
  ]
}
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('viewer', 'analyst', 'admin')),
  status TEXT NOT NULL DEFAULT 'active' CHECK(status IN ('active', 'inactive')),
  createdAt TEXT NOT NULL DEFAULT (datetime('now'))
);
```

### Financial Records Table
```sql
CREATE TABLE financial_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  amount REAL NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('income', 'expense')),
  category TEXT NOT NULL,
  date TEXT NOT NULL,
  description TEXT,
  userId INTEGER NOT NULL,
  createdAt TEXT NOT NULL DEFAULT (datetime('now')),
  updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);
```

## Error Handling

The API uses standard HTTP status codes:

- `200 OK`: Successful request
- `201 Created`: Resource created successfully
- `204 No Content`: Successful deletion
- `400 Bad Request`: Invalid input or validation error
- `401 Unauthorized`: Missing or invalid authentication
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `409 Conflict`: Database constraint violation
- `500 Internal Server Error`: Server error

Error Response Format:
```json
{
  "error": "Error message description"
}
```

Validation Error Format:
```json
{
  "errors": [
    {
      "msg": "Invalid value",
      "param": "email",
      "location": "body"
    }
  ]
}
```

## Security Features

1. **Password Hashing**: bcrypt with salt rounds
2. **JWT Tokens**: Secure token-based authentication with 24h expiration
3. **Role-Based Access Control**: Middleware-based authorization
4. **Input Validation**: express-validator for all inputs
5. **SQL Injection Protection**: Prepared statements
6. **Status Checks**: Inactive users cannot access the system

## Testing the API

### Using cURL

1. Register an admin user:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"admin123","name":"Admin User","role":"admin"}'
```

2. Login:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"admin123"}'
```

3. Create a record (use token from login):
```bash
curl -X POST http://localhost:3000/api/records \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{"amount":1000,"type":"income","category":"salary","date":"2024-01-15","description":"Test"}'
```

4. Get dashboard summary:
```bash
curl http://localhost:3000/api/dashboard/summary \
  -H "Authorization: Bearer <your-token>"
```

## Assumptions & Design Decisions

1. **SQLite Database**: Chosen for simplicity and portability. Can be easily replaced with PostgreSQL or MySQL
2. **JWT Expiration**: Set to 24 hours for development. Should be shorter in production
3. **User Creation**: Currently open registration. In production, admin-only user creation might be preferred
4. **Record Ownership**: Records are linked to the user who created them, but all users can view all records
5. **Soft Delete**: Not implemented. Records are permanently deleted
6. **Pagination**: Not implemented. Should be added for production use
7. **Rate Limiting**: Not implemented. Should be added for production

## Future Enhancements

- Pagination for large datasets
- Search functionality
- Soft delete with recovery
- Rate limiting
- API documentation with Swagger/OpenAPI
- Unit and integration tests
- Docker containerization
- CI/CD pipeline
- Audit logging
- Email notifications
- Export to CSV/PDF

## License

MIT
