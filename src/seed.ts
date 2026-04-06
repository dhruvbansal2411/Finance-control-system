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
      'admin@example.com',
      'admin123',
      'Admin User',
      UserRole.ADMIN
    );
    console.log('✓ Admin user created:', admin.email);

    const analyst = await userService.createUser(
      'analyst@example.com',
      'analyst123',
      'Analyst User',
      UserRole.ANALYST
    );
    console.log('✓ Analyst user created:', analyst.email);

    const viewer = await userService.createUser(
      'viewer@example.com',
      'viewer123',
      'Viewer User',
      UserRole.VIEWER
    );
    console.log('✓ Viewer user created:', viewer.email);

    // Create sample financial records
    console.log('\nCreating financial records...');
    
    const sampleRecords = [
      {amount:5000,type:"income",category:"Salary",date:"2026-01-01",note:"Monthly salary"},
      {amount:1200,type:"expense",category:"Food",date:"2026-01-02",note:"Groceries"},
      {amount:800,type:"expense",category:"Transport",date:"2026-01-03",note:"Cab rides"},
      {amount:2000,type:"income",category:"Freelance",date:"2026-01-04",note:"Project payment"},
      {amount:1500,type:"expense",category:"Shopping",date:"2026-01-05",note:"Clothes"},
      {amount:600,type:"expense",category:"Food",date:"2026-01-06",note:"Dinner"},
      {amount:3000,type:"income",category:"Bonus",date:"2026-01-07",note:"Performance bonus"},
      {amount:700,type:"expense",category:"Bills",date:"2026-01-08",note:"Electricity"},
      {amount:400,type:"expense",category:"Transport",date:"2026-01-09",note:"Fuel"},
      {amount:2500,type:"income",category:"Investment",date:"2026-01-10",note:"Stock profit"},
      {amount:900,type:"expense",category:"Food",date:"2026-01-11",note:"Restaurant"},
      {amount:1000,type:"expense",category:"Bills",date:"2026-01-12",note:"Internet"},
      {amount:3500,type:"income",category:"Freelance",date:"2026-01-13",note:"Client work"},
      {amount:1200,type:"expense",category:"Shopping",date:"2026-01-14",note:"Shoes"},
      {amount:8000,type:"income",category:"Salary",date:"2026-01-15",note:"Monthly salary"},
      {amount:500,type:"expense",category:"Food",date:"2026-01-16",note:"Snacks"},
      {amount:200,type:"expense",category:"Transport",date:"2026-01-17",note:"Bus"},
      {amount:4000,type:"income",category:"Bonus",date:"2026-01-18",note:"Incentive"},
      {amount:1000,type:"expense",category:"Bills",date:"2026-01-19",note:"Water"},
      {amount:600,type:"expense",category:"Food",date:"2026-01-20",note:"Lunch"},
      {amount:2000,type:"income",category:"Freelance",date:"2026-01-21",note:"Website work"},
      {amount:900,type:"expense",category:"Shopping",date:"2026-01-22",note:"Accessories"},
      {amount:300,type:"expense",category:"Transport",date:"2026-01-23",note:"Auto"},
      {amount:7000,type:"income",category:"Salary",date:"2026-01-24",note:"Monthly salary"},
      {amount:1200,type:"expense",category:"Food",date:"2026-01-25",note:"Groceries"},
      {amount:1800,type:"expense",category:"Shopping",date:"2026-01-26",note:"Electronics"},
      {amount:2500,type:"income",category:"Investment",date:"2026-01-27",note:"Crypto gain"},
      {amount:400,type:"expense",category:"Bills",date:"2026-01-28",note:"Mobile recharge"},
      {amount:600,type:"expense",category:"Food",date:"2026-01-29",note:"Dinner"},
      {amount:5000,type:"income",category:"Freelance",date:"2026-01-30",note:"App project"},
      {amount:700,type:"expense",category:"Transport",date:"2026-02-01",note:"Fuel"},
      {amount:800,type:"expense",category:"Food",date:"2026-02-02",note:"Lunch"},
      {amount:9000,type:"income",category:"Salary",date:"2026-02-03",note:"Monthly salary"},
      {amount:1200,type:"expense",category:"Shopping",date:"2026-02-04",note:"Clothes"},
      {amount:3000,type:"income",category:"Bonus",date:"2026-02-05",note:"Reward"},
      {amount:500,type:"expense",category:"Bills",date:"2026-02-06",note:"Electricity"},
      {amount:600,type:"expense",category:"Food",date:"2026-02-07",note:"Snacks"},
      {amount:2000,type:"income",category:"Freelance",date:"2026-02-08",note:"Design work"},
      {amount:300,type:"expense",category:"Transport",date:"2026-02-09",note:"Metro"},
      {amount:1500,type:"expense",category:"Shopping",date:"2026-02-10",note:"Gadgets"},
      {amount:10000,type:"income",category:"Salary",date:"2026-02-11",note:"Monthly salary"},
      {amount:700,type:"expense",category:"Food",date:"2026-02-12",note:"Dinner"},
      {amount:400,type:"expense",category:"Transport",date:"2026-02-13",note:"Cab"},
      {amount:3500,type:"income",category:"Investment",date:"2026-02-14",note:"Stocks"},
      {amount:900,type:"expense",category:"Bills",date:"2026-02-15",note:"Internet"},
      {amount:600,type:"expense",category:"Food",date:"2026-02-16",note:"Lunch"},
      {amount:2500,type:"income",category:"Freelance",date:"2026-02-17",note:"API work"},
      {amount:800,type:"expense",category:"Shopping",date:"2026-02-18",note:"Shoes"},
      {amount:500,type:"expense",category:"Transport",date:"2026-02-19",note:"Fuel"},
      {amount:3000,type:"income",category:"Bonus",date:"2026-02-20",note:"Incentive"},
      {amount:700,type:"expense",category:"Food",date:"2026-02-21",note:"Snacks"},
      {amount:1200,type:"expense",category:"Bills",date:"2026-02-22",note:"Electricity"},
      {amount:8000,type:"income",category:"Salary",date:"2026-02-23",note:"Monthly salary"},
      {amount:1500,type:"expense",category:"Shopping",date:"2026-02-24",note:"Clothes"},
      {amount:400,type:"expense",category:"Transport",date:"2026-02-25",note:"Bus"},
      {amount:2000,type:"income",category:"Freelance",date:"2026-02-26",note:"Client"},
      {amount:600,type:"expense",category:"Food",date:"2026-02-27",note:"Lunch"},
      {amount:300,type:"expense",category:"Bills",date:"2026-02-28",note:"Mobile"},
      {amount:2500,type:"income",category:"Investment",date:"2026-03-01",note:"Crypto"},
      {amount:900,type:"expense",category:"Shopping",date:"2026-03-02",note:"Accessories"},
      {amount:10000,type:"income",category:"Salary",date:"2026-03-03",note:"Monthly salary"},
      {amount:700,type:"expense",category:"Food",date:"2026-03-04",note:"Dinner"},
      {amount:400,type:"expense",category:"Transport",date:"2026-03-05",note:"Cab"},
      {amount:3500,type:"income",category:"Bonus",date:"2026-03-06",note:"Reward"},
      {amount:900,type:"expense",category:"Bills",date:"2026-03-07",note:"Internet"},
      {amount:600,type:"expense",category:"Food",date:"2026-03-08",note:"Lunch"},
      {amount:2500,type:"income",category:"Freelance",date:"2026-03-09",note:"Project"},
      {amount:800,type:"expense",category:"Shopping",date:"2026-03-10",note:"Shoes"},
      {amount:500,type:"expense",category:"Transport",date:"2026-03-11",note:"Fuel"},
      {amount:3000,type:"income",category:"Investment",date:"2026-03-12",note:"Stocks"},
      {amount:700,type:"expense",category:"Food",date:"2026-03-13",note:"Snacks"},
      {amount:1200,type:"expense",category:"Bills",date:"2026-03-14",note:"Electricity"},
      {amount:8000,type:"income",category:"Salary",date:"2026-03-15",note:"Monthly salary"},
      {amount:1500,type:"expense",category:"Shopping",date:"2026-03-16",note:"Clothes"},
      {amount:400,type:"expense",category:"Transport",date:"2026-03-17",note:"Bus"},
      {amount:2000,type:"income",category:"Freelance",date:"2026-03-18",note:"Client"},
      {amount:600,type:"expense",category:"Food",date:"2026-03-19",note:"Lunch"},
      {amount:300,type:"expense",category:"Bills",date:"2026-03-20",note:"Mobile"},
      {amount:2500,type:"income",category:"Bonus",date:"2026-03-21",note:"Incentive"},
      {amount:900,type:"expense",category:"Shopping",date:"2026-03-22",note:"Accessories"},
      {amount:10000,type:"income",category:"Salary",date:"2026-03-23",note:"Monthly salary"},
      {amount:700,type:"expense",category:"Food",date:"2026-03-24",note:"Dinner"},
      {amount:400,type:"expense",category:"Transport",date:"2026-03-25",note:"Cab"},
      {amount:3500,type:"income",category:"Investment",date:"2026-03-26",note:"Stocks"},
      {amount:900,type:"expense",category:"Bills",date:"2026-03-27",note:"Internet"},
      {amount:600,type:"expense",category:"Food",date:"2026-03-28",note:"Lunch"},
      {amount:2500,type:"income",category:"Freelance",date:"2026-03-29",note:"Project"},
      {amount:800,type:"expense",category:"Shopping",date:"2026-03-30",note:"Shoes"},
      {amount:500,type:"expense",category:"Transport",date:"2026-03-31",note:"Fuel"},
      {amount:3000,type:"income",category:"Bonus",date:"2026-04-01",note:"Reward"},
      {amount:700,type:"expense",category:"Food",date:"2026-04-02",note:"Snacks"},
      {amount:1200,type:"expense",category:"Bills",date:"2026-04-03",note:"Electricity"},
      {amount:8000,type:"income",category:"Salary",date:"2026-04-04",note:"Monthly salary"},
      {amount:1500,type:"expense",category:"Shopping",date:"2026-04-05",note:"Clothes"},
      {amount:400,type:"expense",category:"Transport",date:"2026-04-06",note:"Bus"},
      {amount:2000,type:"income",category:"Freelance",date:"2026-04-07",note:"Client"},
      {amount:600,type:"expense",category:"Food",date:"2026-04-08",note:"Lunch"},
      {amount:300,type:"expense",category:"Bills",date:"2026-04-09",note:"Mobile"},
      {amount:2500,type:"income",category:"Investment",date:"2026-04-10",note:"Crypto"},
      {amount:900,type:"expense",category:"Shopping",date:"2026-04-11",note:"Accessories"}
    ];

    const records = [];
    for (const recordData of sampleRecords) {
      const record = recordService.createRecord(
        recordData.amount,
        recordData.type as TransactionType,
        recordData.category,
        recordData.date,
        recordData.note,
        admin.id
      );
      records.push(record);
    }

    console.log(`✓ Created ${records.length} financial records`);

    console.log('\n✅ Seed completed successfully!');
    console.log('\nTest Credentials:');
    console.log('─────────────────────────────────────');
    console.log('Admin:   admin@example.com / admin123');
    console.log('Analyst: analyst@example.com / analyst123');
    console.log('Viewer:  viewer@example.com / viewer123');
    console.log('─────────────────────────────────────');

  } catch (error: any) {
    console.error('❌ Seed failed:', error.message);
    process.exit(1);
  }
}

seed();
