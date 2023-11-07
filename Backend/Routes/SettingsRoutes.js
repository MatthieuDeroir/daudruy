const express = require('express');
const router = express.Router();

router.get('/settings', async (req, res) => {
    try {
        const settings = await Settings.findOne();
        if (!settings) return res.status(404).send('No settings found');
        res.status(200).send(settings);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/settings', async (req, res) => {
    try {
        // Étant donné qu'il ne devrait y avoir qu'une seule instance de paramètres, supprimez d'abord les anciens paramètres
        await Settings.deleteMany({});
        const settings = new Settings(req.body);
        await settings.save();
        res.status(201).send(settings);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;