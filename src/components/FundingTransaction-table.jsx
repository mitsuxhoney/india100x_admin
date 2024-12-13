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
    Failed: true,
    Date: '2023-11-29 08:25:05',
  },
  {
    bankName: 'CityBank',
    cardRefId: 'CR123456',
    FromAccount: '356746109871',
    ToAccount: '989654327890',
    Amount: 4500.75,
    Success: true,
    Date: '2023-11-30 10:15:25',
  },
  {
    bankName: 'AxisBank',
    cardRefId: 'CR987654',
    FromAccount: '876543211234',
    ToAccount: '432112345678',
    Amount: 25000.0,
    Pending: true,
    Date: '2023-11-28 14:00:15',
  },
  {
    bankName: 'HDFC',
    cardRefId: 'CR222333',
    FromAccount: '109876543210',
    ToAccount: '567890123456',
    Amount: 150.5,
    Success: true,
    Date: '2023-12-01 09:45:00',
  },
  {
    bankName: 'ICICI',
    cardRefId: 'CR999888',
    FromAccount: '123456789012',
    ToAccount: '987654321098',
    Amount: 7800.0,
    Pending: true,
    Date: '2023-11-30 12:20:45',
  },
  {
    bankName: 'StandardChartered',
    cardRefId: 'CR555666',
    FromAccount: '654321987654',
    ToAccount: '123456780987',
    Amount: 1999.99,
    Failed: true,
    Date: '2023-11-29 17:30:25',
  },
  {
    bankName: 'SBI',
    cardRefId: 'CR444777',
    FromAccount: '111223344556',
    ToAccount: '554433221100',
    Amount: 300.0,
    Failed: true,
    Date: '2023-12-01 08:00:00',
  },
  {
    bankName: 'PNB',
    cardRefId: 'CR666555',
    FromAccount: '333344445555',
    ToAccount: '666677778888',
    Amount: 5050.5,
    Pending: true,
    Date: '2023-11-27 20:10:15',
  },
  {
    bankName: 'Kotak',
    cardRefId: 'CR777666',
    FromAccount: '987651234567',
    ToAccount: '123459876543',
    Amount: 1200.0,
    Success: true,
    Date: '2023-11-28 07:25:55',
  },
  {
    bankName: 'YesBank',
    cardRefId: 'CR888999',
    FromAccount: '112233445566',
    ToAccount: '665544332211',
    Amount: 800.0,
    Pending: true,
    Date: '2023-12-01 15:00:30',
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
          <div className="flex items-center py-4 justify-between ">
            <Input
              placeholder="Search by Reference ID..."
              value={table.getColumn('cardRefId')?.getFilterValue() ?? ''}
              onChange={(event) =>
                table.getColumn('cardRefId')?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={downloadCSV}>
                <FileDown />
              </Button>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                      View <ChevronDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {table
                      .getAllColumns()
                      .filter(
                        (column) =>
                          column.getCanHide() && // Check if the column can be hidden
                          column.columnDef.header // Ensure the column has a defined header
                      )
                      .map((column) => (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {typeof column.columnDef.header === 'function'
                            ? column.columnDef.header({ column }).props
                                .children[0] // Render the header if it's a function
                            : column.columnDef.header}
                        </DropdownMenuCheckboxItem>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
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
