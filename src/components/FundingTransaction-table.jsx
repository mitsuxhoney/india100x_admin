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
      <Badge className="bg-[#e4f5e9] text-[#16794c]">
        Success
      </Badge>
    ),
    label: 'Successful transaction',
  },
  Pending: {
    icon: (
      <Badge className="bg-[#fff7d3] text-[#ab6e05]">
        Pending
      </Badge>
    ),
    label: 'Pending transaction',
  },
  Failed: {
    icon: (
      <Badge className="bg-[#fff0f0] text-[#b52a2a]">
        Failed
      </Badge>
    ),
    label: 'Failed transaction',
  },
}

const data = [
  {
    "bankName": "MetroBank",
    "cardRefId": "CR456789",
    "FromAccount": "255616106789",
    "ToAccount": "465465546789",
    "Amount": 9199.99,
    "Failed": true,
    "Date": "2023-11-29 08:25:05"
  },
  {
    "bankName": "CityBank",
    "cardRefId": "CR123456",
    "FromAccount": "356746109871",
    "ToAccount": "989654327890",
    "Amount": 4500.75,
    "Success": true,
    "Date": "2023-11-30 10:15:25"
  },
  {
    "bankName": "AxisBank",
    "cardRefId": "CR987654",
    "FromAccount": "876543211234",
    "ToAccount": "432112345678",
    "Amount": 25000.0,
    "Pending": true,
    "Date": "2023-11-28 14:00:15"
  },
  {
    "bankName": "HDFC",
    "cardRefId": "CR222333",
    "FromAccount": "109876543210",
    "ToAccount": "567890123456",
    "Amount": 150.5,
    "Success": true,
    "Date": "2023-12-01 09:45:00"
  },
  {
    "bankName": "ICICI",
    "cardRefId": "CR999888",
    "FromAccount": "123456789012",
    "ToAccount": "987654321098",
    "Amount": 7800.0,
    "Pending": true,
    "Date": "2023-11-30 12:20:45"
  },
  {
    "bankName": "StandardChartered",
    "cardRefId": "CR555666",
    "FromAccount": "654321987654",
    "ToAccount": "123456780987",
    "Amount": 1999.99,
    "Failed": true,
    "Date": "2023-11-29 17:30:25"
  },
  {
    "bankName": "SBI",
    "cardRefId": "CR444777",
    "FromAccount": "111223344556",
    "ToAccount": "554433221100",
    "Amount": 300.0,
    "Failed": true,
    "Date": "2023-12-01 08:00:00"
  },
  {
    "bankName": "PNB",
    "cardRefId": "CR666555",
    "FromAccount": "333344445555",
    "ToAccount": "666677778888",
    "Amount": 5050.5,
    "Pending": true,
    "Date": "2023-11-27 20:10:15"
  },
  {
    "bankName": "Kotak",
    "cardRefId": "CR777666",
    "FromAccount": "987651234567",
    "ToAccount": "123459876543",
    "Amount": 1200.0,
    "Success": true,
    "Date": "2023-11-28 07:25:55"
  },
  {
    "bankName": "YesBank",
    "cardRefId": "CR888999",
    "FromAccount": "112233445566",
    "ToAccount": "665544332211",
    "Amount": 800.0,
    "Pending": true,
    "Date": "2023-12-01 15:00:30"
  }
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
      accessorKey: 'cardRefId',
      header: 'Reference ID',
      cell: ({ row }) => (
        <Link>
          <div className="text-center">{row.getValue('cardRefId')}</div>
        </Link>
      ),
    },
    {
      accessorKey: 'bankName',
      header: 'Bank',
      cell: ({ row }) => (
        <div>{row.getValue('bankName')}</div>
      ),
    },
    {
      accessorKey: 'FromAccount',
      header: 'From Account',
      cell: ({ row }) => (
        <div>{row.getValue('FromAccount')}</div>
      ),
    },
    {
      accessorKey: 'ToAccount',
      header: 'To Account',
      cell: ({ row }) => (
        <div>{row.getValue('ToAccount')}</div>
      ),
    },

    {
      accessorKey: 'Amount',
      header:'Amount',
      cell: ({ row }) => {
        const amount = row.original.Amount // Access the raw data directly
        // const type = row.original.Type // Access the Type from raw data
        // const colorClass = type === 'Credit' ? 'text-green-500' : 'text-red-500'
        const [whole, decimal] = amount.toFixed(2).split('.'); // Split the amount into whole and decimal parts
        return (
          <div className="text-center flex items-center justify-center">
            <span>₹{whole}</span>
            <span className="text-gray-500">.{decimal}</span>
          </div>
        );
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
                    Sort By <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => {
                      const rows = table.getCoreRowModel().rows; // Access rows of the table
                      const sampleValue = rows[0]?.getValue(column.id); // Get a sample value for this column
                      const valueType = typeof sampleValue;

                      // Check if the column contains integer or float data
                      return (
                        column.columnDef.header &&
                        (valueType === 'number' || !isNaN(parseFloat(sampleValue)))
                      );
                    })
                    .map((column) => (
                      <DropdownMenuItem
                        key={column.id}
                        className="capitalize"
                        onSelect={() => {
                          const currentSorting = table.getState().sorting;
                          const isCurrentlySorted =
                            currentSorting.length > 0 && currentSorting[0].id === column.id;

                          if (isCurrentlySorted) {
                            // If already sorted by this column, reset sorting
                            table.setSorting([]);
                          } else {
                            // Otherwise, sort by this column in ascending order
                            table.setSorting([{ id: column.id, desc: true }]);
                          }
                        }}
                      >
                        {typeof column.columnDef.header === 'string'
                          ? column.columnDef.header
                          : ''} {/* Render the header if it's a string */}
                      </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    Column <ChevronDown />
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
                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                      >
                        {typeof column.columnDef.header === 'string'
                          ? column.columnDef.header
                          : ''} {/* Render the header if it's a string */}
                      </DropdownMenuCheckboxItem>
                    ))}
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
