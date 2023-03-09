import { v2 as cloudinary } from "cloudinary";
import { AppError } from "../../errors/appErrors";

const deleteImageService = async (publicId: string) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);

        if (result.result !== "ok") {
            throw new AppError("Failed to delete image from Cloudinary");
        }
    } catch (error) {
        if (error instanceof Error) throw new AppError(error.message);
    }
};

export { deleteImageService };

