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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("../../data-source"));
const comments_entity_1 = require("../../entities/comments.entity");
const appErrors_1 = require("../../errors/appErrors");
const deleteCommentService = (comment_id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const commentsRepository = data_source_1.default.getRepository(comments_entity_1.Comment);
    const commentToDelete = yield commentsRepository.findOneBy({ id: comment_id });
    if (!commentToDelete) {
        throw new appErrors_1.AppError("comment not found", 404);
    }
    if (commentToDelete.users.id != userId) {
        throw new appErrors_1.AppError('you cannot delete a comment that is not yours', 400);
    }
    yield commentsRepository.remove(commentToDelete);
});
exports.default = deleteCommentService;
