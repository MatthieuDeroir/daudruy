const Camion = require('../Models/CamionSchema');

exports.initializeCamions = async () => {
    try {
        const camions = await Camion.find();
        const nombreCamionsInitiaux = 3;

        if (camions.length < nombreCamionsInitiaux) {
            const camionsRestants = nombreCamionsInitiaux - camions.length;

            for (let i = 0; i < camionsRestants; i++) {
                const camion = new Camion({
                    immatriculation: '00000000',
                    action: 'wait',
                    destination: 'balance',
                    date_appel: new Date()
                });
                await camion.save();
            }
        }
    } catch (error) {
        console.error('Erreur lors de l\'initialisation des documents camion :', error);
    }
}

exports.addCamion = async (req, res) => {
    try {
        console.log("CamionController.addCamion: req.body:", req.body);
        const camion = new Camion(req.body);
        await camion.save();
        res.status(201).send(camion);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.getCamions = async (req, res) => {
    try {
        const camions = await Camion.find().sort({ date_appel: -1 }); // -1 pour un tri en ordre décroissant
        res.status(200).send(camions);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.deleteCamion = async (req, res) => {
    try {
        const camion = await Camion.findByIdAndDelete(req.params.id);
        if (!camion) return res.status(404).send('Camion not found');
        res.status(200).send(camion);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateCamions = async (req, res) => {
    console.log(req.body);
    try {
        await Camion.deleteMany({});

        // ajoute date_appel: new Date() à chaque camion
         const camions = await Camion.insertMany(req.body.map(camion => ({...camion, date_appel: new Date()})));
        res.status(201).send(camions);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
