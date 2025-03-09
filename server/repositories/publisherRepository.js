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
    findAllPaginated: async (page, size, sortField, searchText) => {
        const skip = (page - 1) * size;
        const total = await Publisher.countDocuments({
            name: new RegExp(searchText, 'i')
        });

        const publishers = await Publisher.find({
            name: new RegExp(searchText, 'i')
        })
            .sort({ [sortField]: 1 })
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
    existByName: async (name) => {
        return Publisher.findOne({ name: name});
    },
};

module.exports = publisherRepository;