import express from 'express';
import exempleController from '../../controllers/exempleController.js';

/**
 * @swagger
 * /exemples/{id}:
 *   put:
 *     summary: Mettre à jour un exemple par ID
 *     tags: [Exemples]
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
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               published:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Exemple mis à jour avec succès
 *       404:
 *         description: Exemple non trouvé
 */

const router = express.Router();

// Update an example by ID
router.put('/:id', exempleController.validateUpdateExemple, exempleController.updateExempleById);

export default router;
