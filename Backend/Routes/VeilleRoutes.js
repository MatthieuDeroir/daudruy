const express = require("express");
const router = express.Router();
const veilleController = require("../controllers/VeilleController");

const authMiddleware = require("../Middlewares/authMiddleware");

router
  .route("/get-veille")
  .get(authMiddleware.protect, veilleController.getVeille);

router
  .route("/update-days")

  .put(authMiddleware.protect, veilleController.updateVeille);

module.exports = router;
