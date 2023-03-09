"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: "uploads/",
    filename: (request, file, callback) => {
        const filename = `${file.originalname}`;
        const files = request.files;
        request.files;
        return callback(null, filename);
    },
});
const uploadImageMiddleware = (0, multer_1.default)({ storage: storage });
exports.default = uploadImageMiddleware;
