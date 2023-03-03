import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserRequest } from "../../interfaces/user";
import { hash } from "bcrypt"
import { Address } from "../../entities/address.entity";

const createUserService = async ({ name, email, cpf, phone, birthdate, description, password, typeUser, address }: IUserRequest) => {

  const userRepository = AppDataSource.getRepository(User)
  const addressRepository = AppDataSource.getRepository(Address)

//   console.log("-------------", address);

  const newAddress = addressRepository.create(address)
  await addressRepository.save(newAddress)

  const user = new User()
  user.name = name!
  user.email = email!
  user.cpf = cpf!
  user.phone = phone!
  user.birthdate = birthdate!
  user.description = description!
  user.password = await hash(password!, 10)
  user.typeUser = typeUser!
  user.address = newAddress

  userRepository.create(user)
  await userRepository.save(user)

  return user

}

export default createUserService;