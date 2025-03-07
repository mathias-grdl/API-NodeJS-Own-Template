import express from 'express';
import exempleController from '../../controllers/exempleController.js';

const router = express.Router();

// Get all examples with optional title filter
router.get('/', exempleController.readExemples);

// Get examples by title
router.get('/title/:title', exempleController.readExemplesByTitle);

// Get published examples
router.get('/published', exempleController.readPublishedExemples);

// Get a single example by ID - this should be last to avoid conflicts with other routes
router.get('/:id', exempleController.readExempleById);

export default router;
 