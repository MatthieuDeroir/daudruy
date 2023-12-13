const {Media, Slideshow} = require("../Models");


exports.getAllSlideshows = async (req, res) => {
    try {
        const slideshows = await Slideshow.findAll({
            include: [{
                model: Media,
                as: 'media'
            }]
        });
        res.status(200).json({
            status: "success",
            data: {
                slideshows,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message,
        });
    }
};


exports.addSimpleMediaToSlideshow = async (req, res) => {
    const slideshowId = req.params.id;

    try {
        const media = await Media.create({
            originalFilename: "Panneau",
            duration: 10,
            type: "Panneau",
            SlideshowId: slideshowId
        });

        res.status(200).json({
            status: "success",
            data: {
                newMedia: media,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: err.message,
        });
    }
};

exports.createSlideshow = async (req, res) => {
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
            message: err.message,
        });
    }
};


exports.getSlideshow = async (req, res) => {
    try {
        const slideshow = await Slideshow.findByPk(req.params.id, {
            include: {
                model: Media,
                as: 'media'
            }
        });
        if (!slideshow) {
            return res.status(404).json({
                status: "fail",
                message: "Slideshow non trouvé",
            });
        }
        res.status(200).json({
            status: "success",
            data: {
                slideshow,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message,
        });
    }
};


exports.addSlideshow = async (req, res) => {
    try {
        const slideshow = await Slideshow.create(req.body);
        res.status(201).send(slideshow);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.deleteSlideshow = async (req, res) => {

    const slideshowId = req.params.id;

    try {
        // Supprimer les fichiers médias associés, si nécessaire
        const slideshow = await Slideshow.findByPk(slideshowId, {
            include: {
                model: Media,
                as: 'media'
            }
        });

        await Slideshow.destroy({
            where: {id: slideshow.id}
        });

        res.status(204).json({
            status: "success",
            data: null,
            message: "Slideshow supprimé avec succès"
        });
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: err.message || "Une erreur est survenue lors de la suppression du slideshow",
            log: err
        });
        console.log(err);
    }
};


exports.updateSlideshow = async (req, res) => {
    try {
        const slideshow = await Slideshow.update(req.body, {
            where: {id: req.params.id},
            returning: true,
            plain: true
        });
        res.status(200).json({
            status: "success",
            data: {
                slideshow,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message,
        });
    }
};

exports.updateMediaOrder = async (req, res) => {
    const slideshowId = req.params.id;
    const newOrder = req.body; // Le nouveau tableau des ordres avec les IDs des médias

    try {
        // Récupérez le slideshow actuel et les médias associés
        const slideshow = await Slideshow.findByPk(slideshowId, {
            include: {
                model: Media,
                as: 'media'
            }
        });

        if (!slideshow) {
            return res.status(404).json({
                status: "fail",
                message: "Slideshow non trouvé",
            });
        }

        // Mise à jour de l'ordre pour chaque média
        for (const orderItem of newOrder) {
            const media = slideshow.Media.find(m => m.id === orderItem.mediaId);
            if (media) {
                await media.update({order: orderItem.newPosition});
            }
        }

        res.status(200).json({
            status: "success",
            data: {
                slideshow,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "fail",
            message: err.message || "Une erreur est survenue lors de la mise à jour de l'ordre des médias",
        });
    }

};

exports.updateSlideshowMedia = async (req, res) => {
    try {
        const mediaId = req.params.mediaId;
        const media = await Media.findByPk(mediaId);

        if (!media) {
            return res.status(404).json({
                status: "fail",
                message: "Média non trouvé",
            });
        }

        await media.update(req.body);

        res.status(200).json({
            status: "success",
            data: {
                media,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "fail",
            message: err.message || "Une erreur est survenue lors de la mise à jour du média",
        });
    }
};

exports.deleteMediaFromSlideshow = async (req, res) => {
    try {
        const mediaId = req.params.mediaId;
        const media = await Media.findByPk(mediaId);

        if (!media) {
            return res.status(404).json({
                status: "fail",
                message: "Média non trouvé",
            });
        }

        // Supprimer le fichier média du système de fichiers
        const mediaPath = path.join(__dirname, "../../frontend/build/media", media.path);

        try {
            await fs.promises.unlink(mediaPath);
        } catch (err) {
            console.error(err);
            if (err.code !== "ENOENT") {
                return res.status(500).json({
                    status: "fail",
                    message: "Échec de la suppression du fichier média du serveur",
                });
            }
        }

        // Supprimer le média de la base de données
        await media.destroy();

        res.status(204).json({
            status: "success",
            data: null,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "fail",
            message: err.message || "Une erreur est survenue lors de la suppression du média",
        });
    }
};



