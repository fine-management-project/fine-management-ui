import { FineStatus } from "../models/fine";

export const FineStatusColor: Record<FineStatus, string> = {
  [FineStatus.NEW]: "oklch(0.90 0.06 231)",
  [FineStatus.PROCESSING_DOCUMENT]: "oklch(0.75 0.14 233)",
  [FineStatus.READY_FOR_SIGNING]: "oklch(0.88 0.15 92)",
  [FineStatus.PROCESSING_SIGNING]: "oklch(0.77 0.16 70)",
  [FineStatus.READY_FOR_PAYMENT]: "oklch(0.79 0.10 275)",
  [FineStatus.PROCESSING_PAYMENT]: "oklch(0.93 0.08 156)",
  [FineStatus.PAID]: "oklch(0.80 0.18 152)",
  [FineStatus.CLOSED]: "oklch(0.89 0.06 10)",
};
