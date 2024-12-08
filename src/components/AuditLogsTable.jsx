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
  SquarePen,
  Trash2Icon,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  CirclePlus,
  MoreHorizontal,
  Pencil,
  Trash2,
  CircleX,
  Trash,
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
import { z } from 'zod'

const data = [
  {
    id: 1,
    status: 'success',
    method: 'GET',
    path: '/api/user',
    userId: 'user1',
    sessionId: 'session123',
    IP: '192.168.1.1',
  },
  {
    id: 2,
    status: 'error',
    method: 'POST',
    path: '/api/login',
    userId: 'user2',
    sessionId: 'session124',
    IP: '192.168.1.2',
  },
  {
    id: 3,
    status: 'success',
    method: 'GET',
    path: '/api/orders',
    userId: 'user3',
    sessionId: 'session125',
    IP: '192.168.1.3',
  },
  {
    id: 4,
    status: 'success',
    method: 'PUT',
    path: '/api/profile',
    userId: 'user4',
    sessionId: 'session126',
    IP: '192.168.1.4',
  },
  {
    id: 5,
    status: 'error',
    method: 'DELETE',
    path: '/api/user',
    userId: 'user5',
    sessionId: 'session127',
    IP: '192.168.1.5',
  },
  {
    id: 6,
    status: 'success',
    method: 'POST',
    path: '/api/register',
    userId: 'user6',
    sessionId: 'session128',
    IP: '192.168.1.6',
  },
  {
    id: 7,
    status: 'success',
    method: 'GET',
    path: '/api/products',
    userId: 'user7',
    sessionId: 'session129',
    IP: '192.168.1.7',
  },
  {
    id: 8,
    status: 'error',
    method: 'PUT',
    path: '/api/user/123',
    userId: 'user8',
    sessionId: 'session130',
    IP: '192.168.1.8',
  },
  {
    id: 9,
    status: 'success',
    method: 'POST',
    path: '/api/checkout',
    userId: 'user9',
    sessionId: 'session131',
    IP: '192.168.1.9',
  },
  {
    id: 10,
    status: 'success',
    method: 'GET',
    path: '/api/dashboard',
    userId: 'user10',
    sessionId: 'session132',
    IP: '192.168.1.10',
  },
  {
    id: 11,
    status: 'error',
    method: 'POST',
    path: '/api/payment',
    userId: 'user11',
    sessionId: 'session133',
    IP: '192.168.1.11',
  },
  {
    id: 12,
    status: 'success',
    method: 'DELETE',
    path: '/api/cart',
    userId: 'user12',
    sessionId: 'session134',
    IP: '192.168.1.12',
  },
  {
    id: 13,
    status: 'success',
    method: 'GET',
    path: '/api/notifications',
    userId: 'user13',
    sessionId: 'session135',
    IP: '192.168.1.13',
  },
  {
    id: 14,
    status: 'error',
    method: 'POST',
    path: '/api/password-reset',
    userId: 'user14',
    sessionId: 'session136',
    IP: '192.168.1.14',
  },
  {
    id: 15,
    status: 'success',
    method: 'PUT',
    path: '/api/settings',
    userId: 'user15',
    sessionId: 'session137',
    IP: '192.168.1.15',
  },
  {
    id: 16,
    status: 'success',
    method: 'GET',
    path: '/api/reports',
    userId: 'user16',
    sessionId: 'session138',
    IP: '192.168.1.16',
  },
  {
    id: 17,
    status: 'error',
    method: 'DELETE',
    path: '/api/user/456',
    userId: 'user17',
    sessionId: 'session139',
    IP: '192.168.1.17',
  },
  {
    id: 18,
    status: 'success',
    method: 'POST',
    path: '/api/subscribe',
    userId: 'user18',
    sessionId: 'session140',
    IP: '192.168.1.18',
  },
  {
    id: 19,
    status: 'error',
    method: 'PUT',
    path: '/api/product/789',
    userId: 'user19',
    sessionId: 'session141',
    IP: '192.168.1.19',
  },
  {
    id: 20,
    status: 'success',
    method: 'GET',
    path: '/api/feedback',
    userId: 'user20',
    sessionId: 'session142',
    IP: '192.168.1.20',
  },
]

export function AuditLogsTable() {
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
      header: ({ column }) => {
        return <div>ID</div>
      },
      cell: ({ row }) => (
        <div className="lowercase text-center">{row.getValue('id')}</div>
      ),
    },
    {
      accessorKey: 'status',
      header: ({ column }) => {
        return <div>Status</div>
      },
      cell: ({ row }) => (
        <div className="capitalize text-center">{row.getValue('status')}</div>
      ),
    },
    {
      accessorKey: 'method',
      header: 'Method',
      cell: ({ row }) => (
        <div className="capitalize text-center">{row.getValue('method')}</div>
      ),
    },
    {
      accessorKey: 'path',
      header: ({ column }) => {
        return (
          <>Path</>
          // <Button
          //   variant="ghost"
          //   onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          // >
          //   API Keys
          //   <ArrowUpDown />
          // </Button>
        )
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('path')}</div>
      ),
    },
    {
      accessorKey: 'userId',
      header: ({ column }) => {
        return <div>User ID</div>
      },
      cell: ({ row }) => (
        <div className="capitalize text-center">{row.getValue('userId')}</div>
      ),
    },
    {
      accessorKey: 'sessionId',
      header: ({ column }) => {
        return <div>Session ID</div>
      },
      cell: ({ row }) => (
        <div className="capitalize text-center">
          {row.getValue('sessionId')}
        </div>
      ),
    },
    {
      accessorKey: 'IP',
      header: ({ column }) => {
        return <div>IP Address</div>
      },
      cell: ({ row }) => (
        <div className="capitalize text-center">{row.getValue('IP')}</div>
      ),
    },
    // {
    //   accessorKey: '',
    //   header: 'Actions',
    //   cell: ({ row }) => {
    //     const rowData = row.original // Get the entire row's data for actions
    //     return (
    //       <div className="flex items-center justify-center gap-2">
    //         <Button variant="outline" className="rounded-[50%]">
    //           <SquarePen />
    //         </Button>
    //         <Button variant="outline" className="rounded-[50%]">
    //           <Trash2Icon />
    //         </Button>
    //       </div>
    //       // <DropdownMenu>
    //       //   <DropdownMenuTrigger asChild>
    //       //     <Button variant="ghost" className="h-8 w-8 p-0">
    //       //       <span className="sr-only">Open menu</span>
    //       //       <MoreHorizontal />
    //       //     </Button>
    //       //   </DropdownMenuTrigger>
    //       //   <DropdownMenuContent align="end">
    //       //     <DropdownMenuItem
    //       //       className="cursor-pointer"
    //       //       onClick={() => navigator.clipboard.writeText(payment.id)}
    //       //     >
    //       //       Approve
    //       //     </DropdownMenuItem>
    //       //     <DropdownMenuItem
    //       //       className="cursor-pointer"
    //       //       onClick={() => navigator.clipboard.writeText(payment.id)}
    //       //     >
    //       //       Reject
    //       //     </DropdownMenuItem>
    //       //   </DropdownMenuContent>
    //       // </DropdownMenu>
    //     )
    //   },
    // },
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
        <CardTitle>Audit Logs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <div className="flex items-center py-4 justify-between ">
            <Input
              placeholder="Search by Name..."
              value={table.getColumn('product_name')?.getFilterValue() ?? ''}
              onChange={(event) =>
                table
                  .getColumn('product_name')
                  ?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    Column <ChevronDown />
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
              {/* <Link to="/inventory/create-inventory">
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
