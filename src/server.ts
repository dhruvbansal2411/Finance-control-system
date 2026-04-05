import dotenv from 'dotenv';
import app from './app';
import { initDatabase } from './config/database';
import { testDatabaseOperations, logDatabaseStats } from './utils/dbTest';

dotenv.config();

const PORT = process.env.PORT || 3000;

// Initialize database
(async () => {
  await initDatabase();
  console.log('✅ Database initialized');

  // Run database operation tests
  if (process.env.NODE_ENV === 'development') {
    console.log('\n🔍 Running database integrity checks...');
    const testsPassed = testDatabaseOperations();
    
    if (testsPassed) {
      logDatabaseStats();
    } else {
      console.error('⚠️  Database tests failed! Check the logs above.');
    }
  }

  app.listen(PORT, () => {
    console.log(`\n🚀 Server running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`🌐 Frontend: http://localhost:5173\n`);
  });
})();
