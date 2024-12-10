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
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useToast } from '@/hooks/use-toast'
import {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from '@/components/ui/form'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
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
  Copy,
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

const data = [
  {
    date: '24-12-2024 22:44:00',
    generatedBy: 'admin',
    ipAddress: '192.168.1.1',
    status: 'Blocked',
    action: 'Unblock',
  },
  {
    date: '23-12-2024 18:30:00',
    generatedBy: 'user1',
    ipAddress: '192.168.1.2',
    status: 'Active',
    action: 'Block',
  },
  {
    date: '22-12-2024 16:15:00',
    generatedBy: 'admin',
    ipAddress: '192.168.1.3',
    status: 'Active',
    action: 'Block',
  },
  {
    date: '21-12-2024 14:00:00',
    generatedBy: 'user2',
    ipAddress: '192.168.1.4',
    status: 'Blocked',
    action: 'Unblock',
  },
  {
    date: '20-12-2024 12:45:00',
    generatedBy: 'user3',
    ipAddress: '192.168.1.5',
    status: 'Blocked',
    action: 'Unblock',
  },
  {
    date: '19-12-2024 10:30:00',
    generatedBy: 'user1',
    ipAddress: '192.168.1.6',
    status: 'Active',
    action: 'Block',
  },
]

const formSchema = z.object({
  webhook_url: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  accessor_key: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
})

function onSubmit(values) {
  // Do something with the form values.
  // ✅ This will be type-safe and validated.
  console.log(values)
}
const IpWhitelistingTable = () => {
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  const { toast } = useToast()

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
      accessorKey: 'generatedBy',
      header: 'Name',
      cell: ({ row }) => (
        <div className="capitalize text-center">
          {row.getValue('generatedBy')}
        </div>
      ),
    },
    {
      accessorKey: 'ipAddress',
      header: 'IP Address',
      cell: ({ row }) => (
        <div className="capitalize text-center">
          {row.getValue('ipAddress')}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status')
        return status === 'Active' ? (
          <Badge className="bg-[#e4f5e9] text-[#16794c]">Active</Badge>
        ) : (
          <Badge className="bg-[#fff0f0] text-[#b52a2a]">Blocked</Badge>
        )
      },
    },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ row }) => {
        const date = row.getValue('date').split(' ')[0]
        const time = row.getValue('date').split(' ')[1]

        return (
          <div className="flex flex-col items-center text-center">
            <span>{date}</span>
            <span className="text-slate-400">{time}</span>
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
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Activate
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Suspend
              </DropdownMenuItem>
              <DropdownMenuItem
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

  return (
    <Card>
      <CardContent>
        <div className="w-full">
          <div className="flex items-center py-4 justify-end ">
            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button>Create Allow List</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Create IP Allow List</SheetTitle>
                    <SheetDescription>
                      It allows you to restrict access to your account by
                      permitting only specific IP addresses.
                    </SheetDescription>
                  </SheetHeader>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4 mt-2"
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter the name" {...field} />
                            </FormControl>
                            {/* <FormDescription>
                  A webhook URL is an endpoint that allows external systems to
                  send real-time data or notifications to your application over
                  HTTP when certain events occur.
                </FormDescription> */}
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex gap-4 items-end">
                        <div className="w-full">
                          <FormField
                            control={form.control}
                            name="secret_key"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>IP Address</FormLabel>
                                <FormControl>
                                  <Input placeholder="192.168.0.1" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* <Button variant="outline" className="">
                Generate secret
              </Button> */}
                      </div>
                    </form>
                  </Form>
                  <SheetFooter>
                    <SheetClose asChild>
                      <div className="mt-4">
                        <Button
                          type="submit"
                          onClick={() => {
                            toast({
                              title: 'New API key generated',
                            })
                          }}
                        >
                          Create
                        </Button>
                      </div>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
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

export default IpWhitelistingTable
