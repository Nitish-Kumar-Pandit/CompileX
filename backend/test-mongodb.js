// Test MongoDB connection
const mongoose = require('mongoose');

// Replace with your actual connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://nitish:YOUR_ACTUAL_PASSWORD@compilex.jhtzhys.mongodb.net/compilex?retryWrites=true&w=majority&appName=CompileX';

console.log('Testing MongoDB connection...');
console.log('Connection string (masked):', MONGODB_URI.replace(/\/\/.*:.*@/, '//***:***@'));

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connection successful!');
    console.log('Database name:', mongoose.connection.name);
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ MongoDB connection failed:');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    
    if (error.message.includes('IP')) {
      console.log('\n🔧 Fix: Add 0.0.0.0/0 to MongoDB Atlas IP whitelist');
    }
    if (error.message.includes('authentication')) {
      console.log('\n🔧 Fix: Check username/password in connection string');
    }
    
    process.exit(1);
  });

// Timeout after 30 seconds
setTimeout(() => {
  console.log('❌ Connection timeout after 30 seconds');
  process.exit(1);
}, 30000);
