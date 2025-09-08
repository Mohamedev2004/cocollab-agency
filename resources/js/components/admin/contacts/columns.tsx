"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, MoreHorizontal, Trash2, Undo2, SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "../../data-table-column-header";
import { Badge } from "@/components/ui/badge";

export interface Contact {
  id: number;
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  contact_subject: string;
  contact_message: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export const createColumns = (
  onUpdate: (contact: Contact) => void,
  onDelete: (contact: Contact) => void,
  onRestore: (contact: Contact) => void,
  onView: (contact: Contact) => void // New: Add the onView handler
): ColumnDef<Contact>[] => {
  return [
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
      accessorKey: "contact_name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
    },
    {
      accessorKey: "contact_phone",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Phone" />
      ),
    },
    {
      accessorKey: "contact_email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
    },
    {
      accessorKey: "contact_subject",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Subject" />
      ),
    },
    {
      accessorKey: "contact_message",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Message" />
      ),
      cell: ({ row }) => {
        const message = row.original.contact_message;
        const maxLength = 30;

        const truncatedMessage =
          message.length > maxLength ? `${message.substring(0, maxLength)}...` : message;

        return (
          <div className="max-w-xs truncate" title={message}>
            {truncatedMessage}
          </div>
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
        return date.toLocaleDateString();
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const contact = row.original;
        return contact.deleted_at ? (
          <Badge variant="destructive">Deleted</Badge>
        ) : (
          <Badge variant="default">Active</Badge>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const contact = row.original;
        const isDeleted = contact.deleted_at !== null;

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
              <DropdownMenuSeparator />
              {/* New: Add the View button */}
              <DropdownMenuItem onClick={() => onView(contact)}>
                <Eye className="mr-2 h-4 w-4" />
                View
              </DropdownMenuItem>
              {!isDeleted && (
                <>
                  <DropdownMenuItem onClick={() => onUpdate(contact)}>
                    <SquarePen className="mr-2 h-4 w-4" />
                    Update
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive" onClick={() => onDelete(contact)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </>
              )}
              {isDeleted && (
                <DropdownMenuItem onClick={() => onRestore(contact)}>
                  <Undo2 className="mr-2 h-4 w-4" />
                  Restore
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};