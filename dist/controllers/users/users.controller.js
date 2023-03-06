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
exports.deleteUserController = exports.updateUserController = exports.retriveUserController = exports.createUserController = void 0;
const class_transformer_1 = require("class-transformer");
const createUser_service_1 = __importDefault(require("../../services/users/createUser.service"));
const deleteUser_service_1 = __importDefault(require("../../services/users/deleteUser.service"));
const retriveUser_service_1 = __importDefault(require("../../services/users/retriveUser.service"));
const updateUser_service_1 = __importDefault(require("../../services/users/updateUser.service"));
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = req.body;
    const user = yield (0, createUser_service_1.default)(newUser);
    return res.status(201).json((0, class_transformer_1.instanceToPlain)(user));
});
exports.createUserController = createUserController;
const retriveUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user.id;
    const users = yield (0, retriveUser_service_1.default)(user);
    return res.status(200).json((0, class_transformer_1.instanceToPlain)(users));
});
exports.retriveUserController = retriveUserController;
const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user.id;
    const user = req.body;
    const userEdit = yield (0, updateUser_service_1.default)(id, user);
    return res.status(200).json((0, class_transformer_1.instanceToPlain)(userEdit));
});
exports.updateUserController = updateUserController;
const deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield (0, deleteUser_service_1.default)(id);
    return res.status(204).send();
});
exports.deleteUserController = deleteUserController;
