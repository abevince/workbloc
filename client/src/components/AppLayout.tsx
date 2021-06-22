import CustomHead from './CustomHead'
import MobileNav from './MobileNav'
import PageHeader from './PageHeader'
import SideNavBar from './SideNavBar'

const AppLayout: React.FC<{ pageTitle: string }> = ({
  children,
  pageTitle,
}) => {
  return (
    <CustomHead>
      <div className="flex flex-col md:flex-row min-w-full h-screen bg-gray-100 overflow-hidden">
        <SideNavBar />
        <div className="bg-gray-100 overflow-auto lg:overflow-hidden mb-16 text-[#1E293B] md:w-full md:mb-0">
          <PageHeader />
          <h1 className="text-2xl text-gray-700 font-medium px-4 md:px-8 mb-4">
            {pageTitle}
          </h1>
          {children}
        </div>
        <MobileNav />
      </div>
    </CustomHead>
  )
}

export default AppLayout
