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
const appErrors_1 = require("../../errors/appErrors");
const address_entity_1 = require("../../entities/address.entity");
const updateUserService = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const userRepository = data_source_1.default.getRepository(user_entity_1.User);
    const userEdited = yield userRepository.findOneBy({ id });
    const userAddress = userEdited === null || userEdited === void 0 ? void 0 : userEdited.address;
    const addressRepository = data_source_1.default.getRepository(address_entity_1.Address);
    const addressEdited = yield addressRepository.findOneBy({ id: userAddress === null || userAddress === void 0 ? void 0 : userAddress.id });
    console.log(user);
    if (!userEdited) {
        throw new appErrors_1.AppError("Usuário não encontrado", 404);
    }
    if (!addressEdited) {
        throw new appErrors_1.AppError("Endereço não encontrado", 404);
    }
    yield addressRepository.update(addressEdited.id, {
        cep: ((_a = user.address) === null || _a === void 0 ? void 0 : _a.cep) ? user.address.cep : addressEdited.cep,
        state: ((_b = user.address) === null || _b === void 0 ? void 0 : _b.state) ? user.address.state : addressEdited.state,
        city: ((_c = user.address) === null || _c === void 0 ? void 0 : _c.city) ? user.address.city : addressEdited.city,
        street: ((_d = user.address) === null || _d === void 0 ? void 0 : _d.street) ? user.address.street : addressEdited.street,
        number: ((_e = user.address) === null || _e === void 0 ? void 0 : _e.number) ? user.address.number : addressEdited.number,
        complement: ((_f = user.address) === null || _f === void 0 ? void 0 : _f.complement) ? user.address.complement : addressEdited.complement,
    });
    yield userRepository.update(id, {
        name: user.name ? user.name : userEdited.name,
        email: user.email ? user.email : userEdited.email,
        profileImage: user.profileImage ? user.profileImage : userEdited.profileImage,
        cpf: user.cpf ? user.cpf : userEdited.cpf,
        phone: user.phone ? user.phone : userEdited.phone,
        birthdate: user.birthdate ? user.birthdate : userEdited.birthdate,
        description: user.description ? user.description : userEdited.description,
        password: user.password ? yield (0, bcrypt_1.hash)(user.password, 10) : userEdited.password,
        typeUser: user.typeUser ? user.typeUser : userEdited.typeUser,
    });
    const userEditeded = yield userRepository.findOneBy({ id });
    return userEditeded;
});
exports.default = updateUserService;
