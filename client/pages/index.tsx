import Head from 'src/components/Head'
import LoginForm from 'src/components/LoginForm'

export default function HomePage() {
  return (
    <Head>
      <div className="flex min-w-full h-screen overflow-hidden bg-gray-50">
        <div className="flex flex-col w-full md:w-[28rem] justify-center ">
          <div className="px-5 space-y-4 text-center text-gray-700">
            <img
              src="aralinks-logo.svg"
              alt="aralinks logo"
              className="w-24 mx-auto mb-8"
            />
            <h1 className="text-2xl font-semibold">Sign in to your account</h1>
            <LoginForm />
          </div>
        </div>

        <div className="flex-1 bg-[#F1F5F9] h-screen hidden md:flex md:flex-col md:flex-shrink-0 justify-center items-center">
          <h1 className="text-4xl font-medium text-gray-700 mb-10">
            <span role="img" aria-label="waving hands">
              👋
            </span>{' '}
            Welcome back!
          </h1>
          <div className="w-8/12 mx-auto">
            <img src="banner.svg" alt="Hero banner" />
          </div>
          <img
            src="workbloc-logo.svg"
            alt="site logo"
            className="w-28 absolute right-4 top-4"
          />
        </div>
      </div>
    </Head>
  )
}
