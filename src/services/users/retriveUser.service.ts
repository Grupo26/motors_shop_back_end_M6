import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appErrors";

const retrieveUserService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User)
  const user = await userRepository.findOne({
    where: { id: id },
    relations: ["vehicles"],
})

  if (!user) {
    throw new AppError('Usuário não encontrado.', 404);
  }

  return user;
}

export default retrieveUserService;