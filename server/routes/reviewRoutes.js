const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { protect} = require('../middleware/authMiddleware');

router.post('/create', protect,  reviewController.createReview);
router.get('/get-all/:bookId', protect,  reviewController.getAllReviewByBookId);
router.put('/update/:id', protect,  reviewController.updateReview);
router.delete('/delete/:id', protect,  reviewController.deleteReview);
module.exports = router;