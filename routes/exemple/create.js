import express from 'express';
import exempleController from '../../controllers/exempleController.js';
import { protect } from '../../middleware/authMiddleware.js';

/**
 * @swagger
 * /exemples:
 *   post:
 *     summary: Créer un nouvel exemple
 *     tags: [Exemples]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Exemple'
 *     responses:
 *       201:
 *         description: Exemple créé avec succès
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non authentifié
 */
const router = express.Router();

// Create a new example - must be authenticated
router.post('/', protect, exempleController.validateCreateExemple, exempleController.createExemple);

export default router;
