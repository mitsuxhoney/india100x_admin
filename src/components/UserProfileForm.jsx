import { Link } from 'react-router-dom'

import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from '@/components/ui/form'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { z } from 'zod'

import { cn } from '@/lib/utils'
import { Toast } from '@/components/ui/toast'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'name must be at least 2 characters.',
    })
    .max(30, {
      message: 'name must not be longer than 30 characters.',
    }),
  email: z
    .string({
      required_error: 'Please select an email to display.',
    })
    .email(),
  phoneno: z
    .string()
    .min(10, {
      message: 'Mobile must have at least 10 digits'
    })
    .max(10, {
      message: 'Mobile number can\'t have more than 10 digits'
    }),
})

const defaultValues = {
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  phoneno: '1234567890',
}

const UserProfileForm = () => {
  const form = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  })

  const { watch, getValues, handleSubmit, formState } = form
  const currentValues = watch()

  // Determine if the form has changed
  const isFormChanged = JSON.stringify(currentValues) !== JSON.stringify(defaultValues)
  function onSubmit(data) {
    Toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneno"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter your phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex justify-between'>
          <FormField
            control={form.control}
            name="teamsize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team Size</FormLabel>
                <FormControl>
                  <Input placeholder="23" {...field} disabled />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="activeprograms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Active Programs</FormLabel>
                <FormControl>
                  <Input placeholder="56" {...field} disabled />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="kycstatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>KYC Status</FormLabel>
                <FormControl>
                  <Input placeholder="Verified" {...field} disabled />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex justify-between'>
          <FormField
            control={form.control}
            name="dateOfRegistration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Registration Date</FormLabel>
                <FormControl>
                  <Input placeholder="21/04/2023" {...field} disabled />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="accountStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Status</FormLabel>
                <FormControl>
                  <Input placeholder="Suspended" {...field} disabled />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={!isFormChanged}>
          Update Profile
        </Button>
      </form>
    </Form>
  )
}

export default UserProfileForm
