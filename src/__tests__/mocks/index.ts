import { IUserLogin, IUserRequest } from "../../interfaces/user"


export const mockedSeller: IUserRequest = {
  name: "Joana",
  email: "joana@mail.com",
  cpf: "05504478700",
  phone: "41999357171",
  birthDate: new Date(20052000),
  typeUser: 'seller',
  password: "123456"
}

export const mockedBuyer: IUserRequest = {
  name: "Felipe",
  email: "felipe@mail.com",
  cpf: "05504478701",
  phone: "41999357172",
  birthDate: new Date(20052000),
  typeUser: 'buyer',
  password: "123456"
}

export const mockedSellerLogin: IUserLogin = {
  email: "joana@mail.com",
  password: "123456"
}

export const mockedBuyerLogin: IUserLogin = {
  email: "felipe@mail.com",
  password: "123456"
}
