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
    id: 1,
    card_ref_id: '32XY32',
    status: 'active',
    last_four_digit: '4444',
    product_category: 'Example',
    add_on_card: 'true',
    is_physical: 'true',
    issued_date: '2024-12-02T22:44:00Z',
  },
  {
    id: 2,
    card_ref_id: '32XY33',
    status: 'inactive',
    last_four_digit: '4445',
    product_category: 'Example',
    add_on_card: 'true',
    is_physical: 'true',
    issued_date: '2024-12-02T22:44:00Z',
  },
  {
    id: 3,
    card_ref_id: '32XY34',
    status: 'active',
    last_four_digit: '4446',
    product_category: 'Example',
    add_on_card: 'true',
    is_physical: 'true',
    issued_date: '2024-12-02T22:44:00Z',
  },
  {
    id: 4,
    card_ref_id: '32XY35',
    status: 'inactive',
    last_four_digit: '4447',
    product_category: 'Example',
    add_on_card: 'true',
    is_physical: 'true',
    issued_date: '2024-12-02T22:44:00Z',
  },
  {
    id: 5,
    card_ref_id: '32XY36',
    status: 'active',
    last_four_digit: '4448',
    product_category: 'Example',
    add_on_card: 'true',
    is_physical: 'true',
    issued_date: '2024-12-02T22:44:00Z',
  },
  {
    id: 6,
    card_ref_id: '32XY37',
    status: 'inactive',
    last_four_digit: '4449',
    product_category: 'Example',
    add_on_card: 'true',
    is_physical: 'true',
    issued_date: '2024-12-02T22:44:00Z',
  },
  {
    id: 7,
    card_ref_id: '32XY38',
    status: 'active',
    last_four_digit: '4450',
    product_category: 'Example',
    add_on_card: 'true',
    is_physical: 'true',
    issued_date: '2024-12-02T22:44:00Z',
  },
  {
    id: 8,
    card_ref_id: '32XY39',
    status: 'inactive',
    last_four_digit: '4451',
    product_category: 'Example',
    add_on_card: 'true',
    is_physical: 'true',
    issued_date: '2024-12-02T22:44:00Z',
  },
  {
    id: 9,
    card_ref_id: '32XY40',
    status: 'active',
    last_four_digit: '4452',
    product_category: 'Example',
    add_on_card: 'true',
    is_physical: 'true',
    issued_date: '2024-12-02T22:44:00Z',
  },
  {
    id: 10,
    card_ref_id: '32XY41',
    status: 'inactive',
    last_four_digit: '4453',
    product_category: 'Example',
    add_on_card: 'true',
    is_physical: 'true',
    issued_date: '2024-12-02T22:44:00Z',
  },
]

export function IssuedCardsTable() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})

  const columns = [
    // {
    //   id: 'select',
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={
    //         table.getIsAllPageRowsSelected() ||
    //         (table.getIsSomePageRowsSelected() && 'indeterminate')
    //       }
    //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //       aria-label="Select all"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => row.toggleSelected(!!value)}
    //       aria-label="Select row"
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }) => <div className="capitalize">{row.getValue('id')}</div>,
    },
    {
      accessorKey: 'card_ref_id',
      header: 'Card Ref ID',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('card_ref_id')}</div>
      ),
    },
    {
      accessorKey: 'status',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Status
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="lowercase pl-4">{row.getValue('status')}</div>
      ),
    },
    {
      accessorKey: 'last_four_digit',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Last Four Digits
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="capitalize pl-4">{row.getValue('last_four_digit')}</div>
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
      accessorKey: 'add_on_card',
      header: 'Add on Card',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('add_on_card')}</div>
      ),
    },
    {
      accessorKey: 'is_physical',
      header: 'Is Physical',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('is_physical')}</div>
      ),
    },
    {
      accessorKey: 'issued_date',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Issued Date
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="lowercase pl-4">{row.getValue('issued_date')}</div>
      ),
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const rowData = row.original // Get the entire row's data for actions
        return (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              // onClick={() => handleEdit(rowData)}
            >
              <Pencil />
            </Button>
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <AlertDialogTrigger asChild>
                <Button size="sm" variant="destructive">
                  <Trash2 />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete ? This action cannot be
                    undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <Button variant="outline" onClick={closeDialog}>
                    <CircleX />
                  </Button>
                  <Button
                    variant="destructive"
                    // onClick={() => confirmDelete(rowData)}
                  >
                    <Trash2 />
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )
      },
    },
    // {
    //   id: 'actions',
    //   enableHiding: false,
    //   cell: ({ row }) => {
    //     const payment = row.original;

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
    //           <DropdownMenuItem
    //             onClick={() => navigator.clipboard.writeText(payment.id)}
    //           >
    //             Copy payment ID
    //           </DropdownMenuItem>
    //           <DropdownMenuSeparator />
    //           <DropdownMenuItem>View customer</DropdownMenuItem>
    //           <DropdownMenuItem>View payment details</DropdownMenuItem>
    //         </DropdownMenuContent>
    //       </DropdownMenu>
    //     );
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
        <CardTitle>Issued Cards</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <div className="flex items-center py-4 justify-between ">
            <Input
              placeholder="Search Product..."
              value={table.getColumn('product')?.getFilterValue() ?? ''}
              onChange={(event) =>
                table.getColumn('product')?.setFilterValue(event.target.value)
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
                        <TableHead key={header.id}>
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
                        <TableCell key={cell.id}>
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
