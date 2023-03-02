import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appErrors";

const deleteUserService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User)
  const user = await userRepository.findOneBy({ id })

  if (!user) {
    throw new AppError("User Not Found", 404);
  }

  await userRepository.remove(user)
}

export default deleteUserService;