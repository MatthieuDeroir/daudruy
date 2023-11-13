const VeilleSchema = require("../Models/VeilleModel");

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
    console.log("updateVeille",req.body);
    const veilleUpdated = await VeilleSchema.findOneAndUpdate(
      { _id: req.body._id},
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
