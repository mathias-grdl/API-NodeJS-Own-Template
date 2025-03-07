import express from 'express';
import User from '../../models/userModel.js';
import { protect, admin } from '../../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
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
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid data or user already exists
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - admin access required
 */
router.post('/', protect, admin, async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const user = await User.create({
      email,
      password,
      role: role || 'user' // Default to 'user' if role not provided
    });

    res.status(201).json({
      _id: user._id,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
