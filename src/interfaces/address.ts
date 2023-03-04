import { IUserResponse } from "./user";

export interface IAddressRequest {
  cep?: string;
  state?: string;
  city?: string;
  street?: string;
  number?: string;
  complement?: string;
}

export interface IAddressResponse extends IAddressRequest {
  id: string;
  users: IUserResponse;
}
