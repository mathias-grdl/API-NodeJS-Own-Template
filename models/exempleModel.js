import mongoose from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     Exemple:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         id:
 *           type: string
 *           description: L'ID auto-généré de l'exemple
 *         title:
 *           type: string
 *           description: Le titre de l'exemple
 *         description:
 *           type: string
 *           description: La description de l'exemple
 *         published:
 *           type: boolean
 *           description: Le statut de publication
 *           default: true
 *         dateCreation:
 *           type: string
 *           format: date
 *           description: La date de création
 *       example:
 *         title: Mon exemple
 *         description: Une description d'exemple
 *         published: true
 */

const exempleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  published: {
    type: Boolean,
    default: true
  },
  dateCreation: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

//Exemple dans les () est le nom de la collection dans la base de données
const Exemple = mongoose.model('exemples', exempleSchema);

export default Exemple;
