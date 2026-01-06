import FineStatusBadge from "@/components/common";
import { Fine } from "@/lib/models/fine";
import { capitalize } from "@/lib/utils/format";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Fine>[] = [
  {
    accessorKey: "id",
    header: "#",
  },
  {
    accessorKey: "type",
    header: "Fine Type",
    accessorFn: (value) => capitalize(value.type),
  },
  {
    accessorKey: "status",
    header: "Fine Status",
    cell: (value) => <FineStatusBadge value={value.row.original.status} />,
  },
  {
    accessorKey: "createdAt",
    header: "Created Date",
    accessorFn: (value) => value.createdAt,
  },
];
