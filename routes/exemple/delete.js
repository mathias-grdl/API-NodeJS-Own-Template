import express from 'express';
import exempleController from '../../controllers/exempleController.js';
import { protect } from '../../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /exemples/{id}:
 *   delete:
 *     summary: Supprimer un exemple par ID
 *     tags: [Exemples]
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
 *         description: Exemple supprimé avec succès
 *       404:
 *         description: Exemple non trouvé
 *       403:
 *         description: Non autorisé à supprimer cet exemple
 */
router.delete('/:id', protect, exempleController.deleteExempleById);

/**
 * @swagger
 * /exemples:
 *   delete:
 *     summary: Supprimer tous les exemples
 *     tags: [Exemples]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tous les exemples ont été supprimés avec succès
 */
router.delete('/', protect, exempleController.deleteAllExemples);

export default router;
