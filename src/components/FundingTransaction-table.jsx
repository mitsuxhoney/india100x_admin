'use client'
import { Link } from 'react-router-dom'
import * as React from 'react'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  ArrowUpDown,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  Check,
  CirclePlus,
  MoreHorizontal,
  Pencil,
  Trash2,
  CircleX,
  FileDown,
  ChevronLeft,
  ChevronsLeft,
  ChevronRight,
  ChevronsRight,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { saveAs } from 'file-saver'
import * as Papa from 'papaparse'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { status } from '@/data/funding-transactions-data'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'

import { Badge } from '@/components/ui/badge'
import DataTableViewOptions from './DataTableViewOptions'
import DataTableToolbar from './DataTableToolbar'

const fieldIconMap = {
  Success: {
    icon: <Badge className="bg-[#e4f5e9] text-[#16794c]">Success</Badge>,
    label: 'Successful transaction',
  },
  Pending: {
    icon: <Badge className="bg-[#fff7d3] text-[#ab6e05]">Pending</Badge>,
    label: 'Pending transaction',
  },
  Failed: {
    icon: <Badge className="bg-[#fff0f0] text-[#b52a2a]">Failed</Badge>,
    label: 'Failed transaction',
  },
}

const data = [
  {
    bankName: 'MetroBank',
    cardRefId: 'CR456789',
    FromAccount: '255616106789',
    ToAccount: '465465546789',
    Amount: 9199.99,
    status: 'Pending',
    Date: '2023-11-29 08:25:05',
  },
  {
    bankName: 'CityBank',
    cardRefId: 'CR123456',
    FromAccount: '255616106789',
    ToAccount: '465465546789',
    Amount: 12999.99,
    status: 'Success',
    Date: '2023-11-28 12:15:30',
  },
  {
    bankName: 'HDFC Bank',
    cardRefId: 'CR789456',
    FromAccount: '255616106789',
    ToAccount: '465465546789',
    Amount: 15999.99,
    status: 'Failed',
    Date: '2023-11-27 10:30:15',
  },
  {
    bankName: 'ICICI Bank',
    cardRefId: 'CR987654',
    FromAccount: '255616106789',
    ToAccount: '465465546789',
    Amount: 18999.99,
    status: 'Pending',
    Date: '2023-11-26 09:45:20',
  },
  {
    bankName: 'SBI Bank',
    cardRefId: 'CR345678',
    FromAccount: '255616106789',
    ToAccount: '465465546789',
    Amount: 21999.99,
    status: 'Failed',
    Date: '2023-11-25 18:00:45',
  },
  {
    bankName: 'PNB Bank',
    cardRefId: 'CR567890',
    FromAccount: '255616106789',
    ToAccount: '465465546789',
    Amount: 24999.99,
    status: 'Success',
    Date: '2023-11-24 17:15:50',
  },
  {
    bankName: 'BOB Bank',
    cardRefId: 'CR678901',
    FromAccount: '255616106789',
    ToAccount: '465465546789',
    Amount: 27999.99,
    status: 'Success',
    Date: '2023-11-23 16:30:55',
  },
]

