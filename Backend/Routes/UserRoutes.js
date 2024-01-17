const express = require('express');
const router = express.Router();
const User = require('../Controllers/UserController');
const jwt = require('jsonwebtoken');

// Inscription
router.post('/signup', User.signup);

// Connexion
router.post('/signing', User.signin);

module.exports = router;


