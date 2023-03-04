import { IAddressRequest } from "./address";
import { ICommentResponse } from "./comment";
import { IVehicleResponse } from "./vehicle";

export interface IUserLogin {
    email?: string;
    password?: string;
}

export interface IUserRequest extends IUserLogin {
    name?: string;
    cpf?: string;
    profileImage?: string;
    phone?: string;
    birthdate: string;
    description?: string;
    typeUser?: string;
    address?: IAddressRequest;
}

export interface IUserResponse extends IUserRequest {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    vehicles?: IVehicleResponse[];
    comments?: ICommentResponse[];
}

