import dotenv from 'dotenv';
import { initDatabase } from './config/database';
import { UserService } from './services/userService';
import { RecordService } from './services/recordService';
import { UserRole, TransactionType } from './types';

dotenv.config();

const userService = new UserService();
const recordService = new RecordService();

async function seed() {
  console.log('Initializing database...');
  await initDatabase();

  try {
    // Create users
    console.log('Creating users...');
    const admin = await userService.createUser(
      'admin@test.com',
      'admin123',
      'Admin User',
      UserRole.ADMIN
    );
    console.log('✓ Admin user created:', admin.email);

    const analyst = await userService.createUser(
      'analyst@test.com',
      'analyst123',
      'Analyst User',
      UserRole.ANALYST
    );
    console.log('✓ Analyst user created:', analyst.email);

    const viewer = await userService.createUser(
      'viewer@test.com',
      'viewer123',
      'Viewer User',
      UserRole.VIEWER
    );
    console.log('✓ Viewer user created:', viewer.email);

    // Create sample financial records
    console.log('\nCreating financial records...');
    
    const categories = {
      income: ['Salary', 'Freelance', 'Investment', 'Bonus'],
      expense: ['Rent', 'Groceries', 'Utilities', 'Transportation', 'Entertainment']
    };

    // Generate records for the last 6 months
    const records = [];
    const today = new Date();
    
    for (let i = 0; i < 50; i++) {
      const daysAgo = Math.floor(Math.random() * 180);
      const date = new Date(today);
      date.setDate(date.getDate() - daysAgo);
      
      const type = Math.random() > 0.4 ? TransactionType.EXPENSE : TransactionType.INCOME;
      const categoryList = type === TransactionType.INCOME ? categories.income : categories.expense;
      const category = categoryList[Math.floor(Math.random() * categoryList.length)];
      
      const amount = type === TransactionType.INCOME 
        ? Math.floor(Math.random() * 5000) + 1000
        : Math.floor(Math.random() * 500) + 50;

      const record = recordService.createRecord(
        amount,
        type,
        category,
        date.toISOString().split('T')[0],
        `Sample ${type} transaction`,
        admin.id
      );
      
      records.push(record);
    }

    console.log(`✓ Created ${records.length} financial records`);

    console.log('\n✅ Seed completed successfully!');
    console.log('\nTest Credentials:');
    console.log('─────────────────────────────────────');
    console.log('Admin:   admin@test.com / admin123');
    console.log('Analyst: analyst@test.com / analyst123');
    console.log('Viewer:  viewer@test.com / viewer123');
    console.log('─────────────────────────────────────');

  } catch (error: any) {
    console.error('❌ Seed failed:', error.message);
    process.exit(1);
  }
}

seed();
