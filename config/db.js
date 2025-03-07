import mongoose from 'mongoose';

// MongoDB Connection URI
const uri = "mongodb+srv://mathiasg08:tegKLBGzcAMpyJCq@exempleapinodejs.r4jg7.mongodb.net/ExempleAPI?retryWrites=true&w=majority&appName=exempleApiNodeJS";

// Connect to MongoDB using Mongoose
async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log('Successfully connected to MongoDB Atlas with Mongoose');
    return mongoose.connection;
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
}

// Close MongoDB connection
async function closeDB() {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error closing MongoDB connection', error);
    process.exit(1);
  }
}

export { connectDB, closeDB };