import { server } from "./app";

const PORT = parseInt(process.env.PORT || "") || 4001;
server.listen(PORT, (err) => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphiql`);
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
