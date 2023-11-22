const express = require("express");
const router = express.Router();
const settingsController = require("../Controllers/SettingsController");

const authMiddleware = require("../Middlewares/AuthMiddleware");

router
  .route("/get-veille")
  .get(settingsController.getSettings);

router
  .route("/update-days")

  .put(authMiddleware.protect, settingsController.updateSettings);

module.exports = router;
