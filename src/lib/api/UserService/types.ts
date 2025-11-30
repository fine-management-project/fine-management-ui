import { Address } from "@/lib/models/address";

export type AddressPayload = Omit<Address, "country"> & { countryId: number };

export type UpdateUserCommonFields = {
  firstName: string;
  lastName: string;
  age: number;
  address: AddressPayload;
};
