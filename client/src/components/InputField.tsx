import { forwardRef, ComponentPropsWithoutRef } from 'react'

type InputFieldType = 'text' | 'password' | 'email'
interface InputFieldProps extends ComponentPropsWithoutRef<'input'> {
  error?: string
  label: string
  name: string
  optLabel?: string
  type: InputFieldType
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, type = 'text', optLabel, error, name, ...props }, ref) => (
    <div className="text-left">
      <div className="flex justify-between">
        <label htmlFor={name} className="block font-medium text-sm">
          {label}
        </label>
        {optLabel ? (
          <span className="text-xs text-gray-500">{optLabel}</span>
        ) : null}
      </div>
      <div className="mt-1">
        <input
          type={type}
          name={name}
          id={name}
          ref={ref}
          className={`${
            error
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
              : 'focus:ring-blue-500 focus:border-blue-500 border-gray-300 text-gray-800'
          } shadow-sm  block w-full sm:text-sm  rounded-md`}
          {...props}
        />
      </div>
      {error ? <p className="mt-2 text-xs text-red-500">{error}</p> : null}
    </div>
  )
)

export default InputField
