const borrowRecordService = require('../services/borrowRecordService');

class BorrowRecordController {
    async requestBorrowBook(req, res) {
        try {
            const {userId, bookId, returnDays} = req.body;
            const result = await borrowRecordService.requestBorrowBook(userId, bookId, returnDays);
            res.status(201).json({message: 'Borrow book request has been sent', result});
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }

    async approveOrRejectBorrowRequest(req, res) {
        try {
            const {status} = req.body;
            const result = await borrowRecordService.approveOrRejectBorrowRequest(req.params.id, status);
            res.status(200).json({message: `Request has been updated to ${status}`, result});
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }

    async returnBook(req, res) {
        try {
            const result = await borrowRecordService.returnBook(req.params.id);
            res.status(200).json({message: 'Book has been returned', result});
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }

    async getUserBorrowHistory(req, res) {
        try {
            const page = Math.max(1, parseInt(req.query.page) || 1);
            const size = Math.min(100, Math.max(1, parseInt(req.query.size) || 10));
            const result = await borrowRecordService.getUserBorrowHistory(req.params.userId, page, size);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async getAllBorrowRecords(req, res) {
        try {
            const page = Math.max(1, parseInt(req.query.page) || 1);
            const size = Math.min(100, Math.max(1, parseInt(req.query.size) || 10));
            const sortField = ['createdAt'].includes(req.query.field)
                ? req.query.field
                : 'createdAt';

            const result = await borrowRecordService.getAllBorrowRecords(page, size, sortField);
            res.json(result);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }
    
    async getExecutedBorrowRecordHistory(req, res) {
        try {
            const page = Math.max(1, parseInt(req.query.page) || 1);
            const size = Math.min(100, Math.max(1, parseInt(req.query.size) || 10));
            const sortField = ['createdAt'].includes(req.query.field)
                ? req.query.field
                : 'createdAt';

            const result = await borrowRecordService.getExecutedBorrowRecordHistory(page, size, sortField);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
}

module.exports = new BorrowRecordController();