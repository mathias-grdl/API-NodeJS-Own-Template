import express from 'express';
import exempleController from '../../controllers/exempleController.js';

const router = express.Router();

// Delete an example by ID
router.delete('/:id', exempleController.deleteExempleById);

// Delete all examples
router.delete('/', exempleController.deleteAllExemples);

export default router;
