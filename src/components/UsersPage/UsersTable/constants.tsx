import { UserProfile } from "@/lib/models/user";
import { formatBooleanToTextString } from "@/lib/utils/format";
import { ColumnDef } from "@tanstack/react-table";
import { TrashIcon, EditIcon, ReceiptIcon } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<UserProfile>[] = [
  {
    accessorKey: "id",
    header: "#",
  },
  {
    accessorKey: "fullName",
    header: "Full Name",
    cell: ({ row }) => (
      <span>
        {row.original.firstName} {row.original.lastName}
      </span>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "age",
    header: "Age",
    cell: ({ row }) => <span>{row.original.age} years old</span>,
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => (
      <span>
        {row.original.country}, {row.original.city}, {row.original.street}
      </span>
    ),
  },
  {
    accessorKey: "isActive",
    header: "Active",
    accessorFn: (value) => formatBooleanToTextString(value.isActive),
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "action",
    header: "",
    cell: ({ row }) => {
      return (
        <div className="flex">
          <Link href={`/users/${row.original.id}`} prefetch>
            <EditIcon className="mr-1 cursor-pointer hover:text-purple-400" />
          </Link>
          <Link href={`/users/${row.original.id}/fines`} prefetch>
            <ReceiptIcon className="mr-6 cursor-pointer  hover:text-purple-400" />
          </Link>
          <TrashIcon className="cursor-pointer  hover:text-purple-400" />
        </div>
      );
    },
  },
];
