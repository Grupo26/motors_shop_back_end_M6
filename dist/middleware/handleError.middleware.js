"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appErrors_1 = require("../errors/appErrors");
const handleErrorMiddleware = (error, req, res, next) => {
    if (error instanceof appErrors_1.AppError) {
        return res.status(error.statusCode).json({
            message: error.message
        });
    }
    console.log(error);
    return res.status(500).json({
        message: 'Internal Server Error'
    });
};
exports.default = handleErrorMiddleware;
