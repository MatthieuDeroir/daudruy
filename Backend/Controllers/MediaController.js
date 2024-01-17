const fs = require("fs");
const crypto = require("crypto");
const path = require("path");
const util = require('util');
const ffmpeg = require("fluent-ffmpeg");
const Media = require("../Models/MediaModel");
const sequelize = require("../Database/Sequelize");
const Slideshow = require("../Models/SlideshowModel");

const saveMediaAndUpdateSlideshow = async (media, slideshowId) => {
    const newMedia = await Media.create(media.dataValues);
    const slideshow = await Slideshow.findByPk(slideshowId);
    await slideshow.addMedia(newMedia);
    return newMedia;
  };

const getVideoDuration = (filePath) => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) reject(err);
      else resolve(metadata.format.duration);
    });
  });
};

exports.uploadFile = async (req, res) => {
    const { slideshowId } = req.body;
    const { originalname, mimetype, path: oldPath } = req.file;
    const format = mimetype.split("/")[1];
    const uniqueValue = Math.random().toString();
    const hashedFilename = crypto
      .createHash("sha256")
      .update(originalname + uniqueValue)
      .digest("hex");
    const newPath = path.join(
      __dirname,
      process.env.UPLOAD_PATH,
      `${hashedFilename}.${format}`
    );
    const currentMediaCount = await Media.count({ where: { slideshowId } });
  
    const mediaData = {
      originalFilename: originalname,
      hashedFilename,
      user: "user",
      format,
      path: `/media/${hashedFilename}.${format}`,
      duration: 10,
      type: mimetype,
      order: currentMediaCount + 1,
      slideshowId,
    };
  
    try {
        await fs.promises.rename(oldPath, newPath);
        if (mimetype.startsWith("video/")) {
          mediaData.duration = await getVideoDuration(newPath);
        }
        const newMedia = await saveMediaAndUpdateSlideshow(new Media(mediaData), slideshowId);
        res
          .status(200)
          .send({ media: newMedia, code: 200 });
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .send({ message: "Échec du téléchargement du fichier", code: 500 });
      }
  };
const unlinkAsync = util.promisify(fs.unlink);

exports.deleteFile = async (req, res) => {
    try {
        const media = await Media.findByPk(req.params.id);
        const filePath = media ? path.join(__dirname, process.env.UPLOAD_PATH, `${media.hashedFilename}.${media.format}`) : null;

        // Check if file exists on disk
        const fileExists = filePath && fs.existsSync(filePath);

        if (media) {
            if (!media.type.startsWith("panel") && fileExists) {
                await unlinkAsync(filePath);
            }

            // Delete the media record from the database
            await media.destroy();
            return res.status(200).send({ message: "Fichier et enregistrement média supprimés avec succès", code: 200 });
        } else if (fileExists) {
            // Handle case where media is not in DB but file exists on disk
            await unlinkAsync(filePath);
            return res.status(200).send({ message: "Fichier supprimé avec succès, aucun enregistrement média trouvé", code: 200 });
        } else {
            // Neither file nor media record exists
            return res.status(404).send({ message: "Aucun fichier ou enregistrement média trouvé", code: 404 });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: "Une erreur s'est produite lors de la tentative de suppression",
            code: 500,
        });
    }
};

exports.updateOrder = async (req, res) => {
  const { newOrder } = req.body;
  const transaction = await sequelize.transaction();
  try {
    for (let i = 0; i < newOrder.length; i++) {
      const media = await Media.findByPk(newOrder[i].id, { transaction });
      if (media) {
        media.order = i;
        await media.save({ transaction });
      }
    }
    await transaction.commit();

    res
      .status(200)
      .send({
        message: "L'ordre des médias a été mis à jour avec succès",
        code: 200,
      });
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    res
      .status(500)
      .send({
        message:
          "Une erreur s'est produite pendant la mise à jour de l'ordre des médias",
        code: 500,
      });
  }
};

exports.addPanel = async (req, res) => {
    console.log(req.params);
    const slideshowId  = req.params.id;
    const currentMediaCount = await Media.count({ where: { slideshowId } });
    const mediaData = {
        originalFilename: 'panel',
        hashedFilename: 'panel' ,
        user: "user",
        format: 'panel',
        path: `'panel'`,
        duration: 10,
        type: 'panel',
        order: currentMediaCount + 1,
        slideshowId,
      };
    try {
        const newMedia = await saveMediaAndUpdateSlideshow(new Media(mediaData), slideshowId);
        res
          .status(200)
          .send({ media: newMedia, code: 200 });
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .send({ message: "Échec du téléchargement du fichier", code: 500 });
      }
    }
