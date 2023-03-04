import { Router } from "express";
import { createCommentsController} from "../controllers/comments";
import ensureAuthMiddleware from "../middleware/ensureAuth.middleware";


const commentRoutes = Router()

commentRoutes.post('/comment/:vehicle_id', ensureAuthMiddleware, createCommentsController)

export default commentRoutes