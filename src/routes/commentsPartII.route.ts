import { Router } from "express";
import { deleteCommentController, listCommentsController, updateCommentController } from "../controllers/comments";
import ensureAuthMiddleware from "../middleware/ensureAuth.middleware";

const commentsRoutes = Router()

commentsRoutes.get('', listCommentsController)
commentsRoutes.delete('/:comment_id', ensureAuthMiddleware, deleteCommentController)
commentsRoutes.patch('/:comment_id', ensureAuthMiddleware, updateCommentController)

export default commentsRoutes
