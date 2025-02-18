const express = require('express');
const borrowRecordController = require('../controllers/borrowRecordController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/borrow-request', protect, borrowRecordController.requestBorrowBook);
router.put('/borrow-request/:id', protect, authorize(['admin']), borrowRecordController.approveOrRejectBorrowRequest);
router.put('/return-book/:id', protect, authorize(['admin']), borrowRecordController.returnBook);
router.get('/borrow-history/:userId', protect, borrowRecordController.getUserBorrowHistory);
router.get('/borrow-record-detail/:id', protect, borrowRecordController.getBorrowRecordDetail);
module.exports = router;
