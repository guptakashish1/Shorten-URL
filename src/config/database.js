const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

// Enhanced connection test for PostgreSQL
async function testConnection() {
  try {
    await prisma.$connect();
    console.log('✅ PostgreSQL database connected successfully');
    
    // Test with a simple query
    const linkCount = await prisma.link.count();
    console.log(`📊 Total links in database: ${linkCount}`);
    
    return true;
  } catch (error) {
    console.error('❌ PostgreSQL connection failed:', error.message);
    
    // Provide helpful error messages
    if (error.code === 'P1001') {
      console.log('💡 Tips:');
      console.log('   - Check if your database server is running');
      console.log('   - Verify DATABASE_URL in .env file');
      console.log('   - For Neon: Ensure SSL is enabled');
      console.log('   - For local: Check if PostgreSQL service is running');
    }
    
    return false;
  }
}

module.exports = { prisma, testConnection };
