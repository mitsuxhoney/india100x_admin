import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'

import { Users } from 'lucide-react'
import { CardIssuedChart } from '../../components/dashboard-card-issued-chart'
import { CustomerOnboardedChart } from '../../components/dashboard-customer-onboarded-chart'
import { ProgramIssuedChart } from '../../components/dashboard-programs-issued-chart'
import { ProgramsDistributionChart } from '../../components/dashboard-programs-distribution-chart'

const cardsData = [
  {
    title: '3',
    description: 'Total Programs Manager',
  },
  {
    title: '213',
    description: 'Total Cards',
  },
  {
    title: '215',
    description: 'Total Customers',
  },
  {
    title: '2060',
    description: 'Total successful transactions',
  },
  {
    title: '10',
    description: 'Total unsuccessful transactions',
  },
]

const BusinessDashboard = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid auto-rows-min gap-4 grid-cols-2 xl:grid-cols-5">
        {cardsData.map((card, index) => (
          <div key={index}>
            <Card className="flex flex-col items-center justify-center h-[200px]">
              <CardHeader className="flex justify-center" title={card.title}>
                <Users />
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <CardTitle className="text-2xl flex justify-center">
                  {card.title}
                </CardTitle>
                <CardDescription className="text-md flex justify-center text-center">
                  {card.description}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <CardIssuedChart className="aspect-video rounded-xl bg-muted/50" />
        <CustomerOnboardedChart className="aspect-video rounded-xl bg-muted/50" />
        <ProgramIssuedChart className="aspect-video rounded-xl bg-muted/50" />
        <ProgramsDistributionChart className="aspect-video rounded-xl bg-muted/50" />
      </div>
    </div>
  )
}

export default BusinessDashboard
