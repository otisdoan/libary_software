const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/userProfileController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

router.put('/:userId', upload.single('avatar'), protect, userProfileController.updateUserProfile);
router.get('/:userId', userProfileController.getUserProfileByUserId);

module.exports = router;