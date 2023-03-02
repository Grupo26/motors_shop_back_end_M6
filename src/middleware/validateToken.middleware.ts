import { Request, Response } from "express";
import jwt from "jsonwebtoken"
import "dotenv/config"
import { AppError } from "../errors/appErrors";

const validateTokenMiddleware = async (req: Request, res: Response, next: Function) => {
  let token = req.headers.authorization

  if (!token) {
    throw new AppError('Token inválido', 401);
  }

  else {
    token = token.split(' ')[1]

    jwt.verify(token, process.env.SECRET_KEY as string, (error, decoded: any) => {
      if (error) {
        throw new AppError('Não autorizado - Token Inválido', 401);
      }

      req.user = {
        id: decoded.sub,
        email: decoded.email
      }

      return next()
    })
  }
}

export default validateTokenMiddleware;