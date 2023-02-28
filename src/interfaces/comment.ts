import { IUser } from "./user";
import { IVehicle } from "./vehicle";

export interface IComment {
  id: string;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
  users: IUser;
  vehicles: IVehicle;
}
