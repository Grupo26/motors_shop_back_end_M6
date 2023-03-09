"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const delete_1 = require("../controllers/vehicles/delete");
const get_1 = require("../controllers/vehicles/get");
const register_1 = require("../controllers/vehicles/register");
const update_1 = require("../controllers/vehicles/update");
const ensureAuth_middleware_1 = __importDefault(require("../middleware/ensureAuth.middleware"));
const uploadImage_middlewares_1 = __importDefault(require("../middleware/uploadImage.middlewares"));
const vehicleRoutes = (0, express_1.Router)();
vehicleRoutes.post("", ensureAuth_middleware_1.default, uploadImage_middlewares_1.default.array("imageGalery"), register_1.registerVehicleController);
vehicleRoutes.get("", get_1.getVehicleController);
vehicleRoutes.get("/:id", get_1.getVehicleController);
vehicleRoutes.patch("/:id", ensureAuth_middleware_1.default, update_1.updateVehicleController);
vehicleRoutes.delete("/:id", ensureAuth_middleware_1.default, delete_1.deleteVehicleController);
exports.default = vehicleRoutes;
