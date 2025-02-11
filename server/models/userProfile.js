const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    fullName: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        default: 'other',
        required: false
    },

    dateOfBirth: {
        type: Date,
        required: false
    },
    address: {
        type: String,
        required: false
    },

    phone: {
        type: String,
        required: false
    },

    avatar: {
        type: String,
        default: 'no-avatar.jpg',
        required: false
    },

}, {
    timestamps: true
});

module.exports = mongoose.model('UserProfile', userProfileSchema); 