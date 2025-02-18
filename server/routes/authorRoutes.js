const express = require('express');
const authorController = require('../controllers/authorController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', protect, authorize(['admin']), authorController.createAuthor);
router.get('/get-all', protect, authorize(['admin']), authorController.getAllAuthors);
router.get('/:id', protect, authorize(['admin']), authorController.getAuthorById);
router.put('/update/:id', protect, authorize(['admin']), authorController.updateAuthor);
router.delete('/delete/:id', protect, authorize(['admin']), authorController.deleteAuthor);

module.exports = router;