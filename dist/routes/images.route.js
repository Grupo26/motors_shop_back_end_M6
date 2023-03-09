"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const destroy_1 = require("../controllers/photos/destroy");
const upload_1 = require("../controllers/photos/upload");
const ensureAuth_middleware_1 = __importDefault(require("../middleware/ensureAuth.middleware"));
const uploadImage_middlewares_1 = __importDefault(require("../middleware/uploadImage.middlewares"));
const imagesRouter = (0, express_1.Router)();
imagesRouter.post("", ensureAuth_middleware_1.default, uploadImage_middlewares_1.default.array("imageGalery"), upload_1.uploadImageController);
imagesRouter.delete("/:id", ensureAuth_middleware_1.default, destroy_1.deleteImageController);
exports.default = imagesRouter;
