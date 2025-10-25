import AssignedActionsCard from "@/components/DashboardPage/AssignedActionsCard";
import { getDashboardData } from "./data";

const DashboardPage = async (): Promise<React.JSX.Element> => {
  const { unfinishedFines } = await getDashboardData();

  return (
    <div className="flex">
      <AssignedActionsCard fines={unfinishedFines} />
    </div>
  );
};

export default DashboardPage;
