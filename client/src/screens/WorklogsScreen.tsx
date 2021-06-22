import AppLayout from '../components/AppLayout'

const WorklogsScreen = () => {
  return (
    <AppLayout pageTitle="Worklogs">
      <div className="lg:flex">
        <div className=" lg:w-1/2 mb-8 p-4 md:px-8 space-y-2">
          <WorklogListItem
            id={1}
            createdAt={new Date('2021-05-04 02:53:17.225')}
            status="PENDING"
          />
          <div className="flex justify-between items-center bg-white rounded-lg px-4 py-2 border border-gray-300 border-b-4">
            <div>
              <span className="text-sm text-blue-700">Monday</span>
              <p className="text-gray-600 font-medium">May 20, 2021</p>
            </div>
            <span className="py-1 px-3 bg-red-100 rounded-md text-sm">
              Pending
            </span>
          </div>
          <div className="flex justify-between items-center bg-white rounded-lg px-4 py-2 border border-gray-300 border-b-4">
            <div>
              <span className="text-sm text-blue-700">Monday</span>
              <p className="text-gray-600 font-medium">May 20, 2021</p>
            </div>
            <span className="py-1 px-3 bg-red-100 rounded-md text-sm">
              Pending
            </span>
          </div>
        </div>
        <div className=" lg:w-1/2 mb-8 p-4 md:px-8">My worklogs</div>
      </div>
    </AppLayout>
  )
}

export default WorklogsScreen

interface WorklogListItemProps {
  id: number
  createdAt: Date
  status: 'PENDING' | 'APPROVED' | 'DISAPPROVED'
}

const WorklogListItem = ({ id, createdAt, status }: WorklogListItemProps) => {
  return (
    <div className="flex justify-between items-center bg-white rounded-lg px-4 py-2 border border-gray-300 border-b-4">
      <div>
        <p className="text-gray-600 font-medium">{createdAt.toDateString()}</p>
      </div>
      <span className="py-1 px-3 bg-red-100 rounded-md text-sm capitalize">
        {status.toLowerCase()}
      </span>
    </div>
  )
}
