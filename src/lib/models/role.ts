export enum RoleOptions {
  user = "User",
  admin = "Admin",
}

export type Role = {
  id: string;
  name: string;
  description: string;
};
