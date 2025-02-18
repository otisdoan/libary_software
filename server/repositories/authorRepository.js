const Author = require('../models/Author');

// Repository to manage Author operations
const authorRepository = {
  create: async (data) => {
    return Author.create(data);
  },
  findById: async (id) => {
    return Author.findById(id).populate('publisher');
  },
  update: async (id, data) => {
    return Author.findByIdAndUpdate(id, data, { new: true });
  },
  delete: async (id) => {
    return Author.findByIdAndDelete(id);
  },
  findAllPaginated: async (page, size, sortField) => {
    const skip = (page - 1) * size;
    const total = await Author.countDocuments();

    const authors = await Author.find()
        .sort({ [sortField]: 1 })
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
};

module.exports = authorRepository;