"use client"

import { ColumnDef, FilterFn } from "@tanstack/react-table";
import { MoreHorizontal, Trash2, Undo2, SquarePen, CheckCircle2, XCircle } from "lucide-react";
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

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  status: "Active" | "Inactive";
  created_at: string;
  deleted_at: string | null;
};

// Define a custom filter function for the 'role' column.
// This function will return true for all rows if the filter value is 'all',
// effectively disabling the filter.
const roleFilterFn: FilterFn<User> = (row, columnId, filterValue) => {
  if (filterValue === "all") {
    return true;
  }
  const rowValue = row.getValue(columnId) as string;
  return rowValue === filterValue;
};

export const createColumns = (
  onUpdate: (user: User) => void,
  onDelete: (user: User) => void,
  onRestore: (user: User) => void,
  // Add these two new functions
  onSetActive: (user: User) => void,
  onSetInactive: (user: User) => void
): ColumnDef<User>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="border border-1 ml-1 border-black dark:border-white"
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User Name" />
    ),
    cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex items-center gap-2">
            <CopyButton
              content={user.name}
              variant="ghost"
              size="sm"
              className="h-auto w-auto p-2 border-1 border-gray-300"
            />
            <span className="truncate max-w-[150px]">{user.name}</span>
          </div>
        );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex items-center gap-2">
            <CopyButton
              content={user.email}
              variant="ghost"
              size="sm"
              className="h-auto w-auto p-2 border-1 border-gray-300"
            />
            <span className="truncate max-w-[150px]">{user.email}</span>
          </div>
        );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    // Use the custom filter function for this column
    filterFn: roleFilterFn,
    cell: ({ row }) => {
      const role = row.original.role;
      return <Badge variant="outline">{role}</Badge>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const deleted = row.original.deleted_at !== null;
      const status = row.original.status;

      if (deleted) {
        return <Badge variant="destructive">Deleted</Badge>;
      }
      return (
        <Badge variant={status === "Active" ? "default" : "secondary"}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.created_at);
      const formattedDate = date.toLocaleDateString();
      return <div>{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      
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
            {user.deleted_at ? (
              <DropdownMenuItem onClick={() => onRestore(user)}>
                <Undo2 className="mr-2 h-4 w-4" />
                Restore
              </DropdownMenuItem>
            ) : (
              <>
                <DropdownMenuItem onClick={() => onUpdate(user)}>
                  <SquarePen className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
 
                <DropdownMenuSeparator />
                {user.status === "Inactive" && (
                  <DropdownMenuItem onClick={() => onSetActive(user)}>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Set Active
                  </DropdownMenuItem>
                )}
                {user.status === "Active" && (
                  <DropdownMenuItem onClick={() => onSetInactive(user)}>
                    <XCircle className="mr-2 h-4 w-4" />
                    Set Inactive
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={() => onDelete(user)}>
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