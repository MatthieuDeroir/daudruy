const fs = require("fs");
const crypto = require("crypto");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");

const Media = require("../Models/MediaModel");
const Slideshow = require("../Models/SlideshowModel");

exports.uploadFile = async (req, res) => {
  console.log(req.file);
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
        .send({ message: "Le téléchargement du fichier a échoué 05", code: 500 });
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
      // Pour les images et autres types de fichiers, mettez une durée par défaut ou gérez comme nécessaire.
      const media = new Media({
        originalFilename: originalFilename,
        hashedFilename: hashedFilename,
        user: req.body.user,
        format: format,
        path: `/media/${hashedFilename}.${format}`,
        duration: 10,
        type: type,
      });

      try {
        await saveMediaAndUpdateSlideshow(media, slideshowId, res);
      } catch (error) {
        handleError(error, res);
      }
    }
  });
};

async function saveMediaAndUpdateSlideshow(media, slideshowId, res) {
  await Slideshow.findByIdAndUpdate(
    slideshowId,
    { $push: { media: media } },
    { new: true, useFindAndModify: false }
  );

  res.status(200).json(media);
}

function handleError(error, res) {
  console.log(error);
  res.status(500).send({
    message: "Erreur lors de l'ajout du média au slideshow",
    code: 500,
  });
}

exports.deleteFile = (req, res) => {
  const directoryPath = path.join(
    __dirname,
    "../../panneau_couchet/build/media/"
  );
  const fileName = req.body.fileName;
  const format = req.body.format;

  if (req.body.fileName != "file") {
    fs.unlink(`${directoryPath}${fileName}.${format}`, (err) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "File deletion failed", code: 500 });
      } else {
        res.status(200).send({ message: "File deleted", code: 200 });
      }
    });
  }
};
