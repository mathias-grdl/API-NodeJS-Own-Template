import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../config/swagger.js';
import exempleRoutes from './exemple/index.js';
import mongoose from 'mongoose';

const router = express.Router();

// Swagger documentation route
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Base route
router.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Database connection test route
router.get('/test-db', async (req, res) => {
    try {
        // Use mongoose connection state to check connection
        if (mongoose.connection.readyState === 1) {
            res.json({ 
                success: true, 
                message: 'Database connection successful', 
                database: mongoose.connection.name,
                readyState: 'Connected'
            });
        } else {
            res.status(500).json({ 
                success: false, 
                message: 'Database connection not established',
                readyState: mongoose.connection.readyState
            });
        }
    } catch (error) {
        console.error('Database test error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Database connection failed', 
            error: error.message 
        });
    }
});

// Example routes
router.use('/exemples', exempleRoutes);

export default router;