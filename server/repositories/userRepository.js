
const User = require('../models/user');
const UserToken = require('../models/userToken');

class UserRepository {
    // Create a map to store activation tokens
    #activationTokens = new Map();

    async findByEmail(email) {
        return User.findOne({email});
    }

    async createUser(userData) {
        return User.create(userData);
    }

    async saveToken(tokenData) {
        return UserToken.create(tokenData);
    }

    async findByEmailWithPassword(email) {
        return User.findOne({ email }).select('+password');
    }

    async findById(userId) {
        return User.findById(userId).select('-password');
    }

    async saveVerifyToken({ userId, token, expiresAt }) {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        // Save token to Map
        this.#activationTokens.set(token, {
            userId: userId.toString(),
            expiresAt
        });
        // Set up automatic token removal after expiration
        setTimeout(() => {
            if (this.#activationTokens.has(token)) {
                this.#activationTokens.delete(token);
                console.log(`Activation token removed for user: ${userId}`);
            }
        }, 15 * 60 * 1000); // 15 minutes
    }

    async findByVerifyToken(token) {
        const tokenData = this.#activationTokens.get(token);
        if (!tokenData) {
            return null;
        }
        // Check if token has expired
        if (tokenData.expiresAt < new Date()) {
            this.#activationTokens.delete(token);
            return null;
        }
        return User.findById(tokenData.userId);
    }

    // Add method to remove token after successful activation
    removeVerifyToken(token) {
        this.#activationTokens.delete(token);
    }
    async deleteUser(userId) {
        return User.findByIdAndDelete(userId);
    }
    async removeAllTokens(userId) {
        return UserToken.deleteMany({ userId });
    }
    async findAll(page = 1, size = 10, sortField = 'createdAt', searchText = '') {
        const skip = (page - 1) * size;

        const [data, total] = await Promise.all([
            User.find({ email: new RegExp(searchText, 'i') })
                .sort({ [sortField]: 1 })
                .skip(skip)
                .limit(size),
            User.countDocuments({ email: new RegExp(searchText, 'i') })
        ]);

        return {
            data,
            totalElements: total,
            totalPages: Math.ceil(total / size),
            currentPage: page,
            currentSize: size
        };
    }
    async updateToken(userId, newToken) {
        return UserToken.findOneAndUpdate(
            { userId },
            { accessToken: newToken },
            { new: true }
        );
    }
    async findUserTokenByAccessToken(accessToken) {
        return UserToken.findOne({ accessToken });
    }
}

module.exports = new UserRepository();