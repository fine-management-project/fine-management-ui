import { FineStatus, FineType } from "@/lib/models/fine";

export type GetFinesSortingParams = "id" | "createdAt" | "updatedAt";

export type GetFinesFilters = {
  issuerId?: string;
  type?: FineType;
  status?: FineStatus;
};
