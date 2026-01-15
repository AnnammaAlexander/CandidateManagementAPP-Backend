import sendResponse from '../utils/response.js';

const errorHandler = (err, req, res, next) => {
    let error = { ...err };

    error.message = err.message;

    // Log to console for dev
    console.error(err);

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        const message = `Resource not found with id of ${err.value}`;
        return sendResponse(res, 404, false, message);
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        return sendResponse(res, 400, false, message);
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((val) => val.message);
        return sendResponse(res, 400, false, message);
    }

    sendResponse(
        res,
        error.statusCode || 500,
        false,
        error.message || 'Server Error'
    );
};

export default errorHandler;
