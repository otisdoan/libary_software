const authService = require('../services/authService');

class AuthController {
    // Register new user
    async register(req, res) {
        try {
            const { username, email, password } = req.body;
            
            const { user, tokens } = await authService.register(username, email, password);
            
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
            const { token } = req.params;
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
            const { token } = req.params;
            const { newPassword, confirmPassword } = req.body;
            
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
            const sortField = ['createdAt', 'username', 'email', 'updatedAt'].includes(req.query.field) 
                ? req.query.field 
                : 'createdAt'; 

            const result = await authService.getAllUsers(page, size, sortField);
            res.json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    
}

module.exports = new AuthController(); 