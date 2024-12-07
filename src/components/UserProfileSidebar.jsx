import { useLocation, NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

const UserProfileSidebar = ({ items }) => {
  const pathname = useLocation().pathname

  return (
    <nav className={cn('flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1')}>
      {items.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          className={({ isActive }) =>
            cn(
              buttonVariants({ variant: 'ghost' }),
              isActive
                ? 'bg-muted hover:bg-muted'
                : 'hover:bg-transparent hover:underline',
              'justify-start hover:no-underline'
            )
          } 
        >
          {item.title}
        </NavLink>
      ))}
    </nav>
  )
}

export default UserProfileSidebar
