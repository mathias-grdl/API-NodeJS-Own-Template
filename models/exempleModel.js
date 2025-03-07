import mongoose from 'mongoose';

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
