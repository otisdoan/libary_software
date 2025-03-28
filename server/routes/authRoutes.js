const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/get-my-info', protect, authController.getMyInfo);
router.post('/activate', authController.activateAccount);
router.post('/reset-password-email', authController.sendResetPasswordEmail);
router.post('/change-password', protect, authController.changePassword);
router.post('/reset-password', authController.resetPassword);
router.get('/', protect, authorize(['admin']), authController.getAllUsers);
router.put('/assign-role/:id', protect, authorize(['admin']), authController.updateUserRole);
router.put('/update-user-status/:id', protect, authorize(['admin']), authController.updateUserStatus);
router.post('/refresh-token', authController.refreshAccessToken);
module.exports = router;