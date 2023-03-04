"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comments_1 = require("../controllers/comments");
const ensureAuth_middleware_1 = __importDefault(require("../middleware/ensureAuth.middleware"));
const commentRoutes = (0, express_1.Router)();
commentRoutes.post('/comment/:vehicle_id', ensureAuth_middleware_1.default, comments_1.createCommentsController);
exports.default = commentRoutes;
