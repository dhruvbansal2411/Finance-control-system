import initSqlJs, { Database as SqlJsDatabase } from 'sql.js';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(__dirname, '../../finance.db');

let db: SqlJsDatabase;

export const initDatabase = async () => {
  const SQL = await initSqlJs();
  
  // Load existing database or create new one
  if (fs.existsSync(DB_PATH)) {
    const buffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }

  // Enable foreign keys
  db.run('PRAGMA foreign_keys = ON');

  // Initialize database schema
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('viewer', 'analyst', 'admin')),
      status TEXT NOT NULL DEFAULT 'active' CHECK(status IN ('active', 'inactive')),
      createdAt TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS financial_records (
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
  `);

  // Create indexes
  try {
    db.run('CREATE INDEX IF NOT EXISTS idx_records_user ON financial_records(userId)');
    db.run('CREATE INDEX IF NOT EXISTS idx_records_date ON financial_records(date)');
    db.run('CREATE INDEX IF NOT EXISTS idx_records_type ON financial_records(type)');
    db.run('CREATE INDEX IF NOT EXISTS idx_records_category ON financial_records(category)');
  } catch (e) {
    // Indexes might already exist
  }

  saveDatabase();
};

export const saveDatabase = () => {
  if (db) {
    const data = db.export();
    fs.writeFileSync(DB_PATH, data);
  }
};

export const getDatabase = (): SqlJsDatabase => {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first.');
  }
  return db;
};

// Robust helper functions with proper error handling and change tracking
export const prepare = (sql: string) => {
  return {
    run: (...params: any[]) => {
      const sqlUpper = sql.trim().toUpperCase();
      const isUpdate = sqlUpper.startsWith('UPDATE');
      const isDelete = sqlUpper.startsWith('DELETE');
      const isInsert = sqlUpper.startsWith('INSERT');
      
      let affectedRows = 0;
      let lastInsertRowid = 0;
      
      try {
        if (isUpdate || isDelete) {
          // Simple approach: Check if the specific ID exists
          // The ID is always the last parameter for UPDATE/DELETE in our code
          const id = params[params.length - 1];
          
          // Determine table name
          let tableName = '';
          if (isDelete) {
            const match = sql.match(/DELETE\s+FROM\s+(\w+)/i);
            if (match) tableName = match[1];
          } else if (isUpdate) {
            const match = sql.match(/UPDATE\s+(\w+)/i);
            if (match) tableName = match[1];
          }
          
          if (tableName && id !== undefined) {
            const countStmt = db.prepare(`SELECT COUNT(*) as count FROM ${tableName} WHERE id = ?`);
            countStmt.bind([id]);
            if (countStmt.step()) {
              const result = countStmt.getAsObject();
              affectedRows = (result.count as number) || 0;
            }
            countStmt.free();
          }
        }
        
        // Execute the actual operation
        db.run(sql, params);
        
        if (isInsert) {
          // For INSERT: Get last insert rowid
          const result = db.exec('SELECT last_insert_rowid() as id');
          if (result.length > 0 && result[0].values.length > 0) {
            lastInsertRowid = Number(result[0].values[0][0]);
          }
          affectedRows = lastInsertRowid > 0 ? 1 : 0;
        }
        
        // Save database after successful operation
        saveDatabase();
        
      } catch (error: any) {
        console.error('Database operation error:', error);
        // Re-throw with proper error information
        if (error.message && error.message.includes('UNIQUE constraint failed')) {
          const err = new Error('UNIQUE constraint failed');
          (err as any).code = 'SQLITE_CONSTRAINT';
          throw err;
        }
        throw error;
      }
      
      return {
        changes: affectedRows,
        lastInsertRowid
      };
    },
    
    get: (...params: any[]) => {
      try {
        const stmt = db.prepare(sql);
        stmt.bind(params);
        if (stmt.step()) {
          const row = stmt.getAsObject();
          stmt.free();
          return row;
        }
        stmt.free();
        return undefined;
      } catch (error) {
        console.error('Database get error:', error);
        throw error;
      }
    },
    
    all: (...params: any[]) => {
      try {
        const stmt = db.prepare(sql);
        stmt.bind(params);
        const results: any[] = [];
        while (stmt.step()) {
          results.push(stmt.getAsObject());
        }
        stmt.free();
        return results;
      } catch (error) {
        console.error('Database all error:', error);
        throw error;
      }
    }
  };
};

export default { prepare, saveDatabase };
