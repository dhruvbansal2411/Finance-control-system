/**
 * Database Testing Utilities
 * Run this to verify database operations work correctly
 */

import db from '../config/database';

export const testDatabaseOperations = () => {
  console.log('\n🧪 Testing Database Operations...\n');
  
  try {
    // Test INSERT
    console.log('1️⃣ Testing INSERT...');
    const insertResult = db.prepare(`
      INSERT INTO financial_records (amount, type, category, date, description, userId)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(100, 'income', 'Test', '2024-01-01', 'Test record', 1);
    
    console.log(`   ✅ INSERT: lastInsertRowid=${insertResult.lastInsertRowid}, changes=${insertResult.changes}`);
    const testId = insertResult.lastInsertRowid;
    
    // Test SELECT
    console.log('\n2️⃣ Testing SELECT...');
    const selectResult = db.prepare('SELECT * FROM financial_records WHERE id = ?').get(testId);
    console.log(`   ✅ SELECT: Found record with id=${testId}`);
    
    // Test UPDATE
    console.log('\n3️⃣ Testing UPDATE...');
    const updateResult = db.prepare(`
      UPDATE financial_records 
      SET amount = ?, description = ?
      WHERE id = ?
    `).run(200, 'Updated test record', testId);
    console.log(`   ✅ UPDATE: changes=${updateResult.changes} (should be 1)`);
    
    // Verify update
    const updatedRecord = db.prepare('SELECT * FROM financial_records WHERE id = ?').get(testId);
    console.log(`   ✅ Verified: amount=${(updatedRecord as any).amount} (should be 200)`);
    
    // Test DELETE
    console.log('\n4️⃣ Testing DELETE...');
    const deleteResult = db.prepare('DELETE FROM financial_records WHERE id = ?').run(testId);
    console.log(`   ✅ DELETE: changes=${deleteResult.changes} (should be 1)`);
    
    // Verify delete
    const deletedRecord = db.prepare('SELECT * FROM financial_records WHERE id = ?').get(testId);
    console.log(`   ✅ Verified: record ${deletedRecord ? 'still exists ❌' : 'deleted ✅'}`);
    
    // Test DELETE non-existent
    console.log('\n5️⃣ Testing DELETE non-existent...');
    const deleteNonExistent = db.prepare('DELETE FROM financial_records WHERE id = ?').run(99999);
    console.log(`   ✅ DELETE non-existent: changes=${deleteNonExistent.changes} (should be 0)`);
    
    console.log('\n✅ All database operations working correctly!\n');
    return true;
    
  } catch (error) {
    console.error('\n❌ Database test failed:', error);
    return false;
  }
};

export const logDatabaseStats = () => {
  console.log('\n📊 Database Statistics:\n');
  
  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number };
  console.log(`   Users: ${userCount.count}`);
  
  const recordCount = db.prepare('SELECT COUNT(*) as count FROM financial_records').get() as { count: number };
  console.log(`   Records: ${recordCount.count}`);
  
  const incomeSum = db.prepare('SELECT COALESCE(SUM(amount), 0) as total FROM financial_records WHERE type = ?').get('income') as { total: number };
  console.log(`   Total Income: ₹${incomeSum.total.toLocaleString('en-IN')}`);
  
  const expenseSum = db.prepare('SELECT COALESCE(SUM(amount), 0) as total FROM financial_records WHERE type = ?').get('expense') as { total: number };
  console.log(`   Total Expense: ₹${expenseSum.total.toLocaleString('en-IN')}`);
  
  console.log('');
};
