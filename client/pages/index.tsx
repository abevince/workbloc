export default function HomePage() {
  return (
    <div className="flex min-w-full h-screen overflow-hidden bg-gray-50">
      <div className="flex flex-col w-full md:w-[26rem]">
        <div>
          <h1>Sign in to your account</h1>
        </div>
      </div>

      <div className="flex-1 h-screen bg-red-300 hidden md:flex md:flex-shrink-0">
        Banner here
      </div>
    </div>
  )
}
