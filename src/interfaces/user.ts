import { ICommentResponse } from "./comment";
import { IVehicleResponse } from "./vehicle";

export interface IUserLogin {
  email?: string;
  password?: string;
}

export interface IUserRequest extends IUserLogin {
  name?: string;
  cpf?: string;
  phone?: string;
  birthDate?: Date;
  description?: string;
  typeUser?: string;
}

export interface IUserResponse extends IUserRequest {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  vehicles?: IVehicleResponse[];
  comments?: ICommentResponse[];
}
