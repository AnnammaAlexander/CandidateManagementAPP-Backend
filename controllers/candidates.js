import asyncHandler from '../middlewares/asyncHandler.js';
import sendResponse from '../utils/response.js';

// @desc    Get current logged in user profile
// @route   GET /candidates/me
// @access  Private
export const getMe = asyncHandler(async (req, res, next) => {
    sendResponse(res, 200, true, 'User profile fetched successfully', req.user);
});
