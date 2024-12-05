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
      FirstName: 'John',
      LastName: 'Doe',
      MobileNumber: 8668303214,
      Email: 'johndoe@gmail.com',
      ProgramManager: 'Privacy Card',
      LastActive: '2023-12-01',
    },
    {
      FirstName: 'Jane',
      LastName: 'Smith',
      MobileNumber: 9876543210,
      Email: 'janesmith@gmail.com',
      ProgramManager: 'Tech Card',
      LastActive: '2023-11-15',
    },
    {
      FirstName: 'Bob',
      LastName: 'Johnson',
      MobileNumber: 8654321098,
      Email: 'bobjohnson@gmail.com',
      ProgramManager: 'Finance Card',
      LastActive: '2023-10-29',
    },
    {
      FirstName: 'Alice',
      LastName: 'Williams',
      MobileNumber: 8765432109,
      Email: 'alicewilliams@gmail.com',
      ProgramManager: 'Health Card',
      LastActive: '2023-09-19',
    },
    {
      FirstName: 'Charlie',
      LastName: 'Brown',
      MobileNumber: 9123456789,
      Email: 'charliebrown@gmail.com',
      ProgramManager: 'Marketing Card',
      LastActive: '2023-08-25',
    },
    {
      FirstName: 'David',
      LastName: 'Miller',
      MobileNumber: 9234567890,
      Email: 'davidmiller@gmail.com',
      ProgramManager: 'Education Card',
      LastActive: '2023-07-30',
    },
    {
      FirstName: 'Eve',
      LastName: 'Davis',
      MobileNumber: 9345678901,
      Email: 'evedavis@gmail.com',
      ProgramManager: 'Innovation Card',
      LastActive: '2023-06-22',
    },
    {
      FirstName: 'Frank',
      LastName: 'Martinez',
      MobileNumber: 9456789012,
      Email: 'frankmartinez@gmail.com',
      ProgramManager: 'Growth Card',
      LastActive: '2023-05-18',
    },
    {
      FirstName: 'Grace',
      LastName: 'Hernandez',
      MobileNumber: 9567890123,
      Email: 'gracehernandez@gmail.com',
      ProgramManager: 'Strategy Card',
      LastActive: '2023-04-12',
    },
    {
      FirstName: 'Hank',
      LastName: 'Lopez',
      MobileNumber: 9678901234,
      Email: 'hanklopez@gmail.com',
      ProgramManager: 'Operations Card',
      LastActive: '2023-03-09',
    },
    {
      FirstName: 'Ivy',
      LastName: 'Gonzalez',
      MobileNumber: 9789012345,
      Email: 'ivygonzalez@gmail.com',
      ProgramManager: 'Design Card',
      LastActive: '2023-02-14',
    },
    {
      FirstName: 'Jack',
      LastName: 'Perez',
      MobileNumber: 9890123456,
      Email: 'jackperez@gmail.com',
      ProgramManager: 'Technology Card',
      LastActive: '2023-01-20',
    },
    {
      FirstName: 'Kathy',
      LastName: 'Wilson',
      MobileNumber: 9901234567,
      Email: 'kathywilson@gmail.com',
      ProgramManager: 'Analytics Card',
      LastActive: '2022-12-15',
    },
    {
      FirstName: 'Leo',
      LastName: 'Anderson',
      MobileNumber: 9012345678,
      Email: 'leoanderson@gmail.com',
      ProgramManager: 'Support Card',
      LastActive: '2022-11-10',
    },
    {
      FirstName: 'Mona',
      LastName: 'Thomas',
      MobileNumber: 9123456789,
      Email: 'monathomas@gmail.com',
      ProgramManager: 'Sales Card',
      LastActive: '2022-10-05',
    },
  ]
  

export function FlaggedCustomerTable() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})

  const columns = [
    {
      accessorKey: 'FirstName',
      header: 'First Name',
      cell: ({ row }) => <div className="capitalize text-center">{row.getValue('FirstName')}</div>,
    },
    {
      accessorKey: 'LastName',
      header: 'Last Name',
      cell: ({ row }) => <div className="capitalize text-center">{row.getValue('LastName')}</div>,
    },
    {
      accessorKey: 'MobileNumber',
      header: 'Mobile Number',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('MobileNumber')}</div>
      ),
    },
    {
      accessorKey: 'Email',
      header: 'Email',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('Email')}</div>
      ),
    },
    {
      accessorKey: 'ProgramManager',
      header: 'Program Manager',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('ProgramManager')}</div>
      ),
    },
    {
      accessorKey: 'LastActive',
      header: 'Last Active',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('LastActive')}</div>
      ),
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const rowData = row.original // Get the entire row's data for actions
        return (
          <div className="flex space-x-2 justify-center">
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
                    Are you sure you want to delete? This action cannot be undone.
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
        <CardTitle>Flagged Customer List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <div className="flex items-center py-4 justify-between ">
            <Input
              placeholder="Search Name..."
              value={table.getColumn('FirstName')?.getFilterValue() ?? ''}
              onChange={(event) =>
                table.getColumn('FirstName')?.setFilterValue(event.target.value)
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
