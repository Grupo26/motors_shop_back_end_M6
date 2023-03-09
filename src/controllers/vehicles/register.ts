import { Request, Response } from "express";
import { registerVehicleService } from "../../services/vehicles/register";
import { uploadImageService } from "../../services/photos/uploader";

const registerVehicleController = async (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[];
    const data = req.body;
    const userId = req.user.id;

    if (!req.files)
        return res.status(400).json({ message: "No files uploaded" });

    const photos = await uploadImageService(files);

    const vehicle = await registerVehicleService(data, photos, userId);
    return res.status(201).json(vehicle);
};
export { registerVehicleController };

