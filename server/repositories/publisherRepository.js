const Publisher = require('../models/Publisher');

// Repository to manage Publisher operations
const publisherRepository = {
    create: async (data) => {
        return Publisher.create(data);
    },
    findById: async (id) => {
        return Publisher.findById(id);
    },
    update: async (id, data) => {
        return Publisher.findByIdAndUpdate(id, data, { new: true });
    },
    delete: async (id) => {
        return Publisher.findByIdAndDelete(id);
    },
    findAllPaginated: async (page, size, sortField) => {
        const skip = (page - 1) * size;
        const total = await Publisher.countDocuments();

        const publishers = await Publisher.find()
            .sort({ [sortField]: 1 }) // 1 for ascending, -1 for descending
            .skip(skip)
            .limit(size);

        return {
            data: publishers,
            meta: {
                total,
                page,
                size,
                totalPages: Math.ceil(total / size),
            },
        };
    },
};

module.exports = publisherRepository;