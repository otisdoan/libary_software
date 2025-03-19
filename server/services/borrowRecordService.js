

const borrowRecordRepo = require('../repositories/borrowrecordRepository');
const Book = require('../models/book');
const notificationService = require('./notificationService');

  class BorrowRecordService {
    async requestBorrowBook(userId, bookId, returnDays) {
      const book = await Book.findById(bookId);
      if (!book) throw new Error('Book does not exist');
      if (book.leftBook <= 0) throw new Error('Book is out of stock');

      const borrowDate = new Date();
      const returnDate = new Date(borrowDate);
      returnDate.setDate(borrowDate.getDate() + returnDays);

      return await borrowRecordRepo.createBorrowRequest(userId, bookId, returnDate);
    }

    async approveOrRejectBorrowRequest(id, status) {
      const borrowRequest = await borrowRecordRepo.findBorrowRequestById(id);
      if (!borrowRequest) throw new Error('Request does not exist');

      if (status === 'approved') {
        const book = await Book.findById(borrowRequest.bookId);
        if (!book || book.leftBook <= 0) throw new Error('Cannot approve, book is out of stock');

        book.leftBook -= 1;
        book.borrowBook += 1;
        await book.save();
      }

      const updatedRequest = await borrowRecordRepo.updateBorrowRequestStatus(id, status);

      // Send notification to user
      await notificationService.notifyBorrowStatus(borrowRequest.userId, borrowRequest._id, status);

      return updatedRequest;
    }

    async returnBook(id) {
      const borrowRecord = await borrowRecordRepo.findBorrowRequestById(id);
      if (!borrowRecord || borrowRecord.status !== 'approved') throw new Error('Invalid request');

      const book = await Book.findById(borrowRecord.bookId);
      if (book) {
        book.leftBook += 1;
        book.borrowBook -= 1;
        await book.save();
      }

      return await borrowRecordRepo.updateReturnDate(id);
    }

    async getUserBorrowHistory(userId, page, size) {
      return await borrowRecordRepo.findBorrowRequestsByUser(userId, page, size);
    }

    async getAllBorrowRecords(page, size, sortField) {
      const result = await borrowRecordRepo.findAll(page, size, sortField);
      const detailedRecords = result.data.map(borrowRecord => ({
        id: borrowRecord._id,
        email: borrowRecord.userId ? borrowRecord.userId.email : 'Unknown user',
        bookTitle: borrowRecord.bookId ? borrowRecord.bookId.title : 'Unknown book',
        borrowDate: borrowRecord.borrowDate,
        returnDate: borrowRecord.returnDate,
        status: borrowRecord.status
      }));

      return {
        data: detailedRecords,
        totalElements: result.totalElements,
        totalPages: result.totalPages,
        currentPage: result.currentPage,
        currentSize: result.currentSize
      };
    }
  }

  module.exports = new BorrowRecordService();