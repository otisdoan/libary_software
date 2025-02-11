const UserProfileRepository = require('../repositories/userProfileRepository');

class UserProfileService {
    async createUserProfile(userProfileData) {
        return await UserProfileRepository.create(userProfileData);
    }

    async updateUserProfile(userId, userProfileData) {
        const existingProfile = await UserProfileRepository.findByUserId(userId);
        if (!existingProfile) {
            throw new Error(`User profile with ID ${userId} not found`);
        }
        return await UserProfileRepository.update(userId, userProfileData);
    }


    async deleteUserProfile(userId) {
        const existingProfile = await UserProfileRepository.findByUserId(userId);
        if (!existingProfile) {
            throw new Error(`User profile with ID ${userId} not found`);
        }
        return await UserProfileRepository.deleteByUserId(userId);
    }

    
    async getUserProfileByUserId(userId) {
        const userProfile = await UserProfileRepository.findByUserId(userId);
        if (!userProfile) {
            throw new Error(`User profile with ID ${userId} not found`);
        }
        return userProfile;
    }
}

module.exports = new UserProfileService();
