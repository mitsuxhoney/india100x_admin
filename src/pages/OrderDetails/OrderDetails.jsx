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
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineTitle,
  TimelineIcon,
  TimelineDescription,
  TimelineContent,
  TimelineTime,
} from '@/components/ui/timeline'
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
  Phone,
  Layers,
  CreditCard,
  Users,
  Activity,
  DollarSign,
  Grid,
  User,
  IndianRupee,
  Download,
  Mail,
  LocateIcon,
  MapIcon,
  MapPinIcon,
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
    product_name: 'Shopping',
    product_img: order_img_1,
    product_category: 'Monthly Expense',
    card_nature: 'Virtual',
    price: 200,
    quantity: 10,
    total_amount: 2000,
  },
  {
    product_name: 'OTT',
    product_img: order_img_2,
    product_category: 'Entertainment',
    card_nature: 'Physical',
    price: 300,
    quantity: 5,
    total_amount: 1500,
  },
  {
    product_name: 'Travel',
    product_img: order_img_3,
    product_category: 'Business',
    card_nature: 'Physical',
    price: 150,
    quantity: 2,
    total_amount: 300,
  },
]
const items = [

  {
    id:2,
    title: 'First event',
    date: '23-02-2024',
    description: 'Processed',
  },

  {
    id:3,
    title: 'Second event',
    date: '26-02-2024',
    description: 'Shipped',
  },
  {
    id: 4,
    title: 'Third event',
    date: '01-03-2024',
    description: 'Delivered',
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
        <div className="xl:w-[70%] w-full flex flex-col gap-4">
          <div className="h-16 bg-muted/50 rounded-md flex items-center justify-between px-4 text-md font-medium">
            <p>Order #{id}</p>
            <Button variant="outline">
              <Download />
              Invoice
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <div className="w-full">
              <div className="rounded-md border mt-[-10px]">
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
                        <TableCell className="min-w-[350px]">
                          <div className="flex items-center gap-2 justify-start">
                            <div className="rounded-md bg-muted/50 min-w-24">
                              <img
                                src={product.product_img1}
                                className="h-20 min-w-24"
                                alt="Image"
                              />
                            </div>
                            <div className="">
                              <p className="text-sm font-medium">
                                {product.product_name}
                              </p>
                              <div className="flex flex-col gap-0">
                                <p className="text-xs font-medium">
                                  Category : {product.product_category}
                                </p>
                                <p className="text-xs font-medium">
                                  Card Nature : {product.card_nature}
                                </p>
                              </div>
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
                        &#8377;2,500.00
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
            </div>
          </div>

          <div className="w-full rounded-md bg-muted/50 flex flex-col">
            <div className="h-16 w-full flex justify-between gap-2 items-center px-4 text-md font-medium">
              <p>Order Status</p>
              <div className="flex gap-2">
                <Button variant="outline">Change Address</Button>
                <Button variant="outline">Cancel Order</Button>
              </div>
            </div>
            <Separator />
            <div className="pt-12">
              <Timeline>
                {items.map((item, index) => {
                  return (
                    <>
                      <TimelineItem>
                        {index === items.length - 1 ? null : (
                          <TimelineConnector />
                        )}
                        <TimelineHeader>
                          <TimelineTime>{item.date}</TimelineTime>
                          <TimelineIcon />
                          <TimelineTitle>{item.title}</TimelineTitle>
                        </TimelineHeader>
                        <TimelineContent>
                          <TimelineDescription>
                            {item.description}
                          </TimelineDescription>
                        </TimelineContent>
                      </TimelineItem>
                    </>
                  )
                })}
              </Timeline>
              {/* <Timeline>
                <TimelineItem>
                  <TimelineConnector />
                  <TimelineHeader>
                    <TimelineTime>{items[0].date}</TimelineTime>
                    <TimelineIcon />
                    <TimelineTitle>{items[0].title}</TimelineTitle>
                  </TimelineHeader>
                  <TimelineContent>
                    <TimelineDescription>
                      {items[0].description}
                    </TimelineDescription>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineConnector />
                  <TimelineHeader>
                    <TimelineTime>{items[1].date}</TimelineTime>
                    <TimelineIcon />
                    <TimelineTitle>{items[1].title}</TimelineTitle>
                  </TimelineHeader>
                  <TimelineContent>
                    <TimelineDescription>
                      {items[1].description}
                    </TimelineDescription>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineHeader>
                    <TimelineTime>{items[2].date}</TimelineTime>
                    <TimelineIcon />
                    <TimelineTitle>{items[2].title}</TimelineTitle>
                  </TimelineHeader>
                  <TimelineContent>
                    <TimelineDescription>
                      {items[2].description}
                    </TimelineDescription>
                  </TimelineContent>
                </TimelineItem>
              </Timeline> */}
            </div>
          </div>
        </div>
        <div className="xl:w-[30%] w-full flex flex-col gap-2">
          <div className="flex flex-col w-full rounded-md bg-muted/50 gap-0 pb-10">
            <div className="h-16 flex items-center justify-between px-4 text-md font-medium">
              <div>Logistic Details</div>
              <Button variant="outline">Track Order</Button>
            </div>
            <Separator className="mt-[-5px] w-full" />
            <div className="flex items-center justify-center mt-[-30px]">
              <Lottie
                animationData={OrderTruck}
                className="dark:text-white"
                style={{ width: '200px', height: '200px' }}
                loop={true}
              />
            </div>
            <div className="flex flex-col justify-center items-center mt-[-20px]">
              <p className="text-lg font-semibold">ID : {id}</p>
              <div className="text-sm font-semibold">Payment mode : Online</div>
            </div>
          </div>
          <div className="w-full flex rounded-md flex-col bg-muted/50 gap-3 pb-10">
            <div className="h-16 flex items-center justify-between px-4 text-md font-medium">
              <div>Customer Details</div>
              <p className="hover:underline cursor-pointer text-sm">
                View Profile
              </p>
            </div>
            <Separator className="mt-[-20px]" />
            <div className="flex flex-col gap-6">
              <div className="flex gap-2 px-2 items-center">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="text-sm font-medium">Joseph Parker</p>
                  <p className="text-xs font-medium">Customer</p>
                </div>
              </div>
              <div className="flex flex-col px-4 gap-4">
                <div className="text-sm font-medium flex items-center gap-1">
                  <Mail size={18} strokeWidth={1.5} />
                  Joseph@gmail.com
                </div>
                <div className="text-sm font-medium flex items-center gap-1">
                  <Phone size={18} strokeWidth={1.5} />
                  +914858659874
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex rounded-md flex-col bg-muted/50 gap-4 pb-8">
            <div className="h-16 flex items-center gap-2 px-4 text-md font-medium">
              <MapPinIcon size={18} strokeWidth={1.5} />
              <p className="hover:underline cursor-pointer text-md">
                Billing Address
              </p>
            </div>
            <Separator className="mt-[-20px]" />
            <div className="px-4 flex flex-col gap-2">
              <p className="text-md font-medium">Joseph Parker</p>
              <p className="text-sm font-medium">+919876787898</p>
              <p className="text-sm font-medium">Laxmi Nagar, New Delhi</p>
              <p className="text-sm font-medium">India</p>
            </div>
          </div>
          <div className="w-full flex rounded-md flex-col bg-muted/50 gap-4 pb-8">
            <div className="h-16 flex items-center gap-2 px-4 text-md font-medium">
              <MapPinIcon size={18} strokeWidth={1.5} />
              <p className="hover:underline cursor-pointer text-md">
                Shipping Address
              </p>
            </div>
            <Separator className="mt-[-20px]" />
            <div className="px-4 flex flex-col gap-2">
              <p className="text-md font-medium">Joseph Parker</p>
              <p className="text-sm font-medium">+919876787898</p>
              <p className="text-sm font-medium">Laxmi Nagar, New Delhi</p>
              <p className="text-sm font-medium">India</p>
            </div>
          </div>
          <div className="w-full flex rounded-md flex-col bg-muted/50 gap-4 pb-8">
            <div className="h-16 flex items-center gap-2 px-4 text-md font-medium">
              <MapPinIcon size={18} strokeWidth={1.5} />
              <p className="hover:underline cursor-pointer text-md">
                Shipping Address
              </p>
            </div>
            <Separator className="mt-[-20px]" />
            <div className="px-4 flex flex-col gap-2">
              <p className="text-md font-medium">Joseph Parker</p>
              <p className="text-sm font-medium">+919876787898</p>
              <p className="text-sm font-medium">Laxmi Nagar, New Delhi</p>
              <p className="text-sm font-medium">India</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails
