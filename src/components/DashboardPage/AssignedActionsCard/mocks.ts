import { Currency } from "@/lib/models/currency";
import { Fine, FineStatus, FineType } from "@/lib/models/fine";

export const unfinishedFinesMock: Fine[] = [
  {
    id: 1,
    type: FineType.administrative,
    reason: "Exceeded speed limit",
    description: "On the Road 10 exceeded speed limit on 20 km/hr",
    amount: 100,
    currency: Currency.USD,
    createdAt: "2025-07-25T10:55:00Z",
    updatedAt: "2025-07-25T10:55:00Z",
    dueDate: "2025-07-31T12:00:00Z",
    status: FineStatus.active,
    issuedByUserId: 1,
  },
  {
    id: 2,
    type: FineType.financial,
    reason: "Incorrect taxing information provided",
    description: "On the Road 10 exceeded speed limit on 20 km/hr",
    amount: 250,
    currency: Currency.GBP,
    createdAt: "2025-07-20T10:55:00Z",
    updatedAt: "2025-07-20T10:55:00Z",
    dueDate: "2025-07-22T12:00:00Z",
    status: FineStatus.overdue,
    issuedByUserId: 1,
  },
];
