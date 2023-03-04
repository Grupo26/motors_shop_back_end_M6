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
exports.getRepoAndObject = exports.getObjectOr404 = exports.getRepo = void 0;
const data_source_1 = __importDefault(require("../data-source"));
const appErrors_1 = require("../errors/appErrors");
const getRepo = (entity) => {
    const repo = data_source_1.default.getRepository(entity);
    return repo;
};
exports.getRepo = getRepo;
const getObjectOr404 = (entity, key) => __awaiter(void 0, void 0, void 0, function* () {
    const repo = (0, exports.getRepo)(entity);
    const object = yield repo.findOneBy({ key });
    if (!object)
        throw new appErrors_1.AppError("Not Found", 404);
    return object;
});
exports.getObjectOr404 = getObjectOr404;
const getRepoAndObject = (entity, key) => __awaiter(void 0, void 0, void 0, function* () {
    const repo = (0, exports.getRepo)(entity);
    const object = yield (0, exports.getObjectOr404)(entity, key);
    return { repository: repo, object: object };
});
exports.getRepoAndObject = getRepoAndObject;
