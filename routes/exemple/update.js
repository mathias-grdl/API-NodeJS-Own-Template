import express from 'express';
import exempleController from '../../controllers/exempleController.js';
import { protect } from '../../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /exemples/{id}:
 *   put:
 *     summary: Mettre à jour un exemple par ID
 *     tags: [Exemples]
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
 *             $ref: '#/components/schemas/Exemple'
 *     responses:
 *       200:
 *         description: Exemple mis à jour avec succès
 *       404:
 *         description: Exemple non trouvé
 *       403:
 *         description: Non autorisé à modifier cet exemple
 */
router.put('/:id', protect, exempleController.validateUpdateExemple, exempleController.updateExempleById);

export default router;
