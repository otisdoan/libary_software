const reviewRepository = require('../repositories/reviewRepository');
class ReviewService {
    async create(reviewData) {
        return await reviewRepository.createReview(reviewData);
    }
    async getAllReviewByBookId(bookId, page, size, sortField) {
        return await reviewRepository.findAllPaginatedByBookId(bookId, page, size, sortField);
    }
    async update(id, updateData) {
        return await reviewRepository.updateReview(id, updateData);
    }
    async delete(id) {
        return await reviewRepository.deleteReview(id);
    }
}
module.exports = new ReviewService();
