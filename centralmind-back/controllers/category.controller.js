// Description: Contient les fonctions de contrôle pour les catégories.
const Category = require('../models/category.model');
const Term = require('../models/term.model');

// Récupérer toutes les catégories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des catégories', error });
  }
};

// Récupérer une catégorie par ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la catégorie', error });
  }
};

// Ajouter une nouvelle catégorie
const createCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newCategory = new Category({ name, description });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la catégorie', error });
  }
};

// Mettre à jour une catégorie par ID
const updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la catégorie', error });
  }
};

// Supprimer une catégorie par ID
const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }
    res.status(200).json({ message: 'Catégorie supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la catégorie', error });
  }
};

// Récupérer les termes associés à une catégorie
const getTermsByCategory = async (req, res) => {
  try {
    const terms = await Term.find({ category: req.params.id });
    res.status(200).json(terms);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des termes de la catégorie', error });
  }
};

module.exports = { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory, getTermsByCategory };
