import express from 'express';
import exempleController from '../../controllers/exempleController.js';
import { protect } from '../../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /exemples:
 *   get:
 *     summary: Obtenir tous les exemples
 *     tags: [Exemples]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filtrer par titre (optionnel)
 *     responses:
 *       200:
 *         description: Liste des exemples
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Exemple'
 */
router.get('/', exempleController.readExemples);

/**
 * @swagger
 * /exemples/title/{title}:
 *   get:
 *     summary: Get examples by title
 *     tags: [Exemples]
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 */
router.get('/title/:title', exempleController.readExemplesByTitle);

/**
 * @swagger
 * /exemples/published:
 *   get:
 *     summary: Get published examples
 *     tags: [Exemples]
 *     responses:
 *       200:
 *         description: List of published examples
 */
router.get('/published', exempleController.readPublishedExemples);

/**
 * @swagger
 * /exemples/user:
 *   get:
 *     summary: Get examples created by the authenticated user
 *     tags: [Exemples]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's examples
 *       401:
 *         description: Not authenticated
 */
router.get('/user', protect, exempleController.readUserExemples);

/**
 * @swagger
 * /exemples/user/{userId}:
 *   get:
 *     summary: Get examples created by a specific user
 *     tags: [Exemples]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of user's examples
 */
router.get('/user/:userId', exempleController.readUserExemples);

/**
 * @swagger
 * /exemples/{id}:
 *   get:
 *     summary: Get example by ID
 *     tags: [Exemples]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.get('/:id', exempleController.readExempleById);

export default router;
