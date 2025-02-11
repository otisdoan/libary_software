const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect, authorize } = require('../middleware/authMiddleware');


router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/get-my-info', protect, authController.getMyInfo);
router.get('/activate/:token', authController.activateAccount);
router.post('/reset-password-email', authController.sendResetPasswordEmail);
router.post('/change-password', protect, authController.changePassword);
router.post('/reset-password/:token', authController.resetPassword);
router.get('/get-all-users', protect, authorize(['admin']), authController.getAllUsers);

module.exports = router;