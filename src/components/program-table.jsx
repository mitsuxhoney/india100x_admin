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
import { CalendarDateRangePicker } from './CalendarDateRangePicker'
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
    programmanager: 'Alice Smith',
    kycrequired: true,
    contactlessallowed: true,
    physicalallowed: false,
    limit: '30k-1Lakh',
    rewardapplicable: false,
    launchdate: '01-01-2021',
  },
  {
    product_id: '2',
    category: 'finance',
    name: 'Shopping',
    programmanager: 'Bob Johnson',
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
    programmanager: 'ONO',
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
    programmanager: 'David Wilson',
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
    programmanager: 'Emily Davis',
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
    programmanager: 'Michael Johnson',
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
    programmanager: 'Sarah Doe',
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
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) =>( 
        <div className="capitalize text-center cursor-pointer hover:underline">
          {row.getValue('name')}
        </div>
      ),
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => (
        <div className="capitalize text-center">{row.getValue('category')}</div>
      ),
    },
    {
      accessorKey: 'programmanager',
      header: 'Manager',
      cell: ({ row }) => (
        <div className="text-center cursor-pointer hover:underline">
          {row.getValue('programmanager')}
        </div>
      ),
    },

    {
      accessorKey: 'limit',
      header: 'Limit',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('limit')}</div>
      ),
    },

    {
      header: 'Tags',
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
      accessorKey: 'launchdate',
      header: 'Launch Date',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('launchdate')}</div>
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
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter)
    // Apply your filtering logic here based on `filter`
    console.log(`Filter applied: ${filter}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Programs List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <div className="flex items-center py-4 justify-between max-lg:flex max-lg:flex-col max-lg:gap-4 max-lg:items-end max-sm:flex max-sm:flex-col max-sm:gap-4 max-sm:items-start">
            <div className="max-lg:w-full">
              <Input
                placeholder="Search by Name..."
                value={table.getColumn('name')?.getFilterValue() ?? ''}
                onChange={(event) =>
                  table.getColumn('name')?.setFilterValue(event.target.value)
                }
                className="max-w-xs"
              />
            </div>
            <div className="flex items-center gap-2 max-sm:flex max-sm:flex-col max-sm:gap-4 max-sm:items-start">
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                      {selectedFilter} <ChevronDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {filters
                      .filter((filter) => filter !== selectedFilter)
                      .map((filter) => (
                        <DropdownMenuCheckboxItem
                          key={filter}
                          onClick={() => handleFilterChange(filter)}
                        >
                          {filter}
                        </DropdownMenuCheckboxItem>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div>
                <DropdownMenu className="max-sm:w-full">
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                      Sort By <ChevronDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {table
                      .getAllColumns()
                      .filter((column) => {
                        const rows = table.getCoreRowModel().rows // Access rows of the table
                        const sampleValue = rows[0]?.getValue(column.id) // Get a sample value for this column
                        const valueType = typeof sampleValue

                        // Check if the column contains integer or float data
                        return (
                          column.columnDef.header &&
                          (valueType === 'number' ||
                            !isNaN(parseFloat(sampleValue)))
                        )
                      })
                      .map((column) => {
                        const currentSorting = table.getState().sorting
                        const isCurrentlySorted =
                          currentSorting.length > 0 &&
                          currentSorting[0].id === column.id

                        return (
                          <DropdownMenuItem
                            key={column.id}
                            className="capitalize"
                            onSelect={() => {
                              if (isCurrentlySorted) {
                                // If already sorted by this column, reset sorting
                                table.setSorting([])
                              } else {
                                // Otherwise, sort by this column in ascending order
                                table.setSorting([
                                  { id: column.id, desc: true },
                                ])
                              }
                            }}
                          >
                            <span className="flex items-center gap-2">
                              {isCurrentlySorted && <Check className="" />}
                              {typeof column.columnDef.header === 'string'
                                ? column.columnDef.header
                                : ''}
                            </span>

                            {/* Display a checkmark if this column is currently sorted */}
                          </DropdownMenuItem>
                        )
                      })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                      Column <ChevronDown />
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
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {typeof column.columnDef.header === 'string'
                            ? column.columnDef.header
                            : ''}{' '}
                          {/* Render the header if it's a string */}
                        </DropdownMenuCheckboxItem>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Link to="/programs/create-program">
                <Button variant="" className="ml-auto">
                  {' '}
                  <CirclePlus /> Add Program
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
                        <TableCell key={cell.id} >
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
