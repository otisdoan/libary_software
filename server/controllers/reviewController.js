const reviewService = require('../services/reviewService');

const reviewController = {
    createReview: async (req, res) => {
        try {
            const review = await reviewService.create(req.body);
            res.status(201).json(review);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getAllReviewByBookId: async (req, res) => {
        try {
            const page = Math.max(1, parseInt(req.query.page) || 1); // Default page is 1
            const size = Math.min(100, Math.max(1, parseInt(req.query.size) || 10)); // Size is capped at 100. Default size is 10
            const sortField = req.query.sortField || 'createdAt'; // Field to sort by. Default is createdAt
            const bookId = req.params.bookId;
            const result = await reviewService.getAllReviewByBookId(bookId, page, size, sortField);

            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    updateReview: async (req, res) => {
        try {
            const updatedReview = await reviewService.update(req.params.id, req.body);
            if (!updatedReview) {
                return res.status(404).json({ error: 'Review not found' });
            }
            res.json(updatedReview);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = reviewController;