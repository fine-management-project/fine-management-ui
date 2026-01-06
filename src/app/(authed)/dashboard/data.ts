import { Fine } from "@/lib/models/fine";

export type DashboardData = {
  unfinishedFines: Fine[] | null;
};

export const getDashboardData = async (): Promise<DashboardData> => {
  try {
    const unfinishedFines: Fine[] = await new Promise((res) => res([]));

    return {
      unfinishedFines,
    };
  } catch {
    return {
      unfinishedFines: null,
    };
  }
};
