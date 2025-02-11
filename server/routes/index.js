const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const categoryRoutes = require('./categoryRoutes');
const userProfileRoutes = require('./userProfileRoutes');

// Mount routes
router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/user-profile', userProfileRoutes);

module.exports = router; 