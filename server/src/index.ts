import "reflect-metadata";
import Fastify, { FastifyInstance } from "fastify";
import mercurius from "mercurius";
import { buildSchema } from "type-graphql";
import fastifyCors from "fastify-cors";
import sensible from "fastify-sensible";
import cookie, { FastifyCookieOptions } from "fastify-cookie";

import { UserResolver } from "./resolvers/User";
import { ProfileResolver } from "./resolvers/Profile";

import { buildContext } from "./context";

async function main() {
  const app: FastifyInstance = Fastify();
  app.register(fastifyCors, {
    origin: ["http://localhost:3000"],
    credentials: true,
  });
  app.register(sensible);
  app.register(cookie, {
    secret: process.env.COOKIE_SIGNATURE, // for cookies signature
  } as FastifyCookieOptions);

  const schema = await buildSchema({
    resolvers: [UserResolver, ProfileResolver],
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
