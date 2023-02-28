import { IUser } from "./user";

export interface IAddress {
  id: string;
  cep: string;
  state: string;
  city: string;
  street: string;
  number: string;
  complement: string;
  users: IUser;
}
