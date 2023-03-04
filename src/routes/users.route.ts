import { Router } from "express";
import { createUserController, deleteUserController, retriveUserController, updateUserController } from "../controllers/users";
import checkEmailMiddleware from "../middleware/checkEmail.middleware";
import validateTokenMiddleware from "../middleware/validateToken.middleware";

const usersRoutes = Router();

usersRoutes.post('', checkEmailMiddleware, createUserController);
usersRoutes.get('/profile', validateTokenMiddleware, retriveUserController);
usersRoutes.patch('/profile', validateTokenMiddleware, updateUserController);
usersRoutes.delete('/profile', validateTokenMiddleware, deleteUserController)


export default usersRoutes;