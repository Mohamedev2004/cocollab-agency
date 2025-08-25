"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Trash2, Undo2, SquarePen } from "lucide-react";
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
import { ImageZoom } from "@/components/ImageZoom";

export interface Testimonial {
  id: number;
  testimonial_name: string;
  testimonial_position: string;
  testimonial_feedback: string;
  testimonial_image: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export const createColumns = (
  onUpdate: (testimonial: Testimonial) => void,
  onDelete: (testimonial: Testimonial) => void,
  onRestore: (testimonial: Testimonial) => void,
): ColumnDef<Testimonial>[] => {
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
      accessorKey: "testimonial_image",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Image" />
      ),
      cell: ({ row }) => (
        <ImageZoom>
          <img
            src={`/storage/${row.original.testimonial_image}`}
            alt={row.original.testimonial_name}
            className="w-12 h-12 rounded object-cover"
          />
        </ImageZoom>
      ),
    },
    {
      accessorKey: "testimonial_name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
    },
    {
      accessorKey: "testimonial_position",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Position" />
      ),
    },
    {
      accessorKey: "testimonial_feedback",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Feedback" />
      ),
      cell: ({ row }) => {
        const feedback = row.original.testimonial_feedback;
        const maxLength = 50;

        const truncated =
          feedback.length > maxLength
            ? `${feedback.substring(0, maxLength)}...`
            : feedback;

        return (
          <div className="max-w-xs truncate" title={feedback}>
            {truncated}
          </div>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Creacted At" />
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
        const testimonial = row.original;
        return testimonial.deleted_at ? (
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
        const testimonial = row.original;
        const isDeleted = testimonial.deleted_at !== null;

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

              {!isDeleted && (
                <>
                  <DropdownMenuItem onClick={() => onUpdate(testimonial)}>
                    <SquarePen className="mr-2 h-4 w-4" />
                    Update
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onDelete(testimonial)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </>
              )}
              {isDeleted && (
                <DropdownMenuItem onClick={() => onRestore(testimonial)}>
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
