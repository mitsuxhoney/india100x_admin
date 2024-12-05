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
      category: 'technology',
      name: 'John Doe',
      programmanager: 'Alice Smith',
      kycrequired: 'Yes',
      contactlessallowed: 'Yes',
      physicalallowed: 'No',
      limit: '3000-1Lakh',
      rewardapplicable: 'Yes',
      launchdate: '2021-01-01',
    },
    {
      category: 'finance',
      name: 'Jane Smith',
      programmanager: 'Michael Brown',
      kycrequired: 'No',
      contactlessallowed: 'Yes',
      physicalallowed: 'Yes',
      limit: '3000-1Lakh',
      rewardapplicable: 'No',
      launchdate: '2022-05-10',
    },
    {
      category: 'education',
      name: 'Alice Johnson',
      programmanager: 'Chris Evans',
      kycrequired: 'Yes',
      contactlessallowed: 'No',
      physicalallowed: 'Yes',
      limit: '3000-1Lakh',
      rewardapplicable: 'Yes',
      launchdate: '2020-11-15',
    },
    {
      category: 'healthcare',
      name: 'Bob Lee',
      programmanager: 'Sophia Martinez',
      kycrequired: 'No',
      contactlessallowed: 'Yes',
      physicalallowed: 'No',
      limit: '3000-1Lakh',
      rewardapplicable: 'No',
      launchdate: '2021-07-20',
    },
    {
      category: 'retail',
      name: 'Carmella White',
      programmanager: 'David Wilson',
      kycrequired: 'Yes',
      contactlessallowed: 'Yes',
      physicalallowed: 'Yes',
      limit: '500 - 1000',
      rewardapplicable: 'Yes',
      launchdate: '2021-03-22',
    },
    {
      category: 'travel',
      name: 'Michael Adams',
      programmanager: 'Emma Clark',
      kycrequired: 'No',
      contactlessallowed: 'Yes',
      physicalallowed: 'Yes',
      minlimit: 1000,
      maxlimit: 15000,
      rewardapplicable: 'Yes',
      launchdate: '2021-02-15',
    },
    {
      category: 'automotive',
      name: 'Olivia Turner',
      programmanager: 'Liam Scott',
      kycrequired: 'Yes',
      contactlessallowed: 'No',
      physicalallowed: 'Yes',
      minlimit: 700,
      maxlimit: 8000,
      rewardapplicable: 'No',
      launchdate: '2022-08-03',
    },
    {
      category: 'technology',
      name: 'Sophia Martinez',
      programmanager: 'Ethan Hall',
      kycrequired: 'Yes',
      contactlessallowed: 'Yes',
      physicalallowed: 'Yes',
      minlimit: 1000,
      maxlimit: 12000,
      rewardapplicable: 'Yes',
      launchdate: '2020-05-18',
    },
    {
      category: 'education',
      name: 'James Wilson',
      programmanager: 'Olivia Green',
      kycrequired: 'No',
      contactlessallowed: 'Yes',
      physicalallowed: 'No',
      minlimit: 300,
      maxlimit: 2500,
      rewardapplicable: 'No',
      launchdate: '2021-06-08',
    },
    {
      category: 'retail',
      name: 'Liam Scott',
      programmanager: 'Sophia White',
      kycrequired: 'Yes',
      contactlessallowed: 'Yes',
      physicalallowed: 'Yes',
      minlimit: 600,
      maxlimit: 9000,
      rewardapplicable: 'Yes',
      launchdate: '2021-01-11',
    },
  
]

export function ProgramTableDemo() {
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
        cell: ({ row }) => <div className="capitalize text-center">{row.getValue('name')}</div>,
      },
      {
        accessorKey: 'category',
        header: 'Category',
        cell: ({ row }) => <div className="capitalize text-center">{row.getValue('category')}</div>,
      },
      {
        accessorKey: 'programmanager',
        header: 'Manager',
        cell: ({ row }) => (
          <div className="text-center">{row.getValue('programmanager')}</div>
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
        accessorKey: 'launchdate',
        header: 'Launch Date',
        cell: ({ row }) => (
          <div className="text-center">{row.getValue('launchdate')}</div>
          
        ),
      },

      {
        accessorKey: 'applicable',
        header: '',
        cell: ({ row }) => (
          <div className="text-center">{row.getValue('applicable')}</div>
        ),
      },
    {
      accessorKey: 'actions',
      header: '',
      cell: ({ row }) => {
        const rowData = row.original // Get the entire row's data for actions
        return (
          <div className="flex space-x-2">
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
                    Are you sure you want to delete ? This action cannot be
                    undone.
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Programs List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <div className="flex items-center py-4 justify-between ">
            <Input
              placeholder="Search Product..."
              value={table.getColumn('product')?.getFilterValue() ?? ''}
              onChange={(event) =>
                table.getColumn('product')?.setFilterValue(event.target.value)
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
                  {' '}
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