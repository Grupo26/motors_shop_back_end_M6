import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest"
import app from "../../../app";
import { mockedBuyer, mockedSeller, mockedBuyerLogin, mockedSellerLogin } from "../../mocks"


describe("/users", () => {
  let connection: DataSource

  beforeAll(async () => {
    await AppDataSource.initialize().then((res) => {
      connection = res
    }).catch((err) => {
      console.error("Error during Data Source initialization", err)
    })
  })

  afterAll(async () => {
    await connection.destroy()
  })

  test("POST /users -  Deve criar um usuário vendedor", async () => {
    const response = await request(app).post('/users').send(mockedSeller)

    expect(response.body).toHaveProperty("id")
    expect(response.body).toHaveProperty("name")
    expect(response.body).toHaveProperty("email")
    expect(response.body).toHaveProperty("cpf")
    expect(response.body).toHaveProperty("phone")
    expect(response.body).toHaveProperty("birthDate")
    expect(response.body).toHaveProperty("typeUser")
    expect(response.body).toHaveProperty("createdAt")
    expect(response.body).toHaveProperty("updatedAt")
    expect(response.body).not.toHaveProperty("password")
    expect(response.body.name).toEqual("Joana")
    expect(response.body.email).toEqual("joana@mail.com")
    expect(response.body.cpf).toEqual("05504478700")
    expect(response.body.phone).toEqual("41999357171")
    // expect(response.body.birthDate).toEqual("20/05/2000")
    expect(response.body.typeUser).toEqual("seller")
    expect(response.status).toBe(201)
  })

  test("POST /users -  Não deve de criar um usuário que já existe", async () => {
    const response = await request(app).post('/users').send(mockedSeller)
    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(400)

  })

  test("GET /users -  Deve listar os dados do vendedor", async () => {
    const adminLoginResponse = await request(app).post("/login").send(mockedSellerLogin);
    const response = await request(app).get('/users/profile').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

  })

  test("GET /users -  Não deve listar os dados do vendedor sem autenticação", async () => {
    const response = await request(app).get('/users/profile')
    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(401)

  })


  test("DELETE /users/profile -  Não deve excluir a conta do vendedor sem autenticação", async () => {
    const adminLoginResponse = await request(app).post("/login").send(mockedSellerLogin);
    const response = await request(app).delete('/users/profile')
    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(401)

  })


  test("DELETE /users/profile -  Deve deletar o perfil do vendedor", async () => {
    await request(app).post('/users').send(mockedSeller)
    const loginResponse = await request(app).post("/login").send(mockedSellerLogin);
    const response = await request(app).delete(`/users/profile`).set("Authorization", `Bearer ${loginResponse.body.token}`)
    expect(response.status).toBe(204)
    expect(response.body).toStrictEqual({})

  })


  test("PATCH /users/profile -  Não deve atualizar os dados do vendedor sem autenticação", async () => {
    const newValues = { name: "Joana Brito", email: "joanabrito@mail.com" }
    const loginResponse = await request(app).post("/login").send(mockedSellerLogin);
    const response = await request(app).patch(`/users/profile`).send(newValues)
    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(401)

  })


  test("PATCH /users/profile -  Deve atualizar os dados do vendedor", async () => {
    await request(app).post('/users').send(mockedSeller)
    const newValues = { name: "Joana Brito", email: "joanabrito@mail.com" }
    const loginResponse = await request(app).post("/login").send(mockedSellerLogin);
    const token = `Bearer ${loginResponse.body.token}`
    const response = await request(app).patch(`/users/profile`).set("Authorization", token).send(newValues)
    const userUpdated = await request(app).get("/users/profile").set("Authorization", token)
    expect(response.status).toBe(200)
    expect(userUpdated.body[0].name).toEqual("Joana Brito")
    expect(userUpdated.body[0]).not.toHaveProperty("password")
  })

  //buyer

  test("POST /users -  Deve criar um usuário comprador", async () => {
    const response = await request(app).post('/users').send(mockedBuyer)

    expect(response.body).toHaveProperty("id")
    expect(response.body).toHaveProperty("name")
    expect(response.body).toHaveProperty("email")
    expect(response.body).toHaveProperty("cpf")
    expect(response.body).toHaveProperty("phone")
    expect(response.body).toHaveProperty("birthDate")
    expect(response.body).toHaveProperty("typeUser")
    expect(response.body).toHaveProperty("createdAt")
    expect(response.body).toHaveProperty("updatedAt")
    expect(response.body).not.toHaveProperty("password")
    expect(response.body.name).toEqual("Felipe")
    expect(response.body.email).toEqual("felipe@mail.com")
    expect(response.body.cpf).toEqual("05504478701")
    expect(response.body.phone).toEqual("41999357172")
    // expect(response.body.birthDate).toEqual("20/05/2000")
    expect(response.body.typeUser).toEqual("buyer")
    expect(response.status).toBe(201)
  })

  test("POST /users -  Não deve de criar um usuário que já existe", async () => {
    const response = await request(app).post('/users').send(mockedBuyer)
    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(400)

  })

  test("GET /users -  Deve listar os dados do comprador", async () => {
    const adminLoginResponse = await request(app).post("/login").send(mockedBuyerLogin);
    const response = await request(app).get('/users/profile').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

  })

  test("GET /users -  Não deve listar os dados do comprador sem autenticação", async () => {
    const response = await request(app).get('/users/profile')
    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(401)

  })


  test("DELETE /users/profile -  Não deve excluir a conta do comprador sem autenticação", async () => {
    const adminLoginResponse = await request(app).post("/login").send(mockedBuyerLogin);
    const response = await request(app).delete('/users/profile')
    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(401)

  })


  test("DELETE /users/profile -  Deve deletar o perfil do comprador", async () => {
    await request(app).post('/users').send(mockedBuyer)
    const loginResponse = await request(app).post("/login").send(mockedBuyerLogin);
    const response = await request(app).delete(`/users/profile`).set("Authorization", `Bearer ${loginResponse.body.token}`)
    expect(response.status).toBe(204)
    expect(response.body).toStrictEqual({})

  })


  test("PATCH /users/profile -  Não deve atualizar os dados do comprador sem autenticação", async () => {
    const newValues = { name: "Felipe Luis", email: "felipeluis@mail.com" }
    const loginResponse = await request(app).post("/login").send(mockedBuyerLogin);
    const response = await request(app).patch(`/users/profile`).send(newValues)
    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(401)

  })


  test("PATCH /users/profile -  Deve atualizar os dados do comprador", async () => {
    await request(app).post('/users').send(mockedBuyer)
    const newValues = { name: "Felipe Luis", email: "felipeluis@mail.com" }
    const loginResponse = await request(app).post("/login").send(mockedBuyerLogin);
    const token = `Bearer ${loginResponse.body.token}`
    const response = await request(app).patch(`/users/profile`).set("Authorization", token).send(newValues)
    const userUpdated = await request(app).get("/users/profile").set("Authorization", token)
    expect(response.status).toBe(200)
    expect(userUpdated.body[0].name).toEqual("Felipe Luis")
    expect(userUpdated.body[0]).not.toHaveProperty("password")
  })
})