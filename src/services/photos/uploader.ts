import { v2 as cloudinary } from "cloudinary";
import * as fs from "fs";
import "dotenv/config";
import { AppError } from "../../errors/appErrors";
import { Photo } from "../../entities/photos.entity";

export interface IPhoto {
    id: string;
    url: string;
}

const uploadImageService = async (files: Express.Multer.File[]) => {
    const imageUrls: IPhoto[] = [];

    for (const file of files) {
        const upload = await cloudinary.uploader.upload(file!.path);

        const photo = {
            id: upload.public_id,
            url: cloudinary.url(upload.public_id),
        };
        imageUrls.push(photo);

        fs.unlink(file!.path, (error) => {
            if (error) throw new AppError(error.message);
        });
    }
    return imageUrls;
};

export { uploadImageService };

