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

const data =[
  {
    "Name": "John Doe",
    "ProgramManager": "Privacy Card",
    "totalCards": "4",
    "totalTransactions": "120",
    "createdBy": "Admin",
    "lastActive": "2023-12-01"
  },
  {
    "Name": "Jane Smith",
    "ProgramManager": "Business Card",
    "totalCards": "2",
    "totalTransactions": "85",
    "createdBy": "Manager1",
    "lastActive": "2023-11-28"
  },
  {
    "Name": "Robert Brown",
    "ProgramManager": "Travel Card",
    "totalCards": "3",
    "totalTransactions": "140",
    "createdBy": "SupervisorX",
    "lastActive": "2023-11-30"
  },
  {
    "Name": "Emily Davis",
    "ProgramManager": "Gift Card",
    "totalCards": "1",
    "totalTransactions": "15",
    "createdBy": "Admin",
    "lastActive": "2023-12-03"
  },
  {
    "Name": "Michael Wilson",
    "ProgramManager": "Virtual Card",
    "totalCards": "5",
    "totalTransactions": "200",
    "createdBy": "AdminAssistant",
    "lastActive": "2023-11-25"
  },
  {
    "Name": "Olivia Johnson",
    "ProgramManager": "Platinum Card",
    "totalCards": "2",
    "totalTransactions": "95",
    "createdBy": "Manager3",
    "lastActive": "2023-12-02"
  },
  {
    "Name": "James White",
    "ProgramManager": "Student Card",
    "totalCards": "1",
    "totalTransactions": "45",
    "createdBy": "SupervisorY",
    "lastActive": "2023-11-27"
  },
  {
    "Name": "Sophia Martinez",
    "ProgramManager": "Savings Card",
    "totalCards": "3",
    "totalTransactions": "130",
    "createdBy": "Admin",
    "lastActive": "2023-11-29"
  },
  {
    "Name": "Ethan Taylor",
    "ProgramManager": "Cashback Card",
    "totalCards": "2",
    "totalTransactions": "70",
    "createdBy": "Manager2",
    "lastActive": "2023-11-30"
  },
  {
    "Name": "Isabella Hernandez",
    "ProgramManager": "Corporate Card",
    "totalCards": "6",
    "totalTransactions": "300",
    "createdBy": "SupervisorZ",
    "lastActive": "2023-12-04"
  },
  {
    "Name": "Liam Garcia",
    "ProgramManager": "Premium Card",
    "totalCards": "4",
    "totalTransactions": "190",
    "createdBy": "Admin",
    "lastActive": "2023-12-01"
  }
]
 

export function AllCustomerTable() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})

  const columns = [
    {
      accessorKey: 'Name',
      header: 'Name',
      cell: ({ row }) => <div className="capitalize text-center">{row.getValue('Name')}</div>,
    },
    {
      accessorKey: 'ProgramManager',
      header: 'Program Manager',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('ProgramManager')}</div>
      ),
    },
    {
      accessorKey: 'totalCards',
      header: 'Total Cards',
      cell: ({ row }) => (
        <div className="text-center">{(row.getValue('totalCards')? row.getValue('totalCards') : "0")}</div>
      ),
    },
    {
      accessorKey: 'totalTransactions',
      header: 'Total Transactions',
      cell: ({ row }) => (
        <div className="text-center">{(row.getValue('totalTransactions')? row.getValue('totalTransactions') : "0")}</div>
      ),
    },
    {
      accessorKey: 'createdBy',
      header: 'Created By',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('createdBy')}</div>
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
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Delete
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
                        <TableCell className='text-center' key={cell.id}>
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
