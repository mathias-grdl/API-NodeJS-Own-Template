import express from 'express';
import createRoutes from './create.js';
import readRoutes from './read.js';
import updateRoutes from './update.js';
import deleteRoutes from './delete.js';

const router = express.Router();

// Mount the split route files
router.use('/', createRoutes);
router.use('/', readRoutes);
router.use('/', updateRoutes);
router.use('/', deleteRoutes);

export default router;
