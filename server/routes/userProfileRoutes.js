const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/userProfileController');
const { protect } = require('../middleware/authMiddleware');

router.put('/:userId', protect, userProfileController.updateUserProfile);
router.get('/:userId', userProfileController.getUserProfileByUserId);

module.exports = router; 