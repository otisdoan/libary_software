const express = require('express');
const publisherController = require('../controllers/publisherController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', protect, authorize(['admin']),  publisherController.createPublisher);
router.get('/get-all', protect, authorize(['admin']),  publisherController.getAllPublishers);
router.get('/:id', protect, authorize(['admin']),  publisherController.getPublisherById);
router.put('/update/:id', protect, authorize(['admin']),  publisherController.updatePublisher);
router.delete('/delete/:id', protect, authorize(['admin']), publisherController.deletePublisher);

module.exports = router;