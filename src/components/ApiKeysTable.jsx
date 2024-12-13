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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { ClipboardCopy, Copy, Plus } from 'lucide-react'
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
  ArrowUpDown,
  SquarePen,
  Trash2Icon,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  CirclePlus,
  MoreHorizontal,
  Pencil,
  Trash2,
  CircleX,
  ClipboardCopyIcon,
  Trash,
} from 'lucide-react'

import { Switch } from '@/components/ui/switch'

import { Label } from '@/components/ui/label'
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

import { Badge } from '@/components/ui/badge'

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'

const formSchema = z.object({
  key_name: z
    .string()
    .min(3, 'API Key Name must be at least 3 characters')
    .max(100, 'API Key Name cannot exceed 100 characters')
    .nonempty('API Key Name is required'),

  key_type: z.enum(['Client API Key', 'Client HMAC Key', 'User HMAC Key']),
})

const data = [
  {
    status: 'enabled',
    name: 'Service1',
    key_type: 'Bearer',
    api_key: '1234abcd5678efgh',
  },
  {
    status: 'disabled',
    name: 'Service2',
    key_type: 'Basic',
    api_key: 'abcd1234efgh5678',
  },
]

export function ApiKeysTable({ isVisibleApiForm, setIsVisibleApiForm }) {
  const [copied, setCopied] = useState(false)
  const [keyGenerated, setKeyGenerated] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})
  const { toast } = useToast()

  const handleCopy = async (textToCopy) => {
    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      toast({
        title: 'Copied!',
      })
      setTimeout(() => setCopied(false), 2000) // Reset after 2 seconds
    } catch (error) {
      console.error('Failed to copy text: ', error)
    } finally {
      setKeyGenerated(false)
    }
  }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      key_name: '',
      key_type: '',
    },
  })

  const handleKeyGenerated = () => {
    setKeyGenerated(true)
  }

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
      accessorKey: 'key_type',
      header: 'Key Type',
      cell: ({ row }) => (
        <div className="capitalize text-center">{row.getValue('key_type')}</div>
      ),
    },
    {
      accessorKey: 'api_key',
      header: 'API Key',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('api_key')}</div>
      ),
    },
    {
      accessorKey: 'status',
      header: ({ column }) => {
        return <div>Status</div>
      },
      cell: ({ row }) => {
        // const status = row.original.status

        // return status === 'enabled' ? (
        //   <Badge className="bg-[#fff0f0] text-[#b52a2a]">Disabled</Badge>
        // ) : (
        //   <Badge className="bg-[#e4f5e9] text-[#16794c]">Enabled</Badge>
        // )
        const status = row.original.status
        return <Switch />
      },
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
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
                Enable
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Regenerate
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

  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Card>
      {/* <CardHeader>
        <CardTitle>API Keys </CardTitle>
      </CardHeader> */}
      <CardContent>
        <div className="w-full">
          <div className="flex items-center py-4 justify-end ">
            {/* <Input
              placeholder="Search by Name..."
              value={table.getColumn('product_name')?.getFilterValue() ?? ''}
              onChange={(event) =>
                table
                  .getColumn('product_name')
                  ?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            /> */}
            <div className="flex items-center gap-2">
              <DropdownMenu>
                {/* <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    Column <ChevronDown />
                  </Button>
                </DropdownMenuTrigger> */}
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
              <Sheet>
                <SheetTrigger asChild>
                  <Button>Create API key</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>
                      {keyGenerated ? 'API Key Generated' : 'Create API Key'}
                    </SheetTitle>
                    <SheetDescription>
                      API keys are unique identifiers used to authenticate and
                      authorize access to APIs.
                    </SheetDescription>
                  </SheetHeader>
                  {keyGenerated ? (
                    <div className="w-full">
                      <SheetClose>
                        <div className="mt-4 w-full flex flex-col gap-4 select-none">
                          <div className="flex gap-2 w-full">
                            <div className="w-[99%]">
                              <Input type="text" disabled value="API key" />
                            </div>
                            <div>
                              <Button
                                variant="outline"
                                onClick={() => {
                                  handleCopy('API Key')
                                }}
                              >
                                <Copy />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </SheetClose>
                    </div>
                  ) : (
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-2"
                      >
                        <FormField
                          control={form.control}
                          name="key_type"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>API Type</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select API type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Client API Key">
                                    Client API Key
                                  </SelectItem>
                                  <SelectItem value="Client HMAC Key">
                                    Client HMAC Key
                                  </SelectItem>
                                  <SelectItem value="User HMAC Key">
                                    User HMAC Key
                                  </SelectItem>
                                </SelectContent>
                              </Select>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="key_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Descriptive Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter the name"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex justify-end mt-4 w-full">
                          <div className="flex gap-4">
                            <div>
                              <SheetClose>
                                <Button type="submit">Cancel</Button>
                              </SheetClose>
                            </div>

                            <div>
                              <Button
                                type="submit"
                                onClick={handleKeyGenerated}
                              >
                                Generate Key
                              </Button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </Form>
                  )}
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
          {/* <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{' '}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
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
          </div> */}
        </div>
      </CardContent>
    </Card>
  )
}
