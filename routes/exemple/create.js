import express from 'express';
import exempleController from '../../controllers/exempleController.js';

const router = express.Router();

// Create a new example
router.post('/', exempleController.validateCreateExemple, exempleController.createExemple);

export default router;
