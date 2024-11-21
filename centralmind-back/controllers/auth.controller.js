const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

// Générer un token JWT
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
};

// Inscription d'un nouvel utilisateur
const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    // Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    // Créer un nouvel utilisateur
    const newUser = new User({ firstName, lastName, email, password });
    await newUser.save();

    res.status(201).json({ message: "Utilisateur créé avec succès." });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l’inscription.", error });
  }
};

// Connexion d'un utilisateur
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log("Données reçues :", req.body); // Vérifie si les données reçues sont correctes

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe requis." });
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Identifiants incorrects." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    const { password: _, ...userData } = user.toObject();
    res.status(200).json({ token, user: userData });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ message: "Erreur lors de la connexion.", error });
  }
};

// Récupérer le profil utilisateur connecté
const getMe = async (req, res) => {
  try {
    // `req.user` doit être défini par une middleware d'authentification
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la récupération du profil utilisateur.",
        error,
      });
  }
};

module.exports = { registerUser, loginUser, getMe };
