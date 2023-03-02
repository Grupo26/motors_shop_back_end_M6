import { IUserResponse } from "./user";
import { IVehicleResponse } from "./vehicle";

export interface ICommentRequest {
  comment: string;
  vehicle_id: string;
}

export interface ICommentResponse extends ICommentRequest {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  users: IUserResponse;
  vehicles: IVehicleResponse;
}
