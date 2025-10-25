"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Fine } from "@/lib/models/fine";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { BadgeX } from "lucide-react";
import { columns } from "./constants";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";

type Props = {
  fines: Fine[] | null;
};

const AssignedActionsCard = ({ fines }: Props) => {
  const table = useReactTable({
    data: fines ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Card className="border-stone-800 p-8 mb-8 w-1/2">
      {fines ? (
        <CardHeader>
          <CardTitle className="text-3xl font-normal">
            Actions that needs to be addressed
            <Badge className="bg-purple-600 w-12 h-10 ml-4 text-lg">
              {fines.length}
            </Badge>
          </CardTitle>
          <CardContent className="px-0">
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
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </CardHeader>
      ) : (
        <CardContent className="text-red-500">
          <BadgeX />
          <span>
            Error occurred while fetching actions that need to be addressed!
          </span>
        </CardContent>
      )}
    </Card>
  );
};

export default AssignedActionsCard;
