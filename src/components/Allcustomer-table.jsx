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
    customerId: '123456789',
    Name: 'John Doe',
    ProgramManager: 'Privacy Card',
    totalCards: '4',
    totalTransactions: '120',
    createdBy: 'Admin',
    lastActive: '12-01-2023',
  },
  {
    product_id: '2',
    customerId: '123456789',
    Name: 'Jane Smith',
    ProgramManager: 'Business Card',
    totalCards: '2',
    totalTransactions: '85',
    createdBy: 'Manager1',
    lastActive: '11-05-2021',
  },
  {
    product_id: '3',
    customerId: '123456789',
    Name: 'Robert Brown',
    ProgramManager: 'Travel Card',
    totalCards: '3',
    totalTransactions: '140',
    createdBy: 'SupervisorX',
    lastActive: '11-05-2021',
  },
  {
    product_id: '4',
    customerId: '123456789',
    Name: 'Emily Davis',
    ProgramManager: 'Gift Card',
    totalCards: '1',
    totalTransactions: '15',
    createdBy: 'Admin',
    lastActive: '12-05-2021',
  },
  {
    product_id: '5',
    customerId: '123456789',
    Name: 'Michael Wilson',
    ProgramManager: 'Virtual Card',
    totalCards: '5',
    totalTransactions: '200',
    createdBy: 'AdminAssistant',
    lastActive: '11-05-2021',
  },
  {
    product_id: '6',
    customerId: '123456789',
    Name: 'Olivia Johnson',
    ProgramManager: 'Platinum Card',
    totalCards: '2',
    totalTransactions: '95',
    createdBy: 'Manager3',
    lastActive: '12-05-2021',
  },
  {
    product_id: '7',
    customerId: '123456789',
    Name: 'James White',
    ProgramManager: 'Student Card',
    totalCards: '1',
    totalTransactions: '45',
    createdBy: 'SupervisorY',
    lastActive: '11-05-2021',
  },
  {
    product_id: '8',
    customerId: '123456789',
    Name: 'Sophia Martinez',
    ProgramManager: 'Savings Card',
    totalCards: '3',
    totalTransactions: '130',
    createdBy: 'Admin',
    lastActive: '11-05-2021',
  },
  {
    product_id: '9',
    customerId: '123456789',
    Name: 'Ethan Taylor',
    ProgramManager: 'Cashback Card',
    totalCards: '2',
    totalTransactions: '70',
    createdBy: 'Manager2',
    lastActive: '11-05-2021',
  },
  {
    product_id: '10',
    customerId: '123456789',
    Name: 'Isabella Hernandez',
    ProgramManager: 'Corporate Card',
    totalCards: '6',
    totalTransactions: '300',
    createdBy: 'SupervisorZ',
    lastActive: '12-05-2021',
  },
  {
    product_id: '11',
    customerId: '123456789',
    Name: 'Liam Garcia',
    ProgramManager: 'Premium Card',
    totalCards: '4',
    totalTransactions: '190',
    createdBy: 'Admin',
    lastActive: '12-05-2021',
  },
]

export function AllCustomerTable() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})

  const columns = [

    {
      accessorKey: 'customerId',
      header: 'Customer Id',
      cell: ({ row }) => (
        <div className="capitalize text-center cursor-pointer hover:underline">
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
        <div className="text-center cursor-pointer hover:underline">{row.getValue('ProgramManager')}</div>
      ),
    },
    {
      accessorKey: 'totalCards',
      header: 'Total Cards',
      cell: ({ row }) => (
        <div className="text-center">
          {row.getValue('totalCards') ? row.getValue('totalCards') : '0'}
        </div>
      ),
    },
    {
      accessorKey: 'totalTransactions',
      header: 'Total Transactions',
      cell: ({ row }) => (
        <div className="text-center">
          {row.getValue('totalTransactions')
            ? row.getValue('totalTransactions')
            : '0'}
        </div>
      ),
    },
    {
      accessorKey: 'lastActive',
      header: 'Last Active',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('lastActive')}</div>
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
                Flag
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
        <CardTitle>All Customer List</CardTitle>
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
