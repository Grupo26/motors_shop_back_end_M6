import { Request, Response } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/appErrors";

const checkCpfMiddleware = async (req: Request, res: Response, next: Function) => {
  const { cpf } = req.body;

  const userRepository = AppDataSource.getRepository(User)
  const data = await userRepository.find()

  const user = data.find(user => user.cpf === cpf)

  if (user) {
    throw new AppError('CPF já cadastrado', 400)
  }

  next()
}

export default checkCpfMiddleware;