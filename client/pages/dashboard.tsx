export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard: Hello </h1>
    </div>
  )
}

// const withAuth: GetServerSideProps = async (ctx) => {
//   // const cookie = ctx.req.headers?.cookie
//   const fetchHeader = {
//     'Content-Type': 'application/json',
//     cookie: ctx.req.headers?.cookie as string,
//   }

//   const res = await fetch('http://localhost:4001/graphql', {
//     method: 'POST',
//     credentials: 'include',
//     headers: fetchHeader,
//     body: JSON.stringify({ query: ME_QUERY }),
//   })
//   const result = await res.json()
//   if (!result.data || result.errors) {
//     return {
//       props: {},
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     }
//   }

//   return { props: { user: result.data?.me?.user } }
// }
// export const getServerSideProps = withAuth
