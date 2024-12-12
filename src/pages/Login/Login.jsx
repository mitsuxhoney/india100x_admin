import { Link } from 'react-router-dom'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { UserLoginForm } from '@/components/UserLoginForm'
import { ForgotPasswordForm } from '@/components/ForgotPasswordForm'
import LoginImg from '@/assets/Login-BackgroundImg.webp'
import { useState } from 'react'

export default function Login() {
  const [isForgotPasswordClicked, setIsForgotPasswordClicked] = useState(false)
  const [isOtpSent, setIsOtpSent] = useState(false)
  return (
    <>
      <div className="sm:hidden w-[100vw] h-[100vh]">
        {/* <img
          src="/assets/Login-BackgroundImg.webp"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <img
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        /> */}
      </div>
      {isForgotPasswordClicked ? (
        <div className="container relative hidden h-[100vh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
          {/* <Link
        href="/examples/authentication"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 md:right-8 md:top-8'
        )}
      >
        Login
      </Link> */}
          <div className="relative hidden h-full w-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
            <div className="absolute inset-0" />
            <img
              src={`${LoginImg}`}
              className="absolute top-0 left-0 w-full h-full "
              alt=""
            />
            <div className="relative z-20 flex items-center text-lg font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-6 w-6"
              >
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
              </svg>
              XFER
            </div>
            <div
              class="relative mt-24 -mr-0.5 max-md:max-w-full max-md:text-4xl"
              role="heading"
              aria-level="1"
            >
              <h1>
              Redefining Banking
              <br />
              and Payments
              <br />
              Issuance
              </h1>
            </div>
          </div>
          <div className="lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Reset Password
                </h1>
                <p className="text-sm text-muted-foreground">
                  Enter your email below to reset your password
                </p>
              </div>
              <ForgotPasswordForm />
              <p className="px-8 text-center text-sm text-muted-foreground">
                By clicking continue, you agree to our{' '}
                <Link
                  href="/terms"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link
                  href="/privacy"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="container relative hidden h-[100vh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
          {/* <Link
          href="/examples/authentication"
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'absolute right-4 top-4 md:right-8 md:top-8'
          )}
        >
          Login
        </Link> */}
          <div className="relative hidden h-full w-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
            <div className="absolute inset-0" />
            <img
              src={`${LoginImg}`}
              className="absolute top-0 left-0 w-full h-full "
              alt=""
            />
            <div className="relative z-20 flex items-center text-lg font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-6 w-6"
              >
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
              </svg>
              XFER
            </div>
            <div
              class="relative mt-24 text-[50px] leading-[60px] font-normal -mr-0.5 max-md:max-w-full max-md:text-4xl"
              role="heading"
              aria-level="1"
            >
              Redefining Banking
              <br />
              and Payments
              <br />
              Issuance
            </div>
          </div>
          <div className="lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Welcome Back!
                </h1>
                <p className="text-sm text-muted-foreground">
                  Enter your email below to login
                </p>
              </div>
              <UserLoginForm
                setIsForgotPasswordClicked={setIsForgotPasswordClicked}
              />
              <p className="px-8 text-center text-sm text-muted-foreground">
                By clicking continue, you agree to our{' '}
                <Link
                  href="/terms"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link
                  href="/privacy"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
