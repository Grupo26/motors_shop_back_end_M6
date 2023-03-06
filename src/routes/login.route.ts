import { Router } from "express";
import loginController from "../controllers/login/login.controller";

const loginRoutes = Router();

loginRoutes.post('', loginController);

export default loginRoutes;