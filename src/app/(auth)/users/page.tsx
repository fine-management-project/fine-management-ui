import UsersTable from "@/components/UsersPage/UsersTable/UsersTable";
import { Card } from "@/components/ui/card";
import UsersFilters from "@/components/UsersPage/UsersFilters/UsersFilters";
import { UsersPageProvider } from "@/components/UsersPage/context";
import { getPageData } from "./data";

const UsersPage = async (): Promise<React.JSX.Element> => {
  const { data, total, error } = await getPageData();

  if (!data || total === null || error) {
    return <div>Error occurred! {error?.message}</div>;
  }

  return (
    <div className="w-full">
      <UsersPageProvider>
        <Card className="border-stone-800 py-2 px-8 mb-8">
          <UsersFilters />
        </Card>

        <Card className="border-stone-800 p-8">
          <UsersTable data={data} />
        </Card>
      </UsersPageProvider>
    </div>
  );
};

export default UsersPage;
