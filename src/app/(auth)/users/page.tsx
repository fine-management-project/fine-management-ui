import UsersTable from "@/components/UsersPage/UsersTable/UsersTable";
import { usersMock } from "./mock";
import { Card } from "@/components/ui/card";
import UsersFilters from "@/components/UsersPage/UsersFilters/UsersFilters";
import { UsersPageProvider } from "@/components/UsersPage/context";

const UsersPage = (): React.JSX.Element => {
  return (
    <div className="w-full">
      <UsersPageProvider>
        <Card className="border-stone-800 py-2 px-8 mb-8">
          <UsersFilters />
        </Card>

        <Card className="border-stone-800 p-8">
          <UsersTable data={usersMock} />
        </Card>
      </UsersPageProvider>
    </div>
  );
};

export default UsersPage;
