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
  Binary,
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
    product_id: '1',
    accountNumber: '53264738991022',
    bankName: 'Dummy Bank',
    bin: '98287',
    totalAmount: '569234432.23',
    status: 'Active',
  },
  {
    product_id: '2',
    accountNumber: '42367853401234',
    bankName: 'Global Trust Bank',
    bin: '98279',
    totalAmount: '123456789.50',
    status: 'Active',
  },
  {
    product_id: '3',
    accountNumber: '28763495023871',
    bankName: 'Techno Bank',
    bin: '98290',
    totalAmount: '87945632.75',
    status: 'Inactive',
  },
  {
    product_id: '4',
    accountNumber: '94857629385016',
    bankName: 'Sunrise Financial',
    bin: '98301',
    totalAmount: '23456789.30',
    status: 'Active',
  },
  {
    product_id: '5',
    accountNumber: '76834599023840',
    bankName: 'Prime Capital Bank',
    bin: '98288',
    totalAmount: '987654321.10',
    status: 'Active',
  },
  {
    product_id: '6',
    accountNumber: '65873498126754',
    bankName: 'Standard Bank',
    bin: '98299',
    totalAmount: '52347645.55',
    status: 'Inactive',
  },
  {
    product_id: '7',
    accountNumber: '34267192375631',
    bankName: 'Citywide Bank',
    bin: '98285',
    totalAmount: '102345678.90',
    status: 'Active',
  },
  {
    product_id: '8',
    accountNumber: '84723659802142',
    bankName: 'BlueOcean Bank',
    bin: '98305',
    totalAmount: '39456780.40',
    status: 'Active',
  },
  {
    product_id: '9',
    accountNumber: '92737463501728',
    bankName: 'Innovative Financial Group',
    bin: '98291',
    totalAmount: '76543210.20',
    status: 'Active',
  },
  {
    product_id: '10',
    accountNumber: '65839276293715',
    bankName: 'MetroBank',
    bin: '98302',
    totalAmount: '34567890.60',
    status: 'Inactive',
  },
]

export function PoolAccountsTable() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})

  const columns = [
    {
      accessorKey: 'product_id',
      header: 'ID',
      cell: ({ row }) => (
        <div className="capitalize text-center">
          {row.getValue('product_id')}
        </div>
      ),
    },
    {
      accessorKey: 'accountNumber',
      header: 'Account Number',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('accountNumber')}</div>
      ),
    },
    {
      accessorKey: 'bankName',
      header: 'Bank Name',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('bankName')}</div>
      ),
    },
    {
      accessorKey: 'bin',
      header: 'BIN',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('bin')}</div>
      ),
    },

    {
      accessorKey: 'totalAmount',
      header: 'Total Amount',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('totalAmount')}</div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('status')}</div>
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
        <CardTitle>Pool Accounts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <div className="flex items-center py-4 justify-between ">
            <Input
              placeholder="Search Pool Accounts..."
              value={
                columnFilters.find((filter) => filter.id === 'TotalAmount')
                  ?.value ?? ''
              }
              onChange={(event) => {
                const value = event.target.value
                setColumnFilters([{ id: 'TotalAmount', value }])
              }}
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
          <div className="overflow-hidden rounded-md border border-muted shadow-md">
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
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell className="text-center" key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between py-4">
            <div className="text-sm text-muted">
              Page {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </div>
            <div className="flex items-center space-x-2">
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
