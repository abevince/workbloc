import "reflect-metadata";
import Fastify, { FastifyInstance, FastifyServerOptions } from "fastify";
import mercurius from "mercurius";
import { buildSchema } from "type-graphql";
import fastifyCors from "fastify-cors";
import sensible from "fastify-sensible";
import cookie, { FastifyCookieOptions } from "fastify-cookie";

import { UserResolver } from "./resolvers/User";
import { ProfileResolver } from "./resolvers/Profile";

import { buildContext } from "./context";

export async function createServer(
  opts: FastifyServerOptions = {}
): Promise<FastifyInstance> {
  const server = Fastify(opts);
  server.register(fastifyCors, {
    origin: ["http://localhost:3000"],
    credentials: true,
  });
  server.register(sensible);
  server.register(cookie, {
    secret: process.env.COOKIE_SIGNATURE, // for cookies signature
  } as FastifyCookieOptions);

  const schema = await buildSchema({
    resolvers: [UserResolver, ProfileResolver],
    validate: false,
  });

  server.register(mercurius, {
    schema,
    context: buildContext,
    graphiql: true,
  });

  // Server status/health check
  server.get(`/`, async function () {
    return { up: true };
  });

  return server;
}

export async function startServer(): Promise<void> {
  const server = await createServer({});

  try {
    const PORT = parseInt(process.env.PORT || "") || 4001;
    await server.listen(PORT);
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphiql`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}
