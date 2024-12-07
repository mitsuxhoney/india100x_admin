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
  CirclePlus,
  MoreHorizontal,
  Pencil,
  Trash2,
  CircleX,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'

import { Badge } from '@/components/ui/badge'

const fieldIconMap = {
  Success: {
    icon: (
      <Badge  className="bg-[#e4f5e9] text-[#16794c]">
        Success
      </Badge>
    ),
    label: 'Successful transaction',
  },
  Pending: {
    icon: (
      <Badge  className="bg-[#fff7d3] text-[#ab6e05]">
        Pending
      </Badge>
    ),
    label: 'Pending transaction',
  },
  Failed: {
    icon: (
      <Badge  className="bg-[#fff0f0] text-[#b52a2a]">
        Failed
      </Badge>
    ),
    label: 'Failed transaction',
  },
}
const transactionColorMap = {
  credit: {
    color: 'text-green-500',
  },
  debit: {
    color: 'text-red-500',
  },
}
const data = [
  {
    product_id: '1',
    cardRefId: 'CR123456',
    FromAccount: '6789',
    ToAccount: '6789',
    Amount: 1200.5,
    Type: 'Credit',
    Success: true,
    Date: '01-12-2024 22:44:05',
  },
  {
    product_id: '2',
    cardRefId: 'CR987654',
    FromAccount: '6789',
    ToAccount: '6789',
    Amount: 550.0,
    Type: 'Debit',
    Pending: true,
    Date: '11-09-2024 12:44:08',
  },
  {
    product_id: '3',
    cardRefId: 'CR567890',
    FromAccount: '6789',
    ToAccount: '6789',
    Amount: 10000.0,
    Type: 'Credit',
    Failed: true,
    Date: '07-07-2024 02:44:08',
  },
  {
    product_id: '4',
    cardRefId: 'CR234567',
    FromAccount: '6789',
    ToAccount: '6789',
    Amount: 250.75,
    Type: 'Debit',
    Failed: true,
    Date: '09-07-2022 03:15:05',
  },
  {
    product_id: '5',
    cardRefId: 'CR678901',
    FromAccount: '6789',
    ToAccount: '6789',
    Amount: 890.2,
    Type: 'Credit',
    Success: true,
    Date: '08-11-2024 04:50:05',
  },
  {
    product_id: '6',
    cardRefId: 'CR345678',
    FromAccount: '6789',
    ToAccount: '6789',
    Amount: 4300.0,
    Type: 'Credit',
    Success: true,
    Date: '2023-12-02 06:15:05',
  },
  {
    product_id: '7',
    cardRefId: 'CR456789',
    FromAccount: '6789',
    ToAccount: '6789',
    Amount: 9199.99,
    Type: 'Debit',
    Pending: true,
    Date: '2023-11-29 08:25:05',
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
      accessorKey: 'cardRefId',
      header: 'Reference ID',
      cell: ({ row }) => (
        <Link>
          <div className="text-center">{row.getValue('cardRefId')}</div>
        </Link>
      ),
    },
    {
      accessorKey: 'FromAccount',
      header: 'From Account',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('FromAccount')}</div>
      ),
    },
    {
      accessorKey: 'ToAccount',
      header: 'To Account',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('ToAccount')}</div>
      ),
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
            return (
              <div className={`text-center flex items-center justify-center`}>
                ₹{amount.toFixed(2)}
              </div>
            )
          },
      },

    {
      header: `Status`,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2">
          {Object.keys(fieldIconMap).map((field) => {
            if (row.original[field]) {
              return (
                <span
                  key={field}
                  className={`flex items-center gap-1`}
                  title={fieldIconMap[field].label}
                >
                  {fieldIconMap[field].icon}
                </span>
              )
            }
            return null
          })}
        </div>
      ),
    },
    // {
    //   accessorKey: 'actions',
    //   header: '',
    //   cell: ({ row }) => {
    //     const rowData = row.original // Get the entire row's data for actions
    //     return (
    //       <DropdownMenu>
    //         <DropdownMenuTrigger asChild>
    //           <Button variant="ghost" className="h-8 w-8 p-0">
    //             <span className="sr-only">Open menu</span>
    //             <MoreHorizontal />
    //           </Button>
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent align="end">
    //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //           <DropdownMenuSeparator />
    //           <DropdownMenuItem
    //             onClick={() => navigator.clipboard.writeText(payment.id)}
    //           >
    //             Edit
    //           </DropdownMenuItem>
    //           <DropdownMenuItem
    //             onClick={() => navigator.clipboard.writeText(payment.id)}
    //           >
    //             Delete
    //           </DropdownMenuItem>
    //         </DropdownMenuContent>
    //       </DropdownMenu>
    //     )
    //   },
    // },
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Funding Transaction List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <div className="flex items-center py-4 justify-between ">
            <Input
              placeholder="Search by Reference ID..."
              value={table.getColumn('cardRefId')?.getFilterValue() ?? ''}
              onChange={(event) =>
                table
                  .getColumn('cardRefId')
                  ?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    Column <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
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
                      )
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
              {/* <Link to="/program/create-program">
                <Button variant="" className="ml-auto">
                  <CirclePlus /> Add new
                </Button>
              </Link> */}
            </div>
          </div>
          <div className="rounded-md border">
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
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ArrowLeft />
              </Button>
              <span>
                Page {table.getState().pagination.pageIndex + 1} of{' '}
                {table.getPageCount()}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <ArrowRight />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
