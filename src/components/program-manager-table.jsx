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
        id: 'm5gr84i9',
        name: 'John Doe',
        programs: 5,
        activePrograms: 3,
        createdAt: '2021-01-01',
        updatedAt: '2023-12-01',
      },
      {
        id: '3u1reuv4',
        name: 'Jane Smith',
        programs: 2,
        activePrograms: 1,
        createdAt: '2022-05-10',
        updatedAt: '2023-11-25',
      },
      {
        id: 'derv1ws0',
        name: 'Alice Johnson',
        programs: 8,
        activePrograms: 5,
        createdAt: '2020-11-15',
        updatedAt: '2023-12-05',
      },
      {
        id: '5kma53ae',
        name: 'Bob Lee',
        programs: 3,
        activePrograms: 2,
        createdAt: '2021-07-20',
        updatedAt: '2023-10-30',
      },
      {
        id: 'bhqecj4p',
        name: 'Carmella White',
        programs: 6,
        activePrograms: 4,
        createdAt: '2021-03-22',
        updatedAt: '2023-12-01',
      },

      {
        id: 'wz5v9k3r',
        name: 'Michael Adams',
        programs: 7,
        activePrograms: 4,
        createdAt: '2021-02-15',
        updatedAt: '2023-11-29',
      },
      {
        id: 'hx4n2ds8',
        name: 'Olivia Turner',
        programs: 3,
        activePrograms: 2,
        createdAt: '2022-08-03',
        updatedAt: '2023-11-28',
      },
      {
        id: 'vke1m0l7',
        name: 'Sophia Martinez',
        programs: 10,
        activePrograms: 6,
        createdAt: '2020-05-18',
        updatedAt: '2023-12-04',
      },
      {
        id: 'g5vzw42h',
        name: 'James Wilson',
        programs: 4,
        activePrograms: 3,
        createdAt: '2021-06-08',
        updatedAt: '2023-10-15',
      },
      {
        id: 'q0a9wejf',
        name: 'Liam Scott',
        programs: 9,
        activePrograms: 7,
        createdAt: '2021-01-11',
        updatedAt: '2023-12-02',
      },

      {
        id: 'm5gr84i9',
        name: 'John Doe',
        programs: 5,
        activePrograms: 3,
        createdAt: '2021-01-01',
        updatedAt: '2023-12-01',
      },
      {
        id: '3u1reuv4',
        name: 'Jane Smith',
        programs: 2,
        activePrograms: 1,
        createdAt: '2022-05-10',
        updatedAt: '2023-11-25',
      },
      {
        id: 'derv1ws0',
        name: 'Alice Johnson',
        programs: 8,
        activePrograms: 5,
        createdAt: '2020-11-15',
        updatedAt: '2023-12-05',
      },
      {
        id: '5kma53ae',
        name: 'Bob Lee',
        programs: 3,
        activePrograms: 2,
        createdAt: '2021-07-20',
        updatedAt: '2023-10-30',
      },
      {
        id: 'bhqecj4p',
        name: 'Carmella White',
        programs: 6,
        activePrograms: 4,
        createdAt: '2021-03-22',
        updatedAt: '2023-12-01',
      },
]

export function ProgramTable() {
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
        accessorKey: 'id',
        header: 'ID',
        cell: ({ row }) => <div className="capitalize text-center">{row.getValue('id')}</div>,
      },
      {
        accessorKey: 'programs',
        header: 'No. of Programs',
        cell: ({ row }) => (
          <div className="text-center">{row.getValue('programs')}</div>
        ),
      },
      {
        accessorKey: 'activePrograms',
        header: 'Active Programs',
        cell: ({ row }) => (
          <div className="text-center">{row.getValue('activePrograms')}</div>
        ),
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: ({ row }) => (
          <div className="text-center">{row.getValue('createdAt')}</div>
        ),
      },
      {
        accessorKey: 'updatedAt',
        header: 'Updated At',
        cell: ({ row }) => (
          <div className="text-center">{row.getValue('updatedAt')}</div>
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
        <CardTitle>Program Manager List</CardTitle>
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
                        <TableCell className='text-center' key={cell.id}>
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

