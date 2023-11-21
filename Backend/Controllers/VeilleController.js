const VeilleSchema = require("../Models/VeilleModel");

exports.initializeVeille = async () => {
  try {
    const veilles = await VeilleSchema.find();
    const nombreVeillesInitiales = 1;

    if (veilles.length < nombreVeillesInitiales) {
      const veillesRestantes = nombreVeillesInitiales - veilles.length;

      for (let i = 0; i < veillesRestantes; i++) {
        const veille = new VeilleSchema({
          _id: "654a05266a924d1b970ef1cd",
          start: "9:00",
          stop: "23:00",
          enable: false,
        });
        await veille.save();
      }
    }
  } catch (error) {
    console.error(
      "Erreur lors de l'initialisation des documents veille :",
      error
    );
  }
};
exports.getVeille = async (req, res) => {
  try {
    const veilles = await VeilleSchema.find({});
    res.status(200).send(veilles);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

exports.updateVeille = async (req, res) => {
  try {
    console.log("updateVeille", req.body);
    const veilleUpdated = await VeilleSchema.findOneAndUpdate(
      { _id: "654a05266a924d1b970ef1cd" },
      req.body,
      { new: true }
    );
    if (!veilleUpdated) {
      res.status(404).send("Aucune veille trouvée avec cet ID");
    } else {
      res.status(200).send(veilleUpdated);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
