"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockedBuyerLogin = exports.mockedSellerLogin = exports.mockedBuyer = exports.mockedSeller = void 0;
exports.mockedSeller = {
    name: "Joana",
    email: "joana@mail.com",
    cpf: "05504478700",
    phone: "41999357171",
    birthdate: `${new Date(20052000)}`,
    typeUser: "seller",
    password: "123456",
};
exports.mockedBuyer = {
    name: "Felipe",
    email: "felipe@mail.com",
    cpf: "05504478701",
    phone: "41999357172",
    birthdate: `${new Date(20052000)}`,
    typeUser: "buyer",
    password: "123456",
};
exports.mockedSellerLogin = {
    email: "joana@mail.com",
    password: "123456",
};
exports.mockedBuyerLogin = {
    email: "felipe@mail.com",
    password: "123456",
};
