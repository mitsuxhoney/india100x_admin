import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import FrontImg from '@/assets/front-img.png'
import BackImg from '@/assets/back-img.png'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Copy, SquareArrowOutUpRight } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import Autoplay from 'embla-carousel-autoplay'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Separator } from '@/components/ui/separator'

import { Badge } from '@/components/ui/badge'
import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const dataImg = [FrontImg, BackImg]

const program = {
  created_on: '17-12-2024',
  created_by: 'ONO',
  category: 'Entertainment',
  status: false,
  limit: '10000',
  is_kyc: true,
  is_contactless: true,
  is_reward: true,
  is_physical: true,
}

const invoices = [
  {
    bank_name: 'HDFC Bank',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  {
    bank_name: '',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV006',
    paymentStatus: 'Pending',
    totalAmount: '$200.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },
]

const ProgramDetails = () => {
  const plugin = React.useRef(Autoplay({ delay: 2000 }))
  return (
    <div className="relative w-full flex flex-col xl:flex-row xl:gap-2 gap-2">
      <div className="w-full xl:min-w-[65%] space-y-2">
        <div className="flex flex-col rounded-md bg-muted/50 gap-0 border w-full">
          <div className="h-16 flex items-center justify-between px-4 text-md font-medium">
            <div className="flex gap-4 items-center">
              <h2 className="text-lg font-medium">ONO</h2>
              {program.is_kyc && (
                <Badge className="bg-[#E4F5E9] text-[#16794C] cursor-pointer tracking-widest">
                  KYC
                </Badge>
              )}
              {program.is_contactless && (
                <Badge className="bg-[#F9F0FF] text-[#6E399D] cursor-pointer tracking-widest">
                  Contactless
                </Badge>
              )}
              {program.is_physical && (
                <Badge className="bg-[#F5FBFC] text-[#267A94] cursor-pointer tracking-widest">
                  Physical
                </Badge>
              )}
              {program.is_reward && (
                <Badge className="bg-[#FFF1E7] text-[#BD3E0C] cursor-pointer tracking-widest">
                  Reward
                </Badge>
              )}
            </div>

            <div className="flex gap-2 items-center">
              <div className="flex items-center gap-2">
                <Switch id="status" checked={program.status} disabled />
                <Label htmlFor="status">
                  {program.status ? 'Active' : 'Inactive'}
                </Label>
              </div>
              <Button variant="outline">Edit</Button>
            </div>
          </div>
          <Separator className="mt-[-8px]" />
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 px-4 py-2 w-full">
            <div className="flex flex-col gap-1 xl:border-r-2 ">
              <p className="font-medium text-xs text-muted-foreground">
                Category
              </p>
              <p className="font-medium text-sm">Entertainment</p>
            </div>

            <div className="flex flex-col gap-1 xl:border-r-2">
              <p className="font-medium text-xs text-muted-foreground">
                Created By
              </p>
              <p className="font-medium text-sm">ONO</p>
            </div>

            <div className="flex flex-col gap-1 xl:border-r-2 ">
              <p className="font-medium text-xs text-muted-foreground">
                Created On
              </p>
              <p className="font-medium text-sm">24/12/2024</p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="font-medium text-xs text-muted-foreground">
                Card Type
              </p>
              <p className="font-medium text-sm">Virtual & Physical</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col rounded-md bg-muted/50 gap-6 px-4 py-2 border w-full">
          <div className="flex flex-col gap-1">
            <h2 className="text-md font-medium">Description :</h2>
            <p className="text-sm font-normal text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatum, sunt? Modi sint labore quod accusamus dolorem expedita
              fugit, alias optio culpa obcaecati fugiat eum. Corporis atque enim
              totam veniam porro. Temporibus, a quam quibusdam eligendi porro
              blanditiis. Iste suscipit necessitatibus libero.
            </p>
          </div>
        </div>

        <div className="flex flex-col rounded-md bg-muted/50 gap-0 border w-full">
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 px-4 py-2 w-full">
            <div className="flex flex-col gap-1 xl:border-r-2 ">
              <p className="font-medium text-xs text-muted-foreground">
                Total Customers
              </p>
              <p className="font-medium text-sm">10000</p>
            </div>

            <div className="flex flex-col gap-1 xl:border-r-2">
              <p className="font-medium text-xs text-muted-foreground">
                No. of Cards
              </p>
              <p className="font-medium text-sm">100</p>
            </div>

            <div className="flex flex-col gap-1 xl:border-r-2 ">
              <p className="font-medium text-xs text-muted-foreground">
                Available Stock
              </p>
              <p className="font-medium text-sm">500</p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="font-medium text-xs text-muted-foreground">
                Transaction Limit
              </p>
              <p className="font-medium text-sm">&#8377; {program.limit}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col rounded-md bg-muted/50 gap-0 border w-full px-4 py-2">
            {/* <h2 className="text-md font-medium">Banking Details : </h2> */}
          </div>
          <div className="flex flex-col rounded-md bg-muted/50 gap-0 border w-full h-[400px]"></div>
        </div>
      </div>
      <div className="w-full xl:min-w-[35%] flex flex-col gap-2">
        <div className="">
          <Carousel
            plugins={[plugin.current]}
            className="w-full relative"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.play}
          >
            <CarouselContent>
              {dataImg.map((img, index) => (
                <CarouselItem key={index}>
                  <div>
                    <Card className="p-14">
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <div className="text-4xl font-semibold relative">
                          <img
                            className="w-full object-cover"
                            src={img}
                            alt="Front Image"
                          />
                          <div className="flex gap-2 absolute -bottom-8  right-8 z-[100] ">
                            <Link
                              to="/card-design"
                              className="flex gap-0 items-center hover:underline"
                            >
                              <p className="font-medium text-sm text-muted-foreground ">
                                Card Design Link
                              </p>
                              <SquareArrowOutUpRight className="h-4" />
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-5 " />
            <CarouselNext className="absolute right-5 " />
          </Carousel>
        </div>

        {/* <div className="mt-2 flex flex-col gap-2 items-start">
            <h2 className="font-medium">Card Design Link</h2>
            <div className="w-full flex gap-2 select-none focus:outline-none">
              <Input
                disabled
                className="h-9 select-none focus:outline-none "
                placeholder="https://ono.club/figma/web-card-design/"
              />
              <Button className="" variant="outline">
                <Copy />
              </Button>
            </div>
          </div> */}
        {/* <div className="mt-2 flex flex-col gap-2 items-start">
            <h2 className="font-medium">Card Type</h2>
            <div className="w-full flex gap-2">
              <Input disabled className="h-9 " placeholder="OTT" />
            </div>
          </div> */}
      </div>
    </div>
  )
}

export default ProgramDetails
