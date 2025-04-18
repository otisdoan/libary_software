const notificationRepo = require('../repositories/notificationRepository');
    const borrowRecordRepo = require('../repositories/borrowrecordRepository');
    const bookRepo = require('../repositories/bookRepository');

    class NotificationService {
      async notifyBorrowStatus(userId, borrowRecordId, status) {
        const borrowRecord = await borrowRecordRepo.findBorrowRequestById(borrowRecordId);
        if (!borrowRecord) return;

        const book = await bookRepo.findById(borrowRecord.bookId);
        const bookTitle = book ? book.title : 'a book';

        let message = '';
        switch (status) {
          case 'approved':
            message = `Your request to borrow the book "${bookTitle}" has been approved!`;
            break;
          case 'rejected':
            message = `Your request to borrow the book "${bookTitle}" has been rejected.`;
            break;
          case 'returned':
            message = `You have successfully returned the book "${bookTitle}"!`;
            break;
          default:
            message = `The status of your request to borrow the book "${bookTitle}" has been updated.`;
        }

        return await notificationRepo.createNotification(userId, message);
      }

      async sendReminder(userId, borrowRecordId) {
        const borrowRecord = await borrowRecordRepo.findBorrowRequestById(borrowRecordId);
        if (!borrowRecord || borrowRecord.status !== 'approved') return;

        const book = await bookRepo.findById(borrowRecord.bookId);
        const bookTitle = book ? book.title : 'a book';

        const returnDate = new Date(borrowRecord.returnDate);
        const today = new Date();
        const daysLeft = Math.ceil((returnDate - today) / (1000 * 60 * 60 * 24));

        let message = '';
        if (daysLeft === 3) {
          message = `You have 3 days left to return the book "${bookTitle}". Please check the time.`;
        } else if (daysLeft === 1) {
          message = `Tomorrow is the due date to return the book "${bookTitle}", don't forget!`;
        } else if (daysLeft < 0) {
          message = `You are overdue to return the book "${bookTitle}". Please return it immediately to avoid penalties!`;
        }

        if (message) {
          return await notificationRepo.createNotification(userId, message);
        }
      }

      async getUserNotifications(userId, page = 1, size = 10) {
        return await notificationRepo.getUserNotifications(userId, page, size);
      }

      async markNotificationAsRead(notificationId) {
        return await notificationRepo.markAsRead(notificationId);
      }

      async deleteNotification(notificationId) {
        return await notificationRepo.deleteNotification(notificationId);
      }
      async markAllNotificationsAsRead(userId) {
        return await notificationRepo.markAllNotificationsAsRead(userId);
      }
    }

    module.exports = new NotificationService();