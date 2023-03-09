import { Router } from "express";
import { deleteImageController } from "../controllers/photos/destroy";
import { uploadImageController } from "../controllers/photos/upload";
import ensureAuthMiddleware from "../middleware/ensureAuth.middleware";
import uploadImageMiddleware from "../middleware/uploadImage.middlewares";

const imagesRouter = Router();

imagesRouter.post(
    "",
    ensureAuthMiddleware,
    uploadImageMiddleware.array("imageGalery"),
    uploadImageController
);
imagesRouter.delete("/:id", ensureAuthMiddleware, deleteImageController);
export default imagesRouter;

