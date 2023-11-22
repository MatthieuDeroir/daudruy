const Settings = require("../Models/SettingsModel");

exports.initializeSettings = async () => {
  try {
    const count = await Settings.count();
    const nombreSettingsInitiales = 1;

    if (count < nombreSettingsInitiales) {
      await Settings.create({
        start: "9:00",
        stop: "23:00",
        enable: false
      });
    }
  } catch (error) {
    console.error("Erreur lors de l'initialisation des paramètres :", error);
  }
};

exports.getSettings = async (req, res) => {
  try {
    const settings = await Settings.findAll();
    res.status(200).send(settings);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};


exports.updateSettings = async (req, res) => {
  try {
    const updatedSettings = await Settings.update(req.body, {
      where: { id: "654a05266a924d1b970ef1cd" },
      returning: true,
      plain: true
    });

    if (!updatedSettings) {
      res.status(404).send("Aucun paramètre trouvé avec cet ID");
    } else {
      res.status(200).send(updatedSettings);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

