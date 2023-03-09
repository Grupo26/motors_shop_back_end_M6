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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVehicleService = void 0;
const vehicle_entity_1 = require("../../entities/vehicle.entity");
const shorts_1 = require("../../utils/shorts");
const updateVehicleService = (vehicleId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const { object: vehicle, repository: vehicleRepo } = yield (0, shorts_1.getRepoAndObject)(vehicle_entity_1.Vehicle, vehicleId);
    const { description, km, title, value, year, imageGalery } = data;
    vehicleRepo.update(vehicleId, {
        title: title ? title : vehicle.title,
        description: description ? description : vehicle.description,
        km: km ? km : vehicle.km,
        value: value ? value : vehicle.value,
        year: year ? year : vehicle.year,
        imageGalery: imageGalery ? imageGalery : vehicle.imageGalery,
    });
    const updatedData = yield vehicleRepo.findOneBy({ id: vehicleId });
    return updatedData ? updatedData : vehicle;
});
exports.updateVehicleService = updateVehicleService;
