const express = require('express');
const notificationController = require('../controllers/notificationController');
const router = express.Router();

router.get('/:userId', notificationController.getUserNotifications);
router.put('/:id/read', notificationController.markNotificationAsRead);

module.exports = router;
