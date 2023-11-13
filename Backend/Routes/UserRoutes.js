const express = require('express');
const router = express.Router();
const authController = require('../controllers/UserController');

router.post('/signing', authController.signing);
router.post('/signup', authController.signup);
/* router.post('/change-password', changePassword); */

module.exports = router;

