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
        required: false
    },

}, {
    timestamps: true
});
userProfileSchema.method('toJSON', function() {
    const { _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
module.exports = mongoose.model('UserProfile', userProfileSchema);