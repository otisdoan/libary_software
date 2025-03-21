const Review = require('../models/review');
const Book = require('../models/book');

class ReviewRepository {
    async createReview(reviewData) {
        const bookExists = await Book.exists({_id: reviewData.bookId});
        if (!bookExists) {
            throw new Error('Book not found');
        }
        return Review.create(reviewData);
    }

    async updateReview(id, reviewData) {
        const reviewExists = await Review.exists({_id: id});
        if (!reviewExists) {
            throw new Error('Review not found');
        }
        return Review.findOneAndUpdate({_id: id}, reviewData, {
            new: true,
            runValidators: true
        });
    }

    async findAllPaginatedByBookId(bookId, page = 1, size = 10, sortField = 'createdAt') {
        const skip = (page - 1) * size;

        const [data, total] = await Promise.all([
            Review.find({ bookId })
                .populate('userId', 'email') // Join with User to get email
                .populate('bookId', 'title') // Join with Book to get title
                .sort({ [sortField]: 1 })
                .skip(skip)
                .limit(size),
            Review.countDocuments({ bookId })
        ]);

        const detailedReviews = data.map(review => ({
            id: review._id,
            email: review.userId ? review.userId.email : 'Unknown user',
            bookTitle: review.bookId ? review.bookId.title : 'Unknown book',
            content: review.content,
            createdAt: review.createdAt
        }));

        return {
            data: detailedReviews,
            totalElements: total,
            totalPages: Math.ceil(total / size),
            currentPage: page,
            currentSize: size
        };
    }
}

module.exports = new ReviewRepository();