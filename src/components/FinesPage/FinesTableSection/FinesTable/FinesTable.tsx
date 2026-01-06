"use client";

import { PagePaginationOptions } from "@/lib/api/types";
import { Fine } from "@/lib/models/fine";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";
import { useFinesTable } from "../hooks";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";

type Props = {
  data: Fine[];
  isLoading: boolean;
  total: number;
  pagination: PagePaginationOptions;
  setPagination: Dispatch<SetStateAction<PagePaginationOptions>>;
  setSelectedFine: Dispatch<SetStateAction<Fine | null>>;
};

const FinesTable = ({
  data,
  total,
  isLoading,
  pagination,
  setPagination,
  setSelectedFine,
}: Props): React.JSX.Element => {
  const { columns } = useFinesTable({ setSelectedFine });

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount: total,
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
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

export default FinesTable;
