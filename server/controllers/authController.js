const authService = require('../services/authService');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');

class AuthController {
    // Register new user
    async register(req, res) {
        try {
            const { email, password } = req.body;
            
            const { user, tokens } = await authService.register(email, password);
            
            res.status(201).json({
                user,
                tokens
            });
        } catch (error) {
            res.status(400).json({ 
                message: error.message || 'Error creating user'
            });
        }
    }

    // Login user
    async login(req, res) {
        try {
            const { email, password } = req.body;
            
            const { user, tokens } = await authService.login(email, password);
            
            res.json({
                user,
                tokens
            });
        } catch (error) {
            res.status(401).json({ 
                message: error.message || 'Error logging in'
            });
        }
    }

    async getMyInfo(req, res) {
        try {
            const user = await authService.getMyInfo(req.user.id);
            res.json({ user });
        } catch (error) {
            res.status(400).json({ 
                message: error.message || 'Error getting user info'
            });
        }
    }

    async activateAccount(req, res) {
        try {
            const { token } = req.body;
            await authService.activateAccount(token);
            res.json({ message: 'Account activated successfully' });
        } catch (error) {
            res.status(400).json({ 
                message: error.message || 'Error activating account'
            });
        }
    }

    async sendResetPasswordEmail(req, res) {
        try {
            const { email } = req.body;
            const result = await authService.sendResetPasswordEmail(email);
            res.json(result);
        } catch (error) {
            res.status(400).json({ 
                message: error.message || 'Error sending reset password email'
            });
        }
    }

    async changePassword(req, res) {
        try {
            const { newPassword, confirmPassword } = req.body;
            const userId = req.user.id; // from auth middleware
            
            const result = await authService.changePassword(userId, newPassword, confirmPassword);
            res.json(result);
        } catch (error) {
            res.status(400).json({ 
                message: error.message || 'Error changing password'
            });
        }
    }

    async resetPassword(req, res) {
        try {
            const { token, newPassword, confirmPassword } = req.body;
            console.log(token, newPassword, confirmPassword);
            const result = await authService.resetPassword(token, newPassword, confirmPassword);
            res.json(result);
        } catch (error) {
            res.status(400).json({ 
                message: error.message || 'Error resetting password'
            });
        }
    }
    async getAllUsers(req, res) {
        try {
            const page = Math.max(1, parseInt(req.query.page) || 1);
            const size = Math.min(100, Math.max(1, parseInt(req.query.size) || 10));
            const sortField = ['createdAt', 'email', 'updatedAt'].includes(req.query.field)
                ? req.query.field
                : 'createdAt';
            const searchText = req.query.searchText || '';

            const result = await authService.getAllUsers(page, size, sortField, searchText);
            res.json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async updateUserRole(req, res) {
        try {
            const { id } = req.params;
            const { role } = req.body;
            const result = await authService.updateUserRole(id, role);
            res.json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async updateUserStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const result = await authService.updateUserStatus(id, status);
            res.json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async refreshAccessToken(req, res) {
        try {
            const { accessToken } = req.body;

            if (!accessToken) {
                return res.status(400).json({ message: 'AccessToken token is required' });
            }

            const tokens = await authService.refreshAccessToken(accessToken);

            res.status(200).json(tokens);

        } catch (error) {
            res.status(401).json({
                message: error.message || 'Error refreshing access token'
            });
        }
    }
}

module.exports = new AuthController();