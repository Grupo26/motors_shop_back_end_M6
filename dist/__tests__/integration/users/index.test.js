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
const data_source_1 = __importDefault(require("../../../data-source"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../../app"));
const mocks_1 = require("../../mocks");
describe("/users", () => {
    let connection;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.default.initialize().then((res) => {
            connection = res;
        }).catch((err) => {
            console.error("Error during Data Source initialization", err);
        });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    test("POST /users -  Deve criar um usuário vendedor", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post('/users').send(mocks_1.mockedSeller);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("email");
        expect(response.body).toHaveProperty("cpf");
        expect(response.body).toHaveProperty("phone");
        expect(response.body).toHaveProperty("birthDate");
        expect(response.body).toHaveProperty("typeUser");
        expect(response.body).toHaveProperty("createdAt");
        expect(response.body).toHaveProperty("updatedAt");
        expect(response.body).not.toHaveProperty("password");
        expect(response.body.name).toEqual("Joana");
        expect(response.body.email).toEqual("joana@mail.com");
        expect(response.body.cpf).toEqual("05504478700");
        expect(response.body.phone).toEqual("41999357171");
        // expect(response.body.birthDate).toEqual("20/05/2000")
        expect(response.body.typeUser).toEqual("seller");
        expect(response.status).toBe(201);
    }));
    test("POST /users -  Não deve de criar um usuário que já existe", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post('/users').send(mocks_1.mockedSeller);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(400);
    }));
    test("GET /users -  Deve listar os dados do vendedor", () => __awaiter(void 0, void 0, void 0, function* () {
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedSellerLogin);
        const response = yield (0, supertest_1.default)(app_1.default).get('/users/profile').set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    }));
    test("GET /users -  Não deve listar os dados do vendedor sem autenticação", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get('/users/profile');
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    }));
    test("DELETE /users/profile -  Não deve excluir a conta do vendedor sem autenticação", () => __awaiter(void 0, void 0, void 0, function* () {
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedSellerLogin);
        const response = yield (0, supertest_1.default)(app_1.default).delete('/users/profile');
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    }));
    test("DELETE /users/profile -  Deve deletar o perfil do vendedor", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post('/users').send(mocks_1.mockedSeller);
        const loginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedSellerLogin);
        const response = yield (0, supertest_1.default)(app_1.default).delete(`/users/profile`).set("Authorization", `Bearer ${loginResponse.body.token}`);
        expect(response.status).toBe(204);
        expect(response.body).toStrictEqual({});
    }));
    test("PATCH /users/profile -  Não deve atualizar os dados do vendedor sem autenticação", () => __awaiter(void 0, void 0, void 0, function* () {
        const newValues = { name: "Joana Brito", email: "joanabrito@mail.com" };
        const loginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedSellerLogin);
        const response = yield (0, supertest_1.default)(app_1.default).patch(`/users/profile`).send(newValues);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    }));
    test("PATCH /users/profile -  Deve atualizar os dados do vendedor", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post('/users').send(mocks_1.mockedSeller);
        const newValues = { name: "Joana Brito", email: "joanabrito@mail.com" };
        const loginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedSellerLogin);
        const token = `Bearer ${loginResponse.body.token}`;
        const response = yield (0, supertest_1.default)(app_1.default).patch(`/users/profile`).set("Authorization", token).send(newValues);
        const userUpdated = yield (0, supertest_1.default)(app_1.default).get("/users/profile").set("Authorization", token);
        expect(response.status).toBe(200);
        expect(userUpdated.body[0].name).toEqual("Joana Brito");
        expect(userUpdated.body[0]).not.toHaveProperty("password");
    }));
    //buyer
    test("POST /users -  Deve criar um usuário comprador", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post('/users').send(mocks_1.mockedBuyer);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("email");
        expect(response.body).toHaveProperty("cpf");
        expect(response.body).toHaveProperty("phone");
        expect(response.body).toHaveProperty("birthDate");
        expect(response.body).toHaveProperty("typeUser");
        expect(response.body).toHaveProperty("createdAt");
        expect(response.body).toHaveProperty("updatedAt");
        expect(response.body).not.toHaveProperty("password");
        expect(response.body.name).toEqual("Felipe");
        expect(response.body.email).toEqual("felipe@mail.com");
        expect(response.body.cpf).toEqual("05504478701");
        expect(response.body.phone).toEqual("41999357172");
        // expect(response.body.birthDate).toEqual("20/05/2000")
        expect(response.body.typeUser).toEqual("buyer");
        expect(response.status).toBe(201);
    }));
    test("POST /users -  Não deve de criar um usuário que já existe", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post('/users').send(mocks_1.mockedBuyer);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(400);
    }));
    test("GET /users -  Deve listar os dados do comprador", () => __awaiter(void 0, void 0, void 0, function* () {
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedBuyerLogin);
        const response = yield (0, supertest_1.default)(app_1.default).get('/users/profile').set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    }));
    test("GET /users -  Não deve listar os dados do comprador sem autenticação", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get('/users/profile');
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    }));
    test("DELETE /users/profile -  Não deve excluir a conta do comprador sem autenticação", () => __awaiter(void 0, void 0, void 0, function* () {
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedBuyerLogin);
        const response = yield (0, supertest_1.default)(app_1.default).delete('/users/profile');
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    }));
    test("DELETE /users/profile -  Deve deletar o perfil do comprador", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post('/users').send(mocks_1.mockedBuyer);
        const loginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedBuyerLogin);
        const response = yield (0, supertest_1.default)(app_1.default).delete(`/users/profile`).set("Authorization", `Bearer ${loginResponse.body.token}`);
        expect(response.status).toBe(204);
        expect(response.body).toStrictEqual({});
    }));
    test("PATCH /users/profile -  Não deve atualizar os dados do comprador sem autenticação", () => __awaiter(void 0, void 0, void 0, function* () {
        const newValues = { name: "Felipe Luis", email: "felipeluis@mail.com" };
        const loginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedBuyerLogin);
        const response = yield (0, supertest_1.default)(app_1.default).patch(`/users/profile`).send(newValues);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    }));
    test("PATCH /users/profile -  Deve atualizar os dados do comprador", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post('/users').send(mocks_1.mockedBuyer);
        const newValues = { name: "Felipe Luis", email: "felipeluis@mail.com" };
        const loginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedBuyerLogin);
        const token = `Bearer ${loginResponse.body.token}`;
        const response = yield (0, supertest_1.default)(app_1.default).patch(`/users/profile`).set("Authorization", token).send(newValues);
        const userUpdated = yield (0, supertest_1.default)(app_1.default).get("/users/profile").set("Authorization", token);
        expect(response.status).toBe(200);
        expect(userUpdated.body[0].name).toEqual("Felipe Luis");
        expect(userUpdated.body[0]).not.toHaveProperty("password");
    }));
});
