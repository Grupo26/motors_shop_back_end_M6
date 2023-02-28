import { IComment } from "./comment";
import { IImageGalery } from "./imageGalery";
import { IUser } from "./user";

export interface IVehicle {
  id: string;
  type: string;
  imgCap: string;
  title: string;
  description: string;
  km: number;
  year: number;
  value: number;
  users: IUser;
  imageGaleries: IImageGalery[];
  comments: IComment[];
}
