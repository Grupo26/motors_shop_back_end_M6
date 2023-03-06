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
const user_entity_1 = require("../../entities/user.entity");
const vehicle_entity_1 = require("../../entities/vehicle.entity");
const appErrors_1 = require("../../errors/appErrors");
const createCommentsServices = (comment, userId, vehicle_id) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.default.getRepository(user_entity_1.User);
    const commentsRepository = data_source_1.default.getRepository(comments_entity_1.Comment);
    const vehicleRepository = data_source_1.default.getRepository(vehicle_entity_1.Vehicle);
    const users = yield userRepository.findOneBy({ id: userId });
    const vehicles = yield vehicleRepository.findOneBy({ id: vehicle_id });
    if (!comment) {
        throw new appErrors_1.AppError('comment is required', 404);
    }
    if (!users) {
        throw new appErrors_1.AppError('User not found', 404);
    }
    if (!vehicles) {
        throw new appErrors_1.AppError('Vehicle not found', 404);
    }
    const commentCreate = commentsRepository.create({
        comment,
        users,
        vehicles,
    });
    yield commentsRepository.save(commentCreate);
    const findComment = yield commentsRepository.findOne({
        where: { id: commentCreate.id },
        relations: ["vehicles"],
    });
    // const findComment = await commentsRepository.findOneBy({
    //     id: commentCreate.id,
    // });
    return findComment;
});
exports.default = createCommentsServices;
// const commentCreate = commentsRepository.create({
//     comment,
// })
// const commentCreate = new Comment();
// commentCreate.comment = comment;
// commentCreate.users = users;
// commentCreate.vehicles = vehicles;
