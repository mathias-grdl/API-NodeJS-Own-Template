import express from 'express';
import User from '../../models/userModel.js';
import { protect, admin } from '../../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a specific user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.delete('/:id', protect, async (req, res) => {
  try {
    // Find the user to delete
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if user is authorized to delete this profile
    // Only allow users to delete their own profile OR admins to delete any profile
    if (req.user._id.toString() !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this user' });
    }
    
    await User.deleteOne({ _id: req.params.id });
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
