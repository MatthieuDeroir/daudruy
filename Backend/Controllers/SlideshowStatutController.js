const SlideshowStatus = require('../Models/SlideshowStatutsModel');
const mongoose = require('mongoose');
exports.initializeSlideshowStatus = async () => {
    try {
        const existingStatus = await SlideshowStatus.find();

        if (existingStatus.length === 0) {
            const slideshowStatus = new SlideshowStatus({
                slideshowId: null,
                isRunning: false,
                isTesting: false,
            });

            await slideshowStatus.save();
        }
    } catch (error) {
        console.error('Erreur lors de l\'initialisation du statut du diaporama :', error);
    }
}

exports.getSlideshowStatus = async (req, res) => {
    try {
        const slideshowStatus = await SlideshowStatus.find();
        res.status(200).send(slideshowStatus);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateSlideshowStatus = async (req, res) => {
    try {
        console.log('test',req.body);
        // Supprimez tous les documents de SlideshowStatus
        await SlideshowStatus.deleteMany();

        // Ajoutez la logique pour mettre à jour le statut du diaporama en fonction de req.body
        const { slideshowId, isRunning, isTesting } = req.body;
        console.log(slideshowId, isRunning,isTesting);
        // Assurez-vous que slideshowId est un ObjectId valide s'il est fourni
        const validObjectId = mongoose.Types.ObjectId.isValid(slideshowId);
        
        if (validObjectId || slideshowId === null) {
            // Créez un nouveau document SlideshowStatus avec les valeurs fournies
            const newSlideshowStatus = new SlideshowStatus({
                slideshowId,
                isRunning,
                isTesting,
            });

            // Enregistrez le nouveau document dans la base de données
            await newSlideshowStatus.save();

            res.status(201).send('Statut du diaporama mis à jour avec succès');
        } else {
            res.status(400).send('slideshowId invalide');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};


