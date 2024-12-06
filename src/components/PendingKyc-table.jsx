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
  Pencil,
  Trash2,
  CircleX,
  MoreHorizontal,
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
    "customerId": "123654789",
    "Name": "Mona",
    "ProgramManager": "Sales Card",
    "kycStatus": "Pending",
    "verificationRemarks": "Resubmission Required",
    "submissionDate": "2022-10-05"
  },
  {
    "customerId": "123664789",
    "Name": "John Doe",
    "ProgramManager": "Platinum Card",
    "kycStatus": "Incomplete",
    "verificationRemarks": "Address proof missing",
    "submissionDate": "2023-09-15"
  },
  {
    "customerId": "123654782",
    "Name": "Sophia Smith",
    "ProgramManager": "Business Loan",
    "kycStatus": "Under Review",
    "verificationRemarks": "Verification in progress",
    "submissionDate": "2023-11-01"
  },
  {
    "customerId": "123684789",
    "Name": "Ethan Brown",
    "ProgramManager": "Travel Card",
    "kycStatus": "Rejected",
    "verificationRemarks": "ID proof mismatch",
    "submissionDate": "2023-08-20"
  },
  {
    "customerId": "123656554",
    "Name": "Liam Wilson",
    "ProgramManager": "Premium Savings",
    "kycStatus": "Pending",
    "verificationRemarks": "Photo unclear, resubmit",
    "submissionDate": "2023-10-10"
  },
  {
    "customerId": "123654779",
    "Name": "Emma Davis",
    "ProgramManager": "Retail Finance",
    "kycStatus": "Under Review",
    "verificationRemarks": "Cross-verifying documents",
    "submissionDate": "2023-09-25"
  },
  {
    "customerId": "123654798",
    "Name": "Oliver Martinez",
    "ProgramManager": "Gold Card",
    "kycStatus": "Incomplete",
    "verificationRemarks": "Bank statement not submitted",
    "submissionDate": "2023-10-02"
  },
  {
    "customerId": "189654789",
    "Name": "Ava Taylor",
    "ProgramManager": "Student Plan",
    "kycStatus": "Pending",
    "verificationRemarks": "Document not signed",
    "submissionDate": "2023-11-15"
  },
  {
    "customerId": "123654756",
    "Name": "Michael Johnson",
    "ProgramManager": "Cashback Offers",
    "kycStatus": "Rejected",
    "verificationRemarks": "Document not legible",
    "submissionDate": "2023-07-30"
  },
  {
    "customerId": "123654723",
    "Name": "Emily Clark",
    "ProgramManager": "Merchant Services",
    "kycStatus": "Under Review",
    "verificationRemarks": "Final verification stage",
    "submissionDate": "2023-11-10"
  }
]

  

export function PendingKycTable() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})

  const columns = [
    {
      accessorKey: 'customerId',
      header: 'Customer Id',
      cell: ({ row }) => <div className="capitalize text-center">{row.getValue('customerId')}</div>,
    },
    {
      accessorKey: 'Name',
      header: 'Name',
      cell: ({ row }) => <div className="capitalize text-center">{row.getValue('Name')}</div>,
    },
    {
      accessorKey: 'ProgramManager',
      header: 'Program Manager',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('ProgramManager')}</div>
      ),
    },
    {
      accessorKey: 'kycStatus',
      header: 'KYC Status',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('kycStatus')}</div>
      ),
    },
    {
      accessorKey: 'verificationRemarks',
      header: 'Verification Remarks',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('verificationRemarks')}</div>
      ),
    },
    {
      accessorKey: 'submissionDate',
      header: 'Submission Date',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('submissionDate')}</div>
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
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Approve
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Reject
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
        <CardTitle>Pending KYC List</CardTitle>
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
                    Filter <ChevronDown />
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
                        const clickableColumns = ['customerId', 'ProgramManager']; // List of clickable column keys

                        return (
                          <TableCell className='text-center' key={cell.id}>
                            {clickableColumns.includes(cell.column.id) ? (
                              // If the column is in the clickable list, render a clickable element (e.g., link or button)
                              <button
                                onClick={() => handleClick(cell.row.original)}
                                style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}
                              >
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </button>
                            ) : (
                              // Otherwise, render the regular cell content
                              flexRender(cell.column.columnDef.cell, cell.getContext())
                            )}
                          </TableCell>
                        );
                      }
                      )}
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
