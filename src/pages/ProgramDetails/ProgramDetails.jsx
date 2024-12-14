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
import { Copy } from 'lucide-react'

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

import { Badge } from '@/components/ui/badge'
import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const dataImg = [FrontImg, BackImg]

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

const ProgramDetails = () => {
  const plugin = React.useRef(Autoplay({ delay: 2000 }))
  return (
    <div className="relative w-full flex flex-col md:flex-row md:gap-2 gap-2">
      <div className="w-full lg:w-[35%] right-0 flex flex-col gap-2">
        <div>
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.play}
          >
            <CarouselContent>
              {dataImg.map((img, index) => (
                <CarouselItem key={index}>
                  <div>
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-4xl font-semibold">
                          <img
                            className="w-full h-full object-cover"
                            src={img}
                            alt="Front Image"
                          />
                        </span>
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
        <div className="mt-2 flex flex-col gap-2 items-start">
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
        </div>
        <div className="mt-2 flex flex-col gap-2 items-start">
          <h2 className="font-medium">Card Type</h2>
          <div className="w-full flex gap-2">
            <Input disabled className="h-9 " placeholder="OTT" />
          </div>
        </div>
      </div>
      <div className="w-full lg:w-[65%]">
        <Card>
          <CardHeader>
            <CardTitle>OTT</CardTitle>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">100</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      No. of Orders
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">50</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Available Stock
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">150</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Transaction Limit
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">&#8377;50K-1Lakh</div>
                  </CardContent>
                </Card>
              </div>
              <div className="flex flex-col gap-2">
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
              </div>

              <div className="w-full space-y-2">
                <h2 className="text-md font-medium">Features</h2>

                <Card>
                  <div className="p-4">
                    <Table>
                      {/* <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Invoice</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader> */}
                      <TableBody>
                        {invoices.map((invoice) => (
                          <TableRow key={invoice.invoice}>
                            <TableCell className="font-medium">
                              {invoice.invoice}
                            </TableCell>
                            <TableCell>{invoice.paymentStatus}</TableCell>
                            <TableCell>{invoice.paymentMethod}</TableCell>
                            <TableCell className="text-right">
                              {invoice.totalAmount}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ProgramDetails
