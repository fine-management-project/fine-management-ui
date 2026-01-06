import { Currency } from "@/lib/models/currency";
import { FineType } from "@/lib/models/fine";

export type CreateFinePayload = {
  type: FineType;
  reason: string;
  amount: number;
  currency: Currency;
  userId: string;
  issuerId: string;
};

export type UpdateFineCommonFieldsPayload = {
  reason: string;
  amount: number;
  currency: Currency;
  type: FineType;
};
