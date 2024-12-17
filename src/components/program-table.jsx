import * as React from 'react'
import { Link } from 'react-router-dom'
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { CalendarDateRangePicker } from './CalendarDateRangePicker'
import DataTableToolbar from '@/components/DataTableToolbar'
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

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { DataTablePagination } from '@/components/DataTablePagination'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
import DataTableViewOptions from './DataTableViewOptions'

const fieldIconMap = {
  kycrequired: {
    icon: (
      <Badge className="bg-[#e4f5e9] text-[#16794c] cursor-pointer">KYC</Badge>
    ),
    label: 'KYC Required',
  },
  contactlessallowed: {
    icon: (
      <Badge className="bg-[#f9f0ff] text-[#6e399d]  cursor-pointer">
        Contactless
      </Badge>
    ),
    label: 'Contactless Allowed',
  },
  physicalallowed: {
    icon: (
      <Badge className="bg-[#F5FBFC] text-[#267A94]  cursor-pointer">
        Physical
      </Badge>
    ),
    label: 'Physical Not Allowed',
  },
  rewardapplicable: {
    icon: (
      <Badge className="bg-[#fff1e7] text-[#bd3e0c] cursor-pointer">
        Reward
      </Badge>
    ),
    label: 'Rewards Applicable',
  },
}

const data = [
  {
    product_id: '1',
    category: 'technology',
    name: 'OTT',
    program_manager: 'Alice Smith',
    kycrequired: true,
    contactlessallowed: true,
    physicalallowed: false,
    tags: 'kyc',
    limit: '30k-1Lakh',
    rewardapplicable: false,
    launchdate: '01-01-2021',
  },
  {
    product_id: '2',
    category: 'finance',
    name: 'Shopping',
    program_manager: 'Bob Johnson',
    kycrequired: false,
    contactlessallowed: true,
    physicalallowed: true,
    limit: '50k-5Lakh',
    rewardapplicable: true,
    launchdate: '02-06-2007',
  },
  {
    product_id: '3',
    category: 'healthcare',
    name: 'Beauty',
    program_manager: 'ONO',
    kycrequired: true,
    contactlessallowed: false,
    physicalallowed: true,
    limit: '25k-5Lakh',
    rewardapplicable: false,
    launchdate: '03-03-2024',
  },
  {
    product_id: '4',
    category: 'education',
    name: 'School',
    program_manager: 'David Wilson',
    kycrequired: false,
    contactlessallowed: false,
    physicalallowed: false,
    limit: '10k-10Lakh',
    rewardapplicable: true,
    launchdate: '04-02-2021',
  },
  {
    product_id: '5',
    category: 'government',
    name: 'TAX',
    program_manager: 'Emily Davis',
    kycrequired: true,
    contactlessallowed: true,
    physicalallowed: false,
    limit: '75k-10Lakh',
    rewardapplicable: true,
    launchdate: '05-02-2023',
  },
  {
    product_id: '6',
    category: 'politics',
    name: 'Campaign',
    program_manager: 'Michael Johnson',
    kycrequired: false,
    contactlessallowed: true,
    physicalallowed: false,
    limit: '50k-10Lakh',
    rewardapplicable: true,
    launchdate: '06-05-2021',
  },
  {
    product_id: '7',
    category: 'entertainment',
    name: 'Michael Johnson',
    program_manager: 'Sarah Doe',
    kycrequired: true,
    contactlessallowed: false,
    physicalallowed: true,
    limit: '15k-25Lakh',
    rewardapplicable: false,
    launchdate: '07-05-2021',
  },
]

const filters = [
  'Today',
  'Last 7 days',
  'Last 30 days',
  'Last 3 months',
  'Last 6 months',
]

export function ProgramTableDemo() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [selectedFilter, setSelectedFilter] = React.useState('Today')

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
      header: 'Name',
      cell: ({ row }) => {
        const id = row.original.product_id
        return (
          <Link to={`/programs/program/${id}`}>
            <div className="capitalize text-center cursor-pointer hover:underline">
              {row.getValue('name')}
            </div>
          </Link>
        )
      },
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => (
        <div className="capitalize text-center">{row.getValue('category')}</div>
      ),
    },
    {
      accessorKey: 'program_manager',
      header: 'Manager',
      cell: ({ row }) => (
        <div className="text-center cursor-pointer hover:underline">
          {row.getValue('program_manager')}
        </div>
      ),
    },

    {
      accessorKey: 'limit',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Limit
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('limit')}</div>
      ),
    },

    {
      accessorKey: 'launchdate',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Launch Date
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('launchdate')}</div>
      ),
    },
    {
      accessorKey: 'tags',
      header: 'Tags',
      cell: ({ row }) => (
        <div className="flex items-center justify-left gap-2">
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
                Edit
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
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    initialState: {
      pagination: {
        pageSize: 5, // Set page size to 5
      },
    },
  })
  // const table = useReactTable({
  //   data,
  //   columns,
  //   onSortingChange: setSorting,
  //   onColumnFiltersChange: setColumnFilters,
  //   getCoreRowModel: getCoreRowModel(),
  //   getPaginationRowModel: getPaginationRowModel(),
  //   getSortedRowModel: getSortedRowModel(),
  //   getFilteredRowModel: getFilteredRowModel(),
  //   onColumnVisibilityChange: setColumnVisibility,
  //   onRowSelectionChange: setRowSelection,
  //   state: {
  //     sorting,
  //     columnFilters,
  //     columnVisibility,
  //     rowSelection,
  //   },
  //   initialState: {
  //     pagination: {
  //       pageSize: 5, // Set page size to 5
  //     },
  //   },
  // })

  const openDialog = (rowData) => {
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
    // Clear any row data when canceled
  }
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter)
    // Apply your filtering logic here based on `filter`
    console.log(`Filter applied: ${filter}`)
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
        <CardTitle>Programs List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex gap-2 justify-between max-md:flex-col max-md:gap-2 max-md:items-start max-md:w-[70%]">
            <div className="w-full">
              <DataTableToolbar table={table} inputFilter="card_ref_id" />
            </div>
            <div className="flex gap-2 items-center">
              <Button variant="outline" className="h-8" onClick={downloadCSV}>
                <FileDown />
              </Button>

              <DataTableViewOptions table={table} />
              <Link to="/programs/create-program">
                <Button variant="" className="ml-auto h-8">
                  {' '}
                  <CirclePlus /> Create Program
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
          <DataTablePagination table={table} />
        </div>
      </CardContent>
    </Card>
  )
}
