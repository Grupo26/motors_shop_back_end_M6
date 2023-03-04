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
exports.updateCommentController = exports.deleteCommentController = exports.listCommentsController = exports.createCommentsController = void 0;
const class_transformer_1 = require("class-transformer");
const create_1 = __importDefault(require("../../services/comments/create"));
const delete_1 = __importDefault(require("../../services/comments/delete"));
const listAll_1 = __importDefault(require("../../services/comments/listAll"));
const update_1 = __importDefault(require("../../services/comments/update"));
const createCommentsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { comment } = req.body;
    const userId = req.user.id;
    const { vehicle_id } = req.params;
    const createdComment = yield (0, create_1.default)(comment, userId, vehicle_id);
    return res.status(201).json((0, class_transformer_1.instanceToPlain)(createdComment));
});
exports.createCommentsController = createCommentsController;
const listCommentsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listAll = yield (0, listAll_1.default)();
    return res.status(201).json((0, class_transformer_1.instanceToPlain)(listAll));
});
exports.listCommentsController = listCommentsController;
const deleteCommentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const { comment_id } = req.params;
    yield (0, delete_1.default)(comment_id, userId);
    return res.status(204).send();
});
exports.deleteCommentController = deleteCommentController;
const updateCommentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const { comment_id } = req.params;
    const data = req.body;
    const commentUpdated = yield (0, update_1.default)(userId, comment_id, data);
    return res.status(200).json((0, class_transformer_1.instanceToPlain)(commentUpdated));
});
exports.updateCommentController = updateCommentController;