export function FundingTransactionTable() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})

  const columns = [
    // {
    //     accessorKey: 'product_id',
    //     header: ({ column }) => {
    //         return (
    //           <Button
    //             variant="ghost"
    //             onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    //           >
    //             Sr No
    //             <ArrowUpDown />
    //           </Button>

    //         )
    //       },
    //     cell: ({ row }) => (
    //       <div className="capitalize text-center">
    //         {row.getValue('product_id')}
    //       </div>
    //     ),
    //   },
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
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
      accessorKey: 'cardRefId',
      header: 'Reference ID',
      cell: ({ row }) => (
        <Link>
          <div className="text-center hover:underline">
            {row.getValue('cardRefId')}
          </div>
        </Link>
      ),
    },
    {
      accessorKey: 'bankName',
      header: 'Bank',
      cell: ({ row }) => <div>{row.getValue('bankName')}</div>,
    },
    {
      accessorKey: 'FromAccount',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            From Account
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue('FromAccount')}</div>,
    },
    {
      accessorKey: 'ToAccount',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            To Account
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue('ToAccount')}</div>,
    },

    {
      accessorKey: 'Amount',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Amount
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => {
        const amount = row.original.Amount // Access the raw data directly
        // const type = row.original.Type // Access the Type from raw data
        // const colorClass = type === 'Credit' ? 'text-green-500' : 'text-red-500'
        const [whole, decimal] = amount.toFixed(2).split('.') // Split the amount into whole and decimal parts
        return (
          <div className="text-center flex items-center justify-center">
            <span>₹{whole}</span>
            <span className="text-gray-500">.{decimal}</span>
          </div>
        )
      },
    },

    {
      accessorKey: 'Date',
      header: 'Date',
      cell: ({ row }) => {
        const date = row.getValue('Date').split(' ')[0]
        const time = row.getValue('Date').split(' ')[1]

        return (
          <div className="flex flex-col items-center text-center">
            <span>{date}</span>
            <span className="text-slate-400">{time}</span>
          </div>
        )
      },
    },
    {
      accessorKey: 'status',
      header: `Status`,
      cell: ({ row }) => {
        const status = row.original.status

        switch (status) {
          case 'Success':
            return (
              <Badge className="bg-[#e4f5e9] text-[#16794c]">Success</Badge>
            )
          case 'Pending':
            return (
              <Badge className="bg-[#fff7d3] text-[#ab6e05]">Pending</Badge>
            )

          case 'Failed':
            return <Badge className="bg-[#ffe6e6] text-[#d32f2f]">Failed</Badge>
        }
      },
    },
  ]

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
    initialState: {
      pagination: {
        pageSize: 5, // Set page size to 5
      },
    },
  })

  const openDialog = (rowData) => {
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
    // Clear any row data when canceled
  }
  const downloadCSV = () => {
    // Convert table data to CSV
    const csv = Papa.unparse(data)
    // Create a Blob object for the CSV
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    // Use FileSaver to trigger a download
    saveAs(blob, 'table-data.csv')
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Funding Transaction List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <div className="w-full flex gap-2 justify-between max-md:flex-col max-md:gap-2 max-md:items-start max-md:w-[70%]">
            <div className="w-full">
              <DataTableToolbar
                table={table}
                inputFilter="card_ref_id"
                status={status}
              />
            </div>
            <div className="flex gap-2 items-center">
              <Button variant="outline" className="h-8" onClick={downloadCSV}>
                <FileDown />
              </Button>

              <DataTableViewOptions table={table} />
              <Link to="/program/create-program">
                <Button variant="" className="ml-auto h-8">
                  {' '}
                  <CirclePlus /> Create Order
                </Button>
              </Link>
            </div>
          </div>
          <div className="rounded-md border mt-3">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead className="text-center" key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell className="text-center" key={cell.id}>
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
          <div className="flex items-center justify-between px-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{' '}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="flex items-center space-x-6 lg:space-x-8">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">Rows per page</p>
                <Select
                  value={`${table.getState().pagination.pageSize}`}
                  onValueChange={(value) => {
                    table.setPageSize(Number(value))
                  }}
                >
                  <SelectTrigger className="h-8 w-[70px]">
                    <SelectValue
                      placeholder={table.getState().pagination.pageSize}
                    />
                  </SelectTrigger>
                  <SelectContent side="top">
                    {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                      <SelectItem key={pageSize} value={`${pageSize}`}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                Page {table.getState().pagination.pageIndex + 1} of{' '}
                {table.getPageCount()}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Go to first page</span>
                  <ChevronsLeft />
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Go to previous page</span>
                  <ChevronLeft />
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Go to next page</span>
                  <ChevronRight />
                </Button>
                <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Go to last page</span>
                  <ChevronsRight />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
