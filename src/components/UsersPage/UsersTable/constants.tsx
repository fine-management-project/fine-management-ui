import { User } from "@/lib/models/user";
import { formatBooleanToTextString } from "@/lib/utils/format";
import { ColumnDef } from "@tanstack/react-table";
import { TrashIcon, EditIcon, ReceiptIcon } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<User>[] = [
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
        {row.original.address.country.name}, {row.original.address.city},
        {row.original.address.street}, {row.original.address.house},
        {row.original.address.apartment}
      </span>
    ),
  },
  {
    accessorKey: "blocked",
    header: "Blocked",
    accessorFn: (value) => formatBooleanToTextString(value.blocked),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <span>
        {row.original.roles.map(({ id, name }) => (
          <span key={id}>{name}</span>
        ))}
      </span>
    ),
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
