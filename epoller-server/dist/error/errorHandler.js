"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpError_1 = __importDefault(require("./HttpError"));
exports.errorHandler = (error, req, res, next) => {
    if (error instanceof HttpError_1.default) {
        return res.status(error.statusCode).json({
            error: error.message,
        });
    }
    return res.status(500).json({ error: `${error.message}` });
};
//# sourceMappingURL=errorHandler.js.map