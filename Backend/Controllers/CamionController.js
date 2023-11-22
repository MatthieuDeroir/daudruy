const Camion = require('../Models/CamionModel');

exports.initializeCamions = async () => {
    try {
        const nombreCamionsInitiaux = 3;
        const count = await Camion.count();

        if (count < nombreCamionsInitiaux) {
            const camionsRestants = nombreCamionsInitiaux - count;

            for (let i = 0; i < camionsRestants; i++) {
                await Camion.create({
                    immatriculation: '00000000',
                    action: 'wait',
                    destination: 'Balance',
                    date_appel: new Date()
                });
            }
        }
    } catch (error) {
        console.error('Erreur lors de l\'initialisation des camions :', error);
    }
}


exports.addCamion = async (req, res) => {
    try {
        const camion = await Camion.create(req.body);
        res.status(201).send(camion);
    } catch (error) {
        res.status(400).send(error.message);
    }
};


exports.getCamions = async (req, res) => {
    try {
        const camions = await Camion.findAll({
            order: [['date_appel', 'DESC']] // Tri en ordre décroissant
        });
        res.status(200).send(camions);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.deleteCamion = async (req, res) => {
    try {
        const id = req.params.id;
        const camion = await Camion.destroy({
            where: {id}
        });

        if (!camion) {
            return res.status(404).send('Camion not found');
        }

        res.status(200).send({message: 'Camion deleted successfully'});
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.updateCamions = async (req, res) => {
    try {
        await Camion.destroy({
            where: {},
            truncate: true // Cette option supprime tous les enregistrements de la table
        });

        const updatedCamions = await Camion.bulkCreate(
            req.body.map(camion => ({
                ...camion,
                date_appel: new Date()
            }))
        );

        res.status(201).send(updatedCamions);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

