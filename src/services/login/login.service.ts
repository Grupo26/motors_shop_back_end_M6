import { IUserLogin } from "../../interfaces/user";
import AppDataSource from "../../data-source"
import { User } from "../../entities/user.entity"
import { compare } from "bcrypt"
import jwt from "jsonwebtoken"
import "dotenv/config"
import { AppError } from "../../errors/appErrors";

const loginService = async ({ email, password }: IUserLogin) => {

  const userRepository = AppDataSource.getRepository(User)
  const user = await userRepository.findOneBy({
    email: email
  })

  if (!user) {
    throw new AppError('Dados Inválidos', 403)
  }

  const passwordMatch = await compare(password!, user.password)

  if (!passwordMatch) {
    throw new AppError('Dados Inválidos', 403)
  }

  const token = jwt.sign(
    {
      typeUser: user.typeUser,
    },
    String(process.env.SECRET_KEY),
    {
      expiresIn: '1h',
      subject: user.id
    }
  )
  return { token: token, id: user.id, typeUser: user.typeUser, name: user.name }
}

export default loginService;
