import { ImageGalery } from "../entities/imageGalery.entity";
import { Comment } from "../entities/comments.entity";
import { User } from "../entities/user.entity";
import { Photo } from "../entities/photos.entity";

export interface IVehicleUpdateRequest {
    title?: string;
    description?: string;
    km?: number;
    year?: number;
    value?: number;

    imageGalery?: string[];
}

export interface IVehicleRequest extends IVehicleUpdateRequest {
    type?: string;
    users?: User;
}

export interface IVehicleResponse extends IVehicleRequest {
    users: User;
    comments?: Comment[];

    createdAt: Date;
    updatedAt: Date;
}

