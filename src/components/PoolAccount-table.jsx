import * as React from 'react'
import { Link } from 'react-router-dom'
import axios from '@/api/axios'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
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
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Binary,
  Cookie,
  FileDown,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { saveAs } from 'file-saver'
import * as Papa from 'papaparse'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import DataTableViewOptions from './DataTableViewOptions'
import DataTableToolbar from './DataTableToolbar'
//import ApiConfig from '@/config/ApiConfig'

//import Cookies from 'js-cookie'

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

// const data = [
//   {
//     product_id: '1',
//     accountNumber: '53264738991022',
//     bankName: 'Dummy Bank',
//     bin: '98287',
//     totalAmount: '569234432.23',
//     status: 'Active',
//   },
//   {
//     product_id: '2',
//     accountNumber: '42367853401234',
//     bankName: 'Global Trust Bank',
//     bin: '98279',
//     totalAmount: '123456789.50',
//     status: 'Active',
//   },
//   {
//     product_id: '3',
//     accountNumber: '28763495023871',
//     bankName: 'Techno Bank',
//     bin: '98290',
//     totalAmount: '87945632.75',
//     status: 'Inactive',
//   },
//   {
//     product_id: '4',
//     accountNumber: '94857629385016',
//     bankName: 'Sunrise Financial',
//     bin: '98301',
//     totalAmount: '23456789.30',
//     status: 'Active',
//   },
//   {
//     product_id: '5',
//     accountNumber: '76834599023840',
//     bankName: 'Prime Capital Bank',
//     bin: '98288',
//     totalAmount: '987654321.10',
//     status: 'Active',
//   },
//   {
//     product_id: '6',
//     accountNumber: '65873498126754',
//     bankName: 'Standard Bank',
//     bin: '98299',
//     totalAmount: '52347645.55',
//     status: 'Inactive',
//   },
//   {
//     product_id: '7',
//     accountNumber: '34267192375631',
//     bankName: 'Citywide Bank',
//     bin: '98285',
//     totalAmount: '102345678.90',
//     status: 'Active',
//   },
//   {
//     product_id: '8',
//     accountNumber: '84723659802142',
//     bankName: 'BlueOcean Bank',
//     bin: '98305',
//     totalAmount: '39456780.40',
//     status: 'Active',
//   },
//   {
//     product_id: '9',
//     accountNumber: '92737463501728',
//     bankName: 'Innovative Financial Group',
//     bin: '98291',
//     totalAmount: '76543210.20',
//     status: 'Active',
//   },
//   {
//     product_id: '10',
//     accountNumber: '65839276293715',
//     bankName: 'MetroBank',
//     bin: '98302',
//     totalAmount: '34567890.60',
//     status: 'Inactive',
//   },
// ]
//const data=[];
export function PoolAccountsTable() {
  //const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})
  //const data= await axios.get(ApiConfig.poolAccount);
  //console.log(data);
  const [data, setData] = React.useState([]) // State for table data
  const [loading, setLoading] = React.useState(true) // State for loading
  const [error, setError] = React.useState(null) // State for error handling

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        //const token=Cookies.get("auth_token");
        //console.log(token);
        //axios.default.withCredentials=true;
        const response = await axios.get('/wallet/get_balance', {
          withCredentials: true,
        }) // Replace with your API endpoint
        setData(response.data.data) // Assuming the response is an array of pool accounts
        console.log(response.data)
      } catch (err) {
        console.error('Error fetching data:', err)
        setError('Failed to fetch data. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, []) // Empty dependency array means it runs once on component mount
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
        <div className="text-center cursor-pointer hover:underline">
          {row.getValue('bankName')}
        </div>
      ),
    },
    {
      accessorKey: 'bin',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
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
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Amount
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
      header: `Status`,
      cell: ({ row }) => {
        const status = row.original.status
        return status === true ? (
          <Badge className="bg-[#e4f5e9] text-[#16794c]">Active</Badge>
        ) : (
          <Badge className="bg-[#fff0f0] text-[#b52a2a]">Inactive</Badge>
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
        <CardTitle>Pool Accounts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <div className="w-full flex gap-2 justify-between max-md:flex-col max-md:gap-2 max-md:items-start max-md:w-[70%]">
            <div className="w-full">
              <DataTableToolbar table={table} inputFilter="card_ref_id" />
            </div>
            <div className="flex gap-2 items-center">
              <Button variant="outline" className="h-8" onClick={downloadCSV}>
                <FileDown />
              </Button>

              <DataTableViewOptions table={table} />
              <Link to="/program/create-program">
                <Button variant="" className="ml-auto h-8">
                  {' '}
                  <CirclePlus /> Create Order
                </Button>
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-md border border-muted shadow-md mt-3">
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
          <DataTablePagination table={table} />
        </div>
      </CardContent>
    </Card>
  )
}
