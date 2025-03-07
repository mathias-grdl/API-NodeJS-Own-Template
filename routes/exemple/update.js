import express from 'express';
import exempleController from '../../controllers/exempleController.js';

const router = express.Router();

// Update an example by ID
router.put('/:id', exempleController.updateExempleById);

export default router;
