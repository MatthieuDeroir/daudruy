const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Models/UserModel");
require('dotenv').config();

exports.signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Trouver l'utilisateur par son nom d'utilisateur
    const user = await User.findOne({ where: { username } });

    // Vérifier le mot de passe
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Générer un token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: error.message });
  }
};


exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Créer un nouvel utilisateur
    const user = await User.create({ username, password });

    // Générer un token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const username = "user"; // Ou obtenir le nom d'utilisateur de la session / JWT

    // Trouver l'utilisateur par son nom d'utilisateur
    const user = await User.findOne({ where: { username } });

    // Vérifier l'ancien mot de passe
    if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
      return res.status(403).json({ message: "Ancien mot de passe incorrect" });
    } else {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await User.update({ password: hashedPassword }, { where: { id: user.id } });

      res.status(200).json({ message: "Mot de passe changé avec succès" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

