const Slideshow = require("../Models/SlideshowModel");
const fs = require("fs");
const Media = require("../Models/MediaModel");

exports.getAllSlideshows = async (req, res) => {
  try {
    const slideshows = await Slideshow.find();
    res.status(200).json({
      status: "success",
      data: {
        slideshows,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.addSimpleMediaToSlideshow = async (req, res) => {
  const slideshowId = req.params.id;
  console.log("addSimpleMediaToSlideshow", req.body);
  console.log("addSimpleMediaToSlideshow", req.params.id);
  //ajouter media vide dans le tableau media

  try {
    const slideshow = await Slideshow.findById(slideshowId);
    if (!slideshow) {
      return res.status(404).json({
        status: "fail",
        message: "Slideshow non trouvé",
      });
    }

    const media = new Media({
      originalFilename: "Panneau",
      duration: 10,
      type: "Panneau",
    });

    slideshow.media.push(media);
    const updatedSlideshow = await slideshow.save();
    res.status(200).json({
      status: "success",
      data: {
        newMedia: media,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "fail",
      message:
        err.message ||
        "Une erreur est survenue lors de la mise à jour du slideshow",
    });
  }
};

exports.updateMediaOrder = async (req, res) => {
  const slideshowId = req.params.id;
  const newOrder = req.body; // le nouveau tableau des ordres avec les IDs des médias

  try {
    // Récupérez le slideshow actuel
    const slideshow = await Slideshow.findOne({ _id: slideshowId });

    if (!slideshow) {
      return res.status(404).json({
        status: "fail",
        message: "Slideshow non trouvé",
      });
    }

    const orderedMediaArray = newOrder
      .map((orderItem) => {
        const mediaItem = slideshow.media.find(
          (media) => media._id.toString() === orderItem.mediaId
        );

        return mediaItem
          ? { ...mediaItem.toObject(), order: orderItem.newPosition }
          : null;
      })
      .filter((media) => media !== null); // Filtrez les éléments non trouvés (null)

    slideshow.media = orderedMediaArray;
    const updatedSlideshow = await slideshow.save();

    res.status(200).json({
      status: "success",
      data: {
        slideshow: updatedSlideshow,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "fail",
      message:
        err.message ||
        "Une erreur est survenue lors de la mise à jour de l'ordre des médias",
    });
  }
};

// Créer un nouveau slideshow
exports.createSlideshow = async (req, res) => {
  console.log("createSlideshow", req.body);
  try {
    const newSlideshow = await Slideshow.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        slideshow: newSlideshow,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

// Obtenir un slideshow par ID
exports.getSlideshow = async (req, res) => {
  try {
    const slideshow = await Slideshow.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        slideshow,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// Mettre à jour un slideshow
exports.updateSlideshow = async (req, res) => {
  try {
    const slideshow = await Slideshow.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        slideshow,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// Supprimer un slideshow
// Supprimer un slideshow et tous les médias associés
exports.deleteSlideshow = async (req, res) => {
  const slideshowId = req.params.id;
  console.log("deleteSlideshow", slideshowId);

  try {
    const slideshow = await Slideshow.findById(slideshowId);
    if (!slideshow) {
      return res.status(404).json({
        status: "fail",
        message: "Slideshow non trouvé",
      });
    }

    // Supprimer les fichiers médias associés du système de fichiers
    const mediaDeletions = slideshow.media.map(media => {
      const mediaPath = "../../frontend/build/media/" + media.path;
      return fs.promises.unlink(mediaPath).catch(err => {
        console.error(err);
        // Si le fichier n'existe pas, ce n'est pas grave, continuer la suppression
        if (err.code !== "ENOENT") {
          throw err; // Si c'est une autre erreur, nous la lançons
        }
      });
    });

    // Attendre la suppression de tous les fichiers
    await Promise.all(mediaDeletions);

    // Après la suppression des fichiers, supprimer le slideshow de la base de données
    await Slideshow.findByIdAndDelete(slideshowId);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "fail",
      message: err.message || "Une erreur est survenue lors de la suppression du slideshow",
    });
  }
};

exports.updateSlideshowMedia = async (req, res) => {
  try {
    const slideshow = await Slideshow.findById(req.params.id);
    if (!slideshow) {
      return res.status(404).json({
        status: "fail",
        message: "Slideshow non trouvé",
      });
    }
    const media = slideshow.media.id(req.params.mediaId);
    if (!media) {
      return res.status(404).json({
        status: "fail",
        message: "Média non trouvé",
      });
    }
    media.duration = req.body.duration;
    await slideshow.save();
    res.status(200).json({
      status: "success",
      data: {
        slideshow,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(404).json({
      status: "fail",
      message: err.message || "Une erreur est survenue",
    });
  }
};

exports.deleteMediaFromSlideshow = async (req, res) => {

  try {
    const slideshow = await Slideshow.findById(req.params.id);
    if (!slideshow) {
      return res.status(404).json({
        status: "fail",
        message: "Slideshow non trouvé",
      });
    }
    const media = slideshow.media.id(req.params.mediaId);
    
    if (!media) {
      return res.status(404).json({
        status: "fail",
        message: "Média non trouvé",
      });
    }

    console.log("deleteMediaFromSlideshow01", media);
    console.log(`../../../daudruy/frontend/build${media.path}`);
    
    fs.unlink(
      "../../daudruy/frontend/build" + media.path,
      async (err) => {
        if (err) {
          console.error(err);
          if (err.code !== "ENOENT") {
            return res.status(500).json({
              status: "fail",
              message: "Échec de la suppression du fichier média du serveur",
            });
          }
        }
        try {
          slideshow.media.pull({ _id: req.params.mediaId });
          await slideshow.save();
          res.status(204).json({
            status: "success",
            data: null,
          });
        } catch (dbError) {
          console.error(dbError);
          res.status(500).json({
            status: "fail",
            message:
              "Échec de la mise à jour du slideshow après la tentative de suppression du média",
          });
        }
      }
    );
  } catch (err) {
    console.error(err);
    res.status(404).json({
      status: "fail",
      message: err.message || "Une erreur est survenue",
    });
  }
};
