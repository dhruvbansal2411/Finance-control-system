# Architecture & Design Decisions

This document explains the architectural choices, design patterns, and technical decisions made in this project.

## System Architecture

### Layered Architecture

```
┌─────────────────────────────────────┐
│         API Routes Layer            │  HTTP endpoints, request validation
├─────────────────────────────────────┤
│      Middleware Layer               │  Auth, authorization, error handling
├─────────────────────────────────────┤
│      Service Layer                  │  Business logic, data processing
├─────────────────────────────────────┤
│      Data Access Layer              │  Database queries, transactions
└─────────────────────────────────────┘
```

### Component Breakdown

#### 1. Routes (`src/routes/`)
- Handle HTTP requests and responses
- Validate input using express-validator
- Delegate business logic to services
- Return appropriate HTTP status codes

#### 2. Middleware (`src/middleware/`)
- **Authentication**: Verify JWT tokens
- **Authorization**: Check user roles and permissions
- **Error Handling**: Centralized error processing

#### 3. Services (`src/services/`)
- Contain all business logic
- Interact with the database
- Reusable across different routes
- Independent of HTTP layer

#### 4. Configuration (`src/config/`)
- Database setup and initialization
- Schema definitions
- Environment configuration

## Design Patterns

### 1. Service Layer Pattern
Business logic is separated from route handlers, making code more testable and maintainable.

```typescript
// Route delegates to service
router.post('/', async (req, res) => {
  const record = recordService.createRecord(...);
  res.json(record);
});
```

### 2. Middleware Pattern
Cross-cutting concerns (auth, validation, errors) are handled by middleware.

```typescript
router.post('/', 
  authenticate,           // Check JWT
  authorize(UserRole.ADMIN),  // Check permissions
  validate(),            // Validate input
  handler                // Business logic
);
```

### 3. Repository Pattern (Implicit)
Services act as repositories, abstracting database operations.

## Security Implementation

### Authentication Flow

```
1. User sends credentials → POST /api/auth/login
2. Server validates credentials
3. Server generates JWT token
4. Client stores token
5. Client sends token in Authorization header
6. Server validates token on each request
```

### Authorization Model

Role-based access control (RBAC) with three levels:

```typescript
enum UserRole {
  VIEWER = 'viewer',    // Read-only access
  ANALYST = 'analyst',  // Read + analytics
  ADMIN = 'admin'       // Full access
}
```

Implemented via middleware:
```typescript
authorize(UserRole.ADMIN)  // Only admins can access
```

### Security Features

1. **Password Hashing**: bcrypt with 10 salt rounds
2. **JWT Tokens**: Signed with secret, 24h expiration
3. **SQL Injection Prevention**: Prepared statements
4. **Input Validation**: express-validator on all inputs
5. **Status Checks**: Inactive users blocked at middleware level

## Database Design

### Schema Decisions

#### Users Table
- `id`: Auto-increment primary key
- `email`: Unique constraint for login
- `role`: Enum constraint for valid roles
- `status`: Enum constraint for active/inactive
- `createdAt`: Automatic timestamp

#### Financial Records Table
- `id`: Auto-increment primary key
- `userId`: Foreign key with CASCADE delete
- `type`: Enum constraint (income/expense)
- `date`: ISO 8601 date string
- `updatedAt`: Tracks modifications

### Indexing Strategy

```sql
-- Optimize common queries
CREATE INDEX idx_records_user ON financial_records(userId);
CREATE INDEX idx_records_date ON financial_records(date);
CREATE INDEX idx_records_type ON financial_records(type);
CREATE INDEX idx_records_category ON financial_records(category);
```

### Why SQLite?

**Pros:**
- Zero configuration
- File-based (portable)
- Perfect for development
- Sufficient for small-medium scale

**Production Alternative:**
- PostgreSQL for better concurrency
- MySQL for wider compatibility
- MongoDB for flexible schema

## API Design Principles

### RESTful Conventions

```
GET    /api/records      → List all records
GET    /api/records/:id  → Get single record
POST   /api/records      → Create record
PUT    /api/records/:id  → Update record
DELETE /api/records/:id  → Delete record
```

### Response Formats

**Success Response:**
```json
{
  "id": 1,
  "amount": 5000,
  "type": "income",
  ...
}
```

**Error Response:**
```json
{
  "error": "Descriptive error message"
}
```

**Validation Error:**
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

### HTTP Status Codes

- `200 OK`: Successful GET/PUT
- `201 Created`: Successful POST
- `204 No Content`: Successful DELETE
- `400 Bad Request`: Validation error
- `401 Unauthorized`: Missing/invalid auth
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

