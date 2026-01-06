import FineStatusBadge from "@/components/common";
import { CurrencyCode } from "@/lib/models/currency";
import { Fine } from "@/lib/models/fine";
import { UserContext } from "@/lib/state/UserContext/UserContext";
import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, InfoIcon } from "lucide-react";
import { Dispatch, SetStateAction, useContext } from "react";
import DeleteFineModal from "../DeleteFineModal";

type UseFinesTable = {
  columns: ColumnDef<Fine>[];
};

type Props = {
  setSelectedFine: Dispatch<SetStateAction<Fine | null>>;
};

export const useFinesTable = ({ setSelectedFine }: Props): UseFinesTable => {
  const { isCurrentUserAdmin } = useContext(UserContext);

  const columns: ColumnDef<Fine>[] = [
    {
      accessorKey: "id",
      header: "#",
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: (value) => (
        <span>
          {value.row.original.amount}
          {CurrencyCode[value.row.original.currency]}
        </span>
      ),
    },
    {
      accessorKey: "reason",
      header: "Reason",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (value) => <FineStatusBadge value={value.row.original.status} />,
    },
    {
      accessorKey: "issuerId",
      header: "Issuer Id",
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
    },
    {
      accessorKey: "action",
      header: "",
      cell: (value) => {
        return (
          <div className="flex">
            {isCurrentUserAdmin ? (
              <EditIcon
                className="mr-1 cursor-pointer hover:text-purple-400"
                onClick={() => setSelectedFine(value.row.original)}
              />
            ) : (
              <InfoIcon
                className="mr-1 cursor-pointer hover:text-purple-400"
                onClick={() => setSelectedFine(value.row.original)}
              />
            )}
            {isCurrentUserAdmin && (
              <DeleteFineModal fineId={value.row.original.id} />
            )}
          </div>
        );
      },
    },
  ];

  return { columns };
};
