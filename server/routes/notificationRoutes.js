const express = require('express');
const notificationController = require('../controllers/notificationController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.get('/:userId', protect, notificationController.getUserNotifications);
router.put('/:id/read', protect, notificationController.markNotificationAsRead);
router.delete('/:id', protect, notificationController.deleteNotification);
router.put('/:userId/read-all', protect, notificationController.markAllNotificationsAsRead);
module.exports = router;
