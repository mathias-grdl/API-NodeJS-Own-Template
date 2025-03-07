import express from 'express';
import exempleController from '../../controllers/exempleController.js';

/**
 * @swagger
 * /exemples/{id}:
 *   delete:
 *     summary: Supprimer un exemple par ID
 *     tags: [Exemples]
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
 */

/**
 * @swagger
 * /exemples:
 *   delete:
 *     summary: Supprimer tous les exemples
 *     tags: [Exemples]
 *     responses:
 *       200:
 *         description: Tous les exemples ont été supprimés
 */

const router = express.Router();

// Delete an example by ID
router.delete('/:id', exempleController.deleteExempleById);

// Delete all examples
router.delete('/', exempleController.deleteAllExemples);

export default router;
