const express = require('express');
const bookController = require('../controllers/bookController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, authorize(['admin']), bookController.createBook);
router.get('/:id', bookController.getBookById);
router.put('/:id', protect, authorize(['admin']), bookController.updateBook);
router.delete('/:id', protect, authorize(['admin']), bookController.deleteBook);
router.get('/', bookController.getAllBooks);
router.post('/search/category', bookController.searchBooksByCategory);
router.get('/search/title', bookController.searchBooksByTitle);
module.exports = router;
