const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../models');
const User = db.User;

router.post('/register', async (req, res) => {
    const { username, fullName, phone, email, password } = req.body;

    try {
        const exists = await User.findOne({ where: { email } });
        if (exists) return res.status(400).json({ message: 'El usuario ya existe' });

        const newUser = await User.create({ username, fullName, phone, email, password });
        res.status(201).json({ message: 'Usuario registrado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });

        const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '2h' });

        res.json({ token, user: { username: user.username, isAdmin: user.isAdmin } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
