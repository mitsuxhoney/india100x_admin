import { Outlet } from 'react-router-dom'
import UserProfileSidebar from './UserProfileSidebar'

const UserProfileLayout = () => {
  const userProfileSidebarItems = [
    {
      title: 'Profile',
      href: '/account/',
    },
    {
      title: 'Security',
      href: '/account/security',
    },
    {
      title: 'Appearance',
      href: '/account/appearance',
    },
    {
      title: 'Notifications',
      href: '/account/notifications',
    },
  ]
  return (
    <>
      {/* <div className="md:hidden">
        <img
          src="/examples/forms-light.png"
          width={1280}
          height={791}
          alt="Forms"
          className="block dark:hidden"
        />
        <img
          src="/examples/forms-dark.png"
          width={1280}
          height={791}
          alt="Forms"
          className="hidden dark:block"
        />
      </div> */}
      {/* "space-y-6 p-10 pb-16 block" */}
      <div className="space-y-6 p-10 pb-16 block">
        {/* <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" /> */}
        {/* className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0" */}
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="w-1/5">
            <UserProfileSidebar items={userProfileSidebarItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

export default UserProfileLayout
