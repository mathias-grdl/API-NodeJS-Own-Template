import express from 'express';
import exempleController from '../../controllers/exempleController.js';

/**
 * @swagger
 * /exemples:
 *   post:
 *     summary: Créer un nouvel exemple
 *     tags: [Exemples]
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
 */
const router = express.Router();

// Create a new example
router.post('/', exempleController.validateCreateExemple, exempleController.createExemple);

export default router;
