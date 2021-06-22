import { useRouter } from 'next/dist/client/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { useLoginMutation } from '../generated/graphql'

import InputField from './InputField'

interface IFormData {
  email: string
  password: string
}

const LoginForm = () => {
  const router = useRouter()
  const { mutateAsync } = useLoginMutation()
  const {
    register,
    handleSubmit,
    setFocus,
    setError,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: {},
  })

  useEffect(() => {
    setFocus('email')
  }, [setFocus])

  const onSubmit = handleSubmit(async (data) => {
    const user = await mutateAsync(data)
    if (user.login.errors) {
      setError('email', { message: user.login.errors[0].message })
      setError('password', { message: ' ' })
    } else if (user.login.user) {
      router.push('/')
    }
  })

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
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
      <button
        type="submit"
        // disabled={fetching}
        className="px-8 flex justify-center py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full"
      >
        Sign in
      </button>
    </form>
  )
}

export default LoginForm
