import { Link } from 'react-router-dom'

import UserLoginForm from '@/components/UserLoginForm'

import LoginImg from '@/assets/Login-BackgroundImg.webp'
import { useState } from 'react'
import OtpForm from '@/components/OtpForm'
import ResetPasswordForm from '@/components/ResetPasswordForm'
import ForgotPasswordForm from '@/components/ForgotPasswordForm'

export default function Login() {
  const [step, setStep] = useState('login')
  return (
    <>
      <div className="container relative h-[100vh] flex flex-col mx-auto items-center justify-center md:grid lg:max-w-none grid-cols-1 lg:grid-cols-2 lg:px-0">
        {/* <Link
          href="/examples/authentication"
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'absolute right-4 top-4 md:right-8 md:top-8'
          )}
        >
          Login
        </Link> */}
        <div className="relative max-lg:hidden h-full w-full bg-muted p-10 text-white  dark:border-r lg:flex">
          <div className="absolute inset-0" />
          <img
            src={`${LoginImg}`}
            className="absolute top-0 left-0 w-full h-full "
            alt=""
          />
          <div className="absolute top-10 left-10 z-20 flex items-center text-lg font-medium">
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
            className="relative mt-24 text-[50px] leading-[60px] font-normal -mr-0.5 max-md:max-w-full max-md:text-4xl"
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
        <div className="lg:p-4 p-10 dark:bg-muted bg-[#F9FAFB]">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] ">
            {step === 'login' && <UserLoginForm setStep={setStep} />}
            {step === 'forgot-password' && (
              <ForgotPasswordForm setStep={setStep} />
            )}
            {step === 'otp' && <OtpForm setStep={setStep} />}
            {step === 'reset-password' && (
              <ResetPasswordForm setStep={setStep} />
            )}
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
    </>
  )
}
