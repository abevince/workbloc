import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import InputField from '../components/InputField'
import { useSignUpMutation } from '../generated/graphql'

interface ISignUpFormData {
  firstName: string
  lastName: string
  email: string
  password: string
}
const SignUpForm = () => {
  const { mutateAsync } = useSignUpMutation()
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<ISignUpFormData>({
    defaultValues: {},
  })

  useEffect(() => {
    setFocus('firstName')
  }, [setFocus])

  const onSubmit = handleSubmit(async (data) => {
    const user = await mutateAsync(data)
    if (user.createUser.errors) {
      console.log(user.createUser.errors)
    } else if (user.createUser.user) {
      console.log(user.createUser.user)
    }
  })

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-3 text-gray-600 md:w-96"
    >
      <div className="flex space-x-3">
        <InputField
          label="First name"
          type="text"
          placeholder="Jennifer"
          {...register('firstName', {
            required: 'First name is required',
          })}
          error={errors.firstName?.message}
        />
        <InputField
          label="Last name"
          type="text"
          placeholder="Dela Cruz"
          {...register('lastName', {
            required: 'Last name is required',
          })}
          error={errors.lastName?.message}
        />
      </div>
      <InputField
        label="Email"
        type="email"
        placeholder="yourname@email.com"
        {...register('email', {
          required: 'Please enter an email',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email',
          },
        })}
        error={errors.email?.message}
      />
      <InputField
        label="Password"
        type="password"
        placeholder="supers3cretp@$$word"
        {...register('password', {
          required: 'Please enter a password',
          minLength: {
            value: 4,
            message: 'Minimum of 4 characters',
          },
        })}
        error={errors.password?.message}
      />

      <p className="text-xs text-gray-500">I will now have all of your data.</p>
      <button
        type="submit"
        // disabled={fetching}
        className="px-8 flex justify-center py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full"
      >
        Create my account
      </button>
    </form>
  )
}

export default SignUpForm
