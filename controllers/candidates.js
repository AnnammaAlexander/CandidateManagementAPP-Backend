import asyncHandler from '../middlewares/asyncHandler.js';
import sendResponse from '../utils/response.js';

// Get current logged in user profile

export const getMe = asyncHandler(async (req, res, next) => {
    sendResponse(res, 200, true, 'User profile fetched successfully', req.user);
});
