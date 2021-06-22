import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'

interface TWorklogItem {
  timeFrom: string
  timeTo: string
  workDone: string
}
interface TProps {
  data: TWorklogItem
}

const WorklogItem = ({ data }: TProps) => {
  return (
    <div className="flex items-center bg-white rounded-lg px-4 py-2 border border-gray-300 border-b-4">
      <div className="flex-grow">
        <p className="text-yellow-600 font-medium text-xs">{`${data.timeFrom} - ${data.timeTo}`}</p>
        <p className="text-gray-700">{data.workDone}</p>
      </div>

      <ul className="flex space-x-4">
        <li>
          <button className="p-1 rounded hover:bg-gray-300 text-red-500">
            <TrashIcon className="h-5" />
          </button>
        </li>
        <li>
          <button className="p-1 rounded hover:bg-gray-300 text-blue-500">
            <PencilAltIcon className="h-5" />
          </button>
        </li>
      </ul>
    </div>
  )
}

export default WorklogItem
