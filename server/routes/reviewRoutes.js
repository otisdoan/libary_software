const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { protect, authorize} = require('../middleware/authMiddleware');
const publisherController = require("../controllers/publisherController");

router.post('/create', protect,  reviewController.createReview);
router.get('/get-all/:bookId', protect,  reviewController.getAllReviewByBookId);
router.put('/update/:id', protect,  reviewController.updateReview);

module.exports = router;