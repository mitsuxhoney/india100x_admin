import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar'

import { Button } from '@/components/ui/button'

import { Separator } from '@/components/ui/separator'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'

import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Outlet, useLocation } from 'react-router-dom'
import { ModeToggle } from '@/components/mode-toggle'
import { AppSidebar } from './app-sidebar'
const Layout = () => {
  const location = useLocation()
  const afterSeparator = location.pathname
    .slice(1)
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
  const [isVisible, setIsVisible] = useState(false)

  // Function to handle scroll behavior
  const handleScroll = () => {
    setIsVisible(window.scrollY > 0)
  }

  // Scroll to top functionality
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex sticky top-0 left-0 z-[20] bg-background rounded-t-lg right-0 h-16 shrink-0 items-center gap-2 justify-between">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  {afterSeparator}
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage></BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="mr-4">
            <ModeToggle />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 relative z-[1]">
          <Outlet />
        </div>
        <footer className="relative">
          {isVisible && (
            <Button
              onClick={scrollToTop}
              variant="outline"
              className="rounded-[50%] z-[999] fixed bottom-6 right-6"
            >
              <ArrowUp />
            </Button>
          )}
        </footer>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Layout
