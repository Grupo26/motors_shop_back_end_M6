import { instanceToPlain } from "class-transformer"
import { Request, Response } from "express"
import createUserService from "../../services/users/createUser.service"
import deleteUserService from "../../services/users/deleteUser.service"
import retriveUserService from "../../services/users/retriveUser.service"
import updateUserService from "../../services/users/updateUser.service"

const createUserController = async (req: Request, res: Response) => {
  const newUser = req.body
  const user = await createUserService(newUser)
  return res.status(201).json(instanceToPlain(user))
}

const retriveUserController = async (req: Request, res: Response) => {
  const user = req.user.id
  const users = await retriveUserService(user)
  return res.status(200).json(instanceToPlain(users))
}

const updateUserController = async (req: Request, res: Response) => {
  const id: string = req.user.id
  const user = req.body
  const userEdit = await updateUserService(id, user)

  return res.status(200).json(instanceToPlain(userEdit))
}

const deleteUserController = async (req: Request, res: Response) => {
  const id = req.params.id
  const user = await deleteUserService(id)
  return res.status(204).send()
}

export { createUserController, retriveUserController, updateUserController, deleteUserController }