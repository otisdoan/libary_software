const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');
const { sendEmail } = require('../config/sendEmail');
const UserProfileService = require('./userProfileService');
class AuthService {
    #generateAccessToken(userId) {
        return jwt.sign(
            { userId },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_ACCESS_EXPIRE_TIME }
        );
    }

    #generateRefreshToken(userId) {
        return jwt.sign(
            { userId },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: process.env.JWT_REFRESH_EXPIRE_TIME}
        );
    }


    #generateTokens(userId) {
        const accessToken = this.#generateAccessToken(userId);
        const refreshToken = this.#generateRefreshToken(userId);
        return { accessToken, refreshToken };
    }

    #sendActivationEmail(user, token) {
        console.log('Preparing activation email for user:', {
            email: user.email
        });
        
        const activationUrl = `${process.env.CLIENT_URL}/activate/${token}`;
        const message = `Hello ${user.email},\n\nPlease activate your account by clicking the link below:\n\n${activationUrl}\n\nThank you!`;

        sendEmail({
            email: user.email,
            subject: 'Account Activation',
            message
        });
    };

    #sendResetPasswordEmail(user, token) {
        console.log('Preparing reset password email for user:', {
            email: user.email
        });
        
        const resetPasswordUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;
        const message = `Hello ${user.email},\n\n` +
            `You have requested to reset your password. Please click the link below to reset your password:\n\n` +
            `${resetPasswordUrl}\n\n` +
            `This link will expire in 15 minutes.\n\n` +
            `If you did not request this, please ignore this email and your password will remain unchanged.\n\n` +
            `Thank you!`;

        sendEmail({
            email: user.email,
            subject: 'Reset Password Request',
            message
        });
    }

    async login(email, password) {
        const user = await userRepository.findByEmailWithPassword(email);
        if (!user) {
            throw new Error('Invalid credentials');
        }

        // Check account status
        if (user.status === 'deleted') {
            throw new Error('This account has been deleted');
        }

        if (user.status === 'inactive') {
            throw new Error('Please activate your account before logging in');
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        const { accessToken, refreshToken } = this.#generateTokens(user._id);

        // Save tokens
        await userRepository.saveToken({
            userId: user._id,
            accessToken,
            refreshToken
        });

        return {
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            },
            tokens: {
                accessToken,
                refreshToken
            }
        };
    }

    async register(email, password) {
        let createdUser = null;
        
        try {
            // Check if user already exists
            const existingEmail = await userRepository.findByEmail(email);

            if (existingEmail) {
                throw new Error('User already exists with this email');
            }
            // Create new user
            createdUser = await userRepository.createUser({
                email,
                password,
                status: 'inactive'
            });

            // Generate activation token
            const activationToken = this.#generateAccessToken(createdUser._id);

            try {
                // Save activation token with 15 minutes expiry
                await userRepository.saveVerifyToken({
                    userId: createdUser._id,
                    token: activationToken,
                    expiresAt: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
                });

                // Send activation email
                await this.#sendActivationEmail(createdUser, activationToken);

            } catch (error) {
                // If saving token or sending email fails, delete the created user
                if (createdUser) {
                    await userRepository.deleteUser(createdUser._id);
                }
                throw new Error('Failed to complete registration process. Please try again.');
            }

            return {
                user: {
                    id: createdUser._id,
                    email: createdUser.email,
                    role: createdUser.role
                }
            };

        } catch (error) {
            // If any error occurs and user was created, delete it
            if (createdUser) {
                await userRepository.deleteUser(createdUser._id);
            }
            throw error;
        }
    }

    async getMyInfo(userId) {
        const user = await userRepository.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        return {
            id: user._id,
            email: user.email,
            role: user.role
        };
    }

    async activateAccount(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // If not found, throw error
            const user = await userRepository.findByVerifyToken(token);
            if (!user) {
                throw new Error('Invalid activation token');
            }

            // If not match, throw error
            if (decoded.userId.toString() !== user._id.toString()) {
                throw new Error('Invalid activation token');
            }

            // If already activated, throw error
            if (user.status === 'active') {
                throw new Error('Account is already activated');
            }

            // Activate account
            user.status = 'active';
            await user.save();
            await UserProfileService.createUserProfile({ userId: user._id });
            // Remove activation token
            userRepository.removeVerifyToken(token);

            return { message: 'Account activated successfully' };
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new Error('Activation token has expired');
            }
            if (error.name === 'JsonWebTokenError') {
                throw new Error('Invalid activation token');
            }
            throw error;
        }
    }

    async sendResetPasswordEmail(email) {
        try {
            // Find user by email
            const user = await userRepository.findByEmail(email);
            if (!user) {
                throw new Error('User with this email does not exist');
            }

            // Generate reset password token
            const resetToken = this.#generateAccessToken(user._id);

            // Save reset token with 15 minutes expiry
            await userRepository.saveVerifyToken({
                userId: user._id,
                token: resetToken,
                expiresAt: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
            });

            // Send reset password email
            await this.#sendResetPasswordEmail(user, resetToken);

            return { message: 'Reset password email sent successfully' };
        } catch (error) {
            throw error;
        }
    }

    async changePassword(userId, newPassword, confirmPassword) {
        try {
            // Validate password match
            if (newPassword !== confirmPassword) {
                throw new Error('Passwords do not match');
            }

            // Find user
            const user = await userRepository.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            // Update password
            user.password = newPassword;
            await user.save();

            // Invalidate all existing tokens for security
            await userRepository.removeAllTokens(userId);

            return { message: 'Password changed successfully' };
        } catch (error) {
            throw error;
        }
    }

    async resetPassword(token, newPassword, confirmPassword) {
        try {
            // Validate password match
            if (newPassword !== confirmPassword) {
                throw new Error('Passwords do not match');
            }

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find user by reset password token
            const user = await userRepository.findByVerifyToken(token);
            if (!user) {
                throw new Error('Invalid or expired reset token');
            }

            // Verify token belongs to user
            if (decoded.userId.toString() !== user._id.toString()) {
                throw new Error('Invalid reset token');
            }

            // Update password
            user.password = newPassword;
            await user.save();

            // Remove reset token
            await userRepository.removeVerifyToken(token);

            // Invalidate all existing tokens for security
            await userRepository.removeAllTokens(user._id);

            return { message: 'Password reset successfully' };
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new Error('Reset token has expired');
            }
            if (error.name === 'JsonWebTokenError') {
                throw new Error('Invalid reset token');
            }
            throw error;
        }
    }
    async getAllUsers(page, size, sortField) {
        return await userRepository.findAll(page, size, sortField);
    }
    
    async updateUserRole(userId, role) {
        const validRoles = ['user', 'admin'];
        if (!validRoles.includes(role)) {
            throw new Error('Invalid role');
        }

        const user = await userRepository.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        user.role = role;
        await user.save();

        return { message: 'User role updated successfully' };
    }
    async updateUserStatus(userId, status) {
        const validStatus = ['active', 'inactive', 'deleted'];
        if (!validStatus.includes(status)) {
            throw new Error('Invalid status');
        }

        const user = await userRepository.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        user.status = status;
        await user.save();

        return { message: 'User status updated successfully' };
    }
    async refreshAccessToken(accessToken) {
        try {
            const storedToken = await userRepository.findUserTokenByAccessToken(accessToken);

            if (!storedToken || !storedToken.refreshToken) {
                throw new Error('Refresh token not found or is invalid');
            }

            const decoded = jwt.verify(storedToken.refreshToken, process.env.JWT_REFRESH_SECRET);

            if (!decoded) {
                throw new Error('Refresh token is invalid or expired');
            }

            const userId = decoded.userId;

            const newAccessToken = this.#generateAccessToken(userId);

            await userRepository.updateToken(userId,newAccessToken);

            return {
                accessToken: newAccessToken
            };
        } catch (error) {
            console.error('Error refreshing access token:', error.message);
            throw new Error('Unable to refresh access token');
        }
    }
}

module.exports = new AuthService();