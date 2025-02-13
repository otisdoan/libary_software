const jwt = require('jsonwebtoken');
const User = require('../models/user');

const publicEndpoints = [
    { path: '/api/auth/login', method: 'POST' }, 
    { path: '/api/auth/register', method: 'POST' },
    { path: '/api/auth/activate', method: 'POST' },
    { path: '/api/auth/reset-password', method: 'POST' },
];


const protect = async (req, res, next) => {
    try {
        // Check if the endpoint is public
        const isPublicEndpoint = publicEndpoints.some(
            endpoint => endpoint.path === req.path && endpoint.method === req.method

        );

        if (isPublicEndpoint) {
            return next();
        }

        // Authenticate token for protected endpoints
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId);
        
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'User not found'
            });
        }

        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Not authorized to access this route'
        });
    }
};

const authorize = (allowedRoles) => {
    return (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'User not authenticated'
                });
            }

            if (!allowedRoles.includes(req.user.role)) {
                return res.status(403).json({
                    success: false,
                    message: 'You do not have permission to perform this action'
                });
            }

            next();
        } catch (error) {
            res.status(403).json({
                success: false,
                message: 'Authorization failed'
            });
        }
    };
};

module.exports = { protect, authorize }; 