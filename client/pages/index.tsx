import DashboardScreen from '../src/screens/DashboardScreen'

export default function HomePage() {
  return <DashboardScreen />
}

// const withAuth: GetServerSideProps = async (ctx) => {
//   // const cookie = ctx.req.headers?.cookie
//   const fetchHeader = {
//     'Content-Type': 'application/json',
//     cookie: ctx.req.headers?.cookie as string,
//   }

//   const res = await fetch('http://localhost:4001/graphql', {
//     method: 'POST',
//     credentials: 'same-origin',
//     headers: fetchHeader,
//     body: JSON.stringify({ query: ME_QUERY }),
//   })
//   const result = await res.json()
//   if (result.data || !result.errors) {
//     return {
//       props: {},
//       redirect: {
//         destination: '/dashboard',
//         permanent: false,
//       },
//     }
//   }

//   return { props: {} }
// }
// export const getServerSideProps = withAuth
