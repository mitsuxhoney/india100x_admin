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
import { number } from 'zod'

import { Badge } from '@/components/ui/badge'

const data = [
  {
    status: 'active',
    name: 'Service1',
    key_type: 'Bearer',
    api_key: '1234abcd5678efgh',
  },
  {
    status: 'inactive',
    name: 'Service2',
    key_type: 'Basic',
    api_key: 'abcd1234efgh5678',
  },
  {
    status: 'active',
    name: 'Service3',
    key_type: 'OAuth',
    api_key: 'wxyz1234abcd5678',
  },
  {
    status: 'expired',
    name: 'Service4',
    key_type: 'Bearer',
    api_key: 'ijkl5678mnop1234',
  },
  {
    status: 'active',
    name: 'Service5',
    key_type: 'API Key',
    api_key: 'abcd5678xyz1234',
  },
  {
    status: 'inactive',
    name: 'Service6',
    key_type: 'OAuth',
    api_key: 'mnop1234ijkl5678',
  },
  {
    status: 'active',
    name: 'Service7',
    key_type: 'Basic',
    api_key: 'efgh5678abcd1234',
  },
  {
    status: 'expired',
    name: 'Service8',
    key_type: 'Bearer',
    api_key: 'qrst1234uvwx5678',
  },
  {
    status: 'active',
    name: 'Service9',
    key_type: 'OAuth',
    api_key: 'abcd5678ijkl1234',
  },
  {
    status: 'inactive',
    name: 'Service10',
    key_type: 'API Key',
    api_key: 'xyz1234mnop5678',
  },
  {
    status: 'expired',
    name: 'Service11',
    key_type: 'Bearer',
    api_key: 'ijkl1234qrst5678',
  },
  {
    status: 'active',
    name: 'Service12',
    key_type: 'OAuth',
    api_key: 'mnop5678abcd1234',
  },
  {
    status: 'inactive',
    name: 'Service13',
    key_type: 'Basic',
    api_key: 'efgh1234wxyz5678',
  },
  {
    status: 'active',
    name: 'Service14',
    key_type: 'API Key',
    api_key: 'ijkl5678abcd1234',
  },
  {
    status: 'expired',
    name: 'Service15',
    key_type: 'Bearer',
    api_key: 'mnop1234abcd5678',
  },
  {
    status: 'active',
    name: 'Service16',
    key_type: 'OAuth',
    api_key: 'qrst5678efgh1234',
  },
  {
    status: 'inactive',
    name: 'Service17',
    key_type: 'API Key',
    api_key: 'abcd1234mnop5678',
  },
  {
    status: 'expired',
    name: 'Service18',
    key_type: 'Bearer',
    api_key: 'wxyz5678abcd1234',
  },
  {
    status: 'active',
    name: 'Service19',
    key_type: 'OAuth',
    api_key: 'ijkl5678mnop1234',
  },
  {
    status: 'inactive',
    name: 'Service20',
    key_type: 'Basic',
    api_key: 'efgh5678qrst1234',
  },
]

export function ApiKeysTable() {
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
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status');
        if (status === 'active') {
          return (
            <Badge className="bg-[#e4f5e9] text-[#16794c]">Active</Badge>
          );
        } else if (status === 'inactive') {
          return (
            <Badge className="bg-[#f0f0f0] text-[#6c757d]">Inactive</Badge>
          );
        } else if (status === 'expired') {
          return (
            <Badge className="bg-[#fff0f0] text-[#b52a2a]">Expired</Badge>
          );
        }
      },
    },
    
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return <div>Name</div>
      },
      cell: ({ row }) => (
        <div className="capitalize text-center">{row.getValue('name')}</div>
      ),
    },
    {
      accessorKey: 'key_type',
      header: 'Key Type',
      cell: ({ row }) => (
        <div className="capitalize text-center">{row.getValue('key_type')}</div>
      ),
    },
    {
      accessorKey: 'api_key',
      header: ({ column }) => {
        return (
          <>API Keys</>
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
        <div className="capitalize">{row.getValue('api_key')}</div>
      ),
    },

    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const rowData = row.original // Get the entire row's data for actions
        return (
          <div className="flex items-center justify-center gap-2">
            <Button variant="outline" className="rounded-[50%]">
              <SquarePen />
            </Button>
            <Button variant="outline" className="rounded-[50%]">
              <Trash2Icon />
            </Button>
          </div>
          // <DropdownMenu>
          //   <DropdownMenuTrigger asChild>
          //     <Button variant="ghost" className="h-8 w-8 p-0">
          //       <span className="sr-only">Open menu</span>
          //       <MoreHorizontal />
          //     </Button>
          //   </DropdownMenuTrigger>
          //   <DropdownMenuContent align="end">
          //     <DropdownMenuItem
          //       className="cursor-pointer"
          //       onClick={() => navigator.clipboard.writeText(payment.id)}
          //     >
          //       Approve
          //     </DropdownMenuItem>
          //     <DropdownMenuItem
          //       className="cursor-pointer"
          //       onClick={() => navigator.clipboard.writeText(payment.id)}
          //     >
          //       Reject
          //     </DropdownMenuItem>
          //   </DropdownMenuContent>
          // </DropdownMenu>
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
        <CardTitle>API Keys </CardTitle>
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
