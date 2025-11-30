import { Role } from "./role";
import { Address } from "./address";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  address: Address;
  roles: Role[];
  isEmailVerified: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
};
