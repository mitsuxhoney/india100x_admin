import { Button } from '@/components/ui/button'
import { ChangePasswordSection } from './ChangePasswordSection'
import { Separator } from '@/components/ui/separator'
import { useState, useEffect } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import IpWhitelistingTable from '@/components/IpWhitelistingTable'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'

const UserSecurityForm = () => {
  const [twoOnDialogBox, setTwoOnDialogBox] = useState(false)
  const [twoOffDialogBox, setTwoOffDialogBox] = useState(false)
  const [activateMethod, setActivateMethod] = useState(null) // Track selected method
  const [sendOtp, setSendOtp] = useState(false)
  const [cookieValue, setCookieValue] = useState('')

  useEffect(() => {
    const getCookie = (cookieName) => {
      const cookie = document.cookie
        .split('; ')
        .find((row) => row.startsWith(`${cookieName}=`))
      return cookie ? cookie.split('=')[1] : ''
    }
    setCookieValue(getCookie('twoState'))
  }, [sendOtp, activateMethod]) // Re-run effect when OTP or activation method changes

  const toggleDialogBox = (setter) => {
    setter((prevState) => !prevState)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-md font-medium">Password Management</h3>
            <p className="text-md font-light">
              You can change your password for security reasons or reset it if
              you forget it.
            </p>
          </div>
          <div>
            <ChangePasswordSection />
          </div>
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-4">
        <h3 className="text-md font-medium">Two-Factor Authentication (2FA)</h3>
        <p className="text-md font-light">
          Prevent hackers from accessing your account with an additional layer
          of security.
        </p>

        <div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                onClick={() =>
                  cookieValue === 'true'
                    ? toggleDialogBox(setTwoOffDialogBox)
                    : toggleDialogBox(setTwoOnDialogBox)
                }
              >
                {cookieValue === 'true'
                  ? 'Turn off Two-Factor Authentication'
                  : 'Turn on Two-Factor Authentication'}
              </Button>
            </AlertDialogTrigger>

            {twoOffDialogBox && (
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Turn off 2-Step Verification
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Turning off 2-Step Verification will remove the extra
                    security on your account.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      document.cookie = 'twoState=false'
                      setCookieValue('false')
                      setTwoOffDialogBox(false)
                    }}
                  >
                    Turn off
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            )}

            {twoOnDialogBox && (
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Select Two-Factor Authentication Method
                  </AlertDialogTitle>
                  <AlertDialogDescription className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setActivateMethod('email')
                        setTwoOnDialogBox(false)
                        setSendOtp(true)
                      }}
                    >
                      Email Based Authentication
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setActivateMethod('sms')
                        setTwoOnDialogBox(false)
                        setSendOtp(true)
                      }}
                    >
                      SMS Based Authentication
                    </Button>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            )}

            {sendOtp && (
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {activateMethod === 'email'
                      ? 'Enter the otp sent on your email address'
                      : 'Enter the otp sent on your mobile number'}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    <InputOTP maxLength={6}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      document.cookie = 'twoState=true'
                      setCookieValue('true')
                      setSendOtp(false)
                    }}
                  >
                    Verify OTP
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            )}
          </AlertDialog>
        </div>
      </div>
      <Separator />
      <div className="flex flex-col gap-4">
        <h3 className="font-bold">IP Whitelisting</h3>
        <div className="grid grid-cols-1">
          <IpWhitelistingTable />
        </div>
      </div>
    </div>
  )
}

export default UserSecurityForm
