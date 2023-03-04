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
const user_entity_1 = require("../../entities/user.entity");
const bcrypt_1 = require("bcrypt");
const address_entity_1 = require("../../entities/address.entity");
const appErrors_1 = require("../../errors/appErrors");
const createUserService = ({ name, email, profileImage, cpf, phone, birthdate, description, password, typeUser, address, }) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.default.getRepository(user_entity_1.User);
    const addressRepository = data_source_1.default.getRepository(address_entity_1.Address);
    const newAddress = addressRepository.create(address);
    const emailverify = yield userRepository.findOneBy({ email: email });
    const cpfVerify = yield userRepository.findOneBy({ cpf: cpf });
    if (emailverify) {
        throw new appErrors_1.AppError("email already exist", 409);
    }
    if (cpfVerify) {
        throw new appErrors_1.AppError("cpf already exist", 409);
    }
    yield addressRepository.save(newAddress);
    const user = new user_entity_1.User();
    user.name = name;
    user.email = email;
    user.profileImage = profileImage;
    user.cpf = cpf;
    user.phone = phone;
    user.birthdate = birthdate;
    user.description = description;
    user.password = yield (0, bcrypt_1.hash)(password, 10);
    user.typeUser = typeUser;
    user.address = newAddress;
    userRepository.create(user);
    yield userRepository.save(user);
    return user;
});
exports.default = createUserService;
