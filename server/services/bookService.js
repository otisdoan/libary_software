const bookRepository = require('../repositories/bookRepository');

class BookService {
  async createBook(bookData) {
    return await bookRepository.create(bookData);
  }

  async getBookById(bookId) {
    return await bookRepository.findById(bookId);
  }

  async getAllBooks(page, size, sortField) {
    return await bookRepository.findAll(page, size, sortField);
  }

  async updateBook(bookId, updateData) {
    return await bookRepository.update(bookId, updateData);
  }

  async deleteBook(bookId) {
    return await bookRepository.delete(bookId);
  }

  async searchBooksByCategory(categories) {
    return await bookRepository.findByCategories(categories);
  }

  async searchBooksByTitle(title) {
    return await bookRepository.findByTitle(title);
  }
}

module.exports = new BookService();
