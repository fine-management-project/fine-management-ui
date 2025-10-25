import { unfinishedFinesMock } from "@/components/DashboardPage/AssignedActionsCard/mocks";
import { Fine } from "@/lib/models/fine";

export type DashboardData = {
  unfinishedFines: Fine[] | null;
};

export const getDashboardData = async (): Promise<DashboardData> => {
  try {
    const unfinishedFines: Fine[] = await new Promise((res) =>
      res(unfinishedFinesMock)
    );

    return {
      unfinishedFines,
    };
  } catch {
    return {
      unfinishedFines: null,
    };
  }
};
