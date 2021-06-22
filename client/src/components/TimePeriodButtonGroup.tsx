import { MouseEventHandler } from 'react'
import { TShortcutButtonValues } from './TimeInputForm'

interface TimePeriodButtonGroupProps {
  data: TShortcutButtonValues[]
  clickHandler: (id: number) => void
}
const TimePeriodButtonGroup = ({
  data,
  clickHandler,
}: TimePeriodButtonGroupProps) => (
  <div className="flex justify-between text-xs md:text-sm space-x-2 text-yellow-700 ">
    {data.map((e) => (
      <TimePeriodButton
        onClick={() => clickHandler(e.id)}
        key={e.id}
        label={e.label}
      />
    ))}
  </div>
)

export default TimePeriodButtonGroup

interface TimePeriodButtonProps {
  label: string
  onClick: MouseEventHandler<HTMLButtonElement>
}
const TimePeriodButton = ({ label, onClick }: TimePeriodButtonProps) => {
  return (
    <button
      type="button"
      className="bg-yellow-400 py-1 px-2 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-yellow-600 hover:bg-yellow-500"
      onClick={onClick}
    >
      {label}
    </button>
  )
}
