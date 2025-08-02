const express = require('express');
const router = express.Router();
const db = require('../models');
const Price = db.Price;

// Obtener todos los precios
router.get('/', async (req, res) => {
    try {
        const prices = await Price.findAll();
        res.json(prices);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Actualizar un precio
router.put('/:platform/:plan', async (req, res) => {
    const { platform, plan } = req.params;
    const { price } = req.body;
    try {
        const updated = await Price.update({ price }, {
            where: { platform, plan }
        });
        if (updated[0] === 0) {
            // No existe, crear nuevo
            await Price.create({ platform, plan, price });
        }
        res.json({ message: 'Precio actualizado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
