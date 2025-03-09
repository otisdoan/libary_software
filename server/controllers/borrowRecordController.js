const borrowRecordService = require('../services/borrowRecordService');

    class BorrowRecordController {
      async requestBorrowBook(req, res) {
        try {
          const { userId, bookId, returnDays } = req.body;
          const result = await borrowRecordService.requestBorrowBook(userId, bookId, returnDays);
          res.status(201).json({ message: 'Borrow book request has been sent', result });
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
      }

      async approveOrRejectBorrowRequest(req, res) {
        try {
          const { status } = req.body;
          const result = await borrowRecordService.approveOrRejectBorrowRequest(req.params.id, status);
          res.status(200).json({ message: `Request has been updated to ${status}`, result });
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
      }

      async returnBook(req, res) {
        try {
          const result = await borrowRecordService.returnBook(req.params.id);
          res.status(200).json({ message: 'Book has been returned', result });
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
      }

      async getUserBorrowHistory(req, res) {
        try {
          const result = await borrowRecordService.getUserBorrowHistory(req.params.userId);
          res.status(200).json({ history: result });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      }

      async getBorrowRecordDetail(req, res) {
        try {
          const result = await borrowRecordService.getBorrowRecordDetail(req.params.id);
          res.status(200).json({ detail: result });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      }

    }

    module.exports = new BorrowRecordController();