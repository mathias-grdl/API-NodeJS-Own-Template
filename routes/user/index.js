import express from 'express';
import { registerUser, loginUser, logoutUser, getUserProfile } from '../../controllers/userController.js';
import createRoutes from './create.js';
import readRoutes from './read.js';
import updateRoutes from './update.js';
import deleteRoutes from './delete.js';
import { protect } from '../../middleware/authMiddleware.js';

const router = express.Router();

// Authentication routes
/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid data or user already exists
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     summary: Logout a user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post('/logout', logoutUser);

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User profile
 *       404:
 *         description: User not found
 */
router.get('/profile', protect, getUserProfile);

// CRUD operations
// Use the modular router files
router.use('/', createRoutes);
router.use('/', readRoutes);
router.use('/', updateRoutes);
router.use('/', deleteRoutes);

export default router;
