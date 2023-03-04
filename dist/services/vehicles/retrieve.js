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
exports.retrieveVehicleService = void 0;
const data_source_1 = __importDefault(require("../../data-source"));
const vehicle_entity_1 = require("../../entities/vehicle.entity");
const appErrors_1 = require("../../errors/appErrors");
const retrieveVehicleService = (vehicleId) => __awaiter(void 0, void 0, void 0, function* () {
    const vehicleRepo = data_source_1.default.getRepository(vehicle_entity_1.Vehicle);
    const vehicle = yield vehicleRepo.findOne({
        where: { id: vehicleId },
        relations: ["users", "comments"],
    });
    if (!vehicle)
        throw new appErrors_1.AppError("Not Found", 404);
    return vehicle;
});
exports.retrieveVehicleService = retrieveVehicleService;
