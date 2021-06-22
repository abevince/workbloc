import {
  CalendarIcon,
  HomeIcon,
  UserCircleIcon,
  UserGroupIcon,
} from '@heroicons/react/solid'
import { LogoutIcon } from '@heroicons/react/outline'
import Link from 'next/link'

const SideNavBar = () => {
  return (
    <nav className="bg-gray-800 hidden text-md pt-6 pb-2 px-3 text-gray-100 items-center justify-between md:flex md:flex-col lg:w-64 lg:items-baseline">
      <img
        src="/aralinks-logo.svg"
        alt="aralinks logo"
        className="h-12 mx-auto lg:h-16"
      />
      <ul className="space-y-2 mt-6 flex-1 w-full">
        <NavItem location="/" label="Dashboard">
          <HomeIcon className="h-8 lg:h-6" />
        </NavItem>
        <NavItem location="/worklogs" label="Worklogs">
          <CalendarIcon className="h-8 lg:h-6" />
        </NavItem>
        <NavItem location="/" label="Team">
          <UserGroupIcon className="h-8 lg:h-6" />
        </NavItem>
        <NavItem location="/" label="Profile">
          <UserCircleIcon className="h-8 lg:h-6" />
        </NavItem>
      </ul>

      <button className="flex items-center w-full p-2 hover:bg-gray-900 rounded-md">
        <LogoutIcon className="h-8 lg:h-6" />
        <span className="hidden lg:block ml-2">Logout</span>
      </button>
    </nav>
  )
}

export default SideNavBar

interface NavItemsProps {
  location: string
  label: string
}

const NavItem: React.FC<NavItemsProps> = ({ children, location, label }) => (
  <li>
    <Link href={location}>
      <a className="flex align-middle p-2 hover:bg-gray-900 rounded-md">
        {children}
        <span className="hidden lg:block ml-2">{label}</span>
      </a>
    </Link>
  </li>
)
