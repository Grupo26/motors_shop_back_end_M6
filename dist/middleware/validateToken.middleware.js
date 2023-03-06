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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const appErrors_1 = require("../errors/appErrors");
const validateTokenMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.headers.authorization;
    if (!token) {
        throw new appErrors_1.AppError('Token inválido', 401);
    }
    else {
        token = token.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (error, decoded) => {
            if (error) {
                throw new appErrors_1.AppError('Não autorizado - Token Inválido', 401);
            }
            req.user = {
                id: decoded.sub,
                typeUser: decoded.typeUser
            };
            return next();
        });
    }
});
exports.default = validateTokenMiddleware;
