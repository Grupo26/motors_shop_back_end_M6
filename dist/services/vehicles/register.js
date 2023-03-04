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
exports.registerVehicleService = void 0;
const data_source_1 = __importDefault(require("../../data-source"));
const user_entity_1 = require("../../entities/user.entity");
const vehicle_entity_1 = require("../../entities/vehicle.entity");
const appErrors_1 = require("../../errors/appErrors");
const registerVehicleService = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const vehicleRepo = data_source_1.default.getRepository(vehicle_entity_1.Vehicle);
    const userRepo = data_source_1.default.getRepository(user_entity_1.User);
    const user = yield userRepo.findOneBy({ id: userId });
    if (!user)
        throw new appErrors_1.AppError("Not Found", 404);
    data.users = user;
    const newVehicle = vehicleRepo.create(data);
    yield vehicleRepo.save(newVehicle);
    const vehicle = yield vehicleRepo.findOneBy({ id: newVehicle.id });
    return vehicle;
});
exports.registerVehicleService = registerVehicleService;
