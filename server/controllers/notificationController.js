const notificationService = require('../services/notificationService');

class NotificationController {
  async getUserNotifications(req, res) {
    try {
      const page = Math.max(1, parseInt(req.query.page) || 1);
      const size = Math.min(100, Math.max(1, parseInt(req.query.size) || 10));
      const notifications = await notificationService.getUserNotifications(req.params.userId, page, size);
      res.status(200).json(notifications);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async markNotificationAsRead(req, res) {
    try {
      const result = await notificationService.markNotificationAsRead(req.params.id);
      res.status(200).json({ message: 'Notification has been marked as read.', result });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteNotification(req, res) {
    try {
        const result = await notificationService.deleteNotification(req.params.id);
        res.status(200).json({ message: 'Notification has been deleted.', result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  }

  async markAllNotificationsAsRead(req, res) {
    try {
      const result = await notificationService.markAllNotificationsAsRead(req.params.userId);
      res.status(200).json({ message: 'All notifications have been marked as read.', result });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new NotificationController();
