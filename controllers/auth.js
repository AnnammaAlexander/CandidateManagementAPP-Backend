import User from '../models/User.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import sendResponse from '../utils/response.js';
import { generateToken, generateRefreshToken } from '../utils/auth.js';
import jwt from 'jsonwebtoken';

// Register candidate
export const register = asyncHandler(async (req, res, next) => {
    const { fullName, email, password, role } = req.body;


    if (!fullName || !email || !password) {
        return sendResponse(res, 400, false, 'Please add all required fields: fullName, email, password');
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return sendResponse(res, 400, false, 'Email already registered');
    }

    // Create user
    const user = await User.create({
        fullName,
        email,
        password,
        role: role || 'candidate',
    });

    const token = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Save refresh token to DB
    user.refreshToken = refreshToken;
    await user.save();

    sendResponse(res, 201, true, 'User registered successfully', {
        token,
        refreshToken,
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
        },
    });
});


export const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;


    if (!email || !password) {
        return sendResponse(res, 400, false, 'Please provide an email and password');
    }


    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return sendResponse(res, 401, false, 'Invalid credentials');
    }


    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return sendResponse(res, 401, false, 'Invalid credentials');
    }

    const token = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Save refresh token to DB
    user.refreshToken = refreshToken;
    await user.save();

    sendResponse(res, 200, true, 'User logged in successfully', {
        token,
        refreshToken,
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
        },
    });
});

// Log user out 
export const logout = asyncHandler(async (req, res, next) => {
    // Clear refresh token in DB
    if (req.user) {
        const user = await User.findById(req.user.id);
        user.refreshToken = undefined;
        await user.save();
    }

    sendResponse(res, 200, true, 'User logged out successfully');
});

// Refresh Access Token
export const refreshToken = asyncHandler(async (req, res, next) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return sendResponse(res, 400, false, 'Refresh token is required');
    }

    try {
        // Verify token
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        // Find user
        const user = await User.findById(decoded.id);

        if (!user) {
            return sendResponse(res, 401, false, 'Invalid refresh token');
        }

        // Check if token matches DB
        if (user.refreshToken !== refreshToken) {
            return sendResponse(res, 401, false, 'Invalid refresh token');
        }

        // Generate new access token
        const accessToken = generateToken(user._id);

        sendResponse(res, 200, true, 'Access token refreshed successfully', {
            token: accessToken,
        });

    } catch (err) {
        return sendResponse(res, 401, false, 'Refresh token expired or invalid');
    }
});
