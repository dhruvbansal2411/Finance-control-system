# Database Information - SQLite vs MongoDB

## 🗄️ Your Database: SQLite

### What is SQLite?
SQLite is a **file-based SQL database** - all your data is stored in a single file on your computer.

### Database Details:
- **Type**: SQLite (SQL database)
- **File**: `finance.db`
- **Full Path**: `C:\Users\HP\Desktop\backend\finance.db`
- **Size**: 44 KB (45,056 bytes)
- **Library**: sql.js (JavaScript implementation)
- **Language**: SQL (Structured Query Language)

### How It Works:
```
Your Data
    ↓
Backend (Node.js)
    ↓
sql.js library
    ↓
finance.db file (on your hard drive)
```

## 📊 SQLite vs MongoDB Comparison

### SQLite (What You're Using) ✅

**Type**: SQL (Relational Database)

**Storage**:
- Single file: `finance.db`
- Located in your project folder
- Can see and copy the file

**Structure**:
- Tables with rows and columns
- Strict schema (defined structure)
- Relationships with foreign keys

**Query Language**:
```sql
SELECT * FROM financial_records WHERE type = 'income'
```

**Pros**:
- ✅ Zero configuration
- ✅ No separate server needed
- ✅ Perfect for development
- ✅ Easy to backup (just copy the file)
- ✅ Fast for small-medium datasets
- ✅ ACID compliant
- ✅ Portable (take file anywhere)

**Cons**:
- ❌ Limited concurrent writes
- ❌ Not ideal for very large scale
- ❌ Single file (no distributed storage)

**Best For**:
- Development and testing
- Small to medium applications
- Desktop applications
- Embedded systems
- Prototypes and demos

---

### MongoDB (Alternative)

**Type**: NoSQL (Document Database)

**Storage**:
- Separate MongoDB server
- Multiple files in data directory
- Requires MongoDB installation

**Structure**:
- Collections with documents (JSON-like)
- Flexible schema
- No strict relationships

**Query Language**:
```javascript
db.financial_records.find({ type: 'income' })
```

**Pros**:
- ✅ Handles large scale well
- ✅ Flexible schema
- ✅ Good for unstructured data
- ✅ Horizontal scaling
- ✅ Better concurrent writes

**Cons**:
- ❌ Requires separate server
- ❌ More complex setup
- ❌ Larger resource usage
- ❌ Overkill for small projects

**Best For**:
- Large scale applications
- High concurrent writes
- Unstructured data
- Distributed systems
- Production at scale

## 🎯 Why SQLite for This Project?

### Perfect Choice Because:

1. **Assignment Requirements**
   - Backend assessment focused on logic
   - No need for complex database setup
   - Easy for evaluators to run

2. **Development Speed**
   - Zero configuration
   - No installation needed
   - Works immediately

3. **Portability**
   - Single file database
   - Easy to share
   - Easy to backup

4. **Sufficient for Scale**
   - Handles thousands of records easily
   - Fast queries with indexes
   - Perfect for this use case

## 📁 Your Database File Structure

### Inside `finance.db`:

**Tables**:
1. **users** (3 rows)
   - id, email, password, name, role, status, createdAt

2. **financial_records** (51 rows)
   - id, amount, type, category, date, description, userId, createdAt, updatedAt

**Indexes**:
- idx_records_user (on userId)
- idx_records_date (on date)
- idx_records_type (on type)
- idx_records_category (on category)

**Relationships**:
- financial_records.userId → users.id (foreign key)

## 🔍 View Your Database

### Option 1: DB Browser for SQLite (GUI)
1. Download: https://sqlitebrowser.org/
2. Open `finance.db` file
3. Browse tables visually

### Option 2: Command Line
```bash
# Install sqlite3
# Then:
sqlite3 finance.db
.tables
SELECT * FROM users;
SELECT * FROM financial_records LIMIT 5;
```

### Option 3: VS Code Extension
1. Install "SQLite Viewer" extension
2. Right-click `finance.db`
3. Select "Open Database"

## 🔄 Migration to Other Databases

### If You Want to Switch Later:

**To PostgreSQL** (Production):
```javascript
// Change from sql.js to pg library
import { Pool } from 'pg'
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})
```

**To MongoDB**:
```javascript
// Change to mongoose
import mongoose from 'mongoose'
mongoose.connect(process.env.MONGODB_URI)
```

**To MySQL**:
```javascript
// Change to mysql2
import mysql from 'mysql2/promise'
const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'finance'
})
```

## 📊 Current Database Stats

### Your Database Right Now:
```
File: C:\Users\HP\Desktop\backend\finance.db
Size: 44 KB
Tables: 2 (users, financial_records)
Users: 3
Records: 51
Indexes: 4
Last Updated: April 5, 2026 at 4:40 PM
```

### Storage Breakdown:
- Schema: ~2 KB
- Users data: ~1 KB
- Financial records: ~40 KB
- Indexes: ~1 KB

## 🎯 Summary

### What You're Using:
**SQLite** - A lightweight, file-based SQL database

### Where Data is Stored:
**File**: `C:\Users\HP\Desktop\backend\finance.db`

### How to Access:
- Through your backend API ✅
- Through frontend UI ✅
- With SQLite browser tools ✅
- Direct file access ✅

### Is It Good Enough?
**YES!** SQLite is:
- ✅ Perfect for this project
- ✅ Used by major apps (WhatsApp, Skype, Adobe)
- ✅ Handles millions of rows
- ✅ Production-ready for many use cases

### Not MongoDB Because:
- SQLite is simpler
- No separate server needed
- Better for this project size
- Easier to evaluate and demo

---

**Your database is SQLite, stored in a single file, and it's perfect for this application!** 🎉
