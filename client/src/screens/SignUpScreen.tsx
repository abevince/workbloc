import CustomHead from '../components/CustomHead'
import SignUpForm from '../components/SignUpForm'

const SignUpPageScreen = () => {
  return (
    <CustomHead>
      <div className="flex min-w-full h-screen overflow-hidden bg-gray-200 justify-center items-center p-2">
        <div className="space-y-4 px-3 py-8 bg-white sm:p-8 rounded sm:rounded-xl relative">
          <img
            src="aralinks-logo.svg"
            alt="aralinks logo"
            className="w-24 mx-auto absolute -top-12 inset-x-0"
          />
          <h1 className="text-2xl font-semibold text-gray-700 text-center tracking-wide pt-4 sm:pt-8">
            Create your account
          </h1>
          <SignUpForm />
        </div>
        <img
          src="workbloc-logo.svg"
          alt="site logo"
          className="w-28 absolute right-4 top-4"
        />
      </div>
    </CustomHead>
  )
}
export default SignUpPageScreen
