const BorrowRecord = require('../models/borrowRecord');

class BorrowRecordRepository {
    async createBorrowRequest(userId, bookId, returnDate) {
        if (!userId || !bookId || !returnDate) {
            throw new Error('Missing required parameters');
        }

        try {
            const borrowRequest = new BorrowRecord({ userId, bookId, status: 'pending', returnDate });
            return await borrowRequest.save();
        } catch (error) {
            throw new Error(`Error creating borrow request: ${error.message}`);
        }
    }

    async findBorrowRequestById(id) {
        return BorrowRecord.findById(id);
    }

    async findBorrowRequestsByUser(userId, page = 1, size = 10) {
        const skip = (page - 1) * size;

        const [data, total] = await Promise.all([
            BorrowRecord.find({ userId })
                .populate('bookId', 'title author')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(size),
            BorrowRecord.countDocuments({ userId })
        ]);

        return {
            data,
            totalElements: total,
            totalPages: Math.ceil(total / size),
            currentPage: page,
            currentSize: size
        };
    }

    async updateBorrowRequestStatus(id, status) {
        return BorrowRecord.findByIdAndUpdate(id, {status}, {new: true});
    }

    async updateReturnDate(id) {
        return BorrowRecord.findByIdAndUpdate(id, {status: 'returned', returnDate: new Date()}, {new: true});
    }

    async findBorrowsDueInTwoDays() {
        const today = new Date();
        const twoDaysFromNow = new Date(today);
        twoDaysFromNow.setDate(today.getDate() + 2);

        return BorrowRecord.find({
            returnDate: {
                $gte: today,
                $lt: twoDaysFromNow
            },
            status: 'approved'
        });
    }
    async findAll(page = 1, size = 10, sortField = 'createdAt') {
        const skip = (page - 1) * size;

        const [data, total] = await Promise.all([
            BorrowRecord.find({ status: { $in: ['pending', 'approved'] } })
                .populate('userId', 'email')
                .populate('bookId', 'title')
                .sort({ [sortField]: -1 })
                .skip(skip)
                .limit(size),
            BorrowRecord.countDocuments({ status: { $in: ['pending', 'approved'] } })
        ]);

        return {
            data,
            totalElements: total,
            totalPages: Math.ceil(total / size),
            currentPage: page,
            currentSize: size
        };
    }

    async findExecutedBorrowRecordHistory(page = 1, size = 10, sortField = 'createdAt') {
        const skip = (page - 1) * size;

        const [data, total] = await Promise.all([
            BorrowRecord.find({ status: { $in: ['returned', 'rejected'] } })
                .populate('userId', 'email')
                .populate('bookId', 'title')
                .sort({[sortField]: -1})
                .skip(skip)
                .limit(size),
            BorrowRecord.countDocuments({ status: { $in: ['returned', 'rejected'] } })
        ]);

        return {
            data,
            totalElements: total,
            totalPages: Math.ceil(total / size),
            currentPage: page,
            currentSize: size
        };
    }
}

module.exports = new BorrowRecordRepository();
