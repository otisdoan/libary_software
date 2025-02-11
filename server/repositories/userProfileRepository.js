var UserProfile = require('../models/userProfile');

class UserProfileRepository {
    async create(userProfileData) {
        return await UserProfile.create(userProfileData);
    }

    async update(userId, userProfileData) {
        return await UserProfile.findOneAndUpdate({ userId }, userProfileData, {
            new: true,
            runValidators: true
        });
    }

    async deleteByUserId(userId) {
        return await UserProfile.findOneAndDelete({ userId });
    }

    async findByUserId(userId) {
        return await UserProfile.findOne({ userId });
    }
}


module.exports = new UserProfileRepository();