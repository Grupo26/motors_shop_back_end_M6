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
const user_entity_1 = require("../../entities/user.entity");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const appErrors_1 = require("../../errors/appErrors");
const loginService = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.default.getRepository(user_entity_1.User);
    const user = yield userRepository.findOneBy({
        email: email
    });
    if (!user) {
        throw new appErrors_1.AppError('Dados Inválidos', 403);
    }
    const passwordMatch = yield (0, bcrypt_1.compare)(password, user.password);
    if (!passwordMatch) {
        throw new appErrors_1.AppError('Dados Inválidos', 403);
    }
    const token = jsonwebtoken_1.default.sign({
        typeUser: user.typeUser,
    }, String(process.env.SECRET_KEY), {
        expiresIn: '1h',
        subject: user.id
    });
    return { token: token, id: user.id, typeUser: user.typeUser, name: user.name };
});
exports.default = loginService;
