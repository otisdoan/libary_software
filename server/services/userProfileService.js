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
    
        // Check if there is an avatar file
        if (userProfileData.avatar) {
            if (!this.isValidBase64(userProfileData.avatar)) {
                throw new Error('Invalid base64 format for avatar');
            }
            userProfileData.avatar = Buffer.from(userProfileData.avatar, 'base64').toString('base64');
        }
    
        return await UserProfileRepository.update(userId, userProfileData);
    }

    isValidBase64(str) {
        const base64Regex = /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/;
        return base64Regex.test(str);
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
