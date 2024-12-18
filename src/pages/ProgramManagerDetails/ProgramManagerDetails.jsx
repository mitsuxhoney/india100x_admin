import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import * as React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Link } from 'react-router-dom'
import { saveAs } from 'file-saver'
import * as Papa from 'papaparse'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

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
  Layers,
  CreditCard,
  Users,
  Activity,
  DollarSign,
  Grid,
  User,
  IndianRupee,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import OnoLogo from '@/assets/ono-logo.png'
import { Separator } from '@/components/ui/separator'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import DataTableViewOptions from '../../components/DataTableViewOptions'
import DataTableToolbar from '../../components/DataTableToolbar'
import { status } from '@/data/program-manager-data'

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

const ProgramManagerDetails = () => {
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
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
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
    // {
    //   accessorKey: 'tags',
    //   header: 'Tags',
    //   cell: ({ row }) => (
    //     <div className="flex items-center justify-left gap-2">
    //       {Object.keys(fieldIconMap).map((field) => {
    //         if (row.original[field]) {
    //           return (
    //             <span
    //               key={field}
    //               className={`flex items-center gap-1`}
    //               title={fieldIconMap[field].label}
    //             >
    //               {fieldIconMap[field].icon}
    //             </span>
    //           )
    //         }
    //         return null
    //       })}
    //     </div>
    //   ),
    // },
    // {
    //   accessorKey: 'actions',
    //   header: '',
    //   cell: ({ row }) => {
    //     const rowData = row.original // Get the entire row's data for actions
    //     return (
    //       <DropdownMenu>
    //         <DropdownMenuTrigger asChild>
    //           <Button variant="ghost" className="h-8 w-8 p-0">
    //             <span className="sr-only">Open menu</span>
    //             <MoreHorizontal />
    //           </Button>
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent align="end">
    //           <DropdownMenuItem
    //             className="cursor-pointer"
    //             onClick={() => navigator.clipboard.writeText(payment.id)}
    //           >
    //             Edit
    //           </DropdownMenuItem>
    //           <DropdownMenuItem
    //             className="cursor-pointer"
    //             onClick={() => navigator.clipboard.writeText(payment.id)}
    //           >
    //             Block
    //           </DropdownMenuItem>
    //         </DropdownMenuContent>
    //       </DropdownMenu>
    //     )
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
  const downloadCSV = () => {
    // Convert table data to CSV
    const csv = Papa.unparse(data)
    // Create a Blob object for the CSV
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    // Use FileSaver to trigger a download
    saveAs(blob, 'table-data.csv')
  }

  const invoices = [
    {
      invoice: 'Tags',
      paymentStatus: 'KYC',
      totalAmount: 'Physical',
      paymentMethod: 'Add On Card',
    },
    {
      invoice: 'Physical Card',
      paymentStatus: 'Available',
    },
    {
      invoice: 'Tags',
      paymentStatus: 'KYC',
      totalAmount: 'Physical',
      paymentMethod: 'Add On Card',
    },
    {
      invoice: 'Tags',
      paymentStatus: 'KYC',
      totalAmount: 'Physical',
      paymentMethod: 'Add On Card',
    },
  ]

  const cardsData = [
    {
      title: '3',
      description: 'Programs Manager',
      icon: <Layers className="h-5 w-5 text-muted-foreground" />,
    },
    {
      title: '213',
      description: 'Cards',
      icon: <CreditCard className="h-5 w-5 text-muted-foreground" />,
    },
    {
      title: '215',
      description: 'Customers',
      icon: <Users className="h-5 w-5 text-muted-foreground" />,
    },
    {
      title: '3000',
      description: 'Transactions',
      icon: <Activity className="h-5 w-5 text-muted-foreground" />,
    },
    // {
    //   title: '3000',
    //   description: 'Transactions',
    //   icon: <Activity className="h-5 w-5 text-muted-foreground" />,
    // },
  ]
  return (
    <div className="relative w-full flex flex-col md:flex-row gap-2">
      <div className="w-full ">
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex gap-2 items-center">
                <div>
                  <Avatar>
                    <AvatarImage src={OnoLogo} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <div>ONO</div>
              </div>
            </CardTitle>
            <CardDescription>
              <div className="mt-2 flex  gap-4">
                <div>
                  <h2>
                    Status :{' '}
                    <span className="font-semibold">
                      <Badge variant="primary">Active</Badge>
                    </span>
                  </h2>
                </div>
                <div className="">
                  <h2 className="">
                    Category :{' '}
                    <span className="font-semibold">Entertainment</span>
                  </h2>
                </div>
                <div>
                  <h2>
                    Manager : <span className="font-semibold">ONO</span>
                  </h2>
                </div>
                <div>
                  <h2>
                    Launch Date :{' '}
                    <span className="font-semibold">14/12/2024</span>
                  </h2>
                </div>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Customers
                    </CardTitle>
                    <Users strokeWidth={1.5} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">200</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Amount
                    </CardTitle>
                    <IndianRupee strokeWidth={1.5} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">&#8377;5000</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Programs
                    </CardTitle>
                    <Activity strokeWidth={1.5} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">34</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Programs
                    </CardTitle>
                    <Grid strokeWidth={1.5} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">50</div>
                  </CardContent>
                </Card>
              </div>
              {/* <div className="flex flex-col gap-2">
                <h2 className="text-md font-medium">Description :</h2>
                <p className="text-sm font-normal text-muted-foreground">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatum, sunt? Modi sint labore quod accusamus dolorem
                  expedita fugit, alias optio culpa obcaecati fugiat eum.
                  Corporis atque enim totam veniam porro. Temporibus, a quam
                  quibusdam eligendi porro blanditiis. Iste suscipit
                  necessitatibus libero, quo sapiente provident perspiciatis
                  pariatur aspernatur sequi nesciunt assumenda architecto
                  repellat consequuntur laudantium natus quisquam porro nisi
                  voluptatem blanditiis! Iure quod distinctio eveniet quo.
                </p>
              </div> */}

              <div className="w-full space-y-2">
                <Card>
                  <Table>
                    <TableHeader>
                      {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                          {headerGroup.headers.map((header) => {
                            return (
                              <TableHead
                                className="text-center"
                                key={header.id}
                              >
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
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ProgramManagerDetails
