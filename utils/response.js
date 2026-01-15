/**
 * Reusable API Response format
 * @param {boolean} success - Operation success status
 * @param {string} message - Response message
 * @param {any} data - Response payload
 */
const sendResponse = (res, statusCode, success, message, data = null) => {
    const response = {
        success,
        message,
    };

    if (data) {
        response.data = data;
    }

    return res.status(statusCode).json(response);
};

export default sendResponse;
