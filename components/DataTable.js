"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import data1 from "../Data/game-list.json";

const data = data1.RespObject.Entities;

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "ProductName",
    header: "Product Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("ProductName")}</div>
    ),
  },
  {
    accessorKey: "ProductExternalId",
    header: "External ID",
    cell: ({ row }) => <div>{row.getValue("ProductExternalId")}</div>,
  },
  {
    accessorKey: "GameProviderName",
    header: "Provider",
    cell: ({ row }) => <div>{row.getValue("GameProviderName")}</div>,
  },
  {
    accessorKey: "ProductGameVendorName",
    header: "Vendor",
    cell: ({ row }) => <div>{row.getValue("ProductGameVendorName")}</div>,
  },
  {
    accessorKey: "CategoryName",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("CategoryName")}</div>,
  },
  {
    accessorKey: "Image",
    header: "Image",
    cell: ({ row }) => (
      <img
        src={row.getValue("Image")}
        alt="Game Thumbnail"
        style={{ width: 80, height: 45, objectFit: "cover", borderRadius: 4 }}
        onError={(e) => (e.currentTarget.style.display = "none")}
      />
    ),
  },
];

export function DataTableDemo({ setIsModelOpen, setSelectedSlotgames }) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const addGames = () => {
    console.log(table.getSelectedRowModel().rows);
    const a = [];
    table.getSelectedRowModel().rows.map((t) => {
      console.log("helo");
      a.push(t.original);
    });

    setSelectedSlotgames(a);
  };

  return (
    <div
      className="w-full"
      style={{
        backgroundColor: "lightBlue",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "50%",
        padding: "20px",
        textAlign: "center",
        zIndex: 1000,
      }}
    >
      <div>
        <button
          onClick={() => {
            setIsModelOpen(false);
          }}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            border: "none",
            background: "transparent",
            fontSize: "20px",
            cursor: "pointer",
          }}
          aria-label="Close"
        >
          ×
        </button>
      </div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter game..."
          value={table.getColumn("ProductName")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("ProductName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          {/* <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger> */}
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
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
            {table?.getRowModel()?.rows?.length ? (
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
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
      <div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => addGames()}
          disabled={!table.getCanNextPage()}
        >
          Add Games
        </Button>
      </div>
    </div>
  );
}
