import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { connectDB } from './config/db.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());  // This is crucial for parsing JSON requests
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB().then(() => {
  console.log('Database connected successfully');
}).catch(err => {
  console.error('Database connection error:', err); 
});

// Routes - centralized through the main router
app.use('/', routes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});