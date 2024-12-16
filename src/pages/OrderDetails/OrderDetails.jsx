import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import * as React from 'react'
import Lottie from 'lottie-react'
import OrderTruck from '@/assets/lottie-json/order-details.json'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableFooter,
  TableCaption,
  TableRow,
} from '@/components/ui/table'
import order_img_1 from '@/assets/order_img_1.png'
import order_img_2 from '@/assets/order_img_2.png'
import order_img_3 from '@/assets/order_img_3.png'

import { Link, useLocation, useSearchParams, useParams } from 'react-router-dom'
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
  Download,
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
    product_name: 'Android',
    product_img: order_img_1,
    product_category: 'Mobile',
    card_nature: 'Virtual',
    price: 200,
    quantity: 10,
    total_amount: 2000,
  },
  {
    product_name: 'iPhone',
    product_img: order_img_2,
    product_category: 'Mobile',
    card_nature: 'Physical',
    price: 300,
    quantity: 5,
    total_amount: 1500,
  },
  {
    product_name: 'Windows',
    product_img: order_img_3,
    product_category: 'Software',
    card_nature: 'Physical',
    price: 150,
    quantity: 2,
    total_amount: 300,
  },
  {
    product_name: 'Mac',
    product_img: order_img_1,
    product_category: 'Software',
    card_nature: 'Virtual',
    price: 250,
    quantity: 3,
    total_amount: 750,
  },
  {
    product_name: 'Linux',
    product_img: order_img_2,
    product_category: 'Software',
    card_nature: 'Physical',
    price: 100,
    quantity: 4,
    total_amount: 400,
  },
]

const OrderDetails = () => {
  const downloadCSV = () => {
    // Convert table data to CSV
    const csv = Papa.unparse(data)
    // Create a Blob object for the CSV
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    // Use FileSaver to trigger a download
    saveAs(blob, 'table-data.csv')
  }

  const { id } = useParams()

  return (
    <div className="relative w-full flex flex-col md:flex-row gap-2">
      <div className="w-full xl:flex-row gap-2 flex flex-col">
        <div className="xl:w-[70%] w-full flex flex-col">
          <div className="h-16 bg-muted/50 rounded-md flex items-center justify-between px-2 text-md font-medium">
            <p>Order #{id}</p>
            <Button variant="outline">
              <Download />
              Invoice
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <div className="w-full">
              <div className="rounded-md border mt-3">
                <Table>
                  <TableCaption className="pb-8">
                    A list of your recent invoices.
                  </TableCaption>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="w-[200px]">Product</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((product) => (
                      <TableRow key={product.product_name}>
                        <TableCell className="w-[250px]">
                          <div className="flex items-center gap-2 justify-start">
                            <div className="rounded-md bg-muted/50 min-w-20">
                              <img
                                src={product.product_img}
                                className="h-20 min-w-20"
                                alt=""
                              />
                            </div>
                            <div>
                              <p className="text-sm font-medium">
                                {product.product_name}
                              </p>
                              <p className="text-xs font-medium">
                                Category : {product.product_category}
                              </p>
                              <p className="text-xs font-medium">
                                Card Nature : {product.card_nature}
                              </p>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>&#8377;{product.price}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell className="text-right">
                          &#8377;{product.total_amount}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>

                  <TableFooter>
                    <TableRow>
                      <TableCell className="text-xl font-semibold" colSpan={3}>
                        Total
                      </TableCell>
                      <TableCell className="text-right text-xl font-semibold">
                        $2,500.00
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-[30%] w-full flex flex-col gap-2">
          <div className="flex flex-col w-full rounded-md bg-muted/50 gap-0 pb-8 px-4">
            <div className="h-16 flex items-center justify-between text-md font-medium">
              <div>Logistic Details</div>
              <Button variant="outline">Track Order</Button>
            </div>
            <div className="flex items-center justify-center mt-[-30px]">
              <Lottie
                animationData={OrderTruck}
                style={{ width: '200px', height: '200px' }}
                loop={true}
              />
            </div>
            <div className="flex flex-col justify-center items-center mt-[-20px]">
              <p className="text-lg font-semibold">ID : {id}</p>
              <div className="text-sm font-semibold">Payment mode : Online</div>
            </div>
          </div>
          <div className="w-full flex rounded-md flex-col bg-muted/50 gap-0 px-4 pb-8">
            <div className="h-16 flex items-center justify-between px-2 text-md font-medium">
              <div>Customer Details</div>
              <p className="hover:underline cursor-pointer text-sm">
                View Profile
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails
