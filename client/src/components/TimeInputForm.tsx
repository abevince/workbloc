import {
  DeepMap,
  FieldError,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form'
import InputField from './InputField'
import { INewWorklogItemFormData } from './NewWorklogItemForm'
import TimePeriodButtonGroup from './TimePeriodButtonGroup'

export interface TShortcutButtonValues {
  id: number
  label: string
  timeFrom: string
  timeTo: string
}

const ShortcutButtonValues: TShortcutButtonValues[] = [
  { id: 1, label: 'Morning', timeFrom: '07:00', timeTo: '12:00' },
  { id: 2, label: 'Afternoon', timeFrom: '13:00', timeTo: '16:00' },
  { id: 3, label: 'Lunch', timeFrom: '12:00', timeTo: '13:00' },
  { id: 4, label: '7am - 10am', timeFrom: '07:00', timeTo: '10:00' },
]

interface TimeInputFormProps {
  register: UseFormRegister<INewWorklogItemFormData>
  errors: DeepMap<INewWorklogItemFormData, FieldError>
  setValue: UseFormSetValue<INewWorklogItemFormData>
}

const TimeInputForm = ({ register, errors, setValue }: TimeInputFormProps) => {
  const handleClick = (id: number) => {
    const timeValue = ShortcutButtonValues.find((e) => e.id === id)
    if (timeValue) {
      setValue('timeFrom', timeValue?.timeFrom)
      setValue('timeTo', timeValue?.timeTo)
    }
  }
  return (
    <>
      <div className="flex justify-between space-x-4 text-gray-500">
        <InputField
          label="Time from"
          type="text"
          placeholder="08:00"
          {...register('timeFrom', {
            required: 'Please enter a time',
            pattern: {
              value: /^([0-1]\d|20|21|22|23):[0-5]\d$/,
              message: 'Invalid time input.',
            },
          })}
          error={errors.timeFrom?.message}
        />
        <InputField
          label="Time to"
          type="text"
          placeholder="13:00"
          {...register('timeTo', {
            required: 'Please enter a time',
            pattern: {
              value: /^([0-1]\d|20|21|22|23):[0-5]\d$/,
              message: 'Invalid time input.',
            },
          })}
          error={errors.timeTo?.message}
        />
      </div>
      <span className="text-xs text-gray-400">
        Please use 24-hour clock format
      </span>

      <TimePeriodButtonGroup
        data={ShortcutButtonValues}
        clickHandler={handleClick}
      />
    </>
  )
}

export default TimeInputForm
