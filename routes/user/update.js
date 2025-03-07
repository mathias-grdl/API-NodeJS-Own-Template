import express from 'express';
import User from '../../models/userModel.js';
import { protect, admin } from '../../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a specific user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.put('/:id', protect, async (req, res) => {
  try {
    const { email, password, role } = req.body;
    
    // Find the user
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user is authorized to update this profile
    // Only allow users to update their own profile OR admins to update any profile
    if (req.user._id.toString() !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this user' });
    }
    
    // Only admins can change roles
    if (role && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to change user role' });
    }
    
    // Check if email is unique if it's being changed
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }
      user.email = email;
    }
    
    // Update fields if provided
    if (password) {
      user.password = password; // Will be hashed by the pre-save hook
    }
    
    if (role && ['user', 'admin'].includes(role) && req.user.role === 'admin') {
      user.role = role;
    }
    
    // Save the updated user
    const updatedUser = await user.save();
    
    res.json({
      _id: updatedUser._id,
      email: updatedUser.email,
      role: updatedUser.role,
      createdAt: updatedUser.createdAt
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
