"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comments_1 = require("../controllers/comments");
const ensureAuth_middleware_1 = __importDefault(require("../middleware/ensureAuth.middleware"));
const commentsRoutes = (0, express_1.Router)();
commentsRoutes.get('', comments_1.listCommentsController);
commentsRoutes.delete('/:comment_id', ensureAuth_middleware_1.default, comments_1.deleteCommentController);
commentsRoutes.patch('/:comment_id', ensureAuth_middleware_1.default, comments_1.updateCommentController);
exports.default = commentsRoutes;
