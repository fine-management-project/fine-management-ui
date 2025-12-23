import { Badge } from "@/components/ui/badge";
import { User } from "@/lib/models/user";
import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, ReceiptIcon } from "lucide-react";
import Link from "next/link";
import DeleteUserModal from "../DeleteUserModal";

type UseUsersTable = {
  columns: ColumnDef<User>[];
};

type Props = {
  currentUserId: string | null;
};

export const useUsersTable = ({ currentUserId }: Props): UseUsersTable => {
  const columns: ColumnDef<User>[] = [
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
          {row.original.address.country.name}, {row.original.address.city},{" "}
          {row.original.address.street}, {row.original.address.house},{" "}
          {row.original.address.apartment}
        </span>
      ),
    },
    {
      accessorKey: "blocked",
      header: "Blocked",
      cell: ({ row }) =>
        row.original.blocked ? (
          <Badge type="error">Blocked</Badge>
        ) : (
          <Badge type="success">Active</Badge>
        ),
    },
    {
      accessorKey: "roles",
      header: "Roles",
      cell: ({ row }) => (
        <div className="gap-1 flex flex-wrap">
          {row.original.roles.map(({ id, name }) => (
            <Badge key={id}>{name}</Badge>
          ))}
        </div>
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
            {currentUserId !== row.original.id && (
              <DeleteUserModal userId={row.original.id} />
            )}
          </div>
        );
      },
    },
  ];

  return {
    columns,
  };
};
