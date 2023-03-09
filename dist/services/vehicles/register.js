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
const imageGalery_entity_1 = require("../../entities/imageGalery.entity");
const photos_entity_1 = require("../../entities/photos.entity");
const registerVehicleService = (data, photographies, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const vehicleRepo = data_source_1.default.getRepository(vehicle_entity_1.Vehicle);
    const imageGaleryRepo = data_source_1.default.getRepository(imageGalery_entity_1.ImageGalery);
    const photosRepo = data_source_1.default.getRepository(photos_entity_1.Photo);
    const userRepo = data_source_1.default.getRepository(user_entity_1.User);
    const user = yield userRepo.findOneBy({ id: userId });
    if (!user)
        throw new appErrors_1.AppError("Not Found", 404);
    const photos = [];
    for (const photography of photographies) {
        const photo = photosRepo.create({
            public_id: photography.id,
            urlImage: photography.url,
        });
        yield photosRepo.save(photo);
        photos.push(photo);
    }
    const imageGalery = imageGaleryRepo.create({
        photos: photos,
    });
    yield imageGaleryRepo.save(imageGalery);
    data.users = user;
    const newVehicle = vehicleRepo.create(Object.assign(Object.assign({}, data), { imageGalery: imageGalery }));
    yield vehicleRepo.save(newVehicle);
    const vehicle = yield vehicleRepo.findOneBy({ id: newVehicle.id });
    return vehicle;
});
exports.registerVehicleService = registerVehicleService;
