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
    product_id: '1',
    id: '3u1reuv4',
    name: 'Jane Smith',
    totalAmount: '2342.23',
    programs: 2,
    activePrograms: 1,
    totalCustomers: 50,
    createdAt: '05-10-2023',
  },
  {
    product_id: '2',
    id: '9k2jhgf5',
    name: 'John Doe',
    totalAmount: '5678.45',
    programs: 3,
    activePrograms: 2,
    totalCustomers: 120,
    createdAt: '01-10-2023',
  },
  {
    product_id: '3',
    id: '7y4uhki8',
    name: 'Emily Davis',
    totalAmount: '7890.00',
    programs: 1,
    activePrograms: 0,
    totalCustomers: 20,
    createdAt: '12-03-2021',
  },
  {
    product_id: '4',
    id: '2w3e5rft',
    name: 'Michael Brown',
    totalAmount: '4500.00',
    programs: 4,
    activePrograms: 3,
    totalCustomers: 75,
    createdAt: '03-02-2022',
  },
  {
    product_id: '5',
    id: '8p6qzlw1',
    name: 'Sophia Johnson',
    totalAmount: '1500.75',
    programs: 2,
    activePrograms: 2,
    totalCustomers: 65,
    createdAt: '07-02-2022',
  },
  {
    product_id: '6',
    id: '4m9oltr2',
    name: 'Liam Taylor',
    totalAmount: '9832.10',
    programs: 5,
    activePrograms: 4,
    totalCustomers: 100,
    createdAt: '05-08-2022',
  },
  {
    product_id: '7',
    id: '5n7vukm3',
    name: 'Olivia Martinez',
    totalAmount: '345.67',
    programs: 1,
    activePrograms: 0,
    totalCustomers: 10,
    createdAt: '04-01-2021',
  },
  {
    product_id: '8',
    id: '6y8pojkl',
    name: 'Noah Garcia',
    totalAmount: '6587.89',
    programs: 3,
    activePrograms: 2,
    totalCustomers: 85,
    createdAt: '11-05-2021',
  },
  {
    product_id: '9',
    id: '3v5bkqw9',
    name: 'Isabella Hernandez',
    totalAmount: '4200.25',
    programs: 4,
    activePrograms: 3,
    totalCustomers: 90,
    createdAt: '02-08-2024',
  },
  {
    product_id: '10',
    id: '7u3rlhno',
    name: 'William Wilson',
    totalAmount: '1324.78',
    programs: 2,
    activePrograms: 1,
    totalCustomers: 45,
    createdAt: '09-04-2021',
  },
]

export function ProgramTable() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})

  const columns = [

    {
      accessorKey: 'name',
      header: 'Manager Name',
      cell: ({ row }) => (
        <div className="capitalize text-center">{row.getValue('name')}</div>
      ),
    },
    {
      header: 'Total Programs',
      cell: ({ row }) => {
        const active = row.original.activePrograms
        const totalProgram = row.original.programs
        return (
          <div className="capitalize text-center">
            <span>{`${active}/${totalProgram}`}</span>
          </div>
        )
      },
    },
    {
      accessorKey: 'totalAmount',
      header: 'Total Amount',
      cell: ({ row }) => {
        const amount = Number(row.original.totalAmount); // Access the raw data directly
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
      accessorKey: 'totalCustomers',
      header: 'Total Customers',
      cell: ({ row }) => (
        <div className="capitalize text-center">
          {row.getValue('totalCustomers')}
        </div>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: 'Launch Date',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('createdAt')}</div>
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
                Suspend
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
        <CardTitle>Program Manager List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <div className="flex items-center py-4 justify-between ">
            <Input
              placeholder="Search by Name..."
              value={table.getColumn('name')?.getFilterValue() ?? ''}
              onChange={(event) =>
                table.getColumn('name')?.setFilterValue(event.target.value)
              }
              className="max-w-xs"
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

              <Link to="/program/create-program">
                <Button variant="" className="ml-auto">
                  {' '}
                  <CirclePlus /> Add Manager
                </Button>
              </Link>
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
                        const clickableColumns = ['id', 'name'] // List of clickable column keys

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
            {/* <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{' '}
                {table.getFilteredRowModel().rows.length} row(s) selected.
              </div> */}
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
