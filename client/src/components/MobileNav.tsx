import {
  HomeIcon,
  CalendarIcon,
  UserGroupIcon,
  UserCircleIcon,
} from '@heroicons/react/solid'
import Link from 'next/link'

const MobileNav = () => {
  return (
    <nav className="fixed h-14 bg-gray-800 w-full bottom-0 px-6 py-2 md:hidden">
      <ul className="flex justify-between text-white text-xs tracking-wide">
        <MobileNavItem location="/" label="Home">
          <HomeIcon className="h-7" />
        </MobileNavItem>
        <MobileNavItem location="/worklogs" label="Worklogs">
          <CalendarIcon className="h-7" />
        </MobileNavItem>
        <MobileNavItem location="/team" label="Team">
          <UserGroupIcon className="h-7" />
        </MobileNavItem>
        <MobileNavItem location="/profile" label="Profile">
          <UserCircleIcon className="h-7" />
        </MobileNavItem>
      </ul>
    </nav>
  )
}

export default MobileNav

interface MobileNavItemProps {
  location: string
  label: string
}

const MobileNavItem: React.FC<MobileNavItemProps> = ({
  children,
  location,
  label,
}) => (
  <li>
    <Link href={location}>
      <a className="items-center flex flex-col">
        {children}
        {label}
      </a>
    </Link>
  </li>
)
