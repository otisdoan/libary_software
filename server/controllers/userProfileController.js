const UserProfileService = require('../services/userProfileService');

class UserProfileController {
    async updateUserProfile(req, res) {
        try {
            const userProfileData = req.body;
    
            // Check if the request contains an avatar image
            if (req.file) {
                userProfileData.avatar = req.file.buffer.toString('base64'); // Chuyển thành base64
            }
    
            const userProfile = await UserProfileService.updateUserProfile(req.params.userId, userProfileData);
            res.status(200).json(userProfile);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
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