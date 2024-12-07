import { Button } from '@/components/ui/button';
import { ChangePasswordSection } from './ChangePasswordSection';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
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
} from '@/components/ui/alert-dialog';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';

const UserSecurityForm = () => {
  const [twoOnDialogBox, setTwoOnDialogBox] = useState(false);
  const [twoOffDialogBox, setTwoOffDialogBox] = useState(false);
  const [activateMethod, setActivateMethod] = useState(false);
  const [sendOtp, setSendOtp] = useState(false);

  const toggleDialogBox = (setter) => {
    setter((prevState) => !prevState);
  };

  const getCookie = (cookieName) => {
    const cookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${cookieName}=`));
    return cookie ? cookie.split('=')[1] : '';
  };

  const cookieValue = getCookie('twoState');

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-md font-medium">Password Management</h3>
            <p className="text-md font-light">
              You can change your password for security reasons or reset it if you forget it.
            </p>
          </div>
          <ChangePasswordSection />
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-4">
        <h3 className="text-md font-medium">Two-Factor Authentication (2FA)</h3>
        <p className="text-md font-light">
          Prevent hackers from accessing your account with an additional layer of security.
        </p>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              onClick={() =>
                cookieValue === 'true' ? toggleDialogBox(setTwoOffDialogBox) : toggleDialogBox(setTwoOnDialogBox)
              }
            >
              {cookieValue === 'true' ? 'Turn off Two-Factor Authentication' : 'Turn on Two-Factor Authentication'}
            </Button>
          </AlertDialogTrigger>

          {twoOffDialogBox && (
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Turn off 2-Step Verification</AlertDialogTitle>
                <AlertDialogDescription>
                  Turning off 2-Step Verification will remove the extra security on your account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    document.cookie = 'twoState=false';
                    setTwoOffDialogBox(false);
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
                <AlertDialogTitle>Select Two-Factor Authentication Method</AlertDialogTitle>
                <AlertDialogDescription className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setActivateMethod(true)}
                  >
                    Email Based Authentication
                  </Button>
                  <Button variant="outline">SMS Based Authentication</Button>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    setSendOtp(true);
                    setTwoOnDialogBox(false);
                  }}
                >
                  Proceed
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          )}

          {sendOtp && (
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {activateMethod ? 'Turn on 2-Step Verification' : 'Turn off 2-Step Verification'}
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
                    document.cookie = `twoState=${activateMethod ? 'true' : 'false'}`;
                    setSendOtp(false);
                  }}
                >
                  {activateMethod ? 'Turn on' : 'Turn off'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          )}
        </AlertDialog>
      </div>
    </div>
  );
};

export default UserSecurityForm;
