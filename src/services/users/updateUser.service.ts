import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserRequest, IUserResponse } from "../../interfaces/user";
import { hash } from "bcrypt";
import { AppError } from "../../errors/appErrors";

const updateUserService = async (id: string, user: IUserRequest) => {
  // const { name, email, password } = user
  const userRepository = AppDataSource.getRepository(User);
  const userEdited = await userRepository.findOneBy({ id })

  if (!userEdited) {
    throw new AppError("Usuário não encontrado", 404)
  }

  await userRepository.update(id, {
    name: user.name ? user.name : userEdited.name,
    email: user.email ? user.email : userEdited.email,
    cpf: user.cpf ? user.cpf : userEdited.cpf,
    phone: user.phone ? user.phone : userEdited.phone,
    birthDate: user.birthDate ? user.birthDate : userEdited.birthDate,
    description: user.description ? user.description : userEdited.description,
    password: user.password ? await hash(user.password, 10) : userEdited.password,
    typeUser: user.typeUser ? user.typeUser : userEdited.typeUser,
  })

  const userEditeded = await userRepository.findOneBy({ id })

  return userEditeded
}

export default updateUserService;