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

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import WebhooksTable from './WebhooksTable'

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

export default function WebhooksTabs() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  })
  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="webhook_url"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter the url" {...field} />
                </FormControl>
                <FormDescription>
                  A webhook URL is an endpoint that allows external systems to
                  send real-time data or notifications to your application over
                  HTTP when certain events occur.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="accessor_key"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter the accessor key" {...field} />
                </FormControl>
                <FormDescription>
                  A webhook URL accessor key is a unique identifier used to
                  authenticate and authorize access to the webhook URL for
                  secure data transmission.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Send</Button>
        </form>
      </Form>
      <div className="grid grid-cols-1 gap-4">
        <WebhooksTable />
      </div>
    </div>
  )
}
