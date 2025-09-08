"use client"

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Trash2, Undo2, SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "../../data-table-column-header";
import { CopyButton } from "@/components/CopyButton";

export type Newsletter = {
  id: number;
  email: string;
  created_at: string;
  deleted_at: string | null;
};

export const createColumns = (
  onUpdate: (newsletter: Newsletter) => void,
  onDelete: (newsletter: Newsletter) => void,
  onRestore: (newsletter: Newsletter) => void
): ColumnDef<Newsletter>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
      className="border border-1 border-black dark:border-white"
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
      className="border border-1 border-black dark:border-white"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Emails" />
    ),
    cell: ({ row }) => {
        const newsletter = row.original;
        return (
          <div className="flex items-center gap-2">
            <CopyButton
              content={newsletter.email}
              variant="ghost"
              size="sm"
              className="h-auto w-auto p-2 border-1 border-gray-300"
            />
            <span className="truncate max-w-[150px]">{newsletter.email}</span>
          </div>
        );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Subscribed at" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.created_at);
      const formattedDate = date.toLocaleDateString();
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const newsletter = row.original;
      return newsletter.deleted_at ? (
        <Badge variant="destructive">Deleted</Badge>
      ) : (
        <Badge variant="default">Active</Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const newsletter = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {newsletter.deleted_at ? (
              <DropdownMenuItem onClick={() => onRestore(newsletter)}>
                <Undo2 className="mr-2 h-4 w-4" />
                Restore
              </DropdownMenuItem>
            ) : (
              <>
                <DropdownMenuItem onClick={() => onUpdate(newsletter)}>
                  <SquarePen className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={() => onDelete(newsletter)}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];