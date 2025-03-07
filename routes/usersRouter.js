const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserManage = require('../models/users'); 

const router = express.Router();

// Création d'un compte
router.post('/register', async (req, res) => {
    const { login, password } = req.body;
    const user = new UserManage({ login, password });
    await user.save();
    res.json({ message: 'Utilisateur créé' });
});

// Connexion
router.post('/login', async (req, res) => {
    const { login, password } = req.body;
    const user = await UserManage.findOne({ login });
    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'Identifiants invalides' });
    }
    const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1h' });
    res.json({ token });
});

// Liste des utilisateurs
router.get('/', async (req, res) => {
    const users = await UserManage.find();
    res.json(users);
});

module.exports = router;
