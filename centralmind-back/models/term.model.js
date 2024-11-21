const mongoose = require('mongoose');

const termSchema = new mongoose.Schema({
  word: { type: String, required: true, unique: true }, // Le mot ou terme principal
  definition: { type: String, required: true }, // Sa définition
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, // Référence à une catégorie
  examples: [{ type: String }], // Liste d'exemples d'utilisation
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Utilisateur qui a ajouté le terme
  relatedTerms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Term' }], // Liens avec d'autres termes
  createdAt: { type: Date, default: Date.now }, // Date de création
  updatedAt: { type: Date, default: Date.now }, // Date de mise à jour
});

module.exports = mongoose.model('Term', termSchema);
