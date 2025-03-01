const UserProfile = require('../models/userProfile');

class UserProfileRepository {
    async create(userProfileData) {
        return UserProfile.create(userProfileData);
    }

    async update(userId, userProfileData) {
        return UserProfile.findOneAndUpdate({userId}, userProfileData, {
            new: true,
            runValidators: true
        });
    }

    async deleteByUserId(userId) {
        return UserProfile.findOneAndDelete({userId});
    }

    async findByUserId(userId) {
        return UserProfile.findOne({userId});
    }
}


module.exports = new UserProfileRepository();