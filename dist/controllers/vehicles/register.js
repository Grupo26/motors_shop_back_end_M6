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
exports.registerVehicleController = void 0;
const register_1 = require("../../services/vehicles/register");
const uploader_1 = require("../../services/photos/uploader");
const registerVehicleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.files;
    const data = req.body;
    const userId = req.user.id;
    if (!req.files)
        return res.status(400).json({ message: "No files uploaded" });
    const photos = yield (0, uploader_1.uploadImageService)(files);
    const vehicle = yield (0, register_1.registerVehicleService)(data, photos, userId);
    return res.status(201).json(vehicle);
});
exports.registerVehicleController = registerVehicleController;
