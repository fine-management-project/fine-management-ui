import { Country } from "./country";

export type Address = {
  street: string;
  house: number;
  apartment: number;
  city: string;
  country: Country;
};
