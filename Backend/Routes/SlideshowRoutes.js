const express = require("express");
const router = express.Router();
const slideshowController = require("../Controllers/SlideshowController");
const authMiddleware = require("../Middlewares/AuthMiddleware");

// Route pour obtenir tous les slideshows
router
    .route("/")
    .get(slideshowController.getAllSlideshows)
    .post(authMiddleware.protect, slideshowController.createSlideshow);

// Route pour créer un nouveau slideshow


// Routes pour obtenir, mettre à jour et supprimer un slideshow spécifique par ID
router
    .route("/:id")
    .get(authMiddleware.protect, slideshowController.getSlideshow)
    .put(authMiddleware.protect, slideshowController.updateSlideshow)
    .delete(authMiddleware.protect, slideshowController.deleteSlideshow)
    .patch(authMiddleware.protect, slideshowController.updateMediaOrder);

router.route("/addPanneau/:id")
    .post(authMiddleware.protect, slideshowController.addSimpleMediaToSlideshow);


router.route("/:id/:mediaId")
    .patch(authMiddleware.protect, slideshowController.updateSlideshowMedia)
    .delete(authMiddleware.protect, slideshowController.deleteMediaFromSlideshow);

module.exports = router;
