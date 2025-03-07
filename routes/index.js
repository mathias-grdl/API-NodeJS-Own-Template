import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../config/swagger.js';
import exempleRoutes from './exemple/index.js';
import userRoutes from './user/index.js';
import mongoose from 'mongoose';

const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Base route
 *     description: Returns a welcome message
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Welcome message
 */
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Base route
router.get('/', (req, res) => {
    res.send('Hello, world!');
});

/**
 * @swagger
 * /test-db:
 *   get:
 *     summary: Test database connection
 *     description: Returns database connection status
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Database connection successful
 *       500:
 *         description: Database connection failed
 */
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

// User routes - mount at /users path
router.use('/users', userRoutes);

export default router;