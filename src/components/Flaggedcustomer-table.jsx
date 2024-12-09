import * as React from 'react'
import { Link } from 'react-router-dom'
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

import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
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

const data = [
  {
    "product_id": "1",
    "customerId": "123456781",
    "ProgramManager": "Privacy Card",
    "FlagType": "Suspicious Transactions",
    "FlaggedActivityDescription": "Multiple failed login attempts",
    "IpAddress": "127.0.32.1",
    "CreatedBy": "Admin32",
    "LastActive": "01-12-2023"
  },
  {
    "product_id": "2",
    "customerId": "123452789",
    "ProgramManager": "Rewards Program",
    "FlagType": "Chargeback",
    "FlaggedActivityDescription": "Unauthorized chargeback claim",
    "IpAddress": "192.168.0.12",
    "CreatedBy": "System",
    "LastActive": "25-11-2023"
  },
  {
    "product_id": "3",
    "customerId": "123426789",
    "ProgramManager": "Merchant Payments",
    "FlagType": "Violation of Terms",
    "FlaggedActivityDescription": "Abuse of promotional credits",
    "IpAddress": "10.10.15.6",
    "CreatedBy": "Admin42",
    "LastActive": "30-11-2023"
  },
  {
    "product_id": "4",
    "customerId": "123456789",
    "ProgramManager": "Account Management",
    "FlagType": "High-Risk Account",
    "FlaggedActivityDescription": "Unusual account behavior detected",
    "IpAddress": "172.20.10.5",
    "CreatedBy": "RiskBot",
    "LastActive": "03-12-2023"
  },
  {
    "product_id": "5",
    "customerId": "123456789",
    "ProgramManager": "Premium Savings",
    "FlagType": "Suspicious Transactions",
    "FlaggedActivityDescription": "Large withdrawal flagged for review",
    "IpAddress": "203.0.113.45",
    "CreatedBy": "Admin53",
    "LastActive": "02-12-2023"
  },
  {
    "product_id": "6",
    "customerId": "123456789",
    "ProgramManager": "Corporate Cards",
    "FlagType": "Fraudulent Activity",
    "FlaggedActivityDescription": "Multiple transactions flagged in a short time",
    "IpAddress": "198.51.100.77",
    "CreatedBy": "FraudBot",
    "LastActive": "28-11-2023"
  },
  {
    "product_id": "7",
    "customerId": "123456789",
    "ProgramManager": "Online Wallet",
    "FlagType": "Account Takeover",
    "FlaggedActivityDescription": "Password reset attempted from unknown device",
    "IpAddress": "192.0.2.33",
    "CreatedBy": "System",
    "LastActive": "04-12-2023"
  },
  {
    "product_id": "8",
    "customerId": "123456789",
    "ProgramManager": "Investment Plans",
    "FlagType": "Data Breach Risk",
    "FlaggedActivityDescription": "Account flagged after potential data exposure",
    "IpAddress": "203.123.45.67",
    "CreatedBy": "Admin76",
    "LastActive": "27-11-2023"
  },
  {
    "product_id": "9",
    "customerId": "123456789",
    "ProgramManager": "Cashback Offers",
    "FlagType": "Fraudulent Activity",
    "FlaggedActivityDescription": "Discrepancy in cashback claims",
    "IpAddress": "192.168.1.25",
    "CreatedBy": "System",
    "LastActive": "29-11-2023"
  },
  {
    "product_id": "10",
    "customerId": "123456789",
    "ProgramManager": "Loan Services",
    "FlagType": "Suspicious Login",
    "FlaggedActivityDescription": "Login from multiple countries in 24 hours fnrekjhfoew e fei foiief weoifj weoif oiwe foeiw f",
    "IpAddress": "10.0.0.8",
    "CreatedBy": "Admin88",
    "LastActive": "05-12-2023"
  }
]

export function FlaggedCustomerTable() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})

  const columns = [
    // {
    //   accessorKey: 'product_id',
    //   header: ({ column }) => {
    //     return (
    //       <Button
    //         variant="ghost"
    //         onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    //       >
    //         Sr No
    //         <ArrowUpDown />
    //       </Button>
    //     )
    //   },
    //   cell: ({ row }) => (
    //     <div className="capitalize text-center">
    //       {row.getValue('product_id')}
    //     </div>
    //   ),
    // },
    {
      accessorKey: 'customerId',
      header: 'Customer Id',
      cell: ({ row }) => (
        <div className="capitalize text-center">
          {row.getValue('customerId')}
        </div>
      ),
    },
    // {
    //   accessorKey: 'Name',
    //   header: 'Name',
    //   cell: ({ row }) => (
    //     <div className="capitalize text-center">{row.getValue('Name')}</div>
    //   ),
    // },
    {
      accessorKey: 'ProgramManager',
      header: 'Program Manager',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('ProgramManager')}</div>
      ),
    },
    {
      accessorKey: 'FlagType',
      header: 'Flag Type',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('FlagType')}</div>
      ),
    },
    {
      accessorKey: 'FlaggedActivityDescription',
      header: 'Flagged Activity Description',
      cell: ({ row }) => {
        const description = row.getValue('FlaggedActivityDescription');
        const descriptionLength = description.length;
    
        // Calculate font size based on description length
        const fontSize = descriptionLength > 100 ? 'text-xs' : descriptionLength > 50 ? 'text-sm' : 'text-base';
    
        return (
          <div className={`text-center ${fontSize}`}>
            {description}
          </div>
        );
      },
    },
    {
      accessorKey: 'CreatedBy',
      header: 'Created By',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('CreatedBy')}</div>
      ),
    },
    {
      accessorKey: 'LastActive',
      header: 'Last Active',
      cell: ({ row }) => (
        <div className="text-center min-w-[80px]">{row.getValue('LastActive')}</div>
      ),
    },
    {
      accessorKey: 'actions',
      header: '',
      cell: ({ row }) => {
        const rowData = row.original // Get the entire row's data for actions
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className='cursor-pointer'
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Activate
              </DropdownMenuItem>
              <DropdownMenuItem className='cursor-pointer'
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Block
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Flagged Customer List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <div className="flex items-center py-4 justify-between ">
            <Input
              placeholder="Search Name..."
              value={table.getColumn('Name')?.getFilterValue() ?? ''}
              onChange={(event) =>
                table.getColumn('Name')?.setFilterValue(event.target.value)
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
                      {row.getVisibleCells().map((cell) => {
                        // Define which columns should be clickable
                        const clickableColumns = [
                          'customerId',
                          'ProgramManager',
                        ] // List of clickable column keys

                        return (
                          <TableCell className="text-center" key={cell.id}>
                            {clickableColumns.includes(cell.column.id) ? (
                              // If the column is in the clickable list, render a clickable element (e.g., link or button)
                              <button
                                onClick={() => handleClick(cell.row.original)}
                                style={{
                                  background: 'transparent',
                                  border: 'none',
                                  cursor: 'pointer',
                                }}
                              >
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </button>
                            ) : (
                              // Otherwise, render the regular cell content
                              flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )
                            )}
                          </TableCell>
                        )
                      })}
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
