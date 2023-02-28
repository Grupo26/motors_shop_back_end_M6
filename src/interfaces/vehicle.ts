import { ICommentResponse } from "./comment";
import { IImageGaleryRequest } from "./imageGalery";
import { IUserResponse } from "./user";

export interface IVehicleRequest {
  type?: string;
  title?: string;
  description?: string;
  km?: number;
  year?: number;
  value?: number;
  imageGaleries?: IImageGaleryRequest[];
}

export interface IVehicleResponse extends IVehicleRequest {
  users: IUserResponse;
  comments?: ICommentResponse[];

  createdAt: Date;
  updatedAt: Date;
}
