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
exports.getVehicleController = void 0;
const class_transformer_1 = require("class-transformer");
const get_1 = require("../../services/vehicles/get");
const retrieve_1 = require("../../services/vehicles/retrieve");
const getVehicleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const vehicleId = req.params.id;
    const data = [];
    if (vehicleId) {
        const vehicle = yield (0, retrieve_1.retrieveVehicleService)(vehicleId);
        data.push(vehicle);
        return res.status(200).json((0, class_transformer_1.instanceToPlain)(data[0]));
    }
    const vehicles = yield (0, get_1.getVehicleService)();
    data.push(vehicles);
    return res.status(200).json((0, class_transformer_1.instanceToPlain)(data[0]));
});
exports.getVehicleController = getVehicleController;
