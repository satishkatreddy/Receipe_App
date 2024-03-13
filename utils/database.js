const mongoose = require('mongoose');
const connectDataBase = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to database!');
    return connection;
  } catch (error) {
    console.error('Database connection error:', error.message);
    throw new Error('Unable to connect to the database');
  }
};

module.exports = connectDataBase;