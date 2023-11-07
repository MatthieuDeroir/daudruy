const Media = require('../Models/MediaSchema');
const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const mime = require('mime');

exports.uploadMedia = async (req, res) => {
    try {
        // Supposons que vous ayez le fichier dans req.file.path
        const filePath = req.file.path;
        const mimeType = mime.getType(filePath);
        let type;
        let duration = 0;

        if (mimeType.startsWith('image')) {
            type = 'image';
        } else if (mimeType.startsWith('video')) {
            type = 'video';
        } else {
            fs.unlinkSync(filePath); // Supprimer le fichier s'il n'est pas du bon type
            return res.status(400).send('Invalid media type. Only images and videos are allowed.');
        }

        if (type === 'video') {
            await new Promise((resolve, reject) => {
                ffmpeg.ffprobe(filePath, (err, metadata) => {
                    if (err) return reject(err);
                    duration = Math.floor(metadata.format.duration);
                    resolve();
                });
            });
        }
        else {
            duration = 30;
        }

        // Créer une nouvelle instance de Media avec le type, la durée, et le chemin
        const media = new Media({
            type,
            duration,
            path: filePath, // ou un autre chemin basé sur votre logique de stockage
        });

        await media.save();
        res.status(201).send(media);

    } catch (error) {
        console.error('Error uploading media:', error);
        res.status(500).send('Error uploading media.');
    }
};


exports.getAllMedia = async (req, res) => {
    try {
        const media = await Media.find();
        res.status(200).send(media);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteMedia = async (req, res) => {
    try {
        const media = await Media.findById(req.params.id);
        if (!media) return res.status(404).send('Media not found');

        // Suppression du fichier
        fs.unlinkSync(path.join(__dirname, '..', 'media', media.path));

        // Suppression de l'entrée dans la base de données
        await media.remove();
        res.status(200).send(media);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateMedia = async (req, res) => {
    try {
        const media = await Media.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!media) return res.status(404).send('Media not found');
        res.status(200).send(media);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
