import { Currency } from "./currency";

export enum FineType {
  TRAFFIC = "TRAFFIC",
  ENVIRONMENTAL = "ENVIRONMENTAL",
  CORPORATE = "CORPORATE",
  CONTEMPT = "CONTEMPT",
  TAX = "TAX",
}

export enum FineStatus {
  NEW = "NEW",
  PROCESSING_DOCUMENT = "PROCESSING_DOCUMENT",
  READY_FOR_SIGNING = "READY_FOR_SIGNING",
  PROCESSING_SIGNING = "PROCESSING_SIGNING",
  READY_FOR_PAYMENT = "READY_FOR_PAYMENT",
  PROCESSING_PAYMENT = "PROCESSING_PAYMENT",
  PAID = "PAID",
  CLOSED = "CLOSED",
}

export type Fine = {
  id: string;
  userId: string;
  issuerId: string;
  type: FineType;
  amount: number;
  reason: string;
  currency: Currency;
  createdAt: string;
  updatedAt: string;
  status: FineStatus;
  fineDocUrl: string | null;
  fineDocSignedUrl: string | null;
};
