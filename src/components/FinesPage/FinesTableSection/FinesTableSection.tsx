"use client";
import { Fine } from "@/lib/models/fine";
import FinesFilters from "./FinesFilters";
import { useFinesTableData } from "./hooks";
import FinesTable from "./FinesTable/FinesTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useContext, useState } from "react";
import { UserContext } from "@/lib/state/UserContext/UserContext";
import FineInfoCard from "../FineInfoCard";

type Props = {
  userId: string;
  initialFines: Fine[];
  initialTotal: number;
  initialOffset: number;
  initialLimit: number;
};

const FinesTableSection = (props: Props): React.JSX.Element => {
  const { isCurrentUserAdmin } = useContext(UserContext);
  const [selectedFine, setSelectedFine] = useState<Fine | null>(null);
  const {
    appliedFilters,
    setAppliedFilters,
    data,
    pagination,
    total,
    setPagination,
    isLoading,
  } = useFinesTableData(props);

  return (
    <div className="flex gap-8">
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>Fines</CardTitle>
        </CardHeader>
        <CardContent>
          <FinesFilters
            filters={appliedFilters}
            setFineFilters={setAppliedFilters}
          />
          <FinesTable
            data={data}
            total={total}
            pagination={pagination}
            setPagination={setPagination}
            isLoading={isLoading}
            setSelectedFine={setSelectedFine}
          />
        </CardContent>
      </Card>
      {(!!selectedFine || isCurrentUserAdmin) && (
        <div className="w-1/2">
          <FineInfoCard
            key={selectedFine?.id}
            fine={selectedFine}
            setSelectedFine={setSelectedFine}
            userId={props.userId}
          />
        </div>
      )}
    </div>
  );
};

export default FinesTableSection;
