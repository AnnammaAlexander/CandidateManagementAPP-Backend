import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/User.js';
import sendResponse from '../utils/response.js';

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        // Set token from Bearer token in header
        token = req.headers.authorization.split(' ')[1];
    }

    // Make sure token exists
    if (!token) {
        return sendResponse(res, 401, false, 'Not authorized to access this route');
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id);

        if (!req.user) {
            return sendResponse(res, 401, false, 'User not found');
        }

        next();
    } catch (err) {
        return sendResponse(res, 401, false, 'Not authorized to access this route');
    }
});

// Grant access to specific roles
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return sendResponse(
                res,
                403,
                false,
                `User role ${req.user.role} is not authorized to access this route`
            );
        }
        next();
    };
};

export { protect, authorize };
