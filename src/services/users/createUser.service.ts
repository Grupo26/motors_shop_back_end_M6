import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserRequest } from "../../interfaces/user";
import { hash } from "bcrypt"

const createUserService = async ({ name, email, cpf, phone, birthDate, description, password, typeUser }: IUserRequest) => {

  const userRepository = AppDataSource.getRepository(User)

  const user = new User()
  user.name = name!
  user.email = email!
  user.cpf = cpf!
  user.phone = phone!
  user.birthDate = birthDate!
  user.description = description!
  user.password = await hash(password!, 10)
  user.typeUser = typeUser!

  userRepository.create(user)
  await userRepository.save(user)

  return { ...user, password: undefined }

}

export default createUserService;