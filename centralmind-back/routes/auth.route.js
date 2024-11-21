const express = require('express');
const { loginUser, registerUser, refreshAccessToken, logoutUser, getMe } = require('../controllers/auth.controller');
const {authMiddleware} = require('../middlewares/auth');
const router = express.Router();

// Connexion utilisateur
router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/me', authMiddleware, getMe);

module.exports = router;
