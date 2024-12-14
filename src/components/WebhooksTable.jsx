import * as React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
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
import { Label } from '@/components/ui/label'
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
  Copy,
  Pencil,
  Trash2,
  CircleX,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  FileDown,
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { Badge } from '@/components/ui/badge'
import { DataTablePagination } from '@/components/DataTablePagination'

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

import { status } from '@/data/webhooks-data'

import { saveAs } from 'file-saver'
import * as Papa from 'papaparse'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import DataTableViewOptions from './DataTableViewOptions'
import DataTableToolbar from './DataTableToolbar'

const formSchema = z.object({
  webhook_url: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  accessor_key: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
})
const data = [
  {
    name: 'webhook 1',
    url: 'https://example.com/rest/webhooks/webhook1',
    secret: 'txcdefrolms345',
    status: 'Enabled',
  },
  {
    name: 'webhook 2',
    url: 'https://example.com/rest/webhooks/webhook2',
    secret: 'abcdefghijklmnop',
    status: 'Disabled',
  },
  {
    name: 'webhook 3',
    url: 'https://example.com/rest/webhooks/webhook3',
    secret: 'abcdefghijklmnopq',
    status: 'Enabled',
  },
  {
    name: 'webhook 4',
    url: 'https://example.com/rest/webhooks/webhook4',
    secret: 'abcdefghijklmnopqrs',
    status: 'Disabled',
  },
  {
    name: 'webhook 5',
    url: 'https://example.com/rest/webhooks/webhook5',
    secret: 'abcdefghijklmnopqrs',
    status: 'Enabled',
  },
]
const WebhooksTable = () => {
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})
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
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <div className="capitalize text-center">{row.getValue('name')}</div>
      ),
    },
    {
      accessorKey: 'url',
      header: 'URL',
      cell: ({ row }) => (
        <div className="capitalize text-center">{row.getValue('url')}</div>
      ),
    },
    {
      accessorKey: 'secret',
      header: 'Secret',
      cell: ({ row }) => (
        <div className="capitalize text-center">{row.getValue('secret')}</div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.original.status
        return (
          <div className="capitalize text-center">
            {status === 'Disabled' ? (
              <Badge className="bg-[#fff0f0] text-[#b52a2a]">Disabled</Badge>
            ) : (
              <Badge className="bg-[#e4f5e9] text-[#16794c]">Enabled</Badge>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const rowData = row.original // Get the entire row's data for actions
        const status = row.original.status
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
                Edit
              </DropdownMenuItem>
              {status === 'disabled' ? (
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(payment.id)}
                >
                  Enable
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(payment.id)}
                >
                  Disable
                </DropdownMenuItem>
              )}
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
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  })
  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
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
      <CardContent>
        <div className="w-full mt-3">
          <div className="w-full flex gap-2 justify-between items-center max-md:flex-col max-md:gap-2 max-md:items-start max-md:w-[70%]">
            <div className="w-full">
              <DataTableToolbar table={table} status={status} />
            </div>
            <div className="flex gap-2 items-center">
              <Button variant="outline" className="h-8" onClick={downloadCSV}>
                <FileDown />
              </Button>

              <Sheet>
                <SheetTrigger asChild>
                  <Button className="h-8">Create a Webhook</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Create a Webhook</SheetTitle>
                    <SheetDescription>
                      A webhook interface is a system that allows receiving,
                      processing, and responding to HTTP POST requests triggered
                      by specific events from external sources.
                    </SheetDescription>
                  </SheetHeader>

                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4 mt-4"
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Webhook Name</FormLabel>
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
                      <FormField
                        control={form.control}
                        name="webhook_url"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>URL</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter the url" {...field} />
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
                        <div className="w-[100%]">
                          <FormField
                            control={form.control}
                            name="secret_key"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Secret Key</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter the secret key"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <Button variant="outline">
                          <Copy />
                        </Button>
                      </div>
                    </form>
                    <div className="flex justify-end items-start text-xs mt-1 text-gray hover:underline">
                      <Link
                        to=""
                        onClick={() => {
                          setIsForgotPasswordClicked(true)
                        }}
                      >
                        Generate Secret Key
                      </Link>
                    </div>
                  </Form>

                  <SheetFooter>
                    {/* <SheetClose asChild> */}
                    <div className="mt-4">
                      <Button
                        type="submit"
                        onClick={() => {
                          toast({
                            title: 'New Webhook generated',
                          })
                        }}
                      >
                        Create Webhook
                      </Button>
                    </div>
                    {/* </SheetClose> */}
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <div className="rounded-md border mt-3">
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
          <DataTablePagination table={table} />
        </div>
      </CardContent>
    </Card>
  )
}

export default WebhooksTable
