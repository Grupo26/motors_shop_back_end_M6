import { Request, Response } from "express";
import { uploadImageService } from "../../services/photos/uploader";

const uploadImageController = async (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[];
    const photos = await uploadImageService(files);
    return res.status(201).json(photos);
};

export { uploadImageController };

