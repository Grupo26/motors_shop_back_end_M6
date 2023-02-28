import { IVehicleRequest } from "./vehicle";

export interface IImageGaleryRequest {
  urlImage: string;
  vehicles: IVehicleRequest;
}

export interface IImageGaleryResponse extends IImageGaleryRequest {
  id: string;
}
