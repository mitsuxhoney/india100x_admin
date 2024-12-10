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
} from 'lucide-react'

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
    customerId: '123452789',
    ProgramManager: 'Business Card',
    FlagType: 'Suspicious Transactions',
    FlaggedActivityDescription: 'Multiple failed login attempts',
    IpAddress: '127.0.32.1',
    priority: 'medium',
    CreatedBy: 'Manager1',
    LastActive: '01-12-2023',
  },
  {
    product_id: '3',
    customerId: '123456789',
    ProgramManager: 'Travel Card',
    FlagType: 'Suspicious Transactions',
    FlaggedActivityDescription: 'Multiple failed login attempts',
    IpAddress: '127.0.32.1',
    priority: 'low',
    CreatedBy: 'SupervisorX',
    LastActive: '01-12-2023',
  },
  {
    product_id: '4',
    customerId: '123456789',
    ProgramManager: 'Travel Card',
    FlagType: 'Suspicious Transactions',
    FlaggedActivityDescription: 'Multiple failed login attempts',
    IpAddress: '127.0.32.1',
    priority: 'low',
    CreatedBy: 'SupervisorX',
    LastActive: '01-12-2023',
  },
  {
    product_id: '5',
    customerId: '123456789',
    ProgramManager: 'Travel Card',
    FlagType: 'Suspicious Transactions',
    FlaggedActivityDescription: 'Multiple failed login attempts',
    IpAddress: '127.0.32.1',
    priority: 'low',
    CreatedBy: 'SupervisorX',
    LastActive: '01-12-2023',
  },
  {
    product_id: '6',
    customerId: '123456789',
    ProgramManager: 'Travel Card',
    FlagType: 'Suspicious Transactions',
    FlaggedActivityDescription: 'Multiple failed login attempts',
    IpAddress: '127.0.32.1',
    priority: 'low',
    CreatedBy: 'SupervisorX',
    LastActive: '01-12-2023',
  },
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
            : 'text-base'

        return <div className={`text-center ${fontSize}`}>{description}</div>
      },
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
      accessorKey: 'LastActive',
      header: 'Last Active',
      cell: ({ row }) => (
        <div className="text-center min-w-[80px]">
          {row.getValue('LastActive')}
        </div>
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
                    .map((column) => (
                      <DropdownMenuItem
                        key={column.id}
                        className="capitalize"
                        onSelect={() => {
                          const currentSorting = table.getState().sorting
                          const isCurrentlySorted =
                            currentSorting.length > 0 &&
                            currentSorting[0].id === column.id

                          if (isCurrentlySorted) {
                            // If already sorted by this column, reset sorting
                            table.setSorting([])
                          } else {
                            // Otherwise, sort by this column in ascending order
                            table.setSorting([{ id: column.id, desc: true }])
                          }
                        }}
                      >
                        {typeof column.columnDef.header === 'string'
                          ? column.columnDef.header
                          : ''}{' '}
                        {/* Render the header if it's a string */}
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
