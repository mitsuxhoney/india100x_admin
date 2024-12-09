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
import { Badge } from '@/components/ui/badge'

// const statusBadgesMap = {
//   active: {
//     icon: <Badge className="bg-[#e4f5e9] text-[#16794c]">Active</Badge>,
//     label: 'Successful transaction',
//   },

//   inactive: {
//     icon: <Badge className="bg-[#fff0f0] text-[#b52a2a]">Inactive</Badge>,
//     label: 'Failed transaction',
//   },
// }

const fieldIconMap = {
  AddOnCard: {
    icon: <Badge className="bg-[#f5e7e4] text-[#792c16]">Add on card</Badge>,
    label: '',
  },
  Physical: {
    icon: <Badge className="bg-[#d3e5ff] text-[#051eab]">Physical</Badge>,
    label: 'Pending transaction',
  },
}

const data = [
  {
    "id": 1,
    "card_ref_id": "32XY32",
    "status": "active",
    "AddOnCard": true,
    "Physical": true,
    "last_four_digit": "4444",
    "product_category": "Example",
    "add_on_card": "true",
    "is_physical": "true",
    "issued_date": "02-12-2024"
  },
  {
    "id": 2,
    "card_ref_id": "32XY33",
    "status": "inactive",
    "Physical": true,
    "last_four_digit": "4445",
    "product_category": "Example",
    "add_on_card": "true",
    "is_physical": "true",
    "issued_date": "02-12-2024"
  },
  {
    "id": 3,
    "card_ref_id": "32XY34",
    "status": "active",
    "Physical": true,
    "last_four_digit": "4446",
    "product_category": "Example",
    "add_on_card": "true",
    "is_physical": "true",
    "issued_date": "02-12-2024"
  },
  {
    "id": 4,
    "card_ref_id": "32XY35",
    "status": "inactive",
    "AddOnCard": true,
    "last_four_digit": "4447",
    "product_category": "Example",
    "add_on_card": "true",
    "is_physical": "true",
    "issued_date": "02-12-2024"
  },
  {
    "id": 5,
    "card_ref_id": "32XY36",
    "status": "active",
    "AddOnCard": true,
    "last_four_digit": "4448",
    "product_category": "Example",
    "add_on_card": "true",
    "is_physical": "true",
    "issued_date": "02-12-2024"
  },
  {
    "id": 6,
    "card_ref_id": "32XY37",
    "status": "inactive",
    "AddOnCard": true,
    "Physical": true,
    "last_four_digit": "4449",
    "product_category": "Example",
    "add_on_card": "true",
    "is_physical": "true",
    "issued_date": "02-12-2024"
  },
  {
    "id": 7,
    "card_ref_id": "32XY38",
    "status": "active",
    "Physical": true,
    "last_four_digit": "4450",
    "product_category": "Example",
    "add_on_card": "true",
    "is_physical": "true",
    "issued_date": "02-12-2024"
  },
  {
    "id": 8,
    "card_ref_id": "32XY39",
    "status": "inactive",
    "AddOnCard": true,
    "last_four_digit": "4451",
    "product_category": "Example",
    "add_on_card": "true",
    "is_physical": "true",
    "issued_date": "02-12-2024"
  },
  {
    "id": 9,
    "card_ref_id": "32XY40",
    "status": "active",
    "AddOnCard": true,
    "Physical": true,
    "last_four_digit": "4452",
    "product_category": "Example",
    "add_on_card": "true",
    "is_physical": "true",
    "issued_date": "02-12-2024"
  },
  {
    "id": 10,
    "card_ref_id": "32XY41",
    "status": "inactive",
    "last_four_digit": "4453",
    "product_category": "Example",
    "add_on_card": "true",
    "is_physical": "true",
    "issued_date": "02-12-2024"
  }
]

export function IssuedCardsTable() {
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
      accessorKey: 'card_ref_id',
      header: 'Card Ref ID',
      cell: ({ row }) => (
        <div className="capitalize cursor-pointer">
          {row.getValue('card_ref_id')}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status');
        return status === 'active' ? (
          <Badge className="bg-[#e4f5e9] text-[#16794c]">Active</Badge>
        ) : (
          <Badge className="bg-[#fff0f0] text-[#b52a2a]">Inactive</Badge>
        );
      },
    },
  
    {
      accessorKey: 'last_four_digit',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Card Last Four Digits
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('last_four_digit')}</div>
      ),
    },
    {
      accessorKey: 'product_category',
      header: 'Product Category',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('product_category')}</div>
      ),
    },
    {
      accessorKey: 'issued_date',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Issued Date
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="lowercase ">{row.getValue('issued_date')}</div>
      ),
    },
    {
      header: ` `,
      cell: ({ row }) => (
        <div className="flex items-center justify-start gap-2">
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
        <CardTitle>Issued Cards</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <div className="flex items-center py-4 justify-between ">
            <Input
              placeholder="Search by Card ref id..."
              value={table.getColumn('card_ref_id')?.getFilterValue() ?? ''}
              onChange={(event) =>
                table
                  .getColumn('card_ref_id')
                  ?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
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
              {/* <Link to="/program/create-program">
                <Button variant="" className="ml-auto">
                  {' '}
                  <CirclePlus /> Add new
                </Button>
              </Link> */}
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
