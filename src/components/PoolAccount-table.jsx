import * as React from 'react'
import { Link } from 'react-router-dom'
//import axios from 'axios'
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
  Check,
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

import { Badge } from '@/components/ui/badge'
//import ApiConfig from '@/config/ApiConfig'

const fieldIconMap = {
  Active: {
    icon: <Badge className="bg-[#e4f5e9] text-[#16794c]">Active</Badge>,
    label: 'Successful transaction',
  },
  Inactive: {
    icon: <Badge className="bg-[#fff0f0] text-[#b52a2a]">Inactive</Badge>,
    label: 'Failed transaction',
  },
}

const data = [
  {
    product_id: '1',
    accountNumber: '53264738991022',
    bankName: 'Dummy Bank',
    bin: '98287',
    totalAmount: '569234432.23',
    status: 'Active',
    Active: true,
  },
  {
    product_id: '2',
    accountNumber: '42367853401234',
    bankName: 'Global Trust Bank',
    bin: '98279',
    totalAmount: '123456789.50',
    status: 'Active',
    Active: true,
  },
  {
    product_id: '3',
    accountNumber: '28763495023871',
    bankName: 'Techno Bank',
    bin: '98290',
    totalAmount: '87945632.75',
    status: 'Inactive',
    Inactive: true,
  },
  {
    product_id: '4',
    accountNumber: '94857629385016',
    bankName: 'Sunrise Financial',
    bin: '98301',
    totalAmount: '23456789.30',
    status: 'Active',
    Inactive: true,
  },
  {
    product_id: '5',
    accountNumber: '76834599023840',
    bankName: 'Prime Capital Bank',
    bin: '98288',
    totalAmount: '987654321.10',
    status: 'Active',
    Inactive: true,
  },
  {
    product_id: '6',
    accountNumber: '65873498126754',
    bankName: 'Standard Bank',
    bin: '98299',
    totalAmount: '52347645.55',
    status: 'Inactive',
    Inactive: true,
  },
  {
    product_id: '7',
    accountNumber: '34267192375631',
    bankName: 'Citywide Bank',
    bin: '98285',
    totalAmount: '102345678.90',
    status: 'Active',
    Inactive: true,
  },
  {
    product_id: '8',
    accountNumber: '84723659802142',
    bankName: 'BlueOcean Bank',
    bin: '98305',
    totalAmount: '39456780.40',
    status: 'Active',
    Active: true,
    Inactive: true,
  },
  {
    product_id: '9',
    accountNumber: '92737463501728',
    bankName: 'Innovative Financial Group',
    bin: '98291',
    totalAmount: '76543210.20',
    status: 'Active',
    Inactive: true,
  },
  {
    product_id: '10',
    accountNumber: '65839276293715',
    bankName: 'MetroBank',
    bin: '98302',
    totalAmount: '34567890.60',
    status: 'Inactive',
    Inactive: true,
  },
]
//const data=[];
export async function PoolAccountsTable () {
  //const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})
  //const data= await axios.get(ApiConfig.poolAccount);
  //console.log(data);
  const columns = [
    // {
    //   accessorKey: 'product_id',
    //   header: ({ column }) => {
    //     return (
    //       <Button
    //         variant="ghost"
    //         onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    //       >
    //         Sr No
    //         <ArrowUpDown />
    //       </Button>
    //     )
    //   },
    //   cell: ({ row }) => (
    //     <div className="capitalize text-center">
    //       {row.getValue('product_id')}
    //     </div>
    //   ),
    // },
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
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
      accessorKey: 'accountNumber',
      header: 'Account Number',
      cell: ({ row }) => (
        <div className="text-center cursor-pointer hover:underline">
          {row.getValue('accountNumber')}
        </div>
      ),
    },
    {
      accessorKey: 'bankName',
      header: 'Bank Name',
      cell: ({ row }) => (
        <div className="text-center cursor-pointer hover:underline">{row.getValue('bankName')}</div>
      ),
    },
    {
      accessorKey: 'bin',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            BIN
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('bin')}</div>
      ),
    },
    {
      accessorKey: 'totalAmount',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Amount
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => {
        const amount = Number(row.original.totalAmount); // Access the raw data directly
        // const type = row.original.Type // Access the Type from raw data
        // const colorClass = type === 'Credit' ? 'text-green-500' : 'text-red-500'
        const [whole, decimal] = amount.toFixed(2).split('.'); // Split the amount into whole and decimal parts
        return (
          <div className="text-center flex items-center justify-center">
            <span>₹{whole}</span>
            <span className="text-gray-500">.{decimal}</span>
          </div>
        );
      },
    },
    {
      header: `Status`,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2">
          {Object.keys(fieldIconMap).map((field) => {
            if (row.original[field]) {
              return (
                <span
                  key={field}
                  className={`flex items-center gap-1`}
                  title={fieldIconMap[field].label}
                >
                  {fieldIconMap[field].icon}
                </span>
              )
            }
            return null
          })}
        </div>
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
              <Button variant="ghost" className="h-8 w-8 p-0 ">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="cursor-pointer">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Block
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Activate
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
              placeholder="Search by Account Number..."
              value={
                columnFilters.find((filter) => filter.id === 'accountNumber')
                  ?.value ?? ''
              }
              onChange={(event) => {
                const value = event.target.value
                setColumnFilters([{ id: 'accountNumber', value }])
              }}
              className="max-w-sm"
            />
            <div className="flex items-center gap-2">
            
              <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    View <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter(
                      (column) =>
                        column.getCanHide() && // Check if the column can be hidden
                        column.columnDef.header // Ensure the column has a defined header
                    )
                    .map((column) => (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                      >
                        {typeof column.columnDef.header === 'string'
                          ? column.columnDef.header
                          : ''} {/* Render the header if it's a string */}
                      </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
              </div>
              {/* <Link to="/program/create-program">
                <Button variant="" className="ml-auto">
                  <CirclePlus /> Add new
                </Button>
              </Link> */}
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
          <div className="flex items-center justify-end py-4">
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
