import { IComment } from "./comment";
import { IVehicle } from "./vehicle";

export interface IUser {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  birthDate: Date;
  description: string;
  password: string;
  isActive: boolean;
  typeUser: string;
  createdAt: Date;
  updatedAt: Date;
  vehicles: IVehicle[];
  comments: IComment[];
}
