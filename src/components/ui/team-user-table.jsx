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
import { Badge } from '@/components/ui/badge'

import {
  ArrowUpDown,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  MoreHorizontal,
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
    user_id: 'U001',
    email:'tinkal@gmail.com',
    name: 'Alice Johnson',
    role: 'Administrator',
    is_active: true,
  },
  {
    "name": "Sophia Green",
    "ipaddress": "192.168.23.2",
    "role": "Editor",
    "created_at": "07-05-2024 15:40:00",
    "updated_at": "02-10-2024 17:30:00",
    "is_active": true
  },
  {
    "name": "Liam Brown",
    "ipaddress": "192.168.23.3",
    "role": "Admin",
    "created_at": "10-06-2024 12:15:00",
    "updated_at": "05-10-2024 16:00:00",
    "is_active": true
  },
  {
    "name": "Olivia Smith",
    "ipaddress": "192.168.23.4",
    "role": "Viewer",
    "created_at": "12-07-2024 18:25:00",
    "updated_at": "08-10-2024 20:10:00",
    "is_active": false
  },
  {
    "name": "James Johnson",
    "ipaddress": "192.168.23.5",
    "role": "Editor",
    "created_at": "15-08-2024 14:50:00",
    "updated_at": "09-10-2024 19:15:00",
    "is_active": true
  },
  {
    "name": "Ava Wilson",
    "ipaddress": "192.168.23.6",
    "role": "Viewer",
    "created_at": "16-08-2024 09:35:00",
    "updated_at": "11-10-2024 13:25:00",
    "is_active": false
  },
  {
    "name": "Mason Davis",
    "ipaddress": "192.168.23.7",
    "role": "Admin",
    "created_at": "18-09-2024 08:10:00",
    "updated_at": "13-10-2024 11:40:00",
    "is_active": true
  },
  {
    "name": "Charlotte Martinez",
    "ipaddress": "192.168.23.8",
    "role": "Editor",
    "created_at": "20-09-2024 16:20:00",
    "updated_at": "15-10-2024 14:50:00",
    "is_active": true
  },
  {
    "name": "Amelia Taylor",
    "ipaddress": "192.168.23.9",
    "role": "Viewer",
    "created_at": "23-09-2024 13:05:00",
    "updated_at": "17-10-2024 15:10:00",
    "is_active": false
  },
  {
    "name": "Ethan Lee",
    "ipaddress": "192.168.23.10",
    "role": "Admin",
    "created_at": "25-09-2024 19:30:00",
    "updated_at": "19-10-2024 10:55:00",
    "is_active": true
  }
]


export function TeamUsersTable() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})

  const columns = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <div>
            <div>{row.getValue('name')}
            </div>
            <p className='text-gray-500'>
                {row.original.email}
            </p>
        </div>
      ),
    },
    {
      accessorKey: 'role',
      header: ({ column }) => {
        return <Button variant="ghost">Role</Button>
      },
      cell: ({ row }) => (
        <div className="capitalize pl-4">{row.getValue('role')}</div>
      ),
    },
    {
      accessorKey: 'ipaddress',
      header: 'IP Address',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('ipaddress')}</div>
      ),
    },
    
    {
      accessorKey: 'is_active',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status')

        switch (status) {
          case 'is_active':
            return <Badge className="bg-[#e4f5e9] text-[#16794c]">Active</Badge>
          case 'pending':
            return (
              <Badge className="bg-[#fff7d3] text-[#ab6e05]">Pending</Badge>
            )
          case 'under review':
            return (
              <Badge className="bg-[#e3f2fd] text-[#1976d2]">
                Under Review
              </Badge>
            )
          case 'rejected':
            return (
              <Badge className="bg-[#ffe6e6] text-[#d32f2f]">Rejected</Badge>
            )
          case 'incomplete':
            return (
              <Badge className="bg-[#fce4ec] text-[#c2185b]">Incomplete</Badge>
            )
        }
      },
    },
    {
      accessorKey: 'created_at',
      header: 'Created On',
      cell: ({ row }) => {
        const date = row.getValue('created_at').split(' ')[0]
        const time = row.getValue('created_at').split(' ')[1]

        return (
          <div className="flex flex-col items-center text-center">
            <span>{date}</span>
            <span className="text-slate-400">{time}</span>
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
      <CardContent>
        <div className="w-full">
          <div className="flex items-center py-4 justify-between ">
            <Input
              placeholder="Search by user id..."
              value={table.getColumn('user_id')?.getFilterValue() ?? ''}
              onChange={(event) =>
                table.getColumn('user_id')?.setFilterValue(event.target.value)
              }
              className="max-w-xs"
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
