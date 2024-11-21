const express = require('express');
const { getAllTerms, getTermById, createTerm, updateTerm, deleteTerm, getRelatedTerms } = require('../controllers/term.controller');

const router = express.Router();

// Récupérer tous les termes
router.get('/', getAllTerms);

// Récupérer un terme spécifique par son ID
router.get('/:id', getTermById);

// Ajouter un nouveau terme
router.post('/', createTerm);

// Mettre à jour un terme par son ID
router.put('/:id', updateTerm);

// Supprimer un terme par son ID
router.delete('/:id', deleteTerm);

// Récupérer les termes liés à un terme spécifique
router.get('/:id/related', getRelatedTerms);

module.exports = router;
