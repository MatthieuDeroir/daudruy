const express = require('express');
const router = express.Router();
const mediaController = require('../Controllers/MediaController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './media');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('media'), mediaController.uploadMedia);
router.get('/', mediaController.getAllMedia);
router.delete('/:id', mediaController.deleteMedia);
router.put('/:id', mediaController.updateMedia);

module.exports = router;
