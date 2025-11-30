import UsersTable from "@/components/UsersPage/UsersTable/UsersTable";
import { Card } from "@/components/ui/card";
import UsersFilters from "@/components/UsersPage/UsersFilters/UsersFilters";
import { UsersPageProvider } from "@/components/UsersPage/context";
import { getPageData } from "./data";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

const UsersPage = async (): Promise<React.JSX.Element> => {
  const { data, total, defaultLimit, defaultOffset, error } = await getPageData(
    null
  );

  if (!data || total === null || error) {
    return (
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Unable to load users!</AlertTitle>
        <AlertDescription>{error?.response?.data.message}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="w-full">
      <UsersPageProvider>
        <Card className="border-stone-800 py-2 px-8 mb-8">
          <UsersFilters />
        </Card>

        <Card className="border-stone-800 p-8">
          <UsersTable
            initialData={data}
            initialTotal={total}
            initialLimit={defaultLimit}
            initialOffset={defaultOffset}
          />
        </Card>
      </UsersPageProvider>
    </div>
  );
};

export default UsersPage;
