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
  MoreHorizontal,
  Check,
  CirclePlus,
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
import { Badge } from '@/components/ui/badge'

const fieldIconMap = {
  AddOnCard: {
    icon: <Badge className="bg-[#f5e7e4] text-[#792c16]">Add on card</Badge>,
    label: '',
  },
  Physical: {
    icon: <Badge className="bg-[#d3e5ff] text-[#051eab]">Physical</Badge>,
    label: 'Pending transaction',
  },
}

const data = [
  {
    id: 1,
    card_ref_id: '32XY32',
    status: 'active',
    AddOnCard: true,
    Physical: true,
    last_four_digit: '4444',
    product_category: 'Shopping',
    add_on_card: 'true',
    is_physical: 'true',
    issued_date: '02-12-2024',
  },
  {
    id: 2,
    card_ref_id: '32XY33',
    status: 'inactive',
    Physical: true,
    last_four_digit: '4445',
    product_category: 'Entertainment',
    add_on_card: 'true',
    is_physical: 'true',
    issued_date: '02-12-2024',
  },
  {
    id: 3,
    card_ref_id: '32XY34',
    status: 'active',
    Physical: true,
    last_four_digit: '4446',
    product_category: 'Grocery',
    add_on_card: 'true',
    is_physical: 'true',
    issued_date: '02-12-2024',
  },
  {
    id: 4,
    card_ref_id: '32XY35',
    status: 'inactive',
    AddOnCard: true,
    last_four_digit: '4447',
    product_category: 'Business',
    add_on_card: 'true',
    is_physical: 'true',
    issued_date: '02-12-2024',
  },
  {
    id: 5,
    card_ref_id: '32XY36',
    status: 'active',
    AddOnCard: true,
    last_four_digit: '4448',
    product_category: 'Loans',
    add_on_card: 'true',
    is_physical: 'true',
    issued_date: '02-12-2024',
  },
  {
    id: 6,
    card_ref_id: '32XY37',
    status: 'inactive',
    AddOnCard: true,
    Physical: true,
    last_four_digit: '4449',
    product_category: 'Travel',
    add_on_card: 'true',
    is_physical: 'true',
    issued_date: '02-12-2024',
  },
  {
    id: 7,
    card_ref_id: '32XY38',
    status: 'active',
    Physical: true,
    last_four_digit: '4450',
    product_category: 'Tickets',
    add_on_card: 'true',
    is_physical: 'true',
    issued_date: '02-12-2024',
  },
  {
    id: 8,
    card_ref_id: '32XY39',
    status: 'inactive',
    AddOnCard: true,
    last_four_digit: '4451',
    product_category: 'Food',
    add_on_card: 'true',
    is_physical: 'true',
    issued_date: '02-12-2024',
  },
  {
    id: 9,
    card_ref_id: '32XY40',
    status: 'active',
    AddOnCard: true,
    Physical: true,
    last_four_digit: '4452',
    product_category: 'Drinks',
    add_on_card: 'true',
    is_physical: 'true',
    issued_date: '02-12-2024',
  },
  {
    id: 10,
    card_ref_id: '32XY41',
    status: 'active',
    AddOnCard: true,
    Physical: true,
    last_four_digit: '4452',
    product_category: 'Books',
    add_on_card: 'true',
    is_physical: 'true',
    issued_date: '02-12-2024',
  },
]

export function IssuedCardsTable() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})

  const columns = [
    {
      accessorKey: 'card_ref_id',
      header: 'Card Ref ID',
      cell: ({ row }) => (
        <div className="capitalize cursor-pointer hover:underline">
          {row.getValue('card_ref_id')}
        </div>
      ),
    },
    {
      accessorKey: 'last_four_digit',
      header: 'Card Last Four Digits',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('last_four_digit')}</div>
      ),
    },
    {
      accessorKey: 'product_category',
      header: 'Product Category',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('product_category')}</div>
      ),
    },

    {
      header: 'Tags',
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2">
          {Object.keys(fieldIconMap).map((field) => {
            if (row.original[field]) {
              return (
                <span
                  key={field}
                  className="flex items-center gap-1"
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
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status')
        return status === 'active' ? (
          <Badge className="bg-[#e4f5e9] text-[#16794c]">Active</Badge>
        ) : (
          <Badge className="bg-[#fff0f0] text-[#b52a2a]">Inactive</Badge>
        )
      },
    },
    {
      accessorKey: 'issued_date',
      header: 'Issued Date',
      cell: ({ row }) => (
        <div className="lowercase ">{row.getValue('issued_date')}</div>
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
        <CardTitle>Issued Cards</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <div className="flex items-center py-4 justify-between ">
            <Input
              placeholder="Search by Card ref id..."
              value={table.getColumn('card_ref_id')?.getFilterValue() ?? ''}
              onChange={(event) =>
                table
                  .getColumn('card_ref_id')
                  ?.setFilterValue(event.target.value)
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
              {/* <Link to="/program/create-program">
                <Button variant="" className="ml-auto">
                  {' '}
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
