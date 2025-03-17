const bookService = require('../services/bookService');

class BookController {
  async createBook(req, res) {
    try {
      const book = await bookService.createBook(req.body);
      res.status(201).json(book);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getBookById(req, res) {
    try {
      const book = await bookService.getBookById(req.params.id);
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
      res.status(200).json(book);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateBook(req, res) {
    try {
      const book = await bookService.updateBook(req.params.id, req.body);
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
      res.status(200).json(book);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteBook(req, res) {
    try {
      const book = await bookService.deleteBook(req.params.id);
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
      res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllBooks(req, res) {
    try {
      const page = Math.max(1, parseInt(req.query.page) || 1);
      const size = Math.min(100, Math.max(1, parseInt(req.query.size) || 10));
      const sortField = ['createdAt', 'title', 'updatedAt'].includes(req.query.field)
          ? req.query.field
          : 'createdAt';
      const searchText = req.query.searchText || '';

      const result = await bookService.getAllBooks(page, size, sortField, searchText);
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async searchBooksByCategory(req, res) {
    try {
      const { categories } = req.query;
      const books = await bookService.searchBooksByCategory(categories);
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async searchBooksByTitle(req, res) {
    try {
      const { title } = req.query;
      const books = await bookService.searchBooksByTitle(title);
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new BookController();
