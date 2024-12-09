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
  Check,
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

import { Badge } from '@/components/ui/badge'

const data = [
  {
    product_id: '1',
    customerId: '123654789',
    Name: 'Mona',
    ProgramManager: 'Sales Card',
    status: 'pending',
    verificationRemarks: 'Resubmission Required',
    submissionDate: '2022-10-05',
  },
  {
    product_id: '2',
    customerId: '123664789',
    Name: 'John Doe',
    ProgramManager: 'Platinum Card',
    status: 'pending',
    verificationRemarks: 'Address proof missing',
    submissionDate: '2023-09-15',
  },
  {
    product_id: '3',
    customerId: '123654782',
    Name: 'Sophia Smith',
    ProgramManager: 'Business Loan',
    status: 'under review',
    verificationRemarks: 'Verification in progress',
    submissionDate: '2023-11-01',
  },
  {
    product_id: '4',
    customerId: '123684789',
    Name: 'Ethan Brown',
    ProgramManager: 'Travel Card',
    status: 'rejected',
    verificationRemarks: 'ID proof mismatch',
    submissionDate: '2023-08-20',
  },
  {
    product_id: '5',
    customerId: '123656554',
    Name: 'Liam Wilson',
    ProgramManager: 'Premium Savings',
    status: 'pending',
    verificationRemarks: 'Photo unclear, resubmit',
    submissionDate: '2023-10-10',
  },
  {
    product_id: '6',
    customerId: '123654779',
    Name: 'Emma Davis',
    ProgramManager: 'Retail Finance',
    status: 'under review',
    verificationRemarks: 'Cross-verifying documents',
    submissionDate: '2023-09-25',
  },
  {
    product_id: '7',
    customerId: '123654798',
    Name: 'Oliver Martinez',
    ProgramManager: 'Gold Card',
    status: 'incomplete',
    verificationRemarks: 'Bank statement not submitted',
    submissionDate: '2023-10-02',
  },
  {
    product_id: '8',
    customerId: '189654789',
    Name: 'Ava Taylor',
    ProgramManager: 'Student Plan',
    status: 'pending',
    verificationRemarks: 'Document not signed',
    submissionDate: '2023-11-15',
  },
  {
    product_id: '9',
    customerId: '123654756',
    Name: 'Michael Johnson',
    ProgramManager: 'Cashback Offers',
    status: 'rejected',
    verificationRemarks: 'Document not legible',
    submissionDate: '2023-07-30',
  },
  {
    product_id: '10',
    customerId: '123654723',
    Name: 'Emily Clark',
    ProgramManager: 'Merchant Services',
    status: 'under review',
    verificationRemarks: 'Final verification stage',
    submissionDate: '2023-11-10',
  },
]

data.forEach((item) => {
  const [year, month, day] = item.submissionDate.split('-')
  item.submissionDate = `${day}-${month}-${year.slice(-2)}`
})

console.log(data)

export function PendingKycTable() {
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
        <div className="capitalize text-center hover:underline">
          {row.getValue('customerId')}
        </div>
      ),
    },
    {
      accessorKey: 'Name',
      header: 'Name',
      cell: ({ row }) => (
        <div className="capitalize text-center">{row.getValue('Name')}</div>
      ),
    },
    {
      accessorKey: 'ProgramManager',
      header: 'Program Manager',
      cell: ({ row }) => (
        <div className="text-center hover:underline">{row.getValue('ProgramManager')}</div>
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
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status')

        switch (status) {
          case 'active':
            return <Badge className="bg-[#e4f5e9] text-[#16794c]">Active</Badge>
          case 'pending':
            return (
              <Badge className="bg-[#fff7d3] text-[#ab6e05]">Pending</Badge>
            )
          case 'under review':
            return (
              <Badge className="bg-[#e3f2fd] text-[#1976d2]">
                Under Review
              </Badge>
            )
          case 'rejected':
            return (
              <Badge className="bg-[#ffe6e6] text-[#d32f2f]">Rejected</Badge>
            )
          case 'incomplete':
            return (
              <Badge className="bg-[#fce4ec] text-[#c2185b]">Incomplete</Badge>
            )
        }
      },
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
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Approve
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
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
            <div>
              <DropdownMenu className="max-sm:w-full">
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                      Sort By <ChevronDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {table
                      .getAllColumns()
                      .filter((column) => {
                        const rows = table.getCoreRowModel().rows // Access rows of the table
                        const sampleValue = rows[0]?.getValue(column.id) // Get a sample value for this column
                        const valueType = typeof sampleValue

                        // Check if the column contains integer or float data
                        return (
                          column.columnDef.header &&
                          (valueType === 'number' ||
                            !isNaN(parseFloat(sampleValue)))
                        )
                      })
                      .map((column) => {
                        const currentSorting = table.getState().sorting
                        const isCurrentlySorted =
                          currentSorting.length > 0 &&
                          currentSorting[0].id === column.id

                        return (
                          <DropdownMenuItem
                            key={column.id}
                            className="capitalize"
                            onSelect={() => {
                              if (isCurrentlySorted) {
                                // If already sorted by this column, reset sorting
                                table.setSorting([])
                              } else {
                                // Otherwise, sort by this column in ascending order
                                table.setSorting([
                                  { id: column.id, desc: true },
                                ])
                              }
                            }}
                          >
                            <span className="flex items-center gap-2">
                              {isCurrentlySorted && <Check className="" />}
                              {typeof column.columnDef.header === 'string'
                                ? column.columnDef.header
                                : ''}
                            </span>

                            {/* Display a checkmark if this column is currently sorted */}
                          </DropdownMenuItem>
                        )
                      })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div>
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

              </div>
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
