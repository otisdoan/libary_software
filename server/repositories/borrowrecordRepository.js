const BorrowRecord = require('../models/borrowRecord');

class BorrowRecordRepository {
    async createBorrowRequest(userId, bookId, dueDate) {
        const borrowRequest = new BorrowRecord({userId, bookId, status: 'pending', dueDate});
        return await borrowRequest.save();
    }

    async findBorrowRequestById(id) {
        return BorrowRecord.findById(id);
    }

    async findBorrowRequestsByUser(userId) {
        return BorrowRecord.find({userId}).populate('bookId', 'title author').sort({createdAt: -1});
    }

    async updateBorrowRequestStatus(id, status) {
        return BorrowRecord.findByIdAndUpdate(id, {status}, {new: true});
    }

    async updateReturnDate(id) {
        return BorrowRecord.findByIdAndUpdate(id, {status: 'returned', returnDate: new Date()}, {new: true});
    }

    async getBorrowRecordDetail(borrowRecordId) {
        return await BorrowRecord.findById(borrowRecordId)
            .populate('userId', 'email') // Get email from User collection
            .populate('bookId', 'title') // Get title from Book collection
            .exec();
    }

    async findBorrowsDueInTwoDays() {
        const today = new Date();
        const twoDaysFromNow = new Date(today);
        twoDaysFromNow.setDate(today.getDate() + 2);

        return BorrowRecord.find({
            dueDate: {
                $gte: today,
                $lt: twoDaysFromNow
            },
            status: 'approved'
        });
    }
}

module.exports = new BorrowRecordRepository();
