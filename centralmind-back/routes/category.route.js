const express = require('express');
const { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory, getTermsByCategory } = require('../controllers/category.controller');

const router = express.Router();

// Récupérer toutes les catégories
router.get('/', getAllCategories);

// Récupérer une catégorie spécifique par son ID
router.get('/:id', getCategoryById);

// Ajouter une nouvelle catégorie
router.post('/', createCategory);

// Mettre à jour une catégorie par son ID
router.put('/:id', updateCategory);

// Supprimer une catégorie par son ID
router.delete('/:id', deleteCategory);

// Récupérer tous les termes associés à une catégorie spécifique
router.get('/:id/terms', getTermsByCategory);

module.exports = router;
