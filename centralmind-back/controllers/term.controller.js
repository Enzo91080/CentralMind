const Term = require("../models/term.model");
const Category = require("../models/category.model");

// Récupérer tous les termes
const getAllTerms = async (req, res) => {
  try {
    const terms = await Term.find().populate("category relatedTerms");
    res.status(200).json(terms);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des termes", error });
  }
};

// Récupérer un terme par ID
const getTermById = async (req, res) => {
  try {
    const term = await Term.findById(req.params.id).populate(
      "category relatedTerms"
    );
    if (!term) {
      return res.status(404).json({ message: "Terme non trouvé" });
    }
    res.status(200).json(term);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération du terme", error });
  }
};

// Ajouter un nouveau terme
const createTerm = async (req, res) => {
  const { word, definition, category, examples, relatedTerms } = req.body;
  const categoryId = await Category.findById(category);
  if (!categoryId) {
    return res.status(404).json({ message: "Catégorie non trouvée" });
  }

  try {
    const newTerm = new Term({
      word,
      definition,
      category: categoryId._id,
      examples,
      relatedTerms,
    });
    await newTerm.save();
    await Category.populate(newTerm, { path: "category" });
    res.status(201).json(newTerm);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la création du terme", error });
  }
};

// Mettre à jour un terme par ID
const updateTerm = async (req, res) => {
  try {
    const updatedTerm = await Term.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedTerm) {
      return res.status(404).json({ message: "Terme non trouvé" });
    }
    res.status(200).json(updatedTerm);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour du terme", error });
  }
};

// Supprimer un terme par ID
const deleteTerm = async (req, res) => {
  try {
    const deletedTerm = await Term.findByIdAndDelete(req.params.id);
    if (!deletedTerm) {
      return res.status(404).json({ message: "Terme non trouvé" });
    }
    res.status(200).json({ message: "Terme supprimé avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression du terme", error });
  }
};

// Récupérer les termes liés
const getRelatedTerms = async (req, res) => {
  try {
    const term = await Term.findById(req.params.id).populate("relatedTerms");
    if (!term) {
      return res.status(404).json({ message: "Terme non trouvé" });
    }
    res.status(200).json(term.relatedTerms);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la récupération des termes liés",
        error,
      });
  }
};

module.exports = {
  getAllTerms,
  getTermById,
  createTerm,
  updateTerm,
  deleteTerm,
  getRelatedTerms,
};
