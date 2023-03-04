"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const get_1 = require("../controllers/vehicles/get");
const register_1 = require("../controllers/vehicles/register");
const ensureAuth_middleware_1 = __importDefault(require("../middleware/ensureAuth.middleware"));
const vehicleRoutes = (0, express_1.Router)();
vehicleRoutes.post('', ensureAuth_middleware_1.default, register_1.registerVehicleController);
vehicleRoutes.get('', get_1.getVehicleController);
vehicleRoutes.get('/:id', get_1.getVehicleController);
exports.default = vehicleRoutes;
