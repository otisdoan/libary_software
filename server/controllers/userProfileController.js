const UserProfileService = require('../services/userProfileService');

class UserProfileController {
    async updateUserProfile(req, res) {
        const userProfile = await UserProfileService.updateUserProfile(req.params.userId, req.body);
        res.status(200).json(userProfile);
    }

    async getUserProfileByUserId(req, res) {
        const userProfile = await UserProfileService.getUserProfileByUserId(req.params.userId);
        if (!userProfile) {
            return res.status(404).json({ message: 'User profile not found' });
        }
        res.status(200).json(userProfile);
    }
}

module.exports = new UserProfileController(); 