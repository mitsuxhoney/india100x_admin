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
import { DataTablePagination } from '@/components/DataTablePagination'
import {
  ArrowUpDown,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  CirclePlus,
  MoreHorizontal,
  Check,
  Pencil,
  Trash2,
  CircleX,
  FileDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { saveAs } from 'file-saver'
import * as Papa from 'papaparse'
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

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
import DataTableToolbar from './DataTableToolbar'
import { status } from '../data/program-manager-data'
import DataTableViewOptions from './DataTableViewOptions'
const data = [
  {
    product_id: '1',
    id: '3u1reuv4',
    name: 'Jane Smith',
    totalAmount: '2342.23',
    programs: 2,
    activePrograms: 1,
    status: 'Active',
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
    status: 'Suspended',
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
    status: 'Active',
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
    status: 'Blocked',
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
    status: 'Blocked',
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
    status: 'Suspended',
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
    status: 'Active',
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
    status: 'Active',
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
    status: 'Active',
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
    status: 'Active',
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
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'name',
      header: 'Manager Name',
      cell: ({ row }) => {
        const id = row.original.product_id
        return (
          <Link to={`/program-managers/manager-details/${id}`}>
            <div className="capitalize text-center hover:underline">
              {row.getValue('name')}
            </div>
          </Link>
        )
      },
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
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Total Amount
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => {
        const amount = Number(row.original.totalAmount) // Access the raw data directly
        // const type = row.original.Type // Access the Type from raw data
        // const colorClass = type === 'Credit' ? 'text-green-500' : 'text-red-500'
        const [whole, decimal] = amount.toFixed(2).split('.') // Split the amount into whole and decimal parts
        return (
          <div className="text-center flex items-center justify-center">
            <span>₹{whole}</span>
            <span className="text-gray-500">.{decimal}</span>
          </div>
        )
      },
    },
    {
      accessorKey: 'totalCustomers',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Total Customers
            <ArrowUpDown />
          </Button>
        )
      },
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
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.original.status
        return (
          <div className="text-center">
            {status === 'Active' ? (
              <Badge className="bg-[#e4f5e9] text-[#16794c]">Active</Badge>
            ) : status === 'Suspended' ? (
              <Badge className="bg-[#fff7d3] text-[#ab6e05]">Suspended</Badge>
            ) : (
              <Badge className="bg-[#fff0f0] text-[#b52a2a]">Blocked</Badge>
            )}
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
  const downloadCSV = () => {
    // Convert table data to CSV
    const csv = Papa.unparse(data)
    // Create a Blob object for the CSV
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    // Use FileSaver to trigger a download
    saveAs(blob, 'table-data.csv')
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Program Manager List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <div className="w-full flex gap-2 justify-between max-md:flex-col max-md:gap-2 max-md:items-start max-md:w-[70%]">
            <div className="w-full">
              <DataTableToolbar
                table={table}
                inputFilter="card_ref_id"
                status={status}
              />
            </div>
            <div className="flex gap-2 items-center">
              <Button variant="outline" className="h-8" onClick={downloadCSV}>
                <FileDown />
              </Button>

              <DataTableViewOptions table={table} />
              <Link to="/program/create-program">
                <Button variant="" className="ml-auto h-8">
                  {' '}
                  <CirclePlus /> Add Manager
                </Button>
              </Link>
            </div>
          </div>
          <div className="rounded-md border mt-3">
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
          <DataTablePagination table={table} />
        </div>
      </CardContent>
    </Card>
  )
}
