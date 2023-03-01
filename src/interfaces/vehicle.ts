import { ImageGalery } from "../entities/imageGalery.entity";
import { ICommentResponse } from "./comment";
import { IUserResponse } from "./user";

export interface IVehicleUpdateRequest {
  title?: string;
  description?: string;
  km?: number;
  year?: number;
  value?: number;

  imageGaleries?: ImageGalery[];
}

export interface IVehicleRequest extends IVehicleUpdateRequest {
  type?: string;
}

export interface IVehicleResponse extends IVehicleRequest {
  users: IUserResponse;
  comments?: ICommentResponse[];

  createdAt: Date;
  updatedAt: Date;
}
