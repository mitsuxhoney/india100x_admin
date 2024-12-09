import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom' // Import useNavigate hook from react-router-dom
import { cn } from '@/lib/utils'
import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'

import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
})

// 2. Define a submit handler.
function onSubmit(values) {
  // Do something with the form values.
  // ✅ This will be type-safe and validated.
  console.log(values)
}

export function UserLoginForm({ className, setIsForgotPasswordClicked }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  })
  const [isLoading, setIsLoading] = React.useState(false)
  const navigate = useNavigate() // Initialize the navigate function

  async function onSubmit(event) {
    event.preventDefault()
    setIsLoading(true)

    // Simulate a delay for the loading state (remove or replace with actual login logic)
    setTimeout(() => {
      setIsLoading(false)
      // After login, redirect to the business dashboard page
      navigate('/business-dashboard') // Replace '/business-dashboard' with your actual dashboard path
    }, 1000)
  }

  return (
    <div className={cn('grid gap-6', className)} >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col gap-4 relative">
            <div className="grid grid-cols-1 gap-4 ">
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your password" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end items-start text-sm gap-0 hover:underline">
                <Link
                  to=""
                  onClick={() => {
                    setIsForgotPasswordClicked(true)
                  }}
                >
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Forgot Password?
                </Link>
              </div>
            </div>
            <div className="flex justify-center items-center w-full">
              <Button disabled={isLoading} className="w-full">
                <Link to="/business-dashboard" className="w-full">
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Log in
                </Link>
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
