const SlideshowStatus = require("../Models/SlideshowStatusModel");

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
    console.error(
      "Erreur lors de l'initialisation du statut du diaporama :",
      error
    );
  }
};

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
    let status = req.body;

    // Vérifier si le corps de la requête est un tableau
    if (Array.isArray(status)) {
      return res
        .status(400)
        .send("Le corps de la requête ne doit pas être un tableau de statuts");
    }

    const { slideshowId, isRunning, isTesting } = status;

    // Mettre à jour uniquement le SlideshowStatus avec l'id 1
    const newStatus = {
      slideshowId,
      isRunning,
      isTesting,
    };

    await SlideshowStatus.update(newStatus, {
      where: { id: 1 },
    });

    res.status(200).send(newStatus);
  } catch (error) {
    console.log(error);
    console.error(error);
    res.status(500).send(error.message);
  }
};
