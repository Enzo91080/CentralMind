  const express = require("express");
  const router = express.Router();

  // Importer les sous-routes
  const authRoutes = require("./auth.route");
  const termRoutes = require('./term.route');
  const categoryRoutes = require('./category.route');
  

  // Ajout des sous-routes
  router.use("/auth", authRoutes); // Routes d'authentification
  router.use("/terms", termRoutes); // Routes de gestion des tâches
  router.use("/categories", categoryRoutes); // Routes de gestion des catégories

  module.exports = router;
