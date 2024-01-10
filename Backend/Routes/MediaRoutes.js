
const uploadController = require('../Controllers/MediaController');
const authMiddleware = require("../Middlewares/AuthMiddleware");
const upload = require('../Middlewares/UploadMiddleware');

const express = require('express');
const router = express.Router();

router.post('/upload', authMiddleware.protect, upload.single('file'), uploadController.uploadFile);
router.delete('/delete/:id', authMiddleware.protect,uploadController.deleteFile);
router.put('/order', authMiddleware.protect,uploadController.updateOrder);
router.post('/panel/:id', authMiddleware.protect,uploadController.addPanel)


module.exports = router;