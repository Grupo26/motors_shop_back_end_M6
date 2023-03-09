import { Router } from "express";
import { deleteImageController } from "../controllers/photos/destroy";
import ensureAuthMiddleware from "../middleware/ensureAuth.middleware";

const imagesRouter = Router();

imagesRouter.delete("/:id", ensureAuthMiddleware, deleteImageController);

export default imagesRouter;

