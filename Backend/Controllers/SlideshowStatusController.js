const SlideshowStatus = require('../Models/SlideshowStatusModel');
const mongoose = require('mongoose');

exports.initializeSlideshowStatus = async () => {
    try {
        const count = await SlideshowStatus.count();

        if (count === 0) {
            await SlideshowStatus.create({
                slideshowId: null, // Assurez-vous que cela est conforme à votre modèle Sequelize
                isRunning: false,
                isTesting: false,
            });
        }
    } catch (error) {
        console.error('Erreur lors de l\'initialisation du statut du diaporama :', error);
    }
}


exports.getSlideshowStatus = async (req, res) => {
    try {
        const slideshowStatus = await SlideshowStatus.findAll();
        res.status(200).send(slideshowStatus);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.updateSlideshowStatus = async (req, res) => {
    try {
        const { slideshowId, isRunning, isTesting } = req.body;

        const validObjectId = slideshowId ? someValidationFunction(slideshowId) : true;

        if (validObjectId || slideshowId === null) {
            const updatedStatus = await SlideshowStatus.upsert({
                slideshowId,
                isRunning,
                isTesting,
            });

            res.status(201).send('Statut du diaporama mis à jour avec succès');
        } else {
            res.status(400).send('slideshowId invalide');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};



