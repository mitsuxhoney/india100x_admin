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
  Check,
  Pencil,
  Trash2,
  CircleX,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Badge } from '@/components/ui/badge'

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
    product_id: '1',
    customerId: '123456781',
    name: 'John',
    ProgramManager: 'Privacy Card',
    FlagType: 'Suspicious Transactions',
    FlaggedActivityDescription: 'Multiple failed login attempts',
    IpAddress: '127.0.32.1',
    priority: 'high',
    CreatedBy: 'Admin32',
    LastActive: '01-12-2023',
  },
  {
    product_id: '2',
    customerId: '987654321',
    name: 'Alice',
    ProgramManager: 'Secure Wallet',
    FlagType: 'Unusual IP Address',
    FlaggedActivityDescription: 'Access from unrecognized IP',
    IpAddress: '192.168.1.1',
    priority: 'medium',
    CreatedBy: 'Admin45',
    LastActive: '02-11-2023',
  },
  {
    product_id: '3',
    customerId: '456123789',
    name: 'Bob',
    ProgramManager: 'Business Card',
    FlagType: 'High-Value Transactions',
    FlaggedActivityDescription: 'Large transaction flagged',
    IpAddress: '10.0.0.2',
    priority: 'high',
    CreatedBy: 'Manager23',
    LastActive: '11-10-2023',
  },
  {
    product_id: '4',
    customerId: '789456123',
    name: 'Sophia',
    ProgramManager: 'Travel Card',
    FlagType: 'Login Anomalies',
    FlaggedActivityDescription: 'Frequent password resets',
    IpAddress: '203.0.113.5',
    priority: 'low',
    CreatedBy: 'User12',
    LastActive: '12-09-2023',
  },
  {
    product_id: '5',
    customerId: '321654987',
    name: 'Michael',
    ProgramManager: 'Expense Card',
    FlagType: 'Card Sharing Detected',
    FlaggedActivityDescription: 'Multiple devices detected',
    IpAddress: '198.51.100.14',
    priority: 'medium',
    CreatedBy: 'Admin99',
    LastActive: '03-08-2023',
  },
  {
    product_id: '6',
    customerId: '147258369',
    name: 'Emma',
    ProgramManager: 'Platinum Card',
    FlagType: 'Geo-location Mismatch',
    FlaggedActivityDescription: 'Transactions in different countries',
    IpAddress: '203.0.113.77',
    priority: 'high',
    CreatedBy: 'Manager56',
    LastActive: '15-07-2023',
  },
  {
    product_id: '7',
    customerId: '963852741',
    name: 'Oliver',
    ProgramManager: 'Digital Wallet',
    FlagType: 'High Login Frequency',
    FlaggedActivityDescription: 'Excessive login attempts',
    IpAddress: '10.0.0.10',
    priority: 'low',
    CreatedBy: 'Admin11',
    LastActive: '20-06-2023',
  },
  {
    product_id: '8',
    customerId: '852741963',
    name: 'Liam',
    ProgramManager: 'Corporate Card',
    FlagType: 'Excessive Chargebacks',
    FlaggedActivityDescription: 'Too many chargeback requests',
    IpAddress: '198.51.100.33',
    priority: 'high',
    CreatedBy: 'Supervisor8',
    LastActive: '10-05-2023',
  },
  {
    product_id: '9',
    customerId: '741852963',
    name: 'Isabella',
    ProgramManager: 'Student Card',
    FlagType: 'Unusual Spending Pattern',
    FlaggedActivityDescription: 'Sudden increase in transactions',
    IpAddress: '192.168.10.20',
    priority: 'medium',
    CreatedBy: 'Admin20',
    LastActive: '30-04-2023',
  },
  {
    product_id: '10',
    customerId: '159357486',
    name: 'James',
    ProgramManager: 'Basic Card',
    FlagType: 'Unauthorized Access',
    FlaggedActivityDescription: 'Access outside working hours',
    IpAddress: '127.0.0.1',
    priority: 'low',
    CreatedBy: 'Admin03',
    LastActive: '25-03-2023',
  },
]

export function FlaggedCustomerTable() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})

  const columns = [
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
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <div className="capitalize text-center">{row.getValue('name')}</div>
      ),
    },
    {
      accessorKey: 'ProgramManager',
      header: 'Program Manager',
      cell: ({ row }) => (
        <div className="text-center hover:underline">
          {row.getValue('ProgramManager')}
        </div>
      ),
    },
    {
      accessorKey: 'FlagType',
      header: 'Flag Type',
      cell: ({ row }) => {
        return <div className="text-center">{row.getValue('FlagType')}</div>
      },
    },

    {
      accessorKey: 'FlaggedActivityDescription',
      header: 'Flagged Activity Description',
      cell: ({ row }) => {
        const description = row.getValue('FlaggedActivityDescription')
        const descriptionLength = description.length

        // Calculate font size based on description length
        const fontSize =
          descriptionLength > 100
            ? 'text-xs'
            : descriptionLength > 50
            ? 'text-sm'
            : 'text-md'

        return <div className={`text-center ${fontSize}`}>{description}</div>
      },
    },

    {
      accessorKey: 'LastActive',
      header: 'Last Active',
      cell: ({ row }) => (
        <div className="text-center min-w-[80px]">
          {row.getValue('LastActive')}
        </div>
      ),
    },
    {
      accessorKey: 'priority',
      header: 'Priority',
      cell: ({ row }) => {
        const priority = row.original.priority
        return (
          <div className="text-center">
            {priority === 'high' ? (
              <Badge className="bg-[#fff0f0] text-[#b52a2a]">High</Badge>
            ) : priority === 'low' ? (
              <Badge className="bg-[#fff7d3] text-[#ab6e05]">Low</Badge>
            ) : (
              <Badge className="bg-[#e3f2fd] text-[#1976d2]">Medium</Badge>
            )}
          </div>
        )
      },
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
                Activate
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
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
              {/* <div>
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

                            
                          </DropdownMenuItem>
                        )
                      })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div> */}
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
                          {typeof column.columnDef.header === 'string'
                            ? column.columnDef.header
                            : ''}{' '}
                          {/* Render the header if it's a string */}
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
