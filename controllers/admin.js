import User from '../models/User.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import sendResponse from '../utils/response.js';

// Get all candidates
export const getCandidates = asyncHandler(async (req, res, next) => {
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await User.countDocuments({ role: 'candidate' });

    const candidates = await User.find({ role: 'candidate' })
        .skip(startIndex)
        .limit(limit);

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit,
        };
    }

    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit,
        };
    }

    sendResponse(res, 200, true, 'Candidates fetched successfully', {
        count: candidates.length,
        total,
        pagination,
        candidates,
    });
});
