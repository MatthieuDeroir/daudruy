const express = require('express');
const router = express.Router();
const User = require('../Models/UserSchema');
const jwt = require('jsonwebtoken');
const { key } = require ('../config');

// Inscription
router.post('/signup', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();

        // Créer un token JWT
        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY); // Remplacez 'SECRET_KEY' par une clé secrète robuste
        res.status(201).send({ token });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Connexion
router.post('/signin', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(400).send('Invalid username or password');
        }

        // Créer un token JWT
        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY); // Remplacez 'SECRET_KEY' par une clé secrète robuste
        res.status(200).send({ token });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
