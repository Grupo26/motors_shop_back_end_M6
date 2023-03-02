import { Request, Response } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/appErrors";

const checkEmailMiddleware = async (req: Request, res: Response, next: Function) => {
  const { email } = req.body;

  const userRepository = AppDataSource.getRepository(User)
  const data = await userRepository.find()

  const user = data.find(user => user.email === email)

  if (user) {
    throw new AppError('Email já cadastrado', 400)
  }

  next()
}

export default checkEmailMiddleware;