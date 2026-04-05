# Quick Start Guide

Get the Finance Backend up and running in 5 minutes.

## Prerequisites

- Node.js v16+ installed
- npm or yarn installed

## Installation Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
```bash
cp .env.example .env
```

Edit `.env` and set a secure JWT secret:
```
PORT=3000
JWT_SECRET=change-this-to-a-secure-random-string
NODE_ENV=development
```

### 3. Seed the Database
```bash
npm run seed
```

This will create:
- Database schema
- 3 test users (admin, analyst, viewer)
- 50 sample financial records

### 4. Start the Server
```bash
npm run dev
```

Server will start at `http://localhost:3000`

## Test the API

### 1. Login as Admin
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"admin123"}'
```

Copy the `token` from the response.

### 2. Get Dashboard Summary
```bash
curl http://localhost:3000/api/dashboard/summary \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 3. View All Records
```bash
curl http://localhost:3000/api/records \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 4. Create a New Record
```bash
curl -X POST http://localhost:3000/api/records \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "amount": 1000,
    "type": "income",
    "category": "Freelance",
    "date": "2024-01-20",
    "description": "Project payment"
  }'
```

## Test Credentials

After running `npm run seed`, use these credentials:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@test.com | admin123 |
| Analyst | analyst@test.com | analyst123 |
| Viewer | viewer@test.com | viewer123 |

## Role Permissions

- **Viewer**: Can view records and dashboard (read-only)
- **Analyst**: Can view records and dashboard (read-only)
- **Admin**: Full access (create, read, update, delete records + manage users)

## Next Steps

- Read [README.md](README.md) for complete documentation
- Check [API_EXAMPLES.md](API_EXAMPLES.md) for more API examples
- Explore the codebase in `src/` directory

## Troubleshooting

### Port Already in Use
Change the `PORT` in `.env` file to a different port (e.g., 3001)

### Database Locked
Stop the server and delete `finance.db`, then run `npm run seed` again

### Module Not Found
Run `npm install` again to ensure all dependencies are installed

## Production Build

```bash
npm run build
npm start
```

This compiles TypeScript to JavaScript in the `dist/` folder and runs the production server.
