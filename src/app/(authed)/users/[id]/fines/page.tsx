import FinesTableSection from "@/components/FinesPage/FinesTableSection";
import { getPageData } from "./data";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

type Props = {
  params: Promise<{ id: string }>;
};

const UserFinesPage = async ({ params }: Props) => {
  const { id } = await params;

  const { data, defaultLimit, defaultOffset, total, error } = await getPageData(
    id
  );

  if (!data || total === null) {
    return (
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Unable to load fines for the user!</AlertTitle>
        <AlertDescription>{error?.response?.data.message}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div>
      <FinesTableSection
        initialFines={data}
        initialLimit={defaultLimit}
        initialOffset={defaultOffset}
        initialTotal={total}
        userId={id}
      />
    </div>
  );
};

export default UserFinesPage;
