import TimeInputForm from './TimeInputForm'
import { useForm } from 'react-hook-form'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { TWorklogItems } from '../screens/DashboardScreen'

export interface INewWorklogItemFormData {
  workDone: string
  timeFrom: string
  timeTo: string
}

interface NewWorklogItemFormProps {
  setWorklogItems: Dispatch<SetStateAction<TWorklogItems[]>>
}

const NewWorklogItemForm = ({ setWorklogItems }: NewWorklogItemFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    formState: { errors },
    reset,
  } = useForm<INewWorklogItemFormData>({
    defaultValues: {},
  })

  useEffect(() => {
    setFocus('workDone')
  }, [setFocus])

  const onSubmit = handleSubmit((data) => {
    setWorklogItems((value) => [...value, data])
    reset({})
  })

  return (
    <div className=" lg:w-1/2 mb-8 p-4 md:px-8">
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <div>
          <label
            htmlFor="workDone"
            className="block text-sm font-medium text-gray-500"
          >
            What have you worked on?
          </label>
          <div className="mt-1">
            <textarea
              id="workDone"
              rows={3}
              className={`
              ${
                errors.workDone
                  ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }
              shadow-sm mt-1 block w-full sm:text-sm rounded-md`}
              placeholder="I did some cooool stuff!"
              defaultValue={''}
              {...register('workDone', {
                required: 'Please enter what you worked on',
              })}
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Please add the link of your work done, if possible.
          </p>
          {errors.workDone ? (
            <p className="mt-2 text-sm text-red-500">
              {errors.workDone?.message}
            </p>
          ) : null}
        </div>
        <TimeInputForm
          setValue={setValue}
          register={register}
          errors={errors}
        />

        <button className="w-full py-2 bg-[#F97316] text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600 hover:bg-yellow-500 hover:text-yellow-50">
          Save
        </button>
      </form>
    </div>
  )
}

export default NewWorklogItemForm
