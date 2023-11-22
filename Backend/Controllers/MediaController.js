const fs = require("fs");
const crypto = require("crypto");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");

const Media = require("../Models/MediaModel");
const Slideshow = require("../Models/SlideshowModel");

saveMediaAndUpdateSlideshow = async (media, slideshowId, res) => {
    try {
        await Media.create(media);
        const slideshow = await Slideshow.findByPk(slideshowId);
        await slideshow.addMedia(media);
        res.status(200).send({ message: "Fichier téléchargé avec succès", code: 200 });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Échec du téléchargement du fichier", code: 500 });
    }
}

handleError = (error, res) => {
    console.log(error);
    res.status(500).send({ message: "Échec du téléchargement du fichier", code: 500 });
}

exports.uploadFile = async (req, res) => {
    const slideshowId = req.body.slideshowId;
    const originalFilename = req.file.originalname;
    const uniqueValue = Math.random().toString();
    const hashedFilename = crypto
        .createHash("sha256")
        .update(originalFilename + uniqueValue)
        .digest("hex");
    const format = req.file.mimetype.split("/")[1];
    const newpath = path.join(__dirname, "../../frontend/build/media/");
    const oldPath = req.file.path;
    const type = req.file.mimetype;
    const newPathWithFileName = path.join(newpath, `${hashedFilename}.${format}`);

    fs.rename(oldPath, newPathWithFileName, async (err) => {
        if (err) {
        console.log(err);
        return res
            .status(500)
            .send({ message: "Le téléchargement du fichier a échoué", code: 500 });
        }

        // Si le fichier est une vidéo, obtenez sa durée.
        if (type.startsWith("video/")) {
        ffmpeg.ffprobe(newPathWithFileName, async function (err, metadata) {
            if (err) {
            console.error(err);
            return res
                .status(500)
                .send({
                message: "Échec lors de la récupération de la durée de la vidéo",
                code: 500,
                });
            }

            const videoDuration = metadata.format.duration;

            const media = new Media({
            originalFilename: originalFilename,
            hashedFilename: hashedFilename,
            user: req.body.user,
            format: format,
            path: `/media/${hashedFilename}.${format}`,
            duration: videoDuration,
            type: type,
            });

            try {
            await saveMediaAndUpdateSlideshow(media, slideshowId, res);
            } catch (error) {
            handleError(error, res);
            }
        });
        } else {
        const media = new Media({
            originalFilename: originalFilename,
            hashedFilename: hashedFilename,
            user: req.body.user,
            format: format,
            path: `/media/${hashedFilename}.${format}`,
            type: type,
        });

        try {
            await saveMediaAndUpdateSlideshow(media, slideshowId, res);
        } catch (error) {
            handleError(error, res);
        }
        }
    });
}

exports.deleteFile = async (req, res) => {
    try {
        const media = await Media.findByPk(req.params.id);
        await media.destroy();
        res.status(200).send({ message: "Fichier supprimé avec succès", code: 200 });
    } catch (error) {
        res.status(500).send(error.message);
    }
};





