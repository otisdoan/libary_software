const Book = require('../models/book');

class BookRepository {
  async create(bookData) {
    const book = new Book(bookData);
    return await book.save();
  }

  async findById(bookId) {
    return Book.findById(bookId);
  }

  async update(bookId, updateData) {
    return Book.findByIdAndUpdate(bookId, updateData, {new: true});
  }

  async delete(bookId) {
    return Book.findByIdAndDelete(bookId);
  }

  async findAll(page = 1, size = 10, sortField = 'createdAt') {
    const skip = (page - 1) * size;

    const [data, total] = await Promise.all([
      Book.find()
        .sort({ [sortField]: 1 })
        .skip(skip)
        .limit(size),
      Book.countDocuments()
    ]);

    return {
      data,
      totalElements: total,
      totalPages: Math.ceil(total / size),
      currentPage: page,
      currentSize: size
    };
  }

  async findByCategories(categories) {
    return Book.find({categoryName: {$in: categories}});
  }

  async findByTitle(title) {
    return Book.find({title: new RegExp(title, 'i')});
  }
}

module.exports = new BookRepository();
