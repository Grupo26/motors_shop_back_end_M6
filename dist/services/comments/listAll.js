"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("../../data-source"));
const comments_entity_1 = require("../../entities/comments.entity");
const listCommentsService = () => {
    const commentsRepository = data_source_1.default.getRepository(comments_entity_1.Comment);
    const comments = commentsRepository.find();
    return comments;
};
exports.default = listCommentsService;
