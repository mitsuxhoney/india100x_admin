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
    product: 'Smartphone',
    stock: 50,
    price: 599.99,
    orders: 120,
    rating: 4.5,
    published: true,
    publishedAt: '2024-01-15',
  },
  {
    product_id: 2,
    product: 'Laptop',
    stock: 30,
    price: 1099.99,
    orders: 75,
    rating: 4.7,
    published: true,
    publishedAt: '2024-02-20',
  },
  {
    product_id: 3,
    product: 'Headphones',
    stock: 100,
    price: 199.99,
    orders: 200,
    rating: 4.3,
    published: true,
    publishedAt: '2024-03-10',
  },
  {
    product_id: 4,
    product: 'Smartwatch',
    stock: 40,
    price: 299.99,
    orders: 85,
    rating: 4.4,
    published: true,
    publishedAt: '2024-04-05',
  },
  {
    product_id: 5,
    product: 'Tablet',
    stock: 25,
    price: 399.99,
    orders: 50,
    rating: 4.6,
    published: true,
    publishedAt: '2024-05-01',
  },
  {
    product_id: 6,
    product: 'Wireless Earbuds',
    stock: 80,
    price: 149.99,
    orders: 180,
    rating: 4.2,
    published: true,
    publishedAt: '2024-06-15',
  },
  {
    product_id: 7,
    product: 'Gaming Console',
    stock: 20,
    price: 499.99,
    orders: 95,
    rating: 4.8,
    published: true,
    publishedAt: '2024-07-12',
  },
  {
    product_id: 8,
    product: 'Action Camera',
    stock: 15,
    price: 299.99,
    orders: 60,
    rating: 4.5,
    published: true,
    publishedAt: '2024-08-18',
  },
  {
    product_id: 9,
    product: 'Bluetooth Speaker',
    stock: 70,
    price: 99.99,
    orders: 150,
    rating: 4.1,
    published: true,
    publishedAt: '2024-09-05',
  },
  {
    product_id: 10,
    product: 'Keyboard',
    stock: 60,
    price: 79.99,
    orders: 130,
    rating: 4.4,
    published: true,
    publishedAt: '2024-10-01',
  },
  {
    product_id: 11,
    product: 'Monitor',
    stock: 35,
    price: 249.99,
    orders: 80,
    rating: 4.6,
    published: true,
    publishedAt: '2024-10-20',
  },
  {
    product_id: 12,
    product: 'Mouse',
    stock: 90,
    price: 49.99,
    orders: 220,
    rating: 4.3,
    published: true,
    publishedAt: '2024-11-10',
  },
  {
    product_id: 13,
    product: 'External Hard Drive',
    stock: 45,
    price: 129.99,
    orders: 100,
    rating: 4.5,
    published: true,
    publishedAt: '2024-12-02',
  },
  {
    product_id: 14,
    product: 'Fitness Tracker',
    stock: 55,
    price: 199.99,
    orders: 90,
    rating: 4.2,
    published: true,
    publishedAt: '2025-01-18',
  },
  {
    product_id: 15,
    product: 'Graphics Card',
    stock: 10,
    price: 699.99,
    orders: 40,
    rating: 4.9,
    published: true,
    publishedAt: '2025-02-14',
  },
  {
    product_id: 16,
    product: 'Router',
    stock: 85,
    price: 99.99,
    orders: 140,
    rating: 4.0,
    published: true,
    publishedAt: '2025-03-06',
  },
  {
    product_id: 17,
    product: 'Smart Home Hub',
    stock: 30,
    price: 249.99,
    orders: 70,
    rating: 4.4,
    published: true,
    publishedAt: '2025-04-12',
  },
  {
    product_id: 18,
    product: 'Drone',
    stock: 12,
    price: 999.99,
    orders: 35,
    rating: 4.7,
    published: true,
    publishedAt: '2025-05-20',
  },
]

export function ActivityLogsTable() {
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
      accessorKey: 'product',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Product
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="lowercase pl-4">{row.getValue('product')}</div>
      ),
    },
    {
      accessorKey: 'stock',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Stock
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="capitalize pl-4">{row.getValue('stock')}</div>
      ),
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('price')}</div>
      ),
    },
    {
      accessorKey: 'orders',
      header: 'Orders',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('orders')}</div>
      ),
    },
    {
      accessorKey: 'rating',
      header: 'Rating',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('rating')}</div>
      ),
    },
    {
      accessorKey: 'publishedAt',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Published At
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="lowercase pl-4">{row.getValue('publishedAt')}</div>
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
        <CardTitle>Program List</CardTitle>
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
