"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    const responseData = {
        statusCode: data.statusCode,
        success: data === null || data === void 0 ? void 0 : data.success,
        message: (data === null || data === void 0 ? void 0 : data.message) || null,
        meta: data.meta || null || undefined,
        data: (data === null || data === void 0 ? void 0 : data.data) || null,
    };
    res.status(data.statusCode).json(responseData);
};
exports.default = sendResponse;
