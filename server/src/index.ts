import "reflect-metadata";
import Fastify, { FastifyInstance } from "fastify";
import mercurius from "mercurius";

import { UserResolver } from "./resolvers/User";
import { buildSchema } from "type-graphql";

import { buildContext } from "./context";

async function main() {
  const app: FastifyInstance = Fastify();

  const schema = await buildSchema({
    resolvers: [UserResolver],
    validate: false,
  });

  app.register(mercurius, {
    schema,
    context: buildContext,
    graphiql: true,
  });
  const PORT = parseInt(process.env.PORT || "") || 4001;

  app
    .listen(PORT)
    .then(() =>
      console.log(`🚀 Server ready at http://localhost:${PORT}/graphiql`)
    );
}

main().catch(console.error);
