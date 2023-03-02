import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appErrors";

const retriveUserService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User)
  const users = userRepository.findBy({ id })

  if (!users) {
    throw new AppError('Erro na busca de usuarios');

  }

  return users
}

export default retriveUserService;