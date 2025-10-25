import { Currency } from "./currency";

export enum FineType {
  administrative = "administrative",
  criminal = "criminal",
  penalties = "penalties",
  financial = "financial",
}

export enum FineStatus {
  active = "ACTIVE",
  paid = "PAID",
  appealed = "APPEALED",
  overdue = "OVERDUE",
}

export type Fine = {
  id: number;
  type: FineType;
  amount: number;
  reason: string;
  description: string;
  currency: Currency;
  createdAt: string;
  updatedAt: string;
  dueDate: string;
  status: FineStatus;
  issuedByUserId: number;
};
