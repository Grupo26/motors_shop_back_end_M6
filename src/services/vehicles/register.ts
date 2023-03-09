import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { Vehicle } from "../../entities/vehicle.entity";
import { IVehicleRequest, IVehicleResponse } from "../../interfaces/vehicle";
import { AppError } from "../../errors/appErrors";
import { ImageGalery } from "../../entities/imageGalery.entity";
import { Photo } from "../../entities/photos.entity";
import { IPhoto } from "../photos/uploader";

export const registerVehicleService = async (
    data: IVehicleRequest,
    photographies: IPhoto[],
    userId: string
) => {
    const vehicleRepo = AppDataSource.getRepository(Vehicle);
    const imageGaleryRepo = AppDataSource.getRepository(ImageGalery);
    const photosRepo = AppDataSource.getRepository(Photo);
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ id: userId });

    if (!user) throw new AppError("Not Found", 404);

    const photos: Photo[] = [];

    for (const photography of photographies) {
        const photo = photosRepo.create({
            public_id: photography.id,
            urlImage: photography.url,
        });
        await photosRepo.save(photo);
        photos.push(photo);
    }

    const imageGalery = imageGaleryRepo.create({
        photos: photos,
    });
    await imageGaleryRepo.save(imageGalery);

    data.users = user;

    const newVehicle = vehicleRepo.create({
        ...data,
        imageGalery: imageGalery,
    });
    await vehicleRepo.save(newVehicle);

    const vehicle = await vehicleRepo.findOneBy({ id: newVehicle.id });

    return vehicle;
};

