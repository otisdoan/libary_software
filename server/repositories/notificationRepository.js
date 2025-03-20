const Notification = require('../models/notification');

class NotificationRepository {
  async createNotification(userId, message) {
    const notification = new Notification({ userId, message });
    return await notification.save();
  }

  async getUserNotifications(userId, page = 1, size = 10) {
    const skip = (page - 1) * size;
    const [data, total] = await Promise.all([
      Notification.find({ userId }).sort({ createdAt: -1 }).skip(skip).limit(size),
      Notification.countDocuments({ userId })
    ]);

    return {
      data,
      totalElements: total,
      totalPages: Math.ceil(total / size),
      currentPage: page,
      currentSize: size
    };
  }

  async markAsRead(notificationId) {
    return Notification.findByIdAndUpdate(notificationId, {status: 'read'}, {new: true});
  }

  async deleteNotification(notificationId) {
    return Notification.findByIdAndDelete(notificationId);
  }
  async markAllNotificationsAsRead(userId) {
    return Notification.updateMany({ userId, status: 'unread' }, { status: 'read' });
  }

}

module.exports = new NotificationRepository();
