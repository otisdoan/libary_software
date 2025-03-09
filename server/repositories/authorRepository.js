const Author = require('../models/Author');
const Book = require("../models/book");

const authorRepository = {
    create: async (data) => {
        return Author.create(data);
    },
    findById: async (id) => {
        return Author.findById(id).populate('publisher');
    },
    update: async (id, data) => {
        return Author.findByIdAndUpdate(id, data, {new: true});
    },
    delete: async (id) => {
        return Author.findByIdAndDelete(id);
    },
    findAllPaginated: async (page, size, sortField, searchText) => {
        const skip = (page - 1) * size;
        const total = await Author.countDocuments({
            name: new RegExp(searchText, 'i')
        });

        const authors = await Author.find({
            name: new RegExp(searchText, 'i')
        })
            .sort({[sortField]: 1})
            .skip(skip)
            .limit(size);

        return {
            data: authors,
            meta: {
                total,
                page,
                size,
                totalPages: Math.ceil(total / size),
            },
        };
    },
    async existByName(name) {
        return Author.findOne({name: name});
    },
};

module.exports = authorRepository;