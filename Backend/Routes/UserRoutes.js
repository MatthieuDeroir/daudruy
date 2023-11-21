const express = require('express');
const router = express.Router();
const authController = require('../Controllers/UserController');

router.post('/signing', authController.signing);
router.post('/signup', authController.signup);
router.post('/change-password', authController.changePassword);

module.exports = router;

