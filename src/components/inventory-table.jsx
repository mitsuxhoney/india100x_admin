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
    product_id: 1,
    product_name: 'Smartphone',
    product_category: 'Example',
    card_nature: 'virtual',
    ordered_cards: 10,
    status: 'active',
    created_date: '2024-12-01',
  },
  {
    product_id: 1,
    product_name: 'Smartphone',
    product_category: 'Example',
    card_nature: 'virtual',
    ordered_cards: 10,
    status: 'active',
    created_date: '2024-12-01',
  },
  {
    product_id: 1,
    product_name: 'Smartphone',
    product_category: 'Example',
    card_nature: 'virtual',
    ordered_cards: 10,
    status: 'active',
    created_date: '2024-12-01',
  },
  {
    product_id: 1,
    product_name: 'Smartphone',
    product_category: 'Example',
    card_nature: 'virtual',
    ordered_cards: 10,
    status: 'active',
    created_date: '2024-12-01',
  },
  {
    product_id: 1,
    product_name: 'Smartphone',
    product_category: 'Example',
    card_nature: 'virtual',
    ordered_cards: 10,
    status: 'active',
    created_date: '2024-12-01',
  },
  {
    product_id: 1,
    product_name: 'Smartphone',
    product_category: 'Example',
    card_nature: 'virtual',
    ordered_cards: 10,
    status: 'active',
    created_date: '2024-12-01',
  },
  {
    product_id: 1,
    product_name: 'Smartphone',
    product_category: 'Example',
    card_nature: 'virtual',
    ordered_cards: 10,
    status: 'active',
    created_date: '2024-12-01',
  },
  {
    product_id: 1,
    product_name: 'Smartphone',
    product_category: 'Example',
    card_nature: 'virtual',
    ordered_cards: 10,
    status: 'active',
    created_date: '2024-12-01',
  },
  {
    product_id: 1,
    product_name: 'Smartphone',
    product_category: 'Example',
    card_nature: 'virtual',
    ordered_cards: 10,
    status: 'active',
    created_date: '2024-12-01',
  },
  {
    product_id: 1,
    product_name: 'Smartphone',
    product_category: 'Example',
    card_nature: 'virtual',
    ordered_cards: 10,
    status: 'active',
    created_date: '2024-12-01',
  },
  {
    product_id: 1,
    product_name: 'Smartphone',
    product_category: 'Example',
    card_nature: 'virtual',
    ordered_cards: 10,
    status: 'active',
    created_date: '2024-12-01',
  },
  {
    product_id: 1,
    product_name: 'Smartphone',
    product_category: 'Example',
    card_nature: 'virtual',
    ordered_cards: 10,
    status: 'active',
    created_date: '2024-12-01',
  },
  {
    product_id: 1,
    product_name: 'Smartphone',
    product_category: 'Example',
    card_nature: 'virtual',
    ordered_cards: 10,
    status: 'active',
    created_date: '2024-12-01',
  },
  {
    product_id: 1,
    product_name: 'Smartphone',
    product_category: 'Example',
    card_nature: 'virtual',
    ordered_cards: 10,
    status: 'active',
    created_date: '2024-12-01',
  },
  {
    product_id: 1,
    product_name: 'Smartphone',
    product_category: 'Example',
    card_nature: 'virtual',
    ordered_cards: 10,
    status: 'active',
    created_date: '2024-12-01',
  },
  {
    product_id: 1,
    product_name: 'Smartphone',
    product_category: 'Example',
    card_nature: 'virtual',
    ordered_cards: 10,
    status: 'active',
    created_date: '2024-12-01',
  },
  {
    product_id: 1,
    product_name: 'Smartphone',
    product_category: 'Example',
    card_nature: 'virtual',
    ordered_cards: 10,
    status: 'active',
    created_date: '2024-12-01',
  },
  {
    product_id: 1,
    product_name: 'Smartphone',
    product_category: 'Example',
    card_nature: 'virtual',
    ordered_cards: 10,
    status: 'active',
    created_date: '2024-12-01',
  },
  {
    product_id: 1,
    product_name: 'Smartphone',
    product_category: 'Example',
    card_nature: 'virtual',
    ordered_cards: 10,
    status: 'active',
    created_date: '2024-12-01',
  },
  {
    product_id: 1,
    product_name: 'Smartphone',
    product_category: 'Example',
    card_nature: 'virtual',
    ordered_cards: 10,
    status: 'active',
    created_date: '2024-12-01',
  },
  {
    product_id: 1,
    product_name: 'Smartphone',
    product_category: 'Example',
    card_nature: 'virtual',
    ordered_cards: 10,
    status: 'active',
    created_date: '2024-12-01',
  },
  {
    product_id: 1,
    product_name: 'Smartphone',
    product_category: 'Example',
    card_nature: 'virtual',
    ordered_cards: 10,
    status: 'active',
    created_date: '2024-12-01',
  },
  {
    product_id: 1,
    product_name: 'Smartphone',
    product_category: 'Example',
    card_nature: 'virtual',
    ordered_cards: 10,
    status: 'active',
    created_date: '2024-12-01',
  },
  {
    product_id: 1,
    product_name: 'Smartphone',
    product_category: 'Example',
    card_nature: 'virtual',
    ordered_cards: 10,
    status: 'active',
    created_date: '2024-12-01',
  },
  {
    product_id: 1,
    product_name: 'Smartphone',
    product_category: 'Example',
    card_nature: 'virtual',
    ordered_cards: 10,
    status: 'active',
    created_date: '2024-12-01',
  },
]

export function InventoryTable() {
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
      accessorKey: 'product_id',
      header: 'ID',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('product_id')}</div>
      ),
    },
    {
      accessorKey: 'product_name',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Product Name
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="lowercase pl-4">{row.getValue('product_name')}</div>
      ),
    },
    {
      accessorKey: 'product_category',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Product Category
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="capitalize pl-4">
          {row.getValue('product_category')}
        </div>
      ),
    },
    {
      accessorKey: 'card_nature',
      header: 'Card Nature',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('card_nature')}</div>
      ),
    },
    {
      accessorKey: 'ordered_cards',
      header: 'Ordered Cards',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('ordered_cards')}</div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('status')}</div>
      ),
    },
    {
      accessorKey: 'created_date',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Created Date
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="lowercase pl-4">{row.getValue('created_date')}</div>
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
        <CardTitle>Inventory</CardTitle>
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
              <Link to="/program/create-program">
                <Button variant="" className="ml-auto">
                  {' '}
                  <CirclePlus /> Add new
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