## Data Flow Examples

### Creating a Record

```
1. Client → POST /api/records + JWT token
2. authenticate middleware → Verify token
3. authorize middleware → Check role = admin
4. express-validator → Validate input
5. Route handler → Extract data
6. RecordService.createRecord() → Business logic
7. Database → INSERT query
8. Response → 201 Created + record data
```

### Getting Dashboard Summary

```
1. Client → GET /api/dashboard/summary + JWT token
2. authenticate middleware → Verify token
3. Route handler → Extract filters
4. DashboardService.getSummary() → Aggregate queries
5. Database → Multiple SELECT queries
6. Service → Process and combine results
7. Response → 200 OK + summary data
```

## Error Handling Strategy

### Centralized Error Handler

```typescript
app.use(errorHandler);  // Last middleware
```

Catches all errors and formats responses consistently.

### Error Types

1. **Validation Errors**: 400 Bad Request
2. **Authentication Errors**: 401 Unauthorized
3. **Authorization Errors**: 403 Forbidden
4. **Not Found Errors**: 404 Not Found
5. **Database Errors**: 409 Conflict or 500
6. **Unknown Errors**: 500 Internal Server Error

## Code Organization

### File Structure Rationale

```
src/
├── config/          # Configuration (database, env)
├── middleware/      # Cross-cutting concerns
├── routes/          # API endpoints
├── services/        # Business logic
├── types/           # TypeScript definitions
├── app.ts           # Express app setup
└── server.ts        # Server entry point
```

**Benefits:**
- Clear separation of concerns
- Easy to locate functionality
- Scalable structure
- Testable components

## TypeScript Benefits

1. **Type Safety**: Catch errors at compile time
2. **IntelliSense**: Better IDE support
3. **Refactoring**: Safer code changes
4. **Documentation**: Types serve as documentation
5. **Maintainability**: Easier to understand code

## Performance Considerations

### Database Optimization
- Indexes on frequently queried columns
- Prepared statements (compiled once)
- Efficient aggregation queries

### API Optimization
- Minimal data transfer
- Appropriate HTTP status codes
- Efficient JSON serialization

### Future Optimizations
- Response caching
- Database connection pooling
- Query result pagination
- Compression middleware

## Testing Strategy (Not Implemented)

### Recommended Approach

1. **Unit Tests**: Test services in isolation
2. **Integration Tests**: Test API endpoints
3. **E2E Tests**: Test complete user flows

### Example Test Structure
```
tests/
├── unit/
│   ├── services/
│   └── middleware/
├── integration/
│   └── routes/
└── e2e/
    └── scenarios/
```

## Scalability Considerations

### Current Limitations
- Single-threaded Node.js
- File-based SQLite
- No caching layer
- No load balancing

### Scaling Path

**Vertical Scaling:**
- Increase server resources
- Optimize queries
- Add caching (Redis)

**Horizontal Scaling:**
- Multiple server instances
- Load balancer (nginx)
- Shared database (PostgreSQL)
- Session store (Redis)

## Trade-offs & Assumptions

### Trade-offs

1. **SQLite vs PostgreSQL**
   - Chose: SQLite for simplicity
   - Trade-off: Limited concurrency

2. **JWT vs Sessions**
   - Chose: JWT for stateless auth
   - Trade-off: Cannot revoke tokens easily

3. **No Pagination**
   - Chose: Simplicity for demo
   - Trade-off: Performance with large datasets

4. **Open Registration**
   - Chose: Easy testing
   - Trade-off: Security risk in production

### Assumptions

1. **Single Organization**: All users see all records
2. **Trust Internal Users**: No rate limiting
3. **Development Focus**: Not production-ready
4. **Small Dataset**: No pagination needed
5. **Simple Auth**: No OAuth, 2FA, etc.

## Future Enhancements

### High Priority
- Unit and integration tests
- Pagination for large datasets
- Rate limiting
- API documentation (Swagger)

### Medium Priority
- Soft delete functionality
- Audit logging
- Email notifications
- Export to CSV/PDF

### Low Priority
- Real-time updates (WebSocket)
- Advanced analytics
- Multi-tenancy
- Internationalization

## Conclusion

This architecture prioritizes:
- **Clarity**: Easy to understand
- **Maintainability**: Easy to modify
- **Security**: Proper auth and validation
- **Scalability**: Can grow with needs

The design is intentionally simple but follows production-ready patterns, making it easy to extend and deploy.
