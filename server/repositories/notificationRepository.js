const Notification = require('../models/notification');

class NotificationRepository {
  async createNotification(userId, message) {
    const notification = new Notification({ userId, message });
    return await notification.save();
  }

  async getUserNotifications(userId) {
    return Notification.find({userId}).sort({createdAt: -1});
  }

  async markAsRead(notificationId) {
    return Notification.findByIdAndUpdate(notificationId, {status: 'read'}, {new: true});
  }
}

module.exports = new NotificationRepository();
