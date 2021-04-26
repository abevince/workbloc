import fastify, { FastifyInstance } from "fastify";
import { app } from "./app";

export const server: FastifyInstance = fastify();

server.register(app);

const PORT = parseInt(process.env.PORT || "") || 4001;
server.listen(PORT, (err) => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphiql`);
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
