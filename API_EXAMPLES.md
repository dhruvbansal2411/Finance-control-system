# API Testing Examples

This document provides practical examples for testing all API endpoints.

## Setup

1. Start the server: `npm run dev`
2. Seed the database: `npm run seed`
3. Use the test credentials provided after seeding

## Test Credentials

```
Admin:   admin@test.com / admin123
Analyst: analyst@test.com / analyst123
Viewer:  viewer@test.com / viewer123
```

## 1. Authentication Flow

### Register a New User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@test.com",
    "password": "password123",
    "name": "New User",
    "role": "viewer"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "password": "admin123"
  }'
```

Save the token from the response for subsequent requests.

## 2. User Management (Admin Only)

### Get All Users
```bash
curl http://localhost:3000/api/users \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get Current User
```bash
curl http://localhost:3000/api/users/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Update User Status
```bash
curl -X PATCH http://localhost:3000/api/users/2/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "status": "inactive"
  }'
```

### Update User Role
```bash
curl -X PATCH http://localhost:3000/api/users/2/role \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "role": "analyst"
  }'
```

## 3. Financial Records

### Get All Records
```bash
curl http://localhost:3000/api/records \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get Records with Filters
```bash
# Filter by type
curl "http://localhost:3000/api/records?type=income" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Filter by category
curl "http://localhost:3000/api/records?category=Salary" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Filter by date range
curl "http://localhost:3000/api/records?startDate=2024-01-01&endDate=2024-12-31" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Combined filters
curl "http://localhost:3000/api/records?type=expense&category=Rent&startDate=2024-01-01" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get Single Record
```bash
curl http://localhost:3000/api/records/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Create Record (Admin Only)
```bash
curl -X POST http://localhost:3000/api/records \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "amount": 5000,
    "type": "income",
    "category": "Salary",
    "date": "2024-01-15",
    "description": "Monthly salary payment"
  }'
```

### Update Record (Admin Only)
```bash
curl -X PUT http://localhost:3000/api/records/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "amount": 5500,
    "type": "income",
    "category": "Salary",
    "date": "2024-01-15",
    "description": "Monthly salary with bonus"
  }'
```

### Delete Record (Admin Only)
```bash
curl -X DELETE http://localhost:3000/api/records/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 4. Dashboard Analytics

### Get Dashboard Summary
```bash
curl http://localhost:3000/api/dashboard/summary \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get Summary with Date Filter
```bash
curl "http://localhost:3000/api/dashboard/summary?startDate=2024-01-01&endDate=2024-06-30" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 5. Testing Access Control

### Test Viewer Permissions (Should Fail)
```bash
# Login as viewer
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "viewer@test.com",
    "password": "viewer123"
  }'

# Try to create a record (should return 403 Forbidden)
curl -X POST http://localhost:3000/api/records \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer VIEWER_TOKEN" \
  -d '{
    "amount": 100,
    "type": "income",
    "category": "Test",
    "date": "2024-01-15",
    "description": "Test"
  }'
```

### Test Analyst Permissions (Should Fail)
```bash
# Login as analyst
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "analyst@test.com",
    "password": "analyst123"
  }'

# Try to manage users (should return 403 Forbidden)
curl http://localhost:3000/api/users \
  -H "Authorization: Bearer ANALYST_TOKEN"
```

## 6. Error Handling Tests

### Invalid Email Format
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "invalid-email",
    "password": "password123",
    "name": "Test User",
    "role": "viewer"
  }'
```

### Short Password
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@test.com",
    "password": "123",
    "name": "Test User",
    "role": "viewer"
  }'
```

### Invalid Role
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@test.com",
    "password": "password123",
    "name": "Test User",
    "role": "superadmin"
  }'
```

### Negative Amount
```bash
curl -X POST http://localhost:3000/api/records \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "amount": -100,
    "type": "income",
    "category": "Test",
    "date": "2024-01-15"
  }'
```

### Invalid Date Format
```bash
curl -X POST http://localhost:3000/api/records \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "amount": 100,
    "type": "income",
    "category": "Test",
    "date": "15-01-2024"
  }'
```

## 7. Health Check

```bash
curl http://localhost:3000/health
```

## Using Postman

Import these as a Postman collection:

1. Create a new collection
2. Add an environment variable `baseUrl` = `http://localhost:3000`
3. Add an environment variable `token` (will be set after login)
4. Use `{{baseUrl}}` and `{{token}}` in your requests

## Using HTTPie (Alternative to cURL)

```bash
# Install HTTPie
pip install httpie

# Login
http POST :3000/api/auth/login email=admin@test.com password=admin123

# Get records (with token)
http :3000/api/records Authorization:"Bearer YOUR_TOKEN"

# Create record
http POST :3000/api/records \
  Authorization:"Bearer YOUR_TOKEN" \
  amount:=5000 \
  type=income \
  category=Salary \
  date=2024-01-15 \
  description="Monthly salary"
```
