"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const checkEmail_middleware_1 = __importDefault(require("../middleware/checkEmail.middleware"));
const validateToken_middleware_1 = __importDefault(require("../middleware/validateToken.middleware"));
const usersRoutes = (0, express_1.Router)();
usersRoutes.post('', checkEmail_middleware_1.default, users_1.createUserController);
usersRoutes.get('/profile', validateToken_middleware_1.default, users_1.retriveUserController);
usersRoutes.patch('/profile', validateToken_middleware_1.default, users_1.updateUserController);
usersRoutes.delete('/profile', validateToken_middleware_1.default, users_1.deleteUserController);
exports.default = usersRoutes;
