import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function WebhooksTabs() {
  return (
    <Tabs defaultValue="account" className="w-[100%]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Request</TabsTrigger>
        <TabsTrigger value="password">Response</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Request</CardTitle>
            <CardDescription>
              A webhook request is an automated HTTP POST message sent from one
              system to another when a specific event occurs, carrying data in
              real-time to notify or trigger actions in the recipient system.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="space-y-1">
              <Label htmlFor="header">Header</Label>
              <Textarea
                id="header"
                placeholder={`{
  "Content-Type": "application/json",
  "Authorization": "Bearer {{auth_token}}",
  "X-Request-ID": "{{request_id}}",
  "X-Timestamp": "{{timestamp}}"
}`}
                className="resize-none h-[150px] focus:outline-none select-none"
                disabled
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="body">Body</Label>
              <Textarea
                id="body"
                placeholder={`{
  "user_id": "{{user_id}}",
  "event": "{{event_name}}",
  "amount": "{{transaction_amount}}",
  "date": "{{date}}",
  "ip_address": "{{ip_address}}"
}`}
                className="resize-none h-[250px] focus:outline-none select-none "
                disabled
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Send</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Response</CardTitle>
            <CardDescription>
              A webhook response is the data or acknowledgment sent back from
              the recipient system to confirm the successful receipt or
              processing of the webhook request.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="space-y-1">
              <Label htmlFor="header">Header</Label>
              <Textarea
                id="header"
                placeholder={`{
  "X-Response-Time": "{{response_time}}",
  "X-Status-Code": "{{status_code}}",
  "X-Request-ID": "{{request_id}}"
}`}
                className="resize-none h-[150px] focus:outline-none select-none"
                disabled
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="body">Body</Label>
              <Textarea
                id="body"
                placeholder={`{
  "status": "{{response_status}}",
  "transaction_id": "{{transaction_id}}",
  "user_id": "{{user_id}}",
  "amount": "{{amount}}",
  "message":"{{message}}"
}`}
                className="resize-none h-[200px] focus:outline-none select-none "
                disabled
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
