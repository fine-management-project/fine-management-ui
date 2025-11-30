"use client";

import { User } from "@/lib/models/user";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AdminUserService } from "@/lib/api/admin/AdminUserService/AdminUserService";
import { SessionContext } from "@/lib/session/SessionContext";
import { Skeleton } from "@/components/ui/skeleton";
import { INITIAL_USERS_FILTERS_STATE, useUsersPageContext } from "../context";
import { useUsersTable } from "./hooks/useUsersTable";
import { compareParamsForInitialData } from "@/lib/api/utils";

type Props = {
  initialData: User[];
  initialTotal: number;
  initialOffset: number;
  initialLimit: number;
};

const QUERY_KEY = "getUsers";

const UsersTable = ({
  initialData,
  initialTotal,
  initialLimit,
  initialOffset,
}: Props): React.JSX.Element => {
  const initialPagination = {
    pageIndex: initialOffset, //initial page index
    pageSize: initialLimit, //default page size
  };
  const [pagination, setPagination] = useState(initialPagination);
  const { session } = useContext(SessionContext);
  const { filters } = useUsersPageContext();
  const { columns } = useUsersTable({ currentUserId: session.getUserId() });

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY, pagination.pageIndex, pagination.pageSize, filters],
    queryFn: async () => {
      const service = new AdminUserService(session);
      const { data, total } = await service.getUsers(
        { searchTerm: filters.searchTerm },
        undefined,
        {
          offset: pagination.pageIndex,
          limit: pagination.pageSize,
        }
      );

      return {
        users: data,
        total,
      };
    },
    initialData: () =>
      compareParamsForInitialData(
        { ...pagination, filters },
        {
          ...initialPagination,
          filters: INITIAL_USERS_FILTERS_STATE,
        },
        {
          users: initialData,
          total: initialTotal,
        }
      ),
  });

  const table = useReactTable({
    data: data?.users ?? initialData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true, //turn off client-side pagination
    rowCount: initialTotal,
    onPaginationChange: setPagination, //update the pagination state when internal APIs mutate the pagination state
    state: {
      pagination,
    },
  });

  return (
    <div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: pagination.pageSize }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex}>
                    <Skeleton className="h-4 w-[100px]" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          onClick={() => table.firstPage()}
          variant="link"
          disabled={!table.getCanPreviousPage() || isLoading}
        >
          {"<<"}
        </Button>
        <Button
          onClick={() => table.previousPage()}
          variant="link"
          disabled={!table.getCanPreviousPage() || isLoading}
        >
          {"<"}
        </Button>
        <Button
          onClick={() => table.nextPage()}
          variant="link"
          disabled={!table.getCanNextPage() || isLoading}
        >
          {">"}
        </Button>
        <Button
          onClick={() => table.lastPage()}
          variant="link"
          disabled={!table.getCanNextPage() || isLoading}
        >
          {">>"}
        </Button>
      </div>
    </div>
  );
};

export default UsersTable;
