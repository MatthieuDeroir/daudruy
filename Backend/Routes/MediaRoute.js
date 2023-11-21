
const uploadController = require('../Controllers/MediaController');
const authMiddleware = require("../Middlewares/AuthMiddleware");
const upload = require('../Middlewares/UploadMiddleware');

const express = require('express');
const router = express.Router();

router.post('/upload', authMiddleware.protect, upload.single('file'), uploadController.uploadFile);
router.post('/delete', authMiddleware.protect,uploadController.deleteFile);

module.exports = router;