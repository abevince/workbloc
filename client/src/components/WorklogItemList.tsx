import { TWorklogItems } from '../screens/DashboardScreen'
import WorklogItem from './WorklogItem'
interface TWorklogItemList {
  data: TWorklogItems[]
}

const WorklogItemList = ({ data }: TWorklogItemList) => {
  return (
    <div className="lg:w-1/2 p-4 md:px-8 lg:pt-0">
      <div className="flex justify-between">
        <span className="text-gray-500">Your logs for today</span>
        <span className="text-gray-800 font-medium">May 06, 2021</span>
      </div>
      <div className="flex flex-col w-full mt-2 items-center">
        {data.length === 0 ? (
          <>
            <img
              src="/nodata.svg"
              alt="no data illustration"
              className="w-28 h-28 my-8"
            />
            <p className="text-gray-400">You do not have a worklog today?</p>
          </>
        ) : (
          <div className="w-full space-y-3 py-2">
            {data.map((worklogItem, index) => (
              <WorklogItem key={index} data={worklogItem} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default WorklogItemList
