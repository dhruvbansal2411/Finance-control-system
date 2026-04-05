import db, { saveDatabase } from '../config/database';
import { FinancialRecord, TransactionType } from '../types';

export interface RecordFilters {
  type?: TransactionType;
  category?: string;
  startDate?: string;
  endDate?: string;
}

export class RecordService {
  createRecord(
    amount: number,
    type: TransactionType,
    category: string,
    date: string,
    description: string,
    userId: number
  ): FinancialRecord {
    const result = db.prepare(`
      INSERT INTO financial_records (amount, type, category, date, description, userId)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(amount, type, category, date, description, userId);
    
    if (!result.lastInsertRowid || result.lastInsertRowid === 0) {
      // Fallback: get the most recent record for this user
      const records = db.prepare(
        'SELECT * FROM financial_records WHERE userId = ? ORDER BY id DESC LIMIT 1'
      ).all(userId) as any as FinancialRecord[];
      
      if (records.length > 0) {
        return records[0];
      }
      throw new Error('Failed to create record');
    }
    
    return this.getRecordById(result.lastInsertRowid as number);
  }

  getRecordById(id: number): FinancialRecord {
    const record = db.prepare('SELECT * FROM financial_records WHERE id = ?').get(id);
    
    if (!record) {
      throw new Error('Record not found');
    }
    
    return record as any as FinancialRecord;
  }

  getRecords(filters: RecordFilters = {}): FinancialRecord[] {
    let query = 'SELECT * FROM financial_records WHERE 1=1';
    const params: any[] = [];

    if (filters.type) {
      query += ' AND type = ?';
      params.push(filters.type);
    }

    if (filters.category) {
      query += ' AND category = ?';
      params.push(filters.category);
    }

    if (filters.startDate) {
      query += ' AND date >= ?';
      params.push(filters.startDate);
    }

    if (filters.endDate) {
      query += ' AND date <= ?';
      params.push(filters.endDate);
    }

    query += ' ORDER BY date DESC, createdAt DESC';

    return db.prepare(query).all(...params) as any as FinancialRecord[];
  }

  updateRecord(
    id: number,
    amount: number,
    type: TransactionType,
    category: string,
    date: string,
    description: string
  ): FinancialRecord {
    const result = db.prepare(`
      UPDATE financial_records 
      SET amount = ?, type = ?, category = ?, date = ?, description = ?, updatedAt = datetime('now')
      WHERE id = ?
    `).run(amount, type, category, date, description, id);
    
    if (result.changes === 0) {
      throw new Error('Record not found');
    }
    
    return this.getRecordById(id);
  }

  deleteRecord(id: number): void {
    const result = db.prepare('DELETE FROM financial_records WHERE id = ?').run(id);
    
    if (result.changes === 0) {
      throw new Error('Record not found');
    }
  }
}
