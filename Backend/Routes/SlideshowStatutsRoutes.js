const express = require('express');
const router = express.Router();
const slideshowStatusController = require('../Controllers/SlideshowStatutController');

router.get('/', slideshowStatusController.getSlideshowStatus);
router.put('/', slideshowStatusController.updateSlideshowStatus);

module.exports = router;
