"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import {
    ColumnDef,
    SortingState,
    ColumnFiltersState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { DataTablePagination } from "@/components/data-table-pagination"
import { DataTableViewOptions } from "../../data-table-view-options"
import { Label } from "../../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    rowSelection: Record<string, boolean>;
    setRowSelection: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

export function DataTable<TData, TValue>({
    columns,
    data = [],
    rowSelection,
    setRowSelection,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full">
            {/* Top Filters & View Options */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-2 py-4">
                
                {/* Filters: Search + Role */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto flex-wrap">
                    {/* Search */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-1 min-w-[200px]">
                        <Label htmlFor="Search" className="whitespace-nowrap">Search</Label>
                        <Input
                            placeholder="Search user's name..."
                            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn("name")?.setFilterValue(event.target.value)
                            }
                            className="w-full sm:w-64"
                        />
                    </div>

                    {/* Role Filter */}
                    <div className="flex flex-col space-x-2 sm:flex-row items-start sm:items-center gap-2 sm:gap-1 min-w-[180px]">
                        <Label htmlFor="role_filter" className="whitespace-nowrap">Filter by Role</Label>
                        <Select
                            onValueChange={(value) => table.getColumn("role")?.setFilterValue(value)}
                            value={(table.getColumn("role")?.getFilterValue() as string) ?? "all"}
                        >
                            <SelectTrigger className="w-full sm:w-40">
                                <SelectValue placeholder="All Roles" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Roles</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="brand">Brand</SelectItem>
                                <SelectItem value="influencer">Influencer</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Table View Options */}
                <div className="flex justify-start md:justify-end w-full md:w-auto">
                    <DataTableViewOptions table={table} />
                </div>
            </div>

            {/* Selection info */}
            <div className="text-muted-foreground text-sm mb-2">
                {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>

            {/* Table */}
            <div data-aos='fade-up' className="overflow-hidden rounded-md border">
                <Table className="min-w-full">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                    >
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="whitespace-nowrap px-3 py-2">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <DataTablePagination table={table} />
        </div>
    )
}
