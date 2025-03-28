const express = require('express');
const borrowRecordController = require('../controllers/borrowRecordController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/borrow-request', protect, borrowRecordController.requestBorrowBook);
router.put('/borrow-request/:id', protect, authorize(['admin']), borrowRecordController.approveOrRejectBorrowRequest);
router.put('/return-book/:id', protect, authorize(['admin']), borrowRecordController.returnBook);
router.get('/borrow-history/:userId', protect, borrowRecordController.getUserBorrowHistory);
router.get('/', protect, authorize(['admin']), borrowRecordController.getAllBorrowRecords);
router.get('/executed-request-history', protect, borrowRecordController.getExecutedBorrowRecordHistory);
router.put('/borrow-records/:id/renew', borrowRecordController.renewBorrowRecord);
router.get('/borrow-records-expired', borrowRecordController.getExpiredBorrowRequests);
module.exports = router;
