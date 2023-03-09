"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImageService = void 0;
const cloudinary_1 = require("cloudinary");
const appErrors_1 = require("../../errors/appErrors");
const deleteImageService = (publicId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cloudinary_1.v2.uploader.destroy(publicId);
        if (result.result !== "ok") {
            throw new appErrors_1.AppError("Failed to delete image from Cloudinary");
        }
    }
    catch (error) {
        if (error instanceof Error)
            throw new appErrors_1.AppError(error.message);
    }
});
exports.deleteImageService = deleteImageService;
