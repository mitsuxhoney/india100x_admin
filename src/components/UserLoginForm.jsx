import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom' // Import useNavigate hook from react-router-dom
import { cn } from '@/lib/utils'
import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import axios from '@/api/axios'
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
//import {useAuth} from '../hooks/useAuth';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
})

export default function UserLoginForm({ setScreen }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const [isLoading, setIsLoading] = React.useState(false)
  const navigate = useNavigate()
  //const {setAuth}=useAuth();

  // async function onSubmit(values) {
  //   setIsLoading(true);
  //   console.log(values);
  //   try {
  //     const response = await axios.post(ApiConfig.login, {
  //       email: values.email,
  //       password: values.password,
  //     },
  //       {
  //         withCredentials: true, // Include cookies with the request
  //       });

  //     if (response.status === 200) {
  //       // Handle successful login (e.g., save token, redirect)
  //       console.log('Login successful:', response.data);
  //       navigate('/business-dashboard'); // Replace with your actual dashboard path
  //     } else {
  //       console.error('Unexpected response:', response);
  //     }
  //   } catch (error) {
  //     console.error('Login failed:', error.response?.data || error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }
  async function onSubmit() {
    //e.preventDefault();
  }

  return (
    <div className={cn('grid gap-3')}>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Welcome Back!</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email below to login
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col gap-4 relative">
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        disabled={isLoading}
                        placeholder="Enter your email"
                        {...field}
                      />
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
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end items-start text-sm gap-0 hover:underline">
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    setScreen('forgot-password')
                  }}
                >
                  Forgot Password?
                </span>
              </div>
            </div>
            <div className="flex justify-center items-center w-full">
              <Button
                disabled={isLoading}
                onClick={() => {
                  navigate('/business-dashboard')
                }}
                className="w-full"
                type="submit"
              >
                Log in
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
