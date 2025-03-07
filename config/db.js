import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Use environment variables for sensitive information
const username = process.env.MONGODB_USERNAME || 'mathiasg08';
const password = process.env.MONGODB_PASSWORD || 'tegKLBGzcAMpyJCq';
const cluster = process.env.MONGODB_CLUSTER || 'exempleapinodejs.r4jg7.mongodb.net';
const database = process.env.MONGODB_DATABASE || 'ExempleAPI';

// Build the connection string from environment variables
const uri = `mongodb+srv://${username}:${password}@${cluster}/${database}?retryWrites=true&w=majority&appName=exempleApiNodeJS`;

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