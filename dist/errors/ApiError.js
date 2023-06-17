"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(statusCode, message, stack = '') {
        super(message);
        this.statusCode = statusCode;
        if (stack) {
            this.statusCode = statusCode;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.default = ApiError;
