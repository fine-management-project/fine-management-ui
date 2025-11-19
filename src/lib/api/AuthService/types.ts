export type SignUpPayload = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  countryId: number;
  age: number;
  street: string;
  house: number;
  city: string;
  apartment: number;
};

export type SignedData = {
  accessToken: string;
  refreshToken: string;
  id: string;
};

export type SignInPayload = {
  email: string;
  password: string;
};
