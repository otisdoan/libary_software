const bookRepository = require('../repositories/bookRepository');

class BookService {
  async createBook(bookData) {
    const existingBook = await bookRepository.findByTitle(bookData.title);
    if (existingBook) {
      throw new Error('Book with this title already exists');
    }
    return await bookRepository.create(bookData);
  }

  async getBookById(bookId) {
    return await bookRepository.findById(bookId);
  }

  async getAllBooks(page, size, sortField, searchText) {
    return await bookRepository.findAll(page, size, sortField, searchText);
  }

  async updateBook(bookId, updateData) {
    if (updateData.title) {
      const existingBook = await bookRepository.findByTitle(updateData.title);
      if (existingBook && existingBook.id !== bookId) {
        throw new Error('Book with this title already exists');
      }
    }
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