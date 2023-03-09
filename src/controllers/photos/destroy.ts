import { Request, Response } from "express";
import { deleteImageService } from "../../services/photos/delete";

const deleteImageController = async (req: Request, res: Response) => {
    const public_id = req.params.id;
    await deleteImageService(public_id);
    return res.status(204).send();
};
export { deleteImageController };
