import Head from 'next/head'
import * as React from 'react'

const CustomHead: React.FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>Aralinks - Workbloc</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gray-100">{children}</div>
    </>
  )
}

export default CustomHead
