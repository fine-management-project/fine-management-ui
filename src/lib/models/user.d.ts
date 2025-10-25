import { Roles } from "./role";

export type UserProfile = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  city: string;
  street: string;
  age: number;
  role: Roles;
  isActive: boolean;
};